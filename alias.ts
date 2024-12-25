import {resolve} from 'node:path'


function r(p:string):string {
  return resolve(__diranme, p)
}


export const alias: Record<string,string> = {
  '@bdc/file-download': r('./packages/file-download/src/')
  
}