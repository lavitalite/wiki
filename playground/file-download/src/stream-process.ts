import { DownloadError } from "./src/error";
import { ProgressTracker } from "./process-tracker";

export class StreamProcessor {
  constructor(private abortController: AbortController){}

  async process(
    body: ReadableStream<Uint8Array>,
    progressTracker: ProgressTracker,
  ):Promise<void>{
    const reader = body.getReader()

    try {
      while(true){
        const {done,value} = await reader.read()
        if(done) break;

        const signal = this.abortController.signal
        if(signal.aborted){
          throw DownloadError.abort(signal.reason)
        }
        progressTracker.update(value.length)
      }
    } finally {
      reader.releaseLock()
    }
  }
}