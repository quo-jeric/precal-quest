/**
 * PRE-CALCULUS LEARNING HUB - Wordwall Games Engine
 * Handles Wordwall embedded player, game switcher, and in-app custom link editor modal.
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
      container.innerHTML = `<p>No games currently configured.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="games-layout-grid">
        <!-- Sidebar: Game Selection List -->
        <aside class="games-sidebar">
          <div class="games-sidebar-header">
            <h3 class="sidebar-title">🎮 Arcade Activities</h3>
            <button class="btn btn-primary btn-xs" onclick="GamesManager.openAddGameModal()">
              + Add / Edit Games
            </button>
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
                    <span class="badge badge-accent">${g.gameType || 'Wordwall'}</span>
                    <span class="badge badge-neutral">🏆 ${g.badge || 'Gamified'}</span>
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
                <p class="game-player-desc">${activeGame.description || 'Practice your algebraic speed and accuracy with this gamified challenge!'}</p>
              </div>
              <div class="game-player-controls">
                <button class="btn btn-outline btn-sm" onclick="GamesManager.reloadIframe()">
                  🔄 Reload
                </button>
                <a href="${activeGame.embedUrl.replace('/embed/', '/resource/')}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="btn btn-secondary btn-sm">
                  ↗ Open Fullscreen
                </a>
                <button class="btn btn-outline btn-sm" onclick="GamesManager.openEditModal('${activeGame.id}')">
                  ⚙️ Edit Link
                </button>
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
              <div class="pedagogy-icon">💡</div>
              <div class="pedagogy-text">
                <strong>Teaching Tip for Wordwall in Pre-Calculus:</strong>
                <p>Gamified drills with Wordwall build automaticity for polynomial operations. When preparing high school students for Calculus 1, use timed matching games to train rapid factoring pattern recognition, freeing up cognitive load for complex calculus reasoning.</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Add / Edit Game Modal -->
      <div class="modal-overlay hidden" id="game-modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title" id="game-modal-title">Edit Wordwall Activity</h3>
            <button class="modal-close-btn" onclick="GamesManager.closeModal()">&times;</button>
          </div>
          <form id="game-editor-form" onsubmit="GamesManager.handleSaveGame(event)">
            <input type="hidden" id="modal-game-id" value="">
            
            <div class="form-group">
              <label for="modal-game-title">Activity Title:</label>
              <input type="text" id="modal-game-title" class="form-control" required placeholder="e.g., Factoring Trinomials Speed Match">
            </div>

            <div class="form-group">
              <label for="modal-game-topic">Curriculum Topic / Competency:</label>
              <input type="text" id="modal-game-topic" class="form-control" required placeholder="e.g., Factoring Trinomials">
            </div>

            <div class="form-group">
              <label for="modal-game-url">Wordwall Embed URL or Embed Code:</label>
              <input type="text" id="modal-game-url" class="form-control" required placeholder="https://wordwall.net/embed/... or iframe code">
              <small class="form-hint">Paste either a Wordwall embed link (https://wordwall.net/embed/...) or a standard Wordwall resource URL. The system converts it automatically!</small>
            </div>

            <div class="form-group">
              <label for="modal-game-desc">Description / Instructions:</label>
              <textarea id="modal-game-desc" class="form-control" rows="2" placeholder="Brief instructions for students..."></textarea>
            </div>

            <div class="form-group">
              <label for="modal-game-badge">Achievement Badge Title:</label>
              <input type="text" id="modal-game-badge" class="form-control" placeholder="e.g., Factoring Ace">
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="GamesManager.resetDefaults()">Restore Defaults</button>
              <div class="modal-actions-right">
                <button type="button" class="btn btn-secondary" onclick="GamesManager.closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save to LocalStorage</button>
              </div>
            </div>
          </form>
        </div>
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
        window.App.showToast("Reloaded game frame", "info");
      }
    }
  },

  openAddGameModal() {
    const modal = document.getElementById("game-modal-overlay");
    const title = document.getElementById("game-modal-title");
    const form = document.getElementById("game-editor-form");
    if (!modal || !form) return;

    form.reset();
    document.getElementById("modal-game-id").value = "game-" + Date.now();
    title.innerText = "Add Custom Wordwall Game";
    modal.classList.remove("hidden");
  },

  openEditModal(gameId) {
    const games = window.StorageManager.getWordwallGames();
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const modal = document.getElementById("game-modal-overlay");
    const title = document.getElementById("game-modal-title");
    if (!modal) return;

    document.getElementById("modal-game-id").value = game.id;
    document.getElementById("modal-game-title").value = game.title || "";
    document.getElementById("modal-game-topic").value = game.topic || "";
    document.getElementById("modal-game-url").value = game.embedUrl || "";
    document.getElementById("modal-game-desc").value = game.description || "";
    document.getElementById("modal-game-badge").value = game.badge || "";

    title.innerText = `Edit: ${game.title}`;
    modal.classList.remove("hidden");
  },

  closeModal() {
    const modal = document.getElementById("game-modal-overlay");
    if (modal) modal.classList.add("hidden");
  },

  handleSaveGame(e) {
    e.preventDefault();
    const id = document.getElementById("modal-game-id").value;
    const title = document.getElementById("modal-game-title").value.trim();
    const topic = document.getElementById("modal-game-topic").value.trim();
    let rawUrl = document.getElementById("modal-game-url").value.trim();
    const description = document.getElementById("modal-game-desc").value.trim();
    const badge = document.getElementById("modal-game-badge").value.trim() || "Challenge Master";

    // Clean up embed URL if student/teacher pasted an entire iframe or normal URL
    let embedUrl = rawUrl;
    const iframeSrcMatch = rawUrl.match(/src=["'](.*?)["']/);
    if (iframeSrcMatch) {
      embedUrl = iframeSrcMatch[1];
    } else if (rawUrl.includes("wordwall.net/resource/")) {
      embedUrl = rawUrl.replace("wordwall.net/resource/", "wordwall.net/embed/");
    } else if (rawUrl.includes("wordwall.net/play/")) {
      embedUrl = rawUrl.replace("wordwall.net/play/", "wordwall.net/embed/");
    }

    const gameData = {
      id,
      title,
      topic,
      embedUrl,
      description,
      badge,
      gameType: "Wordwall Custom"
    };

    window.StorageManager.upsertWordwallGame(gameData);
    this.activeGameId = id;
    this.closeModal();
    this.renderGamesHub();

    if (window.App && window.App.showToast) {
      window.App.showToast("Saved custom Wordwall game to localStorage!", "success");
    }
  },

  resetDefaults() {
    if (confirm("Reset all games to default pre-selected Wordwall activities?")) {
      window.StorageManager.setWordwallGames(window.SEED_DATA.wordwallGames || []);
      const games = window.StorageManager.getWordwallGames();
      this.activeGameId = games[0] ? games[0].id : null;
      this.closeModal();
      this.renderGamesHub();
      if (window.App && window.App.showToast) {
        window.App.showToast("Restored default Wordwall challenges", "info");
      }
    }
  }
};

window.GamesManager = GamesManager;

