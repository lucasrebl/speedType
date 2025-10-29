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
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
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

@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
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
</style>