export class TimeoutManager {
  private timeoutId?: NodeJS.Timeout
  constructor(
    private timeoutMs: number,
    private abortController: AbortController
  ){}

  setup():void {
    this.timeoutId = setTimeout(() => {
      this.abortController.abort('timeout')
    }, this.timeoutMs)
  }

  clear(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }
}