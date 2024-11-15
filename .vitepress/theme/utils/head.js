/**
 * create `<meta property=""` head entry
 * @returns ['meta', {property: string, content: string}]
 */

export const metaProperty = (property, content) => metaTag({property, content})



export const metaName = (property, name) => metaTag({name, content })


const metaTag = attrs => attrs.content ? ['meta', attrs] : []