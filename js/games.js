/**
 * PRE-CALCULUS LEARNING HUB - Wordwall Games Engine (Clean, Read-Only, Professional)
 * Handles Wordwall embedded player and activity switcher.
 */

const GamesManager = {
  activeGameId: null,

  init() {
    const games = window.StorageManager.getWordwallGames();
    if (games.length > 0 && !this.activeGameId) {
      this.activeGameId = games[0].id;
    }
    this.renderGamesHub();
  },

  renderGamesHub() {
    const container = document.getElementById("games-container-view");
    if (!container) return;

    const games = window.StorageManager.getWordwallGames();
    const activeGame = games.find(g => g.id === this.activeGameId) || games[0];

    if (!activeGame) {
      container.innerHTML = `<p>No interactive activities currently configured.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="games-layout-grid">
        <!-- Sidebar: Activity Selection List -->
        <aside class="games-sidebar">
          <div class="games-sidebar-header">
            <h3 class="sidebar-title">Activity Library</h3>
          </div>
          <div class="games-list-menu">
            ${games.map(g => {
              const isActive = g.id === activeGame.id;
              return `
                <div class="game-select-card ${isActive ? 'active' : ''}" 
                     onclick="GamesManager.selectGame('${g.id}')">
                  <div class="game-select-topic">${g.topic}</div>
                  <div class="game-select-title">${g.title}</div>
                  <div class="game-select-meta">
                    <span class="badge badge-accent">${g.gameType || 'Wordwall Activity'}</span>
                    <span class="badge badge-neutral">${g.badge || 'Practice'}</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </aside>

        <!-- Main Player Area -->
        <main class="games-player-main">
          <div class="game-player-card">
            <div class="game-player-header">
              <div>
                <span class="badge badge-primary">${activeGame.topic}</span>
                <h2 class="game-player-title">${activeGame.title}</h2>
                <p class="game-player-desc">${activeGame.description || 'Practice your algebraic speed and accuracy with this interactive challenge.'}</p>
              </div>
              <div class="game-player-controls">
                <button class="btn btn-outline btn-sm" onclick="GamesManager.reloadIframe()">
                  Reload Activity
                </button>
                <a href="${activeGame.embedUrl.replace('/embed/', '/resource/')}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="btn btn-secondary btn-sm">
                  Fullscreen View &rarr;
                </a>
              </div>
            </div>

            <!-- Embedded Wordwall Frame -->
            <div class="wordwall-iframe-wrapper">
              <iframe id="wordwall-active-iframe"
                      src="${activeGame.embedUrl}" 
                      allowfullscreen 
                      loading="lazy"
                      frameborder="0"
                      title="${activeGame.title}">
              </iframe>
            </div>

            <!-- Pedagogical Reflection Card for Pre-Service Teachers -->
            <div class="game-pedagogy-card">
              <div class="pedagogy-text">
                <strong>Teaching Tip for Polynomial Fluency:</strong>
                <p>Interactive drills build automaticity for polynomial operations. When preparing secondary school students for Calculus 1, rapid factoring pattern recognition reduces cognitive load during limit evaluations and derivative calculations.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;
  },

  selectGame(gameId) {
    this.activeGameId = gameId;
    this.renderGamesHub();
  },

  reloadIframe() {
    const iframe = document.getElementById("wordwall-active-iframe");
    if (iframe) {
      const src = iframe.src;
      iframe.src = "";
      setTimeout(() => { iframe.src = src; }, 100);
      if (window.App && window.App.showToast) {
        window.App.showToast("Activity frame reloaded", "info");
      }
    }
  }
};

window.GamesManager = GamesManager;
