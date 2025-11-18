<template>
  <div class="typing-test-page">
    <header class="page-header">
      <h1 class="title">⚡ SpeedType</h1>
      <p class="subtitle">Testez votre rapidité de frappe</p>
    </header>
    
    <main class="main-content">
      <div class="test-container">
        <RulesInfo v-if="!isReady && !currentSentence" />
        
        <DifficultySelector
          v-if="!isReady && !currentSentence"
          :selected-difficulty="selectedDifficulty"
          @select="handleDifficultySelect"
        />
        
        <DifficultyDisplay
          v-if="isReady || isActive || isCompleted"
          :difficulty="currentDifficulty"
        />
        
        <StatsDisplay
          v-if="isActive || isCompleted"
          :time-elapsed="elapsedTime"
          :wpm="wpm"
          :accuracy="accuracy"
          :errors="errors"
        />
        
        <TextDisplay
          v-if="isActive || isCompleted"
          :sentence="currentSentence" 
          :user-input="userInput"
          :progress="progress"
        />
        
        <TypingInput
          v-if="isActive || isCompleted"
          v-model="userInput"
          :disabled="!isActive"
          :auto-focus="isActive"
          @start-typing="handleStartTyping"
          ref="typingInputRef"
        />
        
        <TestControls
          :is-active="isActive"
          :is-completed="isCompleted"
          :is-ready="isReady"
          :current-sentence="currentSentence"
          @start-test="handleStartTest"
          @stop-test="handleStopTest"
          @restart-same="handleRestartSame"
          @new-test="handleNewTest"
        />
      </div>
      
      <ResultsModal
        :show="showResults"
        :stats="getResults().stats"
        :completed="isCompleted"
        :original-text="currentSentence"
        :user-typed-text="userInput"
        :error-history="errorHistory"
        @close="showResults = false"
        @restart-same="handleRestartSameFromModal"
        @new-test="handleNewTestFromModal"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useTypingTest } from '@/services/useTypingTest'
import StatsDisplay from '@/components/StatsDisplay.vue'
import TextDisplay from '@/components/TextDisplay.vue'
import TypingInput from '@/components/TypingInput.vue'
import TestControls from '@/components/TestControls.vue'
import ResultsModal from '@/components/ResultsModal.vue'
import DifficultySelector from '@/components/DifficultySelector.vue'
import DifficultyDisplay from '@/components/DifficultyDisplay.vue'
import RulesInfo from '@/components/RulesInfo.vue'

const {
  isActive,
  isCompleted,
  isReady,
  currentSentence,
  currentDifficulty,
  userInput,
  errors,
  elapsedTime,
  progress,
  wpm,
  accuracy,
  errorHistory,
  startTest,
  stopTest,
  resetTest,
  restartWithSameSentence,
  selectSentenceByDifficulty,
  getResults
} = useTypingTest()

const showResults = ref(false)
const selectedDifficulty = ref<'easy' | 'medium' | 'hard' | 'hardcore' | null>(null)
const typingInputRef = ref<InstanceType<typeof TypingInput>>()

// Surveiller la fin du test pour afficher les résultats
watch(isCompleted, (completed) => {
  if (completed) {
    showResults.value = true
  }
})

const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard' | 'hardcore') => {
  selectedDifficulty.value = difficulty
  resetTest()
  selectSentenceByDifficulty(difficulty)
}

const handleStartTest = () => {
  startTest()
  // Donner automatiquement le focus à l'input après avoir démarré le test
  nextTick(() => {
    typingInputRef.value?.focusInput()
  })
}

const handleStartTyping = () => {
  if (!isActive.value) {
    startTest()
  }
}

const handleStopTest = () => {
  stopTest()
  showResults.value = true
}

const handleRestartSame = () => {
  restartWithSameSentence()
  typingInputRef.value?.focusInput()
}

const handleNewTest = () => {
  resetTest()
  selectedDifficulty.value = null
  // Ne pas sélectionner de phrase, laisser l'utilisateur choisir la difficulté
}

const handleRestartSameFromModal = () => {
  showResults.value = false
  handleRestartSame()
}

const handleNewTestFromModal = () => {
  showResults.value = false
  // Petit délai pour laisser la modal se fermer avant de reset
  setTimeout(() => {
    handleNewTest()
  }, 100)
}
</script>

<style scoped>
.typing-test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0 0 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.25rem;
  margin: 0;
  opacity: 0.9;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.test-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .typing-test-page {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .test-container {
    padding: 1rem;
  }
}
</style>