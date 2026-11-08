/**
 * PRE-CALCULUS LEARNING HUB - Application Router & Main Controller
 */

const App = {
  currentSection: "home",

  init() {
    this.bindEvents();
    this.updateHeaderProgress();
    this.renderHomePage();
    this.renderProgressView();
    
    // Check hash for initial route (e.g. #modules, #practice, #games)
    const hash = window.location.hash.replace("#", "");
    if (["home", "modules", "practice", "games", "progress"].includes(hash)) {
      this.navigateTo(hash, null, false);
    } else {
      this.navigateTo("home", null, false);
    }
  },

  bindEvents() {
    // Listen for progress updates from StorageManager
    window.addEventListener("precal:progress-updated", () => {
      this.updateHeaderProgress();
      this.renderProgressView();
    });

    // Listen for badge earns
    window.addEventListener("precal:badge-earned", (e) => {
      const badge = e.detail;
      this.showToast(`🏆 Badge Unlocked: ${badge.name}!`, "success");
    });

    // Hash change routing
    window.addEventListener("hashchange", () => {
      const route = window.location.hash.replace("#", "");
      if (route && route !== this.currentSection) {
        this.navigateTo(route, null, false);
      }
    });
  },

  navigateTo(sectionId, subId = null, updateHash = true) {
    this.currentSection = sectionId;

    if (updateHash) {
      window.location.hash = sectionId;
    }

    // Update nav link active states
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });

    // Hide all main section containers
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    // Show selected section container
    const activeSection = document.getElementById(`section-${sectionId}`);
    if (activeSection) {
      activeSection.classList.remove("hidden");
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Handle section-specific initializations
    if (sectionId === "modules") {
      if (subId) {
        window.ModulesManager.selectModule(subId);
      } else {
        window.ModulesManager.init();
      }
    } else if (sectionId === "practice") {
      if (subId) {
        window.PracticeManager.setFilters("all", subId);
      } else {
        window.PracticeManager.init();
      }
    } else if (sectionId === "games") {
      if (subId) {
        const games = window.StorageManager.getWordwallGames();
        const matched = games.find(g => g.moduleId === subId);
        if (matched) window.GamesManager.activeGameId = matched.id;
      }
      window.GamesManager.init();
    } else if (sectionId === "progress") {
      this.renderProgressView();
    }
  },

  renderMath(element = document.body) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX rendering notice:", err);
      }
    }
  },

  updateHeaderProgress() {
    const progress = window.StorageManager.getUserProgress();
    const xpBadge = document.getElementById("header-xp-badge");
    const completedBadge = document.getElementById("header-completed-badge");

    if (xpBadge) {
      xpBadge.innerText = `${progress.xp || 0} XP`;
    }
    if (completedBadge) {
      const totalLessons = window.SEED_DATA.modules.length;
      const doneCount = (progress.completedLessons || []).length;
      completedBadge.innerText = `${doneCount}/${totalLessons} Completed`;
    }
  },

  renderHomePage() {
    const objectivesGrid = document.getElementById("home-objectives-grid");
    if (objectivesGrid) {
      objectivesGrid.innerHTML = window.SEED_DATA.learningObjectives.map(obj => `
        <div class="objective-card">
          <div class="obj-icon-circle">${this.getIcon(obj.icon)}</div>
          <h3 class="obj-card-title">${obj.title}</h3>
          <p class="obj-card-desc">${obj.desc}</p>
        </div>
      `).join("");
    }

    const competenciesGrid = document.getElementById("home-competencies-grid");
    if (competenciesGrid) {
      const progress = window.StorageManager.getUserProgress();
      const completedList = progress.completedLessons || [];

      competenciesGrid.innerHTML = window.SEED_DATA.modules.map(mod => {
        const isDone = completedList.includes(mod.id);
        return `
          <div class="competency-card ${isDone ? 'competency-done' : ''}" onclick="App.navigateTo('modules', '${mod.id}')">
            <div class="comp-header">
              <span class="comp-badge">${mod.code}</span>
              ${isDone ? '<span class="status-pill status-done">✓ Mastered</span>' : '<span class="status-pill status-ready">Start</span>'}
            </div>
            <h4 class="comp-title">${mod.title}</h4>
            <p class="comp-summary">${mod.summary}</p>
            <div class="comp-footer">
              <span class="comp-link">Explore Lesson & Solutions →</span>
            </div>
          </div>
        `;
      }).join("");
    }
  },

  renderProgressView() {
    const container = document.getElementById("progress-view-content");
    if (!container) return;

    const progress = window.StorageManager.getUserProgress();
    const modules = window.SEED_DATA.modules;
    const questions = window.SEED_DATA.practiceQuestions;
    const completedCount = (progress.completedLessons || []).length;
    const practiceResults = progress.practiceResults || {};
    const correctCount = Object.values(practiceResults).filter(r => r.isCorrect).length;
    const badges = progress.unlockedBadges || [];

    const allBadgesList = [
      { id: "badge-starter", name: "Algebra Initiate", desc: "Completed your first core lesson", icon: "🌱" },
      { id: "badge-scholar", name: "Polynomial Scholar", desc: "Completed 4 or more learning modules", icon: "📚" },
      { id: "badge-master", name: "Pre-Calculus Master", desc: "Mastered all 7 polynomial competencies", icon: "🎓" },
      { id: "badge-solver", name: "Fluency Builder", desc: "Solved 3 guided practice problems", icon: "⚡" },
      { id: "badge-calculus-ready", name: "Calculus 1 Ready", desc: "Solved 8 or more guided practice challenges", icon: "🚀" }
    ];

    container.innerHTML = `
      <div class="progress-dashboard-grid">
        <!-- Overview Card -->
        <div class="dashboard-card progress-overview-card">
          <h3 class="card-title">📈 Your Learning Journey</h3>
          <div class="progress-metric-row">
            <div class="metric-block">
              <span class="metric-num text-primary">${progress.xp || 0}</span>
              <span class="metric-lbl">Total XP Earned</span>
            </div>
            <div class="metric-block">
              <span class="metric-num text-accent">${completedCount} / ${modules.length}</span>
              <span class="metric-lbl">Modules Completed</span>
            </div>
            <div class="metric-block">
              <span class="metric-num text-success">${correctCount} / ${questions.length}</span>
              <span class="metric-lbl">Problems Solved</span>
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-labels">
              <span>Overall Completion</span>
              <span>${Math.round((completedCount / modules.length) * 100)}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${(completedCount / modules.length) * 100}%"></div>
            </div>
          </div>
        </div>

        <!-- Badges Card -->
        <div class="dashboard-card badges-card">
          <h3 class="card-title">🏆 Achievement Badges</h3>
          <div class="badges-grid">
            ${allBadgesList.map(b => {
              const isUnlocked = badges.includes(b.id);
              return `
                <div class="badge-item ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}">
                  <div class="badge-icon">${b.icon}</div>
                  <div class="badge-name">${b.name}</div>
                  <div class="badge-desc">${b.desc}</div>
                  <div class="badge-status">${isUnlocked ? 'Unlocked' : 'Locked'}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- LocalStorage Data Tools -->
        <div class="dashboard-card data-tools-card">
          <h3 class="card-title">💾 LocalStorage Data Management</h3>
          <p class="data-tools-desc">All module completions, practice responses, XP, and custom Wordwall links are preserved directly in your browser's <code>localStorage</code>.</p>
          <div class="data-tools-actions">
            <button class="btn btn-secondary btn-sm" onclick="App.exportData()">
              📥 Export Data as JSON
            </button>
            <button class="btn btn-danger btn-sm" onclick="App.confirmReset()">
              🔄 Reset All Progress & Content
            </button>
          </div>
        </div>
      </div>
    `;
  },

  exportData() {
    const jsonString = window.StorageManager.exportDataJSON();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `precalculus_learning_hub_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast("Data exported successfully!", "success");
  },

  confirmReset() {
    if (confirm("Are you sure you want to reset all your learning progress, XP, and restore default Wordwall activities?")) {
      window.StorageManager.resetAll();
    }
  },

  showToast(message, type = "info") {
    let toastContainer = document.getElementById("toast-notifications-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-notifications-container";
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <span class="toast-msg">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("toast-fadeout");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  },

  getIcon(name) {
    const icons = {
      zap: "⚡",
      eye: "👁️",
      award: "👩‍🏫",
      "check-circle": "🎯"
    };
    return icons[name] || "📌";
  }
};

window.App = App;

// Bootstrap on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

window.addEventListener("load", () => {
  App.renderMath();
});
