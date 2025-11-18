<template>
  <div class="results-modal" v-if="show">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">
          {{ completed ? '🎉 Test terminé !' : '⏹️ Test arrêté' }}
        </h2>
        <button @click="$emit('close')" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <div class="results-grid">
          <div class="result-card">
            <div class="result-icon">⏱️</div>
            <div class="result-info">
              <span class="result-label">Temps écoulé</span>
              <span class="result-value">{{ formatTime(stats.timeElapsed) }}</span>
            </div>
          </div>
          
          <div class="result-card">
            <div class="result-icon">⚡</div>
            <div class="result-info">
              <span class="result-label">Vitesse</span>
              <span class="result-value">{{ stats.wpm }} WPM</span>
            </div>
          </div>
          
          <div class="result-card">
            <div class="result-icon">🎯</div>
            <div class="result-info">
              <span class="result-label">Précision</span>
              <span class="result-value">{{ stats.accuracy }}%</span>
            </div>
          </div>
          
          <div class="result-card">
            <div class="result-icon">❌</div>
            <div class="result-info">
              <span class="result-label">Erreurs</span>
              <span class="result-value">{{ stats.errors }}</span>
            </div>
          </div>
        </div>
        
        <div class="performance-message">
          <p class="message">{{ getPerformanceMessage() }}</p>
        </div>
        
        <div v-if="originalText && userTypedText" class="text-comparison">
          <h3 class="comparison-title">📝 Comparaison de votre saisie</h3>
          
          <div class="text-section">
            <h4 class="text-label">Texte original :</h4>
            <div class="original-text">{{ originalText }}</div>
          </div>
          
          <div class="text-section">
            <h4 class="text-label">Votre saisie :</h4>
            <div class="typed-text">
              <span
                v-for="(char, index) in getComparisonChars()"
                :key="index"
                :class="getCharClass(char)"
              >
                {{ char.display }}
              </span>
              <span v-if="userTypedText.length < originalText.length" class="missing-text">
                {{ originalText.slice(userTypedText.length) }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-if="errorHistory && errorHistory.length > 0" class="error-history">
          <h3 class="error-history-title">🔍 Historique des erreurs</h3>
          <p class="error-history-subtitle">
            Toutes les erreurs commises pendant la saisie ({{ errorHistory.length }} erreur{{ errorHistory.length > 1 ? 's' : '' }})
          </p>
          
          <div class="error-list">
            <div
              v-for="(error, index) in errorHistory"
              :key="`error-${index}`"
              class="error-item"
            >
              <div class="error-position">{{ getWordNumber(error.wordContext.wordStartPos) }}</div>
              <div class="error-word-context">
                <div class="word-comparison">
                  <div class="word-row">
                    <span class="word-label">Attendu:</span>
                    <span class="word-content expected-word">
                      <span
                        v-for="(char, charIndex) in error.wordContext.expectedWord"
                        :key="`exp-${charIndex}`"
                        :class="{ 'error-char': charIndex === error.wordContext.errorPosInWord }"
                      >
                        {{ char }}
                      </span>
                    </span>
                  </div>
                  <div class="word-row">
                    <span class="word-label">Tapé:</span>
                    <span class="word-content typed-word">
                      <span
                        v-for="(char, charIndex) in error.wordContext.typedWord"
                        :key="`typ-${charIndex}`"
                        :class="{ 'error-char': charIndex === error.wordContext.errorPosInWord }"
                      >
                        {{ char }}
                      </span>
                      <span v-if="error.wordContext.typedWord.length < error.wordContext.expectedWord.length" class="missing-chars">
                        {{ error.wordContext.expectedWord.slice(error.wordContext.typedWord.length) }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="$emit('restart-same')" class="btn btn-secondary">
          🔄 Recommencer
        </button>
        <button @click="$emit('new-test')" class="btn btn-primary">
          🆕 Nouveau test
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TypingStats } from '@/services/statsService'

interface Props {
  show: boolean
  stats: TypingStats
  completed: boolean
  originalText?: string
  userTypedText?: string
  errorHistory?: Array<{
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
  }>
}

interface Emits {
  (e: 'close'): void
  (e: 'restart-same'): void
  (e: 'new-test'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const getPerformanceMessage = (): string => {
  const { wpm, accuracy } = props.stats
  
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

interface ComparisonChar {
  display: string
  status: 'correct' | 'incorrect' | 'missing'
}

const getComparisonChars = (): ComparisonChar[] => {
  if (!props.originalText || !props.userTypedText) return []
  
  const chars: ComparisonChar[] = []
  const maxLength = Math.max(props.originalText.length, props.userTypedText.length)
  
  for (let i = 0; i < maxLength; i++) {
    const originalChar = props.originalText[i]
    const userChar = props.userTypedText[i]
    
    if (userChar === undefined) {
      // L'utilisateur n'a pas tapé ce caractère
      chars.push({
        display: originalChar || '',
        status: 'missing'
      })
    } else if (originalChar === undefined) {
      // L'utilisateur a tapé plus que nécessaire
      chars.push({
        display: userChar,
        status: 'incorrect'
      })
    } else if (originalChar === userChar) {
      // Caractère correct
      chars.push({
        display: userChar,
        status: 'correct'
      })
    } else {
      // Caractère incorrect
      chars.push({
        display: userChar,
        status: 'incorrect'
      })
    }
  }
  
  return chars
}

const getCharClass = (char: ComparisonChar): string => {
  return `char char-${char.status}`
}

const getWordNumber = (wordStartPos: number): string => {
  if (!props.originalText) return 'Mot 1'
  
  // Compter les espaces avant cette position pour déterminer le numéro du mot
  const textBeforeWord = props.originalText.slice(0, wordStartPos)
  const wordNumber = textBeforeWord.split(' ').length
  
  return `Mot ${wordNumber}`
}
</script>

<style scoped>
.results-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 900px;
  width: 95%;
  max-height: 95vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

.modal-body {
  padding: 2rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
}

.result-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.result-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.result-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.result-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.performance-message {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.message {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 0 2rem 2rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.btn-secondary {
  background-color: #2196F3;
  border-color: #2196F3;
  color: white;
}

.btn-secondary:hover {
  background-color: #0b7dda;
  border-color: #0b7dda;
}

@media (max-width: 800px) {
  .modal-content {
    max-width: 600px;
    width: 100%;
    margin: 1rem;
  }
  
  .modal-body {
    display: block !important;
  }
  
  .text-comparison {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
    border-right: none;
    padding-right: 0;
  }
  
  .error-history {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
    padding-left: 0;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}

/* Styles pour la comparaison de texte */
.text-comparison {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

/* Layout amélioré pour les écrans plus larges */
@media (min-width: 800px) {
  .modal-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  .results-grid {
    grid-column: 1 / -1;
  }
  
  .performance-message {
    grid-column: 1 / -1;
  }
  
  .text-comparison {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
    border-right: 1px solid #e0e0e0;
    padding-right: 2rem;
  }
  
  .error-history {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
    padding-left: 2rem;
  }
}

.comparison-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.text-section {
  margin-bottom: 1.5rem;
}

.text-label {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #555;
}

.original-text,
.typed-text {
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.original-text {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #333;
}

.typed-text {
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.char {
  position: relative;
}

.char-correct {
  background-color: #d4edda;
  color: #155724;
}

.char-incorrect {
  background-color: #f8d7da;
  color: #721c24;
  text-decoration: underline;
}

.char-missing {
  background-color: #fff3cd;
  color: #856404;
  opacity: 0.7;
}

.missing-text {
  background-color: #fff3cd;
  color: #856404;
  opacity: 0.7;
}

/* Styles pour l'historique des erreurs */
.error-history {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.error-history-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.error-history-subtitle {
  margin: 0 0 1.5rem 0;
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.error-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.error-position {
  font-weight: 600;
  color: #c53030;
  min-width: 80px;
  flex-shrink: 0;
  font-size: 0.85rem;
}

.error-word-context {
  flex: 1;
}

.word-comparison {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.word-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.word-label {
  font-weight: 600;
  min-width: 70px;
  font-size: 0.8rem;
  color: #666;
}

.word-content {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
}

.expected-word {
  background-color: #c6f6d5;
  color: #22543d;
  border: 1px solid #9ae6b4;
}

.typed-word {
  background-color: #fed7d7;
  color: #c53030;
  border: 1px solid #fc8181;
}

.error-char {
  background-color: #f56565;
  color: white;
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
  font-weight: bold;
}

.expected-word .error-char {
  background-color: #38a169;
}

.missing-chars {
  opacity: 0.6;
  font-style: italic;
}

/* Scrollbar pour la liste des erreurs */
.error-list::-webkit-scrollbar {
  width: 6px;
}

.error-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.error-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.error-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>