/**
 * PRE-CALCULUS LEARNING HUB - Modules Renderer
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
            ${isCompleted ? '<span class="tab-check-icon">✓</span>' : ''}
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

    // Smooth scroll to top of module content container
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
            ${isCompleted ? '<span class="badge badge-success">✓ Completed</span>' : '<span class="badge badge-neutral">In Progress</span>'}
          </div>
          <h2 class="module-headline">${moduleData.title}</h2>
          <p class="module-summary">${moduleData.summary}</p>
          
          <div class="module-action-bar">
            <button class="btn ${isCompleted ? 'btn-outline-success' : 'btn-primary'}" id="btn-toggle-complete" onclick="ModulesManager.toggleCompletion('${moduleData.id}')">
              ${isCompleted ? '✓ Mark as Incomplete' : '✓ Mark Lesson as Complete (+50 XP)'}
            </button>
            <div class="module-nav-shortcuts">
              <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('practice', '${moduleData.id}')">
                Practice This Topic →
              </button>
              <button class="btn btn-accent btn-sm" onclick="App.navigateTo('games', '${moduleData.id}')">
                Play Wordwall Game 🎮
              </button>
            </div>
          </div>
        </header>

        <!-- Learning Objectives -->
        <section class="module-section objectives-box">
          <h3 class="section-title"><span class="section-icon">🎯</span> Learning Objectives</h3>
          <ul class="objectives-list">
            ${moduleData.objectives.map(obj => `<li>${obj}</li>`).join("")}
          </ul>
        </section>

        <!-- Concept Explanations -->
        <section class="module-section theory-box">
          <h3 class="section-title"><span class="section-icon">📖</span> Concept Explanation & Mathematical Theory</h3>
          <div class="theory-body markdown-body">
            ${this.formatMarkdownText(moduleData.theory)}
          </div>
        </section>

        <!-- Formula Vault -->
        <section class="module-section formula-vault">
          <h3 class="section-title"><span class="section-icon">⚡</span> Formula Vault & Critical Reminders</h3>
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
          <h3 class="section-title"><span class="section-icon">✏️</span> Step-by-Step Worked Solutions</h3>
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
                      <div class="step-explanation"><span class="info-dot">ℹ️</span> ${s.explanation}</div>
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
            <div class="alert-icon-large">👩‍🏫</div>
            <div>
              <h3 class="alert-headline">Teacher's Alert: Common Student Misconceptions</h3>
              <p class="alert-subtext">Essential diagnostic knowledge for first-year pre-service teachers to recognize, address, and remediate learner errors in high school and Calculus 1.</p>
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
                    <span class="comp-label">❌ Common Student Error</span>
                    <div class="katex-render">$$${m.badMath}$$</div>
                  </div>
                  <div class="math-comparison-box good-math">
                    <span class="comp-label">✅ Mathematically Sound Correction</span>
                    <div class="katex-render">$$${m.correction}$$</div>
                  </div>
                </div>
                <div class="pedagogical-tip-box">
                  <strong>💡 Pre-Service Teacher Guidance:</strong> ${m.pedagogicalTip}
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- Module Footer Navigation -->
        <footer class="module-footer-nav">
          ${moduleData.order > 1 ? `
            <button class="btn btn-outline" onclick="ModulesManager.selectModule('mod-${moduleData.order - 1}')">
              ← Previous: ${window.SEED_DATA.modules[moduleData.order - 2].title}
            </button>
          ` : '<div></div>'}
          
          ${moduleData.order < 7 ? `
            <button class="btn btn-primary" onclick="ModulesManager.selectModule('mod-${moduleData.order + 1}')">
              Next: ${window.SEED_DATA.modules[moduleData.order].title} →
            </button>
          ` : `
            <button class="btn btn-accent" onclick="App.navigateTo('practice')">
              Ready for Guided Practice! 🚀
            </button>
          `}
        </footer>
      </div>
    `;

    container.innerHTML = html;

    // Trigger KaTeX to typeset newly rendered mathematical expressions
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

    // Update global UI badges & toast notification
    if (window.App && window.App.showToast) {
      if (result.completed) {
        window.App.showToast("🎉 Lesson completed! +50 XP awarded", "success");
      } else {
        window.App.showToast("Lesson marked as in progress", "info");
      }
    }
  },

  // Simple Markdown parsing for headers, bold, bullets
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

