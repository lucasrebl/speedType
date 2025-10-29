<template>
  <div class="difficulty-display" v-if="difficulty">
    <div class="difficulty-badge" :class="`difficulty-${difficulty}`">
      <span class="difficulty-icon">{{ getDifficultyIcon(difficulty) }}</span>
      <span class="difficulty-text">{{ getDifficultyName(difficulty) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  difficulty?: 'easy' | 'medium' | 'hard' | 'hardcore' | null
}

defineProps<Props>()

const getDifficultyIcon = (difficulty: 'easy' | 'medium' | 'hard' | 'hardcore'): string => {
  const icons = {
    easy: '🌱',
    medium: '⚡',
    hard: '🔥',
    hardcore: '💀'
  }
  return icons[difficulty]
}

const getDifficultyName = (difficulty: 'easy' | 'medium' | 'hard' | 'hardcore'): string => {
  const names = {
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    hardcore: 'Hardcore'
  }
  return names[difficulty]
}
</script>

<style scoped>
.difficulty-display {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.difficulty-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.875rem;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.difficulty-easy {
  background: linear-gradient(135deg, #4CAF50, #45a049);
}

.difficulty-medium {
  background: linear-gradient(135deg, #FF9800, #f57c00);
}

.difficulty-hard {
  background: linear-gradient(135deg, #f44336, #d32f2f);
}

.difficulty-hardcore {
  background: linear-gradient(135deg, #9c27b0, #7b1fa2);
}

.difficulty-icon {
  font-size: 1.1em;
}

.difficulty-text {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>