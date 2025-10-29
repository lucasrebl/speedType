export interface TimerState {
  startTime: number | null
  elapsedTime: number
  isRunning: boolean
}

export class TimerService {
  private startTime: number | null = null
  private intervalId: number | null = null
  private elapsedTime = 0
  private onTick?: (elapsedTime: number) => void

  constructor(onTick?: (elapsedTime: number) => void) {
    this.onTick = onTick
  }

  start(): void {
    if (this.isRunning()) return

    this.startTime = Date.now()
    this.elapsedTime = 0

    this.intervalId = window.setInterval(() => {
      if (this.startTime) {
        this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000)
        this.onTick?.(this.elapsedTime)
      }
    }, 1000)
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  reset(): void {
    this.stop()
    this.startTime = null
    this.elapsedTime = 0
  }

  getElapsedTime(): number {
    return this.elapsedTime
  }

  isRunning(): boolean {
    return this.intervalId !== null
  }

  getState(): TimerState {
    return {
      startTime: this.startTime,
      elapsedTime: this.elapsedTime,
      isRunning: this.isRunning()
    }
  }

  destroy(): void {
    this.stop()
  }
}