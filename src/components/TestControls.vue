<template>
  <div class="test-controls">
    <div class="button-group">
      <button
        v-if="!isActive && !isCompleted && isReady"
        @click="$emit('start-test')"
        class="btn btn-primary"
      >
        <span class="btn-icon">▶️</span>
        Commencer
      </button>
      
      <button
        v-if="isActive"
        @click="$emit('stop-test')"
        class="btn btn-danger"
      >
        <span class="btn-icon">⏹️</span>
        Arrêter le test
      </button>
      
      <button
        v-if="isCompleted"
        @click="$emit('restart-same')"
        class="btn btn-secondary"
      >
        <span class="btn-icon">🔄</span>
        Recommencer
      </button>
      
      <button
        v-if="!isActive && (isReady || currentSentence)"
        @click="$emit('new-test')"
        class="btn btn-outline"
      >
        <span class="btn-icon">🆕</span>
        Nouveau test
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isActive: boolean
  isCompleted: boolean
  isReady: boolean
  currentSentence: string
}

interface Emits {
  (e: 'start-test'): void
  (e: 'stop-test'): void
  (e: 'restart-same'): void
  (e: 'new-test'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.test-controls {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
  min-width: 140px;
  justify-content: center;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
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

.btn-danger {
  background-color: #f44336;
  border-color: #f44336;
  color: white;
}

.btn-danger:hover {
  background-color: #da190b;
  border-color: #da190b;
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

.btn-outline {
  background-color: transparent;
  border-color: #666;
  color: #666;
}

.btn-outline:hover {
  background-color: #666;
  color: white;
}

.btn-icon {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .button-group {
    gap: 0.5rem;
  }
  
  .btn {
    min-width: 120px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>