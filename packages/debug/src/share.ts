


import type { Env, CreateDebugFn, DebugInstance } from './types';
import humanize from 'ms'

/**
 * 
 * 
 * 
 * 

export transform

name export

// esm
export const name = 'debug';
export function log() {}

// cjs
const name = 'debug';
function log() {}
module.exports = {
  name,
  log
};


default export

// esm
export default function debug() {}

// cjs
function debug() {}
module.exports = debug;
module.exports.default = debug; // ts added


import transform


// esm
import debug from './debug';
import { log } from './debug';
import * as dbns from './debug';
const debug = await import('./debug');
// cjs
const debug = require('./debug').default;
const { log } = require('./debug');
const dbns = require('./debug');
const debug = require('./debug');



be default
a namespace import like import * as moment from "moment" acts the same as const moment = require("moment")

a default import like import moment from "moment" acts the same as const moment = require("moment").default


ES6 modules spec states that a namespace import (import * as x) can only be an object,
treating a namespace import like import * as moment from "moment" acts the same as const moment = require("moment")
which allowed for the import to be treated as a function and be callable

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

 */


// function formatDiff(diff: number): string {
//   return diff < 1000 ? `+${diff}ms` : `+${Math.round(diff / 1000)}s`;
// }


export default function setup(env: Env): CreateDebugFn {





  const createDebug = function (namespace: string): DebugInstance {

    let enableOverride: boolean | null = null;
    let namespacesCache: string | undefined;
    let enabledCache: boolean | undefined;

    const debug = function (...args: any[]): void {
      if (!debug.enabled) {
        return
      }

      const self: DebugInstance = debug;
      self.curr = Number(new Date())
      self.diff = self.curr - (self.prev || self.curr)
      self.prev = self.curr

      let index = 0
      args[0] = args[0].replace(/%(a-zA-z%])/, (match: string, format: string) => {

        if (match === '%%') {
          return '%%';
        }

        index++;
        const formatter = createDebug.formatters[format]
        if (typeof formatter === 'function') {
          const val = args[index]
          match = formatter.call(self, val)
          args.splice(index, 1)
          index--
        }
        return match
      })


      // Apply env-specific formatting (colors, etc.)
      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;

      logFn.apply(self, args)
    } as DebugInstance;


    /**
     * 正常情况下，enabled基于命名空间匹配规则
     * 但有时我们需要临时强制启用某个特定实例 dbDebug.enabled = true;
     */
    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: (): boolean => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          // cache if ns  not change 
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }

        return !!enabledCache;
      },
      set(v: boolean): void {
        enableOverride = v;
      }
    });

    return debug as DebugInstance

  } as CreateDebugFn


  createDebug.debug = createDebug;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.disable = disable;
  createDebug.humanize = humanize

  // copy env to createDebug factory

  Object.keys(env).forEach(key => {
    createDebug[key] = env[key]
  })

  createDebug.names = [] as string[];
  createDebug.skips = [] as string[];

  /**
  * Checks if the given string matches a namespace template, honoring
  * asterisks as wildcards.
  * 
  * * greedy match 
  * h*leo matches 'hleo' 'hewleo' 'hewleqwleo'
  * 
  * @example <caption>Exact Match</caption>
  * @example <caption>Leading Wildcard</caption>
  * @example <caption>Trailing Wildcard</caption>  
  * @example <caption>In Between Wildcard</caption>
  * @example <caption>Multiple Wildcards</caption>
  * matchesTemplate("hello", "*l*o") // => true
  */
  function matchesTemplate(search: string, template: string): boolean {
    let searchIndex = 0;
    let templateIndex = 0;
    let starIndex = -1;
    let matchIndex = 0;

    while (searchIndex < search.length) {
      if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
        // Match character or proceed with wildcard
        if (template[templateIndex] === '*') {
          starIndex = templateIndex;
          matchIndex = searchIndex;
          templateIndex++; // Consecutive asterisks '****'
        } else {
          searchIndex++;
          templateIndex++;
        }
      } else if (starIndex !== -1) {
        // Backtrack to the last '*' and try to match more characters
        templateIndex = starIndex + 1;
        matchIndex++;
        searchIndex = matchIndex;
      } else {
        return false; // No match
      }
    }

    // Handle trailing '*' in template
    // @example matchTemplate('hello, 'hello*')
    while (templateIndex < template.length && template[templateIndex] === '*') {
      templateIndex++;
    }

    return templateIndex === template.length;
  }



  /**
   * enable debug by namespace - [mod:feat],[mod:feat], separated by comma
   * enable('app:* -app:db');
   *  const prefix = `%c${namespace} %c${args[0]} %c${timeDiff}`;
   */

  function enable(namespaces: string): void {

    createDebug.namespaces = namespaces;

    createDebug.names = [];
    createDebug.skips = [];

    const split = namespaces.trim().split(/[\s+,]/).filter(Boolean)

    for (const ns of split) {
      if (ns.startsWith('-')) {
        createDebug.skips.push(ns.slice(1))
      } else {
        createDebug.names.push(ns)
      }
    }
    createDebug.namespaces = [
      ...createDebug.names,
      ...createDebug.skips.map(namespace => '-' + namespace)
    ].join(',');
  }

  function enabled(namespace: string): boolean {
    for (const skip of createDebug.skips) {
      if (matchesTemplate(namespace, skip)) {
        return false;
      }
    }

    for (const ns of createDebug.names) {
      if (matchesTemplate(namespace, ns)) {
        return true;
      }
    }

    return false
  }

  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */

  function disable() {
    const namespaces = [
      ...createDebug.names,
      ...createDebug.skips.map(namespace => '-' + namespace)
    ].join(',');
    createDebug.enable('');
    return namespaces;
  }

  createDebug.formatters = {};

  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace: string) {
    let hash = 0;

    for (let i = 0; i < namespace.length; i++) {
      hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // truncate to 32 bit integer
    }

    return createDebug.spectrum[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;

  createDebug.enable(createDebug.load() ?? '');

  return createDebug
}




// module.exports = setup



