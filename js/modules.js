/**
 * PRE-CALCULUS LEARNING HUB - Modules Renderer (Polished & Professional)
 * Renders competencies, theory, formula vaults, step-by-step solutions, and teacher alerts.
 */

const ModulesManager = {
  currentModuleId: "mod-1",

  init() {
    this.renderModuleNav();
    this.renderModuleContent(this.currentModuleId);
  },

  // Render navigation buttons / tabs for modules
  renderModuleNav() {
    const container = document.getElementById("module-tabs-list");
    if (!container) return;

    const modules = window.SEED_DATA.modules;
    const progress = window.StorageManager.getUserProgress();
    const completedList = progress.completedLessons || [];

    container.innerHTML = modules.map(m => {
      const isCompleted = completedList.includes(m.id);
      const isActive = m.id === this.currentModuleId;
      return `
        <button class="module-tab-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                onclick="ModulesManager.selectModule('${m.id}')"
                data-module-id="${m.id}">
          <div class="tab-code-row">
            <span class="tab-code">${m.code}</span>
            ${isCompleted ? '<span class="tab-check-badge">Completed</span>' : ''}
          </div>
          <div class="tab-title">${m.title}</div>
        </button>
      `;
    }).join("");
  },

  selectModule(moduleId) {
    this.currentModuleId = moduleId;
    this.renderModuleNav();
    this.renderModuleContent(moduleId);

    const contentBox = document.getElementById("module-content-area");
    if (contentBox) {
      contentBox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },

  // Render complete module lesson
  renderModuleContent(moduleId) {
    const container = document.getElementById("module-content-area");
    if (!container) return;

    const moduleData = window.SEED_DATA.modules.find(m => m.id === moduleId);
    if (!moduleData) return;

    const isCompleted = window.StorageManager.isLessonCompleted(moduleId);

    let html = `
      <div class="module-view-card">
        <!-- Module Header -->
        <header class="module-header">
          <div class="module-meta-tags">
            <span class="badge badge-primary">${moduleData.code}</span>
            <span class="badge badge-secondary">Lesson ${moduleData.order} of 7</span>
            ${isCompleted ? '<span class="badge badge-success">Completed</span>' : '<span class="badge badge-neutral">In Progress</span>'}
          </div>
          <h2 class="module-headline">${moduleData.title}</h2>
          <p class="module-summary">${moduleData.summary}</p>
          
          <div class="module-action-bar">
            <button class="btn ${isCompleted ? 'btn-outline-success' : 'btn-primary'}" id="btn-toggle-complete" onclick="ModulesManager.toggleCompletion('${moduleData.id}')">
              ${isCompleted ? 'Mark as Incomplete' : 'Mark Lesson as Complete (+50 XP)'}
            </button>
            <div class="module-nav-shortcuts">
              <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('practice', '${moduleData.id}')">
                Practice This Topic &rarr;
              </button>
              <button class="btn btn-outline btn-sm" onclick="App.navigateTo('games', '${moduleData.id}')">
                Interactive Activity &rarr;
              </button>
            </div>
          </div>
        </header>

        <!-- Learning Objectives -->
        <section class="module-section objectives-box">
          <h3 class="section-title">
            <svg class="section-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
            Learning Objectives
          </h3>
          <ul class="objectives-list">
            ${moduleData.objectives.map(obj => `<li>${obj}</li>`).join("")}
          </ul>
        </section>

        <!-- Concept Explanations -->
        <section class="module-section theory-box">
          <h3 class="section-title">
            <svg class="section-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Concept Explanation & Mathematical Theory
          </h3>
          <div class="theory-body markdown-body">
            ${this.formatMarkdownText(moduleData.theory)}
          </div>
        </section>

        <!-- Formula Vault -->
        <section class="module-section formula-vault">
          <h3 class="section-title">
            <svg class="section-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M7 8h10"></path>
              <path d="M7 12h10"></path>
              <path d="M7 16h6"></path>
            </svg>
            Formula Vault & Critical Reminders
          </h3>
          <div class="formula-cards-grid">
            ${moduleData.formulaVault.map(f => `
              <div class="formula-card">
                <div class="formula-card-title">${f.name}</div>
                <div class="formula-card-math katex-render">$$${f.formula}$$</div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- Worked Solutions -->
        <section class="module-section worked-solutions-section">
          <h3 class="section-title">
            <svg class="section-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Step-by-Step Worked Solutions
          </h3>
          <div class="examples-accordion">
            ${moduleData.workedExamples.map((ex, idx) => `
              <div class="example-item">
                <div class="example-header">
                  <span class="example-tag">Worked Example ${idx + 1}</span>
                  <div class="example-problem katex-render">${this.renderInlineMath(ex.problem)}</div>
                </div>
                <div class="example-steps-container">
                  ${ex.steps.map(s => `
                    <div class="step-card">
                      <div class="step-title-text">${s.step}</div>
                      <div class="step-math-box katex-render">$$${s.math}$$</div>
                      <div class="step-explanation"><span class="step-note-label">Rationale:</span> ${s.explanation}</div>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- Teacher's Alert: Common Student Misconceptions -->
        <section class="module-section teacher-alerts-section">
          <div class="teacher-alert-banner">
            <div class="alert-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <h3 class="alert-headline">Teacher's Alert: Common Student Misconceptions</h3>
              <p class="alert-subtext">Essential diagnostic knowledge for first-year pre-service teachers to recognize, address, and remediate learner errors in high school algebra and Calculus 1.</p>
            </div>
          </div>

          <div class="misconceptions-grid">
            ${moduleData.misconceptions.map(m => `
              <div class="misconception-card">
                <div class="misconception-card-header">
                  <span class="misconception-badge">Diagnostic Alert</span>
                  <h4 class="misconception-title">${m.title}</h4>
                </div>
                <div class="misconception-comparison">
                  <div class="math-comparison-box bad-math">
                    <span class="comp-label">Common Student Error</span>
                    <div class="katex-render">$$${m.badMath}$$</div>
                  </div>
                  <div class="math-comparison-box good-math">
                    <span class="comp-label">Mathematically Sound Correction</span>
                    <div class="katex-render">$$${m.correction}$$</div>
                  </div>
                </div>
                <div class="pedagogical-tip-box">
                  <strong>Pre-Service Teacher Guidance:</strong> ${m.pedagogicalTip}
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- Module Footer Navigation -->
        <footer class="module-footer-nav">
          ${moduleData.order > 1 ? `
            <button class="btn btn-outline" onclick="ModulesManager.selectModule('mod-${moduleData.order - 1}')">
              &larr; Previous: ${window.SEED_DATA.modules[moduleData.order - 2].title}
            </button>
          ` : '<div></div>'}
          
          ${moduleData.order < 7 ? `
            <button class="btn btn-primary" onclick="ModulesManager.selectModule('mod-${moduleData.order + 1}')">
              Next: ${window.SEED_DATA.modules[moduleData.order].title} &rarr;
            </button>
          ` : `
            <button class="btn btn-accent" onclick="App.navigateTo('practice')">
              Proceed to Guided Practice &rarr;
            </button>
          `}
        </footer>
      </div>
    `;

    container.innerHTML = html;

    // Trigger KaTeX
    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  },

  // Toggle module completion status
  toggleCompletion(moduleId) {
    const result = window.StorageManager.toggleLessonCompletion(moduleId);
    this.renderModuleNav();
    this.renderModuleContent(moduleId);

    if (window.App && window.App.showToast) {
      if (result.completed) {
        window.App.showToast("Lesson completed successfully (+50 XP recorded)", "success");
      } else {
        window.App.showToast("Lesson marked as in progress", "info");
      }
    }
  },

  formatMarkdownText(text) {
    if (!text) return "";
    return text
      .replace(/^### (.*$)/gim, '<h4 class="theory-subheading">$1</h4>')
      .replace(/^> (.*$)/gim, '<blockquote class="theory-quote">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br><br>');
  },

  renderInlineMath(text) {
    return text || "";
  }
};

window.ModulesManager = ModulesManager;
