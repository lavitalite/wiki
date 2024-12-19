import { DownloadError } from "./error"
import { ProgressTracker } from "./process-tracker"
import { StreamProcessor } from "./stream-process"
import { TimeoutManager } from "./timeout-manager"
import { DownloadOptions } from "./types"

export class FileDownloader {
  private controller: AbortController
  
  constructor(){
    this.controller = new AbortController()
  }


  async download(
    url: string | Request,
    options: DownloadOptions = {}
  ):Promise<void>{
      const {timeout, headers = {}} = options
      const timeoutMgr = new TimeoutManager(timeout,this.controller)
      timeoutMgr.setup()

      try {
        const response = await fetch(url, {
          signal: this.controller.signal,
          headers
        })

        if(!response.ok){
          throw DownloadError.http(response.status)
        }

        if(!response.body) {
          throw DownloadError.network('Response body is null')
        }

        const progressTracker = new ProgressTracker(
          options.onProgress,
          response.headers.get('content-length')
        )
        
        const streamProcessor = new StreamProcessor(this.controller)
        await streamProcessor.process(response.body, progressTracker)


      }catch (err) {
        if(err instanceof DownloadError) {
          throw err
        } 

        if(err.name === 'AbortError'){
            throw DownloadError.abort(err.message)
        }
        throw DownloadError.network(err.message)
      } finally {
        timeoutMgr.clear()
      }
  }

  cancel(reason?: string): void {
    this.controller.abort(reason)
  }
}