<template>
  <div class="stats-display">
    <div class="stat-item">
      <span class="stat-label">Temps</span>
      <span class="stat-value">{{ formatTime(timeElapsed) }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">WPM</span>
      <span class="stat-value">{{ wpm }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Précision</span>
      <span class="stat-value">{{ accuracy }}%</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Erreurs</span>
      <span class="stat-value">{{ errors }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  timeElapsed: number
  wpm: number
  accuracy: number
  errors: number
}

defineProps<Props>()

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.stats-display {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

@media (max-width: 768px) {
  .stats-display {
    gap: 1rem;
  }
  
  .stat-value {
    font-size: 1.25rem;
  }
}
</style>