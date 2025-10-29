<template>
  <div class="difficulty-selector">
    <h3 class="selector-title">Choisissez votre niveau</h3>
    <div class="difficulty-options">
      <button
        v-for="difficulty in difficulties"
        :key="difficulty.value"
        @click="$emit('select', difficulty.value)"
        :class="['difficulty-btn', `difficulty-${difficulty.value}`, { active: selectedDifficulty === difficulty.value }]"
      >
        <span class="difficulty-icon">{{ difficulty.icon }}</span>
        <div class="difficulty-info">
          <span class="difficulty-name">{{ difficulty.name }}</span>
          <span class="difficulty-description">{{ difficulty.description }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  selectedDifficulty?: 'easy' | 'medium' | 'hard' | 'hardcore' | null
}

interface Emits {
  (e: 'select', difficulty: 'easy' | 'medium' | 'hard' | 'hardcore'): void
}

defineProps<Props>()
defineEmits<Emits>()

const difficulties = [
  {
    value: 'easy' as const,
    name: 'Facile',
    description: 'Phrases courtes et simples',
    icon: '🌱'
  },
  {
    value: 'medium' as const,
    name: 'Moyen',
    description: 'Phrases moyennes',
    icon: '⚡'
  },
  {
    value: 'hard' as const,
    name: 'Difficile',
    description: 'Phrases complexes',
    icon: '🔥'
  },
  {
    value: 'hardcore' as const,
    name: 'Hardcore',
    description: 'Mots techniques aléatoires',
    icon: '💀'
  }
]
</script>

<style scoped>
.difficulty-selector {
  margin: 2rem 0;
}

.selector-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
}

.difficulty-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.difficulty-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.difficulty-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.difficulty-btn.active {
  border-color: #2196F3;
  background: #f3f8ff;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.difficulty-easy.active {
  border-color: #4CAF50;
  background: #f1f8e9;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.difficulty-medium.active {
  border-color: #FF9800;
  background: #fff8e1;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

.difficulty-hard.active {
  border-color: #f44336;
  background: #ffebee;
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.difficulty-hardcore.active {
  border-color: #9c27b0;
  background: #f3e5f5;
  box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
}

.difficulty-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.difficulty-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

.difficulty-name {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.difficulty-description {
  font-size: 0.875rem;
  color: #666;
}

@media (max-width: 768px) {
  .difficulty-options {
    flex-direction: column;
    align-items: center;
  }
  
  .difficulty-btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>