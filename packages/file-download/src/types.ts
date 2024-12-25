export interface DownloadProgress {
  loaded: number;
  total: number | null;
}

export interface DownloadOptions {
  onProgress?: (progress: DownloadProgress) => Promise<void>
  timeout?: number;
  headers?: Record<string,string>
}

export enum DownloadErrorType {
  TIMEOUT = 'TIMEOUT',
  ABORT = 'ABORT',
  HTTP = 'HTTP',
  NETWORK = 'NETWORK'
}
