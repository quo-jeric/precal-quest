/**
 * PRE-CALCULUS LEARNING HUB - Application Controller (Polished & Professional)
 * Handles routing, student progress record rendering, and event coordination.
 */

const App = {
  currentSection: "home",

  init() {
    this.bindEvents();
    this.renderHomePage();
    this.renderProgressView();
    
    // Check hash for initial route (e.g. #modules, #practice, #games, #progress)
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
      this.renderProgressView();
      this.renderHomePage();
    });

    // Listen for badge earns
    window.addEventListener("precal:badge-earned", (e) => {
      const badge = e.detail;
      this.showToast(`Milestone Achieved: ${badge.name}`, "success");
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

    this.renderMath(activeSection);
  },

  renderMath(element = document.body) {
    if (window.renderMathInElement && element) {
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

  renderHomePage() {
    const objectivesGrid = document.getElementById("home-objectives-grid");
    if (objectivesGrid) {
      objectivesGrid.innerHTML = window.SEED_DATA.learningObjectives.map(obj => `
        <div class="objective-card">
          <div class="obj-icon-circle">${this.getSvgIcon(obj.icon)}</div>
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
              ${isDone ? '<span class="status-pill status-done">Mastered</span>' : '<span class="status-pill status-ready">Start</span>'}
            </div>
            <h4 class="comp-title">${mod.title}</h4>
            <p class="comp-summary">${mod.summary}</p>
            <div class="comp-footer">
              <span class="comp-link">Explore Lesson & Solutions &rarr;</span>
            </div>
          </div>
        `;
      }).join("");
    }
  },

  // Refactored Student-Centered Progress & Competency Record
  renderProgressView() {
    const container = document.getElementById("progress-view-content");
    if (!container) return;

    const progress = window.StorageManager.getUserProgress();
    const modules = window.SEED_DATA.modules;
    const questions = window.SEED_DATA.practiceQuestions;
    const completedList = progress.completedLessons || [];
    const completedCount = completedList.length;
    const practiceResults = progress.practiceResults || {};
    const answeredCount = Object.keys(practiceResults).length;
    const correctCount = Object.values(practiceResults).filter(r => r.isCorrect).length;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    const badges = progress.unlockedBadges || [];

    // Calculate composite Calculus 1 Readiness Score (0-100%)
    // Weight: 60% module completion, 40% practice accuracy
    const moduleScore = (completedCount / modules.length) * 60;
    const practiceScore = (correctCount / questions.length) * 40;
    const readinessScore = Math.min(100, Math.round(moduleScore + practiceScore));

    let readinessStatus = "Foundational Stage";
    let readinessBadgeClass = "badge-neutral";
    if (readinessScore >= 80) {
      readinessStatus = "Optimal Readiness for Calculus 1";
      readinessBadgeClass = "badge-success";
    } else if (readinessScore >= 45) {
      readinessStatus = "Developing Competency";
      readinessBadgeClass = "badge-accent";
    }

    const allBadgesList = [
      { id: "badge-starter", name: "Algebra Initiate", desc: "Completed your first core lesson", icon: "award" },
      { id: "badge-scholar", name: "Polynomial Scholar", desc: "Completed 4 or more learning modules", icon: "book" },
      { id: "badge-master", name: "Pre-Calculus Master", desc: "Mastered all 7 polynomial competencies", icon: "check-circle" },
      { id: "badge-solver", name: "Fluency Builder", desc: "Solved 3 guided practice problems", icon: "zap" },
      { id: "badge-calculus-ready", name: "Calculus 1 Ready", desc: "Conquered the full practice suite", icon: "compass" }
    ];

    container.innerHTML = `
      <div class="progress-dashboard-grid">
        <!-- Overview & Calculus Readiness Card -->
        <div class="dashboard-card progress-overview-card">
          <div class="progress-header-row">
            <div>
              <h3 class="card-title" style="margin-bottom: 0.25rem;">Academic Performance Record</h3>
              <p class="text-muted" style="font-size: 0.9rem;">Verified competencies and problem-solving readiness for Calculus 1.</p>
            </div>
            <span class="badge ${readinessBadgeClass}">${readinessStatus}</span>
          </div>

          <div class="progress-metric-row">
            <div class="metric-block">
              <span class="metric-num text-primary">${readinessScore}%</span>
              <span class="metric-lbl">Calculus Readiness Index</span>
            </div>
            <div class="metric-block">
              <span class="metric-num text-accent">${completedCount} / ${modules.length}</span>
              <span class="metric-lbl">Modules Mastered</span>
            </div>
            <div class="metric-block">
              <span class="metric-num text-success">${correctCount} / ${questions.length}</span>
              <span class="metric-lbl">Problems Solved</span>
            </div>
            <div class="metric-block">
              <span class="metric-num" style="color: #6366F1;">${accuracy}%</span>
              <span class="metric-lbl">Fluency Accuracy</span>
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-labels">
              <span>Overall Curriculum Completion</span>
              <span>${Math.round((completedCount / modules.length) * 100)}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${(completedCount / modules.length) * 100}%"></div>
            </div>
          </div>
        </div>

        <!-- Competency Breakdown List -->
        <div class="dashboard-card">
          <h3 class="card-title">Curriculum Competency Breakdown</h3>
          <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1.5rem;">Track individual progress across all 7 essential polynomial competencies.</p>
          
          <div class="competency-breakdown-table">
            ${modules.map((mod, idx) => {
              const isDone = completedList.includes(mod.id);
              return `
                <div class="breakdown-row ${isDone ? 'row-done' : ''}">
                  <div class="breakdown-meta">
                    <span class="breakdown-code">${mod.code}</span>
                    <div class="breakdown-info">
                      <div class="breakdown-title">${mod.title}</div>
                      <div class="breakdown-summary">${mod.summary}</div>
                    </div>
                  </div>
                  <div class="breakdown-action">
                    <span class="badge ${isDone ? 'badge-success' : 'badge-neutral'}">
                      ${isDone ? 'Mastered' : 'In Progress'}
                    </span>
                    <button class="btn btn-outline btn-sm" onclick="App.navigateTo('modules', '${mod.id}')">
                      ${isDone ? 'Review' : 'Resume'} &rarr;
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Academic Milestones Card -->
        <div class="dashboard-card badges-card">
          <h3 class="card-title">Academic Milestones & Recognitions</h3>
          <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1.5rem;">Earned milestones celebrating your conceptual mastery and procedural rigor.</p>
          
          <div class="badges-grid">
            ${allBadgesList.map(b => {
              const isUnlocked = badges.includes(b.id);
              return `
                <div class="badge-item ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}">
                  <div class="badge-icon-box">${this.getSvgIcon(b.icon)}</div>
                  <div class="badge-name">${b.name}</div>
                  <div class="badge-desc">${b.desc}</div>
                  <div class="badge-status">${isUnlocked ? 'Achieved' : 'Pending'}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;
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

  getSvgIcon(name) {
    const svgs = {
      zap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      eye: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path></svg>`,
      award: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
      "check-circle": `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      book: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`,
      compass: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`
    };
    return svgs[name] || `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
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
