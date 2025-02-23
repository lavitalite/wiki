import path from 'node:path'
import fs from 'node:fs'

import { defineLoader } from 'vitepress'

type FileData = {
  path: string
  content: any
}

export interface Data {
  files: FileData[]
}

declare const data: Data
export { data }

export default defineLoader({
  // data from local files  
  watch: ['./data/*.{csv,json}'],
  async load(watchedFiles): Promise<Data> {
    const files = await Promise.all(
      watchedFiles.map(async (filepath) => {
        const ext = path.extname(filepath)
        try {
          const content = await fs.promises.readFile(filepath, 'utf-8')
          let parsedContent
          switch (ext) {
            case '.json':
              parsedContent = JSON.parse(content)
              break
          }

          return {
            path: filepath,
            content: parsedContent
          }

        } catch (err) {
          console.error(`Error processing file ${filepath}:`, err)
          return {
            path: filepath,
            content: null,
            error: err.message
          }
        }

      })
    )
    return {
      files: files.filter(file => file.content !== null)
    }
  }
})
