<template>
  <div class="text-display">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
    </div>
    
    <div class="sentence-container">
      <div class="sentence">
        <span
          v-for="(char, index) in sentenceChars"
          :key="index"
          :class="getCharClass(index)"
          class="char"
        >
          {{ char }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  sentence: string
  userInput: string
  progress: number
}

const props = defineProps<Props>()

const sentenceChars = computed(() => {
  // Utiliser la version nettoyée pour l'affichage cohérent
  const cleanSentence = props.sentence.replace(/\s+/g, ' ')
  return cleanSentence.split('')
})

const getCharClass = (index: number): string => {
  // Créer une version mappée entre l'input utilisateur nettoyé et la phrase cible
  const cleanUserInput = props.userInput.replace(/\s+/g, ' ')
  const cleanSentence = props.sentence.replace(/\s+/g, ' ')
  
  // Si l'index dépasse la longueur de l'input nettoyé, c'est en attente
  if (index >= cleanUserInput.length) {
    return 'char-pending'
  }
  
  // Si l'index dépasse la phrase cible, c'est une erreur
  if (index >= cleanSentence.length) {
    return 'char-error'
  }
  
  const userChar = cleanUserInput[index]
  const expectedChar = cleanSentence[index]
  
  if (userChar === expectedChar) {
    return 'char-correct'
  } else {
    return 'char-error'
  }
}
</script>

<style scoped>
.text-display {
  margin: 2rem 0;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.sentence-container {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  line-height: 1.8;
}

.sentence {
  font-size: 1.25rem;
  letter-spacing: 0.5px;
}

.char {
  position: relative;
}

.char-pending {
  color: #666;
  background-color: transparent;
}

.char-correct {
  color: #4CAF50;
  background-color: #e8f5e8;
}

.char-error {
  color: #f44336;
  background-color: #ffebee;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .sentence-container {
    padding: 1rem;
  }
  
  .sentence {
    font-size: 1rem;
  }
}
</style>