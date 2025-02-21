/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 *
 */

exports.inspectOpts =
  Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce <
  Options >
  ((opt, key) => {
    // kabab-case -> camel case
    // val transform process: 'DEBUG_SHOW_HIDDEN'
    // → 'SHOW_HIDDEN'      substring(6)
    // → 'show_hidden'      toLowerCase()
    // → 'showHidden'       replace(/_([a-z])/g)
    const prop = key
      .slice(6)
      .toLowerCase()
      .replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });

    const val = process.env[key];

    if (/^(yes|true|enable)$/i.test(val)) {
      // 双重断言 val = true as unknown as string
      opt[prop] = true;
    } else if (/^(false|disable|no)$/i.test(val)) {
      opt[prop] = false;
    } else if (val === "null") {
      opt[prop] = false;
    } else {
      opt[prop] = +val || 0;
    }
    return opt;
  },
  {});
