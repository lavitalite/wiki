/**
 * create  head entry 
 * @example <link rel="icon" href="/favicon.svg" type="image/svg+xml">
 * @example <meta property="og:type" content="website">
 * @returns ['meta', {property: string, content: string}]
 */

import type { HeadConfig } from "vitepress"

// type HeadConfig = 
//   | [string, MetaTagAttributes] 
//   | [string, MetaTagAttributes, string?]

type MetaTagAttributes = Record<string, string | undefined>




const meataTag = (attrs: MetaTagAttributes ): HeadConfig => {
  // filter out attrs with undefined
  const filteredAttrs = Object.fromEntries(
    Object.entries(attrs).filter( ([_,val]) => val !== undefined)
  ) as Record<string, string>


  // only return a conifg if content is present
  return Object.keys(filteredAttrs).length > 0
    ? ['meta' as const , filteredAttrs]
    : ['meta', {}]
}


export const metaProperty = (
  propety: string,
  content: string
): HeadConfig => meataTag({propety,content})



export const metaName = (
  name: string,
  content: string
): HeadConfig  => meataTag({name,content})


export const linkTag = (
  rel:string,
  attrs: Omit<MetaTagAttributes ,'rel'> 
): HeadConfig => ['link' as const, {rel, ...attrs}]
