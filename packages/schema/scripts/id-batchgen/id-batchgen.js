#!/usr/bin/env node

const readline = require('readline');


function genId(prefix, length = 32){
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randPart = Array.from({length}, () => 
    chars.charAt( Math.floor(Math.random() * chars.length ))
  ).join('')
  return `{prefix}-${randPart}`
}

const DEFAULT_COUNT = 5


function genDepartmentId(prefix,count = DEFAULT_COUNT){
  for (let i=0; i < count; i++){
    console.log(genId(prefix))
  }
  return genId('0000022')
}

function genUserId(){
  return genId("0000021")
}

async function interactiveMode(){
  const rl = readline.createInterface({
    input: process
  })
}
