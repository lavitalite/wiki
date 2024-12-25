import { DownloadErrorType } from "../types";


export class DownloadError extends Error {
  constructor(
    public type: DownloadErrorType,
    message: string,
    public status?: number
  ){
      super(message)
      this.name = 'DownloadError'
  }

  static timeout(): DownloadError {
    return new DownloadError(
      DownloadErrorType.TIMEOUT,
      'Download timeout exceed'
    )
  }

  static abort(reason:string): DownloadError {
    return new DownloadError(
      DownloadErrorType.ABORT,
      `Download aborted${reason ? `: ${reason}` : ''}`
    )
  }
  static http(stauts:number): DownloadError {
    return new DownloadError(
      DownloadErrorType.HTTP,
      `HTTP error: ${stauts}`
    )
  }

  static network(message: string){
    return new DownloadError(
      DownloadErrorType.NETWORK,
      message
    )
  }
}