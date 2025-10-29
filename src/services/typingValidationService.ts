export interface TypingValidation {
  hasError: boolean
  errorPosition: number
  isComplete: boolean
}

export class TypingValidationService {
  static validateInput(userInput: string, targetSentence: string): TypingValidation {
    let hasError = false
    let errorPosition = -1

    // Créer une version "nettoyée" pour la validation
    const cleanUserInput = this.cleanSpaces(userInput)
    const cleanTarget = this.cleanSpaces(targetSentence)

    // Vérifier chaque caractère sur les chaînes nettoyées
    for (let i = 0; i < cleanUserInput.length; i++) {
      if (i >= cleanTarget.length) {
        // L'utilisateur tape plus que nécessaire
        hasError = true
        errorPosition = i
        break
      }

      if (cleanUserInput[i] !== cleanTarget[i]) {
        hasError = true
        errorPosition = i
        break
      }
    }

    // Le test est terminé si la phrase entière nettoyée est tapée
    const isComplete = cleanUserInput === cleanTarget

    return {
      hasError,
      errorPosition,
      isComplete
    }
  }

  // Fonction pour nettoyer les espaces (transforme les espaces multiples en espaces simples)
  static cleanSpaces(text: string): string {
    return text.replace(/\s+/g, ' ').trim()
  }

  static getCharacterStatus(
    charIndex: number,
    userInput: string,
    targetSentence: string
  ): 'pending' | 'correct' | 'error' {
    if (charIndex >= userInput.length) {
      return 'pending'
    }

    // Si on a déjà dépassé la phrase cible
    if (charIndex >= targetSentence.length) {
      return 'error'
    }

    const userChar = userInput[charIndex]
    const expectedChar = targetSentence[charIndex]

    // Traitement spécial pour les espaces
    if (expectedChar === ' ') {
      // Si l'utilisateur tape n'importe quel type d'espace, c'est correct
      if (userChar && /\s/.test(userChar)) {
        return 'correct'
      } else {
        return 'error'
      }
    }

    // Pour les autres caractères, comparaison exacte
    if (userChar === expectedChar) {
      return 'correct'
    } else {
      return 'error'
    }
  }

  static countErrors(userInput: string, targetSentence: string): number {
    let errors = 0

    // Nettoyer les espaces multiples
    const cleanUserInput = this.cleanSpaces(userInput)
    const cleanTarget = this.cleanSpaces(targetSentence)

    for (let i = 0; i < cleanUserInput.length; i++) {
      if (i >= cleanTarget.length || cleanUserInput[i] !== cleanTarget[i]) {
        errors++
      }
    }

    return errors
  }

  static shouldPreventKeyboard(event: KeyboardEvent): boolean {
    // Empêcher les raccourcis clavier qui pourraient fausser le test
    if (event.ctrlKey || event.metaKey) {
      const forbiddenKeys = ['a', 'c', 'v', 'x', 'z', 'y']
      return forbiddenKeys.includes(event.key.toLowerCase())
    }
    return false
  }

  static isTestCompletedByEndPunctuation(userInput: string, targetSentence: string): boolean {
    // Vérifier si l'utilisateur a tapé le point final et que la phrase se termine par un point
    if (!targetSentence.endsWith('.') || userInput.length === 0) {
      return false
    }

    const lastChar = userInput[userInput.length - 1]
    if (lastChar !== '.') {
      return false
    }

    // Vérifier que tout ce qui a été tapé jusqu'au point est correct
    const userInputUpToPoint = userInput.substring(0, userInput.length)
    const targetUpToPoint = targetSentence.substring(0, userInput.length)
    
    return userInputUpToPoint === targetUpToPoint
  }
}