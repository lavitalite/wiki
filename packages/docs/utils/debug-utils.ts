/**
 * Colors.
 */

exports.colors = [
  '#0000CC',
  '#0000FF',
  '#0033CC',
  '#0033FF',
  '#0066CC',
  '#0066FF',
  '#0099CC',
  '#0099FF',
  '#00CC00',
  '#00CC33',
  '#00CC66',
  '#00CC99',
  '#00CCCC',
  '#00CCFF',
  '#3300CC',
  '#3300FF',
  '#3333CC',
  '#3333FF',
  '#3366CC',
  '#3366FF',
  '#3399CC',
  '#3399FF',
  '#33CC00',
  '#33CC33',
  '#33CC66',
  '#33CC99',
  '#33CCCC',
  '#33CCFF',
  '#6600CC',
  '#6600FF',
  '#6633CC',
  '#6633FF',
  '#66CC00',
  '#66CC33',
  '#9900CC',
  '#9900FF',
  '#9933CC',
  '#9933FF',
  '#99CC00',
  '#99CC33',
  '#CC0000',
  '#CC0033',
  '#CC0066',
  '#CC0099',
  '#CC00CC',
  '#CC00FF',
  '#CC3300',
  '#CC3333',
  '#CC3366',
  '#CC3399',
  '#CC33CC',
  '#CC33FF',
  '#CC6600',
  '#CC6633',
  '#CC9900',
  '#CC9933',
  '#CCCC00',
  '#CCCC33',
  '#FF0000',
  '#FF0033',
  '#FF0066',
  '#FF0099',
  '#FF00CC',
  '#FF00FF',
  '#FF3300',
  '#FF3333',
  '#FF3366',
  '#FF3399',
  '#FF33CC',
  '#FF33FF',
  '#FF6600',
  '#FF6633',
  '#FF9900',
  '#FF9933',
  '#FFCC00',
  '#FFCC33'
];

function formatDiff(diff: number): string {
  return diff < 1000 ? `+${diff}ms` : `+${Math.round(diff / 1000)}s`;
}


function setup(env) {
  createDebug.debug = createDebug;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.disable = disable;


  Object.keys(env).forEach(key => {
    createDebug[key] = env[key]
  })

  createDebug.names = [];
  createDebug.skips = [];



  function createDebug(namespace: string) {

    let enableOverride = null;
    let namespacesCache;
    let enabledCache;

    function debug(...args) {
      if (!debug.enabled) {
        return
      }

      const self = debug;
      self.curr = Number(new Date())
      self.diff = self.curr - (self.prev || self.curr)
      self.prev = self.curr

      let index = 0
      args[0] = args[0].replace(/%(a-zA-z%])/, (match, format) => {

        if (match === '%%') {
          return '%%';
        }

        let index++;
        const formatter = createDebug.formatters[format]
        if (typeof formatter === 'function') {
          const val = args[index]
          const match = formatter.call(self, val)
          args.splice(index, 1)
          index--
        }
        return match
      })


      // Apply env-specific formatting (colors, etc.)
      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;

      logFn.apply(self, args)
    }


    /**
     * 正常情况下，enabled基于命名空间匹配规则
     * 但有时我们需要临时强制启用某个特定实例 dbDebug.enabled = true;
     */
    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          // cache if ns  not change 
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }

        return enabledCache;
      },
      set: v => {
        enableOverride = v;
      }
    });

    return debug

  }


  /**
   * enable debug by namespace - [mod:feat],[mod:feat], separated by comma
   * enable('app:* -app:db');
   *  const prefix = `%c${namespace} %c${args[0]} %c${timeDiff}`;
   */

  function enable(namespaces: string) {

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
    if (createDebug.skips.some(regex => regex.test(namespace))) return false
    return createDebug.names.some(regex => regex.test(namespace))
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

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;

  return createDebug
}

// module.exports = setup;
// module.exports = require('./common')(exports); setup(exports)
// const {formatters} = module.exports;



const debug = setup(env)





debug.formatters.j = function (v) {
  try {
    return JSON.stringify(v)
  } catch (error) {
    return '[UnexpectedJSONParseError:' + error.message
  }
}





/**
 * 
 * Usage :
 * 
 * debug exposes a function;
enable(namespaces)
namespaces can include modes separated by a colon and wildcards.

Note that calling enable() completely overrides previously set DEBUG variable :


你可以配置 debug cli argument
"dev:debug": "DEBUG=vite:debug-alias,vite:resolve,vite:config,vite:* vitepress dev ",



In Chromium-based web browsers (e.g. Brave, Chrome, and Electron), the JavaScript console will—by default—only show messages logged by debug if the "Verbose" log level is enabled.


Debug's enable state is currently persisted by localStorage. Consider the situation shown below where you have worker:a and worker:b, and wish to debug both. You can enable this using localStorage.debug:

localStorage.debug = 'worker:*'


Custom formatters
You can add custom formatters by extending the debug.formatters object. For example, if you wanted to add support for rendering a Buffer as hex with %h, you could do something like:

const createDebug = require('debug')
createDebug.formatters.h = (v) => {
  return v.toString('hex')
}

// …elsewhere
const debug = createDebug('foo')
debug('this is hex: %h', new Buffer('hello world'))
//   foo this is hex: 68656c6c6f20776f726c6421 +0ms

%O	Pretty-print an Object on multiple lines.
%o	Pretty-print an Object all on a single line.


Environment Variables
When running through Node.js, you can set a few environment variables that will change the behavior of the debug logging:

Name	Purpose
DEBUG	Enables/disables specific debugging namespaces.
DEBUG_HIDE_DATE	Hide date from debug output (non-TTY).
DEBUG_COLORS	Whether or not to use colors in the debug output.
DEBUG_DEPTH	Object inspection depth.
DEBUG_SHOW_HIDDEN	Shows hidden properties on inspected objects.
Note: The environment variables beginning with DEBUG_ end up being converted into an Options object that gets used with %o/%O formatters. See the Node.js documentation for util.inspect() for the complete list.


 */


/**
 * Wildcards
The * character may be used as a wildcard. Suppose for example your library has debuggers named "connect:bodyParser", "connect:compress", "connect:session", instead of listing all three with DEBUG=connect:bodyParser,connect:compress,connect:session, you may simply do DEBUG=connect:*, or to run everything using this module simply use DEBUG=*.

You can also exclude specific debuggers by prefixing them with a "-" character. For example, DEBUG=*,-connect:* would include all debuggers except those starting with "connect:".


 */


/**
 * 
 * Conventions
If you're using this in one or more of your libraries, you should use the name of your library so that developers may toggle debugging as desired without guessing names. If you have more than one debuggers you should prefix them with your library name and use ":" to separate features. For example "bodyParser" from Connect would then be "connect:bodyParser". If you append a "*" to the end of your name, it will always be enabled regardless of the setting of the DEBUG environment variable. You can then use it for normal output as well as debug output.


Millisecond diff
When actively developing an application it can be useful to see when the time spent between one debug() call and the next. Suppose for example you invoke debug() before requesting a resource, and after as well, the "+NNNms" will show you how much time was spent between calls.

在开发时启用特定模块的调试输出还有点用
enable('app:db'); // 只看数据库相关日志
举例解释源码中设计与实现流程


Web Browser
Colors are also enabled on "Web Inspectors" that understand the %c formatting option. These are WebKit web inspectors, Firefox (since version 31) and the Firebug plugin for Firefox (any version
 */
