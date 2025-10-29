export interface TypingStats {
  wpm: number
  accuracy: number
  errors: number
  timeElapsed: number
  totalKeystrokes: number
}

export interface TestResult {
  stats: TypingStats
  completed: boolean
}

export class StatsService {
  static calculateWPM(userInput: string, elapsedTimeInSeconds: number): number {
    if (elapsedTimeInSeconds === 0) return 0
    
    const minutes = elapsedTimeInSeconds / 60
    const words = userInput.trim().split(/\s+/).length
    return Math.round(words / minutes)
  }

  static calculateAccuracy(totalKeystrokes: number, errors: number): number {
    if (totalKeystrokes === 0) return 100
    return Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100)
  }

  static calculateProgress(userInput: string, targetSentence: string): number {
    if (!targetSentence) return 0
    return Math.min((userInput.length / targetSentence.length) * 100, 100)
  }

  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  static getPerformanceMessage(wpm: number, accuracy: number): string {
    if (accuracy < 70) {
      return "Concentrez-vous sur la précision avant la vitesse ! 📝"
    } else if (wpm < 20) {
      return "Bon début ! Continuez à pratiquer pour améliorer votre vitesse. 🌱"
    } else if (wpm < 40) {
      return "Bonne progression ! Vous êtes sur la bonne voie. 👍"
    } else if (wpm < 60) {
      return "Excellent travail ! Vous tapez plus vite que la moyenne. ⭐"
    } else {
      return "Incroyable ! Vous êtes un véritable expert de la frappe ! 🏆"
    }
  }

  static createTestResult(
    wpm: number,
    accuracy: number,
    errors: number,
    timeElapsed: number,
    totalKeystrokes: number,
    completed: boolean
  ): TestResult {
    return {
      stats: {
        wpm,
        accuracy,
        errors,
        timeElapsed,
        totalKeystrokes
      },
      completed
    }
  }
}