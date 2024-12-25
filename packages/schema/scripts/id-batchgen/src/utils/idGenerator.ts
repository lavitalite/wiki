#!/usr/bin/env node




export function genId(prefix: string, length:number =32):string{
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randPart = Array.from({length}, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  )
  return `${prefix}-${randPart}`
}



