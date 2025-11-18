import { ref, computed, watch, onUnmounted } from 'vue'
import { SentenceService, type Sentence } from '@/services/sentenceService'
import { StatsService, type TestResult } from '@/services/statsService'
import { TypingValidationService } from '@/services/typingValidationService'
import { TimerService } from '@/services/timerService'

export const useTypingTest = () => {
  // État du test
  const isActive = ref(false)
  const isCompleted = ref(false)
  const currentSentence = ref<Sentence | null>(null)
  const currentDifficulty = ref<'easy' | 'medium' | 'hard' | 'hardcore' | null>(null)
  const isReady = ref(false) // Indique si une phrase est prête mais pas encore affichée
  
  // Saisie utilisateur
  const userInput = ref('')
  const errors = ref(0)
  const totalKeystrokes = ref(0)
  const elapsedTime = ref(0)
  
  // Historique des erreurs pour affichage final
  interface ErrorRecord {
    position: number
    expectedChar: string
    typedChar: string
    timestamp: number
    wordContext: {
      expectedWord: string
      typedWord: string
      wordStartPos: number
      errorPosInWord: number
    }
  }
  const errorHistory = ref<ErrorRecord[]>([])
  
  // Fonction utilitaire pour extraire le contexte du mot
  const getWordContext = (text: string, position: number, userText: string, userPosition: number) => {
    // Trouver le début et la fin du mot dans le texte cible
    let wordStart = position
    let wordEnd = position
    
    // Trouver le début du mot (reculer jusqu'à un espace ou le début)
    while (wordStart > 0 && text[wordStart - 1] !== ' ') {
      wordStart--
    }
    
    // Trouver la fin du mot (avancer jusqu'à un espace ou la fin)
    while (wordEnd < text.length && text[wordEnd] !== ' ') {
      wordEnd++
    }
    
    // Extraire le mot attendu
    const expectedWord = text.slice(wordStart, wordEnd)
    
    // Trouver le mot correspondant dans le texte de l'utilisateur
    let userWordStart = wordStart
    let userWordEnd = Math.min(userText.length, wordEnd)
    
    // Ajuster si l'utilisateur a tapé plus ou moins
    while (userWordEnd < userText.length && userText[userWordEnd] !== ' ') {
      userWordEnd++
    }
    
    const typedWord = userText.slice(userWordStart, userWordEnd)
    
    return {
      expectedWord,
      typedWord,
      wordStartPos: wordStart,
      errorPosInWord: position - wordStart
    }
  }

  // Services
  const timer = new TimerService((time) => {
    elapsedTime.value = time
  })
  
  // Calculs réactifs
  const progress = computed(() => {
    if (!currentSentence.value) return 0
    // Utiliser les versions nettoyées pour le calcul de progression
    const cleanUserInput = TypingValidationService.cleanSpaces(userInput.value)
    const cleanTarget = TypingValidationService.cleanSpaces(currentSentence.value.text)
    return StatsService.calculateProgress(cleanUserInput, cleanTarget)
  })
  
  const wpm = computed(() => {
    return StatsService.calculateWPM(userInput.value, elapsedTime.value)
  })
  
  const accuracy = computed(() => {
    if (!currentSentence.value) return 100
    return StatsService.calculateAccuracyBasedOnFullText(
      userInput.value,
      currentSentence.value.text,
      errors.value
    )
  })
  
  // Surveillance de la saisie utilisateur
  watch(userInput, (newValue, oldValue) => {
    if (!isActive.value || !currentSentence.value) return
    
    // Incrémenter le nombre total de frappes
    if (newValue.length > oldValue.length) {
      totalKeystrokes.value++
      
      // Vérifier si l'utilisateur a tapé un point - fin immédiate du test
      const newCharIndex = newValue.length - 1
      if (newValue[newCharIndex] === '.') {
        completeTest()
        return
      }
      
      // Compter les erreurs en comparant les versions nettoyées
      const currentCleanInput = TypingValidationService.cleanSpaces(newValue)
      const previousCleanInput = TypingValidationService.cleanSpaces(oldValue)
      const targetClean = TypingValidationService.cleanSpaces(currentSentence.value.text)
      
      // Seulement compter une erreur si un nouveau caractère "nettoyé" a été ajouté
      if (currentCleanInput.length > previousCleanInput.length) {
        const newCleanCharIndex = currentCleanInput.length - 1
        if (newCleanCharIndex >= 0) {
          if (newCleanCharIndex >= targetClean.length || 
              currentCleanInput[newCleanCharIndex] !== targetClean[newCleanCharIndex]) {
            errors.value++
            
            // Enregistrer l'erreur dans l'historique avec contexte du mot
            const wordContext = getWordContext(
              targetClean,
              newCleanCharIndex,
              currentCleanInput,
              newCleanCharIndex
            )
            
            errorHistory.value.push({
              position: newCleanCharIndex,
              expectedChar: targetClean[newCleanCharIndex] || '',
              typedChar: currentCleanInput[newCleanCharIndex] || '',
              timestamp: Date.now(),
              wordContext
            })
          }
        }
      }
    }
    
    // Vérifier si le test est terminé normalement (phrase complète)
    const validation = TypingValidationService.validateInput(
      newValue,
      currentSentence.value.text
    )
    
    if (validation.isComplete) {
      completeTest()
    }
  })
  
  // Actions
  const startTest = () => {
    if (!currentSentence.value) {
      selectRandomSentence()
    }
    
    isActive.value = true
    isCompleted.value = false
    isReady.value = false // Maintenant la phrase devient visible
    timer.start()
  }
  
  const stopTest = () => {
    isActive.value = false
    timer.stop()
  }
  
  const completeTest = () => {
    stopTest()
    isCompleted.value = true
  }
  
  const resetTest = () => {
    stopTest()
    timer.reset()
    isCompleted.value = false
    isReady.value = false
    userInput.value = ''
    errors.value = 0
    totalKeystrokes.value = 0
    elapsedTime.value = 0
    errorHistory.value = []
    currentSentence.value = null
    currentDifficulty.value = null
  }
  
  const restartWithSameSentence = () => {
    const sentence = currentSentence.value
    const difficulty = currentDifficulty.value
    resetTest()
    currentSentence.value = sentence
    currentDifficulty.value = difficulty
    isReady.value = true // Phrase prête mais pas encore visible
  }
  
  const selectRandomSentence = () => {
    currentSentence.value = SentenceService.getRandomSentence()
  }
  
  const selectSentenceByDifficulty = (difficulty: 'easy' | 'medium' | 'hard' | 'hardcore') => {
    currentDifficulty.value = difficulty
    const sentencesByDifficulty = SentenceService.getSentencesByDifficulty(difficulty)
    if (sentencesByDifficulty.length > 0) {
      const randomIndex = Math.floor(Math.random() * sentencesByDifficulty.length)
      const selectedSentence = sentencesByDifficulty[randomIndex]
      if (selectedSentence) {
        currentSentence.value = selectedSentence
        isReady.value = true // Phrase prête mais pas encore visible
      } else {
        selectRandomSentence()
      }
    } else {
      selectRandomSentence()
    }
  }
  
  const getResults = (): TestResult => {
    return StatsService.createTestResult(
      wpm.value,
      accuracy.value,
      errors.value,
      elapsedTime.value,
      totalKeystrokes.value,
      isCompleted.value
    )
  }
  
  // Nettoyage
  onUnmounted(() => {
    timer.destroy()
  })
  
  return {
    // État
    isActive,
    isCompleted,
    isReady,
    currentSentence: computed(() => currentSentence.value?.text || ''),
    currentDifficulty,
    userInput,
    errors,
    totalKeystrokes,
    elapsedTime,
    errorHistory,
    
    // Calculs
    progress,
    wpm,
    accuracy,
    
    // Actions
    startTest,
    stopTest,
    resetTest,
    restartWithSameSentence,
    selectRandomSentence,
    selectSentenceByDifficulty,
    getResults,
    
    // Services utilitaires
    validateKeyboard: TypingValidationService.shouldPreventKeyboard,
    getCharacterStatus: (index: number) => 
      TypingValidationService.getCharacterStatus(
        index,
        userInput.value,
        currentSentence.value?.text || ''
      )
  }
}