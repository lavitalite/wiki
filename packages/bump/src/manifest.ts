// import { createRequire } from 'node:module'


// const require = createRequire(import.meta.url);

// export const manfest from '../package.json'

export interface Manifest {
  name: string;
  version: string;
  description: string;
  [key: string]: unknown;
}


/**
 * Determines whether the specified value is a package manifest.
 * 
 * @api public
 */
export function isManifest(obj: any): obj is Manifest {
  return obj !== null &&
    typeof obj === 'object' &&
    isOptionalString(obj.name) &&
    isOptionalString(obj.version) &&
    isOptionalString(obj.description);
}



/**
 * Determines whether is expected value
 * 
 * @api private
 */
function isOptionalString(value: unknown): value is string | null | undefined {
  let type = typeof value
  return value === null ||
    type === 'undefined' ||
    type === 'string';
}

export const manifest: Manifest = require('../package.json');