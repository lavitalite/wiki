export * from './types'

declare global {
  namespace NodeJS {
    interface Process {
      type?: string;
      browser?: boolean;
      __nwjs?: boolean;
    }
  }
}

// if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
//   module.exports = require('./browser.js');
// } else {
//   module.exports = require('./node.js');
// }



const createDebug = await (async () => {
  if (typeof process === 'undefined' ||
    process.type === 'renderer' ||
    process.browser === true ||
    process.__nwjs) {
    const { default: browserDebug } = await import('./browser.js');
    return browserDebug;
  } else {
    // const { default: nodeDebug } = await import('./node.js');
    // return nodeDebug;
    const { default: browserDebug } = await import('./browser.js');
    return browserDebug;
  }
})();


export default createDebug