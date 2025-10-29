<template>
  <div class="rules-info">
    <div class="info-header">
      <h2 class="info-title">
        <span class="info-icon">📋</span>
        Règles et Objectif
      </h2>
    </div>
    
    <div class="info-content">
      <div class="info-section">
        <h3 class="section-title">🎯 Objectif</h3>
        <p class="section-text">
          Testez et améliorez votre rapidité de frappe en tapant des phrases de différents niveaux de difficulté. 
          Mesurez votre vitesse en mots par minute (WPM) et votre précision.
        </p>
      </div>

      <div class="info-section">
        <h3 class="section-title">📖 Comment jouer</h3>
        <ul class="rules-list">
          <li>Choisissez un niveau de difficulté</li>
          <li>Cliquez sur "Commencer" pour démarrer le test</li>
          <li>Tapez la phrase affichée le plus rapidement et précisément possible</li>
          <li>Le test se termine automatiquement quand vous tapez le point final "."</li>
          <li>Consultez vos statistiques dans la modal de résultats</li>
        </ul>
      </div>

      <div class="info-section">
        <h3 class="section-title">📏 Règles de frappe</h3>
        <ul class="rules-list">
          <li><strong>Espaces multiples :</strong> Tolérés, ne comptent pas comme erreurs</li>
          <li><strong>Fin de test :</strong> Tapez le point "." pour terminer immédiatement</li>
          <li><strong>Comptage d'erreurs :</strong> Chaque caractère incorrect compte, même si corrigé</li>
          <li><strong>Raccourcis interdits :</strong> Copier-coller bloqué pour un test équitable</li>
        </ul>
      </div>

      <div class="info-section">
        <h3 class="section-title">🏆 Niveaux de difficulté</h3>
        <div class="difficulty-grid">
          <div class="difficulty-card easy">
            <span class="difficulty-badge">🌱 Facile</span>
            <p>Mots simples, phrases logiques du quotidien</p>
          </div>
          <div class="difficulty-card medium">
            <span class="difficulty-badge">⚡ Moyen</span>
            <p>Vocabulaire plus riche, thèmes variés</p>
          </div>
          <div class="difficulty-card hard">
            <span class="difficulty-badge">🔥 Difficile</span>
            <p>Mots mélangés, phrases sans logique narrative</p>
          </div>
          <div class="difficulty-card hardcore">
            <span class="difficulty-badge">💀 Hardcore</span>
            <p>Mots techniques complexes, aucun contexte</p>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h3 class="section-title">📊 Statistiques</h3>
        <div class="stats-grid">
          <div class="stat-explanation">
            <strong>WPM :</strong> Mots par minute, mesure votre vitesse de frappe
          </div>
          <div class="stat-explanation">
            <strong>Précision :</strong> Pourcentage de caractères corrects
          </div>
          <div class="stat-explanation">
            <strong>Erreurs :</strong> Nombre total de fautes commises
          </div>
          <div class="stat-explanation">
            <strong>Temps :</strong> Durée totale du test
          </div>
        </div>
      </div>

      <div class="info-section">
        <h3 class="section-title">💡 Conseils</h3>
        <ul class="tips-list">
          <li>Privilégiez la précision à la vitesse au début</li>
          <li>Gardez une posture droite et détendez vos mains</li>
          <li>Regardez l'écran, pas le clavier</li>
          <li>Pratiquez régulièrement pour progresser</li>
          <li>Commencez par le niveau facile puis augmentez la difficulté</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Aucune logique nécessaire pour ce composant informatif
</script>

<style scoped>
.rules-info {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
}

.info-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.info-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
}

.info-icon {
  font-size: 2rem;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.section-title {
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-text {
  margin: 0;
  color: #555;
  line-height: 1.6;
  font-size: 1rem;
}

.rules-list,
.tips-list {
  margin: 0;
  padding-left: 1.5rem;
  color: #555;
}

.rules-list li,
.tips-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.difficulty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.difficulty-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  text-align: center;
}

.difficulty-card.easy {
  border-color: #4CAF50;
}

.difficulty-card.medium {
  border-color: #FF9800;
}

.difficulty-card.hard {
  border-color: #f44336;
}

.difficulty-card.hardcore {
  border-color: #9c27b0;
}

.difficulty-badge {
  display: inline-block;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.difficulty-card p {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-explanation {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 0.9rem;
  color: #555;
}

.stat-explanation strong {
  color: #333;
}

@media (max-width: 768px) {
  .rules-info {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .info-title {
    font-size: 1.5rem;
  }
  
  .difficulty-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 1.125rem;
  }
}
</style>