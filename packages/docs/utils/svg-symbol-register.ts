/// <reference types="vite/client" />
import fg from 'fast-glob';


export type DOMInject = 'body-first' | 'body-last'

interface LoadSvgSymbolsOptions {
  /**
   * icons folder, all svg files in it will be converted to svg sprite.
   */
  iconDirs: string[]
  /**
   * id format
   * @default: [set]:[name]
  */
  symbolId?: string
  /**
   * icon format
   * @default: body-first
  */
  inject?: DOMInject
  // idTemplate?: string
}

interface FileStats {
  mtimeMs: number;
  path: string;
  symbolId: string;
  code: string;
}


const DEFAULT_ID_TEMPLATE = '[set]:[name]'


/**
 * Creates an SVG container element
 * @returns SVG element to hold symbols
 */
function createSymbolContainer(): SVGElement {
  const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  container.id = 'svg-symbol-container';
  container.style.display = 'none';
  container.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  return container;
}


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


function createSymbolId(relPath: string, template: string) {

  let id = template
  const { fileName, dirName } = discreteDir(relPath);
  if (template.includes('[set]')) {
    id = id.replace(/\[set\]/g, dirName)
    if (!dirName) {
      id = id.replace(':', '')
    }
  }
  id = id.replace(/\[name\]/g, fileName)


  const lastDotIdx = id.lastIndexOf('.');

  const extname = lastDotIdx < 0 ? '' : id.slice(lastDotIdx)

  return id.replace(extname, '')
}

function normalizePath(path: string) {
  return path.replace(/\\/g, '/');
}


const cache = new Map<string, FileStats>()

function compileIcon(
  iconDir: string,
) {

  const iconFiles = fg.sync('**/*.svg', {
    cwd: iconDir,
    absolute: true,
  })
}






function loadSvgSymbols(iconDir: string, options: LoadSvgSymbolsOptions = {}) {


  const { injectPos = 'body-first', idTemplate = '__icon--[set]:[name]' } = options;

  if (!iconDir) {
    throw new Error('iconDir is required');
  }


  if (document.getElementById('svg-symbol-container')) {
    console.warn('SVG symbols have already been loaded.');
    return;
  }



  const symbolContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  symbolContainer.id = 'svg-symbol-container';
  symbolContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");


  // 利用 import.meta.glob 动态导入所有SVG文件
  const svgModules = import.meta.glob(iconDir, {
    // as: 'raw',
    query: '?raw',
    import: 'default',
    eager: true
  });
  const symbols: string[] = [];

  Object.entries(svgModules).forEach(([path, content]) => {

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(content as string, 'image/svg+xml');

    svgDoc.querySelectorAll('symbol').forEach(symbol => {
      symbol.setAttribute('aria-hidden', 'true');
      if (!symbol.id) {
        const relativeName = normalizePath(path).replace(normalizePath(dir + '/'), '')
        const symbolId = createSymbolId(relativeName, options)
        symbol.setAttribute('id', symbolId);
      } else {
        /**
         * @see https://javascript.info/regexp-lookahead-lookbehind
         * 
         * Pattern	type	matches
         * X(?=Y)	Positive lookahead	X if followed by Y
         * X(?!Y)	Negative lookahead	X if not followed by Y
         * (?<=Y)X	Positive lookbehind	X if after Y
         * (?<!Y)X	Negative lookbehind	X if not after Y
         */
        // non-catch group (?:)
        // const [registerName] = symbol.id.match(/(?<=(--|^))[^-]+/) ?? [];
        const setPrefix = symbol.id.indexOf('--');
        const registerName = setPrefix > 0 ? symbol.id.slice(setPrefix + 2) : symbol.id;
        symbol.setAttribute('id', 'v--' + registerName);
      }
      symbols.push(symbol.outerHTML);
    });

  });

  symbolContainer.innerHTML = symbols.join('');

  document.body.insertAdjacentElement(injectPos, symbolContainer);
}


// '../assets/*.svg'

export function createSvgIconsPlugin(opt) {
  let isBuild = false
  return {
    name: 'vite:svg-icons',
    configResolve(resolvedConfig) {
      isBuild = resolvedConfig.command === 'build'
      debug('resolvedConfig:', resolvedConfig)
    },
    async load(id, ssr) {
      const isRegister = id.endsWith('virtual:svg-icons-register')
      const isClient = id.endsWith('virtual:svg-icons-names')

      if (ssr && !isBuild && (isRegister || isClient)) {
        return `export default {}`
      }
    },
    configureServer: ({ middlewares, config }) => {
      const isSSR = !!config.build?.ssr



    }
  }
}


export function loadSvgSymbols(iconDirs: string[], options: LoadSvgSymbolsOptions = {}): void {

  const cache = new Map<string, FileStats>();
  const {
    symbolId = DEFAULT_ID_TEMPLATE,
    inject = 'body-first'
  } = options

  let isBuild = false;

  if (!symbolId.includes('[name]')) {
    throw new Error('SymbolId must contain [name] string!')
  }

  if (isSSR && !isBuild) {
    return `export default {}`
  }



  const registerSymbols = () => loadSvgSymbols(iconDirs, options);

  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', registerSymbols);
    } else {
      registerSymbols();
    }
  }
}

const options = {
  svgoOptions: true,
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-last' as const,
}





/**
 * !Important
 * i change my mind
 * all symbol id should be like [icon-set]:[icon-name]
 * mabye svg file has symbol id  `mdi-globe-shield` -> `mdi:globe-shield`
 * if not have id just change it to `dir:filename`
 */


