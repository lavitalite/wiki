/// <reference types="vite/client" />


const BACKSLASHES = /\\/g;


export type DOMInject = 'body-first' | 'body-last'

interface LoadSvgSymbolsOptions {
  /**
   * icons folder, all svg files in it will be converted to svg sprite.
   * 
   * 
   */
  // iconDirs: string
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
  /**
   * id for container that hold symbols
   */
  containerId?: string
}

interface FileStats {
  mtimeMs: number;
  path: string;
  code: string;
}



interface FileEntry {
  path: string;
  code: string;
}

const loadSvgSymbolsOptionsDefaults: Omit<LoadSvgSymbolsOptions, 'iconDirs'> = {
  symbolId: '[icon-set]:[icon-name]',
  inject: 'body-first',
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


function createSymbolId(relPath: string, opts: Required<LoadSvgSymbolsOptions>): string { //LoadSvgSymbolsOptions) {
  const { symbolId } = opts
  let id = symbolId
  const { fileName = '', dirName } = discreteDir(relPath);
  if (symbolId.includes('[icon-set]')) {
    id = id.replace(/\[icon-set\]/g, dirName)
    if (!dirName) {
      id = id.replace(':', '')
    }
  }
  id = id.replace(/\[icon-name\]/g, fileName)


  const lastDotIdx = id.lastIndexOf('.');


  const extname = lastDotIdx < 0 ? '' : id.slice(lastDotIdx)
  return id.replace(extname, '')
}








async function compileIcons(opts: Required<LoadSvgSymbolsOptions>): Promise<{ insertHTML: string, idSet: Set<string> }> {




  const symbols: string[] = [];
  const idSet = new Set<string>()

  const svgModules = import.meta.glob('/../assets/*.svg', {
    // as: 'raw',
    query: '?raw',
    import: 'default',
    eager: true
  });
  // console.log(svgModules)



  // const _fileEntry: Promise<FileEntry>[] = fg.sync('**/*.svg', {
  //   cwd: dir,
  //   // stats: true,
  //   absolute: true,
  // }).map((path) => {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(path, 'utf-8', (err, code) => {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve({
  //           path,
  //           code
  //         })
  //       }
  //     })
  //   })
  // })
  // const fileEntry = await Promise.all(_fileEntry);


  Object.entries(svgModules).forEach(([path, code]) => {

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(code as string, 'image/svg+xml');

    svgDoc.querySelectorAll('symbol').forEach(symbol => {
      symbol.setAttribute('aria-hidden', 'true');
      if (!symbol.id) {
        const baseDIR = 'assets'
        const relIdx = path.lastIndexOf((baseDIR + '/'))
        const relName = path.slice(relIdx + baseDIR.length)
        const symbolId = createSymbolId(relName, opts)
        console.log(symbolId)
        idSet.add(symbolId)
        symbol.setAttribute('id', 'v--' + symbolId);
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
        const prefixIdx = symbol.id.indexOf('--');
        const registerName = prefixIdx > 0 ? symbol.id.replace(/--/, ':') : symbol.id;
        idSet.add(registerName)
        symbol.setAttribute('id', 'v--' + registerName);
      }
      symbols.push(symbol.outerHTML);
    });

  });

  return { insertHTML: symbols.join(''), idSet: new Set<string>() }

}





// export async function initSvgSymbols(options: LoadSvgSymbolsOptions): Promise<string[]>
// export async function initSvgSymbols(iconDirs: string[] | string, options?: Omit<LoadSvgSymbolsOptions, 'iconDirs'>): Promise<string[]>
export async function initSvgSymbols(rawOpts?: Omit<LoadSvgSymbolsOptions, 'iconDirs'>): Promise<string[]> {


  // const rawOpts =
  //   (typeof iconDirsOrOpts === 'string' || Array.isArray(iconDirsOrOpts))
  //     ? { ...options, iconDirs: iconDirsOrOpts }
  //     : iconDirsOrOpts


  const opts = {
    ...loadSvgSymbolsOptionsDefaults,
    ...rawOpts,
  } as Required<LoadSvgSymbolsOptions>

  const { insertHTML, idSet } = await compileIcons(opts)

  if (typeof window !== 'undefined') {

    function loadSvgSymbols() {
      let container = document.getElementById(opts.containerId) as SVGElement | null;
      if (!container) {
        container = createSymbolContainer();
      }
      container.innerHTML = insertHTML;
      domInject(opts.inject, undefined, container)
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadSvgSymbols);
    } else {
      loadSvgSymbols();
    }
  }

  return Array.from(idSet)
}






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


function domInject(position: DOMInject = 'body-first', body: HTMLBodyElement = document.body as HTMLBodyElement, container: SVGElement) {
  switch (position) {
    case 'body-first':
      return body.insertAdjacentElement("afterbegin", container)
    default:
      return body.insertAdjacentElement("beforeend", container)
  }
}
