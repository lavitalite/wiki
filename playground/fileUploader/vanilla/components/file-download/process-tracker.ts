import type { DownloadProgress } from "./types"


export class ProgressTracker {
  private loaded = 0
  private total: number

  constructor(
    private onProgress?:(progress: DownloadProgress) => void,
    contentLength?: string | null
  ){
    this.total = contentLength ? parseInt(contentLength, 10) : null
  }



  update(chunkSize: number):void {
    this.loaded += chunkSize
    this.notifyProgress()
  }

  getProgress():DownloadProgress {
    return {
      loaded:this.loaded,
      total: this.total
    }
  }

  private notifyProgress(): void {
    this.onProgress?.({
      loaded: this.loaded,
      total: this.total
    })
  }
}