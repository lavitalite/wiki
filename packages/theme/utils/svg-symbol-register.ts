import { globSync } from 'tinyglobby';
import Debug from 'debug'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
const debug = Debug.debug('symbol-icon-register')

debug.enabled = true

const BACKSLASHES = /\\/g;

export type DOMInject = 'body-first' | 'body-last'

interface LoadSvgSymbolsOptions {
  /**
   * icons folder, all svg files in it will be converted to svg sprite.
   */
  iconDirs: string | string[]
  /**
   * id format
   * @default: [icon-set]:[icon-name]
  */
  symbolId?: string
  /**
   * icon format
   * @default: body-first
  */
  inject?: DOMInject,
  /**
   * 
   * id for container that hold svg symbol
   */
  containerId?: string
}



interface FileStats {
  mtimeMs: number;
  path: string;
  code: string;
}

/**
 * Describes a plain-text file.
 */
export interface FileEntry {
  path: string
  code: string
}


// const cwd = path.dirname(fileURLToPath(import.meta.url))
export const loadSvgSymbolsOptionsDefaults: Omit<LoadSvgSymbolsOptions, 'iconDirs'> = {
  symbolId: '[icon-set]:[icon-name]',
  inject: 'body-first',
  containerId: 'svg-symbol-container'
}





const cache = new Map<string, FileStats>()


/**
 * Reads a text file and returns its contents.
 */
// export function readTextFile(name: string, cwd: string): Promise<FileEntry> {
//   return new Promise((resolve, reject) => {
//     const filePath = path.join(cwd, name)

//     fs.readFile(filePath, 'utf8', (err, code) => {
//       if (err) {
//         reject(err)
//       }
//       else {
//         resolve({
//           path: filePath,
//           code
//         })
//       }
//     })
//   })
// }



async function compileIcons(opts: LoadSvgSymbolsOptions): Promise<{ insertHTML: string, idSet: Set<string> }> {
  // if (iconDirsOrOverrides && overrides?.patterns) {
  //   throw new Error('Cannot pass patterns as both an argument and an option');
  // }



  const { iconDirs } = opts

  const idSet = new Set<string>()

  let insertHTML = '';
  let relName = ' '
  let symbolId
  // scan dir
  for (const dir of iconDirs) {
    const _symbols = globSync('**/*.svg', {
      cwd: dir,
      absolute: true,
    }).map((_path) => {
      return new Promise((resolve, reject) => {
        fs.readFile(_path, 'utf-8', (err, code) => {
          if (err) {
            reject(err)
          } else {
            relName = _path.replace((path.resolve(dir) + '/').replace(BACKSLASHES, '/'), '')
            symbolId = createSymbolId(relName, opts)
            idSet.add(symbolId)
            resolve(code)
          }
        })
      })
    })
    const symbols = await Promise.all(_symbols);
    insertHTML += symbols.join('')
  }

  return { insertHTML, idSet }
}





export async function createModuleCode(iconDirs: string | string[], overrides?: Omit<LoadSvgSymbolsOptions, 'iconDirs'>): Promise<{ code: string, idSet: string }>
export async function createModuleCode(overrides: LoadSvgSymbolsOptions): Promise<{ code: string, idSet: string }>
export async function createModuleCode(iconDirsOrOverrides: string | string[] | LoadSvgSymbolsOptions, overrides?: Omit<LoadSvgSymbolsOptions, 'iconDirs'>) {

  const rawOpts =
    Array.isArray(iconDirsOrOverrides) || typeof iconDirsOrOverrides === 'string'
      ? { ...overrides, iconDirs: iconDirsOrOverrides }
      : iconDirsOrOverrides;


  if (typeof rawOpts.iconDirs === 'string') {
    rawOpts.iconDirs = [rawOpts.iconDirs];
  }

  // Combine defaults with user-provided options (overrides)
  const opts = Object.assign(
    {},
    loadSvgSymbolsOptionsDefaults,
    rawOpts
  ) as LoadSvgSymbolsOptions;

  debug('options after parsed: ', opts)

  const { insertHTML, idSet } = await compileIcons(opts)


  const code = `
  if (typeof window !== 'undefined') {
    function loadSvgSymbols() {
    const body = document.body
    let container = document.getElementById('${opts.containerId}')
    if (!container) {
     container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
     container.id = ${opts.containerId};
     container.style.display = 'none';
     container.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
     }
     container.innerHTML = ${insertHTML}
     ${domInject(opts.inject)}}
     }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadSvgSymbols);
    } else {
      loadSvgSymbols()
    }
  }
  `

  return {
    code: `${code}\nexport default {}`,
    idSet: `export default ${JSON.stringify(Array.from(idSet))}`
  }
}


function domInject(inject: DOMInject = 'body-first') {
  switch (inject) {
    case 'body-first':
      return 'body.insertBefore(container, body.firstChild);'
    default:
      return 'body.insertBefore(container, body.lastChild);'
  }
}




// const svgModules = import.meta.glob(iconDir, {
//   // as: 'raw',
//   query: '?raw',
//   import: 'default',
//   eager: true
// });



/**
 * Extracts directory and file name from a path
 * @param name Full path
 * @returns Object containing fileName and dirName
 */
function discreteDir(path: string) {
  const normalizedPath = path.replace(/\\/g, '/');
  if (!normalizedPath.includes('/')) {
    return {
      fileName: normalizedPath,
      dirName: '',
    };
  }
  const segments = normalizedPath.split('/');
  const fileName = segments.pop();
  const dirName = segments.join('-');
  return { fileName, dirName }
}


function createSymbolId(name: string, options: LoadSvgSymbolsOptions) {
  const { symbolId } = options

  let id = symbolId
  const { fileName = '', dirName } = discreteDir(name);
  if (symbolId!.includes('[icon-set]')) {
    id = id!.replace(/\[icon-set\]/g, dirName)
    if (!dirName) {
      id = id.replace(':', '')
    }
  }
  id = id!.replace(/\[icon-name\]/g, fileName)


  const lastDotIdx = fileName.lastIndexOf('.');

  const extname = lastDotIdx < 0 ? '' : fileName.slice(lastDotIdx)

  return id.replace(extname, '')
}



function createSvgContainer(containerId: string): SVGElement {
  const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  container.id = containerId;
  container.style.display = 'none';
  container.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  return container;
}

// 方案2: 使用 DOMParser 安全解析 SVG 内容
function parseSvgContent(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  // 检查是否存在解析错误
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new Error('Invalid SVG content');
  }
  return doc;
}

// 主要的注入函数

export async function injectSvgSymbols(iconDirs: string | string[], overrides?: Omit<LoadSvgSymbolsOptions, 'iconDirs'>)
export async function injectSvgSymbols(overrides: LoadSvgSymbolsOptions)
export async function injectSvgSymbols(iconDirsOrOverrides: string | string[] | LoadSvgSymbolsOptions, overrides?: Omit<LoadSvgSymbolsOptions, 'iconDirs'>) {

  const rawOpts =
    Array.isArray(iconDirsOrOverrides) || typeof iconDirsOrOverrides === 'string'
      ? { ...overrides, iconDirs: iconDirsOrOverrides }
      : iconDirsOrOverrides;


  if (typeof rawOpts.iconDirs === 'string') {
    rawOpts.iconDirs = [rawOpts.iconDirs];
  }



  // Combine defaults with user-provided options (overrides)
  const opts = Object.assign(
    {},
    loadSvgSymbolsOptionsDefaults,
    rawOpts
  ) as Required<LoadSvgSymbolsOptions>;




  try {
    // 1. 首先生成代码
    const { insertHTML } = await compileIcons(opts);



    // 3. 创建或获取容器
    let container: SVGElement | null = document.getElementById(
      opts.containerId
    ) as SVGElement | null;
    if (!container) {
      container = createSvgContainer(opts.containerId);
    }

    container.innerHTML = insertHTML;


    // 5. 根据注入位置将容器添加到文档中
    const body = document.body;
    if (opts.inject === 'body-first') {
      body.insertBefore(container, body.firstChild);
    } else {
      body.insertBefore(container, body.lastChild)
    }

    return container;
  } catch (error) {
    console.error('Failed to inject SVG symbols:', error);
    throw error;
  }
}

// 使用方式
export function initializeSvgSymbols(options) {
  if (typeof window === 'undefined') return;

  const handler = () => injectSvgSymbols(options);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handler);
  } else {
    handler();
  }
}









// function extractSymbolId(files: FileEntry[]) {

//   const symbols: string[] = [];

//   Object.entries(files).forEach(([path, content]) => {

//     const parser = new DOMParser();
//     const svgDoc = parser.parseFromString(content as string, 'image/svg+xml');

//     svgDoc.querySelectorAll('symbol').forEach(symbol => {
//       symbol.setAttribute('aria-hidden', 'true');
//       if (!symbol.id) {
//         const relativeName = normalizePath(path).replace(normalizePath(dir + '/'), '')
//         symbol.setAttribute('id', symbolId);
//       } else {
//         /**
//          * @see https://javascript.info/regexp-lookahead-lookbehind
//          * 
//          * Pattern	type	matches
//          * X(?=Y)	Positive lookahead	X if followed by Y
//          * X(?!Y)	Negative lookahead	X if not followed by Y
//          * (?<=Y)X	Positive lookbehind	X if after Y
//          * (?<!Y)X	Negative lookbehind	X if not after Y
//          */
//         // non-catch group (?:)
//         // const [registerName] = symbol.id.match(/(?<=(--|^))[^-]+/) ?? [];
//         const setPrefix = symbol.id.indexOf('--');
//         const registerName = setPrefix > 0 ? symbol.id.slice(setPrefix + 2) : symbol.id;
//         symbol.setAttribute('id', 'v--' + registerName);
//       }
//       symbols.push(symbol.outerHTML);
//     });

//   });

//   return symbols.join('');

// }