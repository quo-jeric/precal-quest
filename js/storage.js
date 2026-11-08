/**
 * PRE-CALCULUS LEARNING HUB - Storage Management
 * Handles localStorage persistence, progress tracking, and Wordwall game overrides.
 */

const STORAGE_KEYS = {
  USER_PROGRESS: "precal_hub_user_progress",
  CUSTOM_GAMES: "precal_hub_custom_games",
  MODULE_COMPLETIONS: "precal_hub_module_completions"
};

const StorageManager = {
  // Initialize storage if empty
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROGRESS)) {
      const initialProgress = {
        xp: 0,
        completedLessons: [],
        practiceResults: {}, // { [questionId]: { answered: true, isCorrect: true, selectedIndex: number, attempts: number } }
        unlockedBadges: [],
        lastActiveLesson: "mod-1"
      };
      this.setUserProgress(initialProgress);
    }

    if (!localStorage.getItem(STORAGE_KEYS.CUSTOM_GAMES)) {
      // Store default Wordwall games in localStorage so they can be modified
      this.setWordwallGames(window.SEED_DATA.wordwallGames || []);
    }
  },

  // Get current user progress
  getUserProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      return data ? JSON.parse(data) : { xp: 0, completedLessons: [], practiceResults: {}, unlockedBadges: [] };
    } catch (e) {
      console.error("Error reading user progress:", e);
      return { xp: 0, completedLessons: [], practiceResults: {}, unlockedBadges: [] };
    }
  },

  // Save user progress
  setUserProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
      window.dispatchEvent(new CustomEvent("precal:progress-updated", { detail: progress }));
    } catch (e) {
      console.error("Error saving user progress:", e);
    }
  },

  // Award XP
  addXP(amount, reason = "") {
    const progress = this.getUserProgress();
    progress.xp = (progress.xp || 0) + amount;
    this.setUserProgress(progress);
    this.checkBadgeUnlocks(progress);
    return progress.xp;
  },

  // Mark lesson complete/incomplete toggle
  toggleLessonCompletion(moduleId) {
    const progress = this.getUserProgress();
    progress.completedLessons = progress.completedLessons || [];
    const index = progress.completedLessons.indexOf(moduleId);
    let completed = false;

    if (index === -1) {
      progress.completedLessons.push(moduleId);
      progress.xp = (progress.xp || 0) + 50; // Award 50 XP for completing a module
      completed = true;
    } else {
      progress.completedLessons.splice(index, 1);
      progress.xp = Math.max(0, (progress.xp || 0) - 50);
      completed = false;
    }

    this.setUserProgress(progress);
    this.checkBadgeUnlocks(progress);
    return { completed, totalCompleted: progress.completedLessons.length };
  },

  isLessonCompleted(moduleId) {
    const progress = this.getUserProgress();
    return (progress.completedLessons || []).includes(moduleId);
  },

  // Save practice question answer
  recordPracticeAnswer(questionId, isCorrect, selectedIndex) {
    const progress = this.getUserProgress();
    progress.practiceResults = progress.practiceResults || {};
    
    const prev = progress.practiceResults[questionId];
    const isFirstSuccess = isCorrect && (!prev || !prev.isCorrect);

    progress.practiceResults[questionId] = {
      answered: true,
      isCorrect,
      selectedIndex,
      attempts: (prev ? prev.attempts : 0) + 1,
      timestamp: Date.now()
    };

    if (isFirstSuccess) {
      progress.xp = (progress.xp || 0) + 25; // 25 XP per correct practice question
    }

    this.setUserProgress(progress);
    this.checkBadgeUnlocks(progress);
    return { isFirstSuccess, totalXP: progress.xp };
  },

  // Get practice results
  getPracticeResult(questionId) {
    const progress = this.getUserProgress();
    return progress.practiceResults ? progress.practiceResults[questionId] : null;
  },

  // Get all Wordwall games (from localStorage with fallback to SEED_DATA)
  getWordwallGames() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_GAMES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn("Could not read custom games, falling back to seed data:", e);
    }
    return window.SEED_DATA.wordwallGames || [];
  },

  // Save modified/new Wordwall games
  setWordwallGames(gamesList) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_GAMES, JSON.stringify(gamesList));
      window.dispatchEvent(new CustomEvent("precal:games-updated", { detail: gamesList }));
    } catch (e) {
      console.error("Error storing custom Wordwall games:", e);
    }
  },

  // Update or insert a Wordwall game
  upsertWordwallGame(gameData) {
    const games = this.getWordwallGames();
    const existingIndex = games.findIndex(g => g.id === gameData.id);
    if (existingIndex >= 0) {
      games[existingIndex] = { ...games[existingIndex], ...gameData };
    } else {
      games.push(gameData);
    }
    this.setWordwallGames(games);
    return games;
  },

  // Badge unlock checks
  checkBadgeUnlocks(progress) {
    const badges = progress.unlockedBadges || [];
    const completedCount = (progress.completedLessons || []).length;
    const practiceResults = progress.practiceResults || {};
    const correctCount = Object.values(practiceResults).filter(r => r.isCorrect).length;

    const newBadges = [];

    if (completedCount >= 1 && !badges.includes("badge-starter")) {
      newBadges.push({ id: "badge-starter", name: "Algebra Initiate", desc: "Completed your first lesson!" });
      badges.push("badge-starter");
    }
    if (completedCount >= 4 && !badges.includes("badge-scholar")) {
      newBadges.push({ id: "badge-scholar", name: "Polynomial Scholar", desc: "Completed at least 4 modules!" });
      badges.push("badge-scholar");
    }
    if (completedCount >= 7 && !badges.includes("badge-master")) {
      newBadges.push({ id: "badge-master", name: "Pre-Calculus Master", desc: "Completed all 7 core modules!" });
      badges.push("badge-master");
    }
    if (correctCount >= 3 && !badges.includes("badge-solver")) {
      newBadges.push({ id: "badge-solver", name: "Fluency Builder", desc: "Solved 3 guided practice challenges!" });
      badges.push("badge-solver");
    }
    if (correctCount >= 8 && !badges.includes("badge-calculus-ready")) {
      newBadges.push({ id: "badge-calculus-ready", name: "Calculus 1 Ready", desc: "Conquered the full practice suite!" });
      badges.push("badge-calculus-ready");
    }

    if (newBadges.length > 0) {
      progress.unlockedBadges = badges;
      this.setUserProgress(progress);
      newBadges.forEach(b => {
        window.dispatchEvent(new CustomEvent("precal:badge-earned", { detail: b }));
      });
    }
  },

  // Reset all data to default seed state
  resetAll() {
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_GAMES);
    this.init();
    window.location.reload();
  },

  // Export all localStorage data as downloadable JSON
  exportDataJSON() {
    const exportPayload = {
      exportTimestamp: new Date().toISOString(),
      userProgress: this.getUserProgress(),
      customGames: this.getWordwallGames(),
      appVersion: window.SEED_DATA.version
    };
    return JSON.stringify(exportPayload, null, 2);
  }
};

// Initialize on load
StorageManager.init();
window.StorageManager = StorageManager;

