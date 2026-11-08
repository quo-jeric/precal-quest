/**
 * PRE-CALCULUS LEARNING HUB - Guided Practice Engine (Polished & Professional)
 * Handles tiered problem solving, progressive hints, immediate feedback, and scoring.
 */

const PracticeManager = {
  currentFilterLevel: "all",
  currentFilterModule: "all",

  init() {
    this.renderPracticeSummary();
    this.renderQuestionBank();
  },

  setFilters(level = "all", moduleId = "all") {
    this.currentFilterLevel = level;
    this.currentFilterModule = moduleId;
    this.renderQuestionBank();
  },

  renderPracticeSummary() {
    const summaryContainer = document.getElementById("practice-stats-bar");
    if (!summaryContainer) return;

    const progress = window.StorageManager.getUserProgress();
    const results = progress.practiceResults || {};
    const questions = window.SEED_DATA.practiceQuestions;

    const totalQuestions = questions.length;
    const answeredCount = Object.keys(results).length;
    const correctCount = Object.values(results).filter(r => r.isCorrect).length;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    summaryContainer.innerHTML = `
      <div class="stat-pill">
        <span class="stat-label">Total Questions</span>
        <span class="stat-value">${totalQuestions}</span>
      </div>
      <div class="stat-pill">
        <span class="stat-label">Solved Correctly</span>
        <span class="stat-value text-success">${correctCount} / ${totalQuestions}</span>
      </div>
      <div class="stat-pill">
        <span class="stat-label">Fluency Rate</span>
        <span class="stat-value text-accent">${accuracy}%</span>
      </div>
      <div class="stat-pill">
        <span class="stat-label">Practice Score</span>
        <span class="stat-value text-primary">+${correctCount * 25} XP</span>
      </div>
    `;
  },

  renderQuestionBank() {
    const container = document.getElementById("practice-questions-list");
    if (!container) return;

    let questions = window.SEED_DATA.practiceQuestions;

    if (this.currentFilterLevel !== "all") {
      const targetLevel = parseInt(this.currentFilterLevel, 10);
      questions = questions.filter(q => q.level === targetLevel);
    }

    if (this.currentFilterModule !== "all") {
      questions = questions.filter(q => q.moduleId === this.currentFilterModule);
    }

    if (questions.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <p>No practice problems match the selected filters. Please choose another difficulty or module.</p>
          <button class="btn btn-secondary btn-sm" onclick="PracticeManager.setFilters('all', 'all')">Show All Problems</button>
        </div>
      `;
      return;
    }

    const progress = window.StorageManager.getUserProgress();
    const results = progress.practiceResults || {};

    container.innerHTML = questions.map((q, idx) => {
      const qResult = results[q.id];
      const isAnswered = !!qResult;
      const isCorrect = qResult && qResult.isCorrect;
      const userSelected = qResult ? qResult.selectedIndex : null;

      let difficultyBadgeClass = "badge-neutral";
      if (q.level === 1) difficultyBadgeClass = "badge-success";
      else if (q.level === 2) difficultyBadgeClass = "badge-accent";
      else if (q.level === 3) difficultyBadgeClass = "badge-primary";

      return `
        <div class="practice-card ${isAnswered ? (isCorrect ? 'card-correct' : 'card-incorrect') : ''}" id="question-card-${q.id}">
          <div class="practice-card-header">
            <div class="practice-tags">
              <span class="badge ${difficultyBadgeClass}">Level ${q.level}: ${q.difficulty}</span>
              <span class="badge badge-neutral">${this.getModuleName(q.moduleId)}</span>
            </div>
            ${isAnswered ? `
              <div class="status-indicator ${isCorrect ? 'text-success' : 'text-danger'}">
                ${isCorrect ? 'Verified (+25 XP)' : 'Review Needed'}
              </div>
            ` : ''}
          </div>

          <h3 class="practice-title">Problem ${idx + 1}: ${q.title}</h3>
          
          <div class="practice-prompt katex-render">
            ${q.question}
          </div>

          <!-- Options -->
          <div class="options-grid" id="options-grid-${q.id}">
            ${q.options.map((opt, optIdx) => {
              let optClass = "option-btn";
              if (isAnswered) {
                if (optIdx === q.correctIndex) {
                  optClass += " correct-option";
                } else if (optIdx === userSelected && !isCorrect) {
                  optClass += " incorrect-option";
                }
              }
              return `
                <button class="${optClass}" 
                        onclick="PracticeManager.submitAnswer('${q.id}', ${optIdx})"
                        ${isCorrect ? 'disabled' : ''}>
                  <span class="opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                  <span class="opt-text katex-render">$${opt}$</span>
                </button>
              `;
            }).join("")}
          </div>

          <!-- Progressive Hints & Feedback Actions -->
          <div class="practice-actions">
            <button class="btn btn-outline btn-sm hint-toggle-btn" 
                    id="hint-btn-${q.id}"
                    onclick="PracticeManager.revealNextHint('${q.id}')">
              View Conceptual Hint (1/2)
            </button>
          </div>

          <!-- Hint Reveal Box -->
          <div class="hints-display-area" id="hints-box-${q.id}" style="display: none;">
            <div class="hint-inner-content" id="hint-content-${q.id}"></div>
          </div>

          <!-- Explanation / Feedback Panel -->
          <div class="feedback-panel ${isAnswered ? '' : 'hidden'}" id="feedback-panel-${q.id}">
            ${isAnswered ? this.generateFeedbackHTML(q, isCorrect) : ''}
          </div>
        </div>
      `;
    }).join("");

    // Re-render KaTeX math
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

  revealNextHint(questionId) {
    const question = window.SEED_DATA.practiceQuestions.find(q => q.id === questionId);
    if (!question || !question.hints) return;

    const box = document.getElementById(`hints-box-${questionId}`);
    const content = document.getElementById(`hint-content-${questionId}`);
    const btn = document.getElementById(`hint-btn-${questionId}`);

    if (!box || !content || !btn) return;

    const currentHintStage = parseInt(box.dataset.hintStage || "0", 10);

    if (currentHintStage === 0) {
      // Show Hint 1
      box.style.display = "block";
      box.dataset.hintStage = "1";
      content.innerHTML = `
        <div class="hint-step">
          <strong class="hint-badge">Hint 1: Conceptual Strategy</strong>
          <p class="katex-render">${question.hints[0]}</p>
        </div>
      `;
      btn.innerText = "View Formula Setup (2/2)";
    } else if (currentHintStage === 1) {
      // Show Hint 2
      box.dataset.hintStage = "2";
      content.innerHTML += `
        <div class="hint-step">
          <strong class="hint-badge">Hint 2: Algebraic Formula Setup</strong>
          <p class="katex-render">${question.hints[1]}</p>
        </div>
      `;
      btn.innerText = "All Hints Displayed";
      btn.disabled = true;
    }

    if (window.renderMathInElement) {
      window.renderMathInElement(content, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  },

  submitAnswer(questionId, selectedIdx) {
    const question = window.SEED_DATA.practiceQuestions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedIdx === question.correctIndex;
    const result = window.StorageManager.recordPracticeAnswer(questionId, isCorrect, selectedIdx);

    // Update feedback panel
    const feedbackPanel = document.getElementById(`feedback-panel-${questionId}`);
    if (feedbackPanel) {
      feedbackPanel.classList.remove("hidden");
      feedbackPanel.innerHTML = this.generateFeedbackHTML(question, isCorrect);
      
      if (window.renderMathInElement) {
        window.renderMathInElement(feedbackPanel, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    }

    // Refresh option styling
    const optionsGrid = document.getElementById(`options-grid-${questionId}`);
    if (optionsGrid) {
      const buttons = optionsGrid.querySelectorAll(".option-btn");
      buttons.forEach((btn, idx) => {
        btn.classList.remove("correct-option", "incorrect-option");
        if (idx === question.correctIndex) {
          btn.classList.add("correct-option");
        } else if (idx === selectedIdx && !isCorrect) {
          btn.classList.add("incorrect-option");
        }
        if (isCorrect) {
          btn.disabled = true;
        }
      });
    }

    // Update practice card styling
    const card = document.getElementById(`question-card-${questionId}`);
    if (card) {
      card.classList.remove("card-correct", "card-incorrect");
      card.classList.add(isCorrect ? "card-correct" : "card-incorrect");
    }

    // Re-render summary stats
    this.renderPracticeSummary();

    // Trigger toast notification
    if (window.App && window.App.showToast) {
      if (isCorrect) {
        window.App.showToast(result.isFirstSuccess ? "Correct answer recorded (+25 XP)" : "Correct answer confirmed", "success");
      } else {
        window.App.showToast("Review the worked solution and pedagogical note", "warning");
      }
    }
  },

  generateFeedbackHTML(question, isCorrect) {
    return `
      <div class="feedback-banner ${isCorrect ? 'banner-success' : 'banner-warning'}">
        <div class="feedback-header">
          <strong>${isCorrect ? 'Verified Solution' : 'Solution Analysis & Diagnostic Review'}</strong>
        </div>
        
        <div class="feedback-content">
          <div class="solution-text">
            <strong>Full Worked Solution:</strong>
            <p class="katex-render">${question.solutionExplanation}</p>
          </div>

          <div class="pedagogy-alert-box">
            <strong>Pedagogical Observation for Pre-Service Teachers:</strong>
            <p>${question.teachingNote}</p>
          </div>
        </div>
      </div>
    `;
  },

  getModuleName(moduleId) {
    const m = window.SEED_DATA.modules.find(mod => mod.id === moduleId);
    return m ? m.title : moduleId;
  }
};

window.PracticeManager = PracticeManager;
