import fs from 'fs'
import path from 'path'

export function toRandDir(baseDir) {
  const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => !dirent.name.startsWith('.'))
    .map(dirent => dirent.name)

  return dirs[Math.floor(Math.random() * dirs.length)]
}