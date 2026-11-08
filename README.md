# Pre-Calculus Learning Hub

An interactive, gamified e-learning web platform designed specifically for **first-year pre-service mathematics teachers** preparing for Calculus 1.

Developed as a supplementary learning module to strengthen algebraic competencies, develop pedagogical awareness of student misconceptions, and provide gamified practice through embedded Wordwall arcade activities.

---

## 🌟 Key Features

### 1. Home Page & Competency Roadmap
- **Welcome & Orientation:** Contextualized specifically for pre-service secondary math teachers.
- **Learning Objectives Grid:** Focused on algebraic fluency, structural pattern recognition, and diagnostic skills.
- **Visual Roadmap:** Quick overview of the 7 core competencies with real-time mastery badges.

### 2. Learning Modules (7 Polynomial Competencies)
- **ALG-01:** Adding and Subtracting Polynomials (Standard form, degree classification, combining like terms, sign distribution)
- **ALG-02:** Multiplying Algebraic Expressions (Monomials, FOIL binomials, multi-term expansions, difference quotients)
- **ALG-03:** Special Product Formulas (Square of a binomial, difference of squares, cube of a binomial, sum/diff of cubes)
- **ALG-04:** Factoring Common Factors (GCF of coefficients and variable powers, common binomial factors)
- **ALG-05:** Factoring Trinomials (Monic trinomials $x^2+bx+c$, non-monic $ax^2+bx+c$ via the $ac$-method)
- **ALG-06:** Special Factoring Formulas (Difference of two squares, perfect square trinomials, sum and difference of cubes via SOAP)
- **ALG-07:** Factoring by Grouping Terms (4-term polynomials, negative sign distribution, 3-by-1 grouping)

**Inside Each Module:**
- Explicit learning objectives
- Concise mathematical explanations
- **Formula Vault:** Quick-reference cards for key theorems and identities
- **Step-by-step worked solutions:** Sequential algebraic reasoning
- **Teacher's Alert (Common Student Misconceptions):** Highlighting classic high school student errors (such as the Freshman's Dream $(a+b)^2 \neq a^2+b^2$, sign drops during subtraction, omitting the middle term in cube formulas) with actionable pedagogical guidance.

### 3. Guided Practice with Instant Feedback
- **Tiered Question Difficulty:**
  - **Level 1 (Basic):** Direct algebraic operations and rule application.
  - **Level 2 (Intermediate):** Multi-step factoring and products.
  - **Level 3 (Calculus Readiness):** Evaluating limits by factoring $\lim_{x \to a}\frac{f(x)}{g(x)}$, difference quotients $\frac{f(x+h)-f(x)}{h}$, and multi-stage factorizations.
- **Progressive Hint Engine:** 2-stage hints (Conceptual Strategy $\rightarrow$ Formula Setup).
- **Immediate Feedback:** Real-time scoring, full step-by-step worked explanations, and pedagogical commentary for future teachers.

### 4. Interactive Wordwall Game Challenges
- Pre-configured responsive Wordwall math games (Match-Up, Speed Sort, Quiz, Wheel).
- **In-App Add/Edit Wordwall Link Modal:** Allows pre-service teachers and university professors to paste their own custom Wordwall activity URLs or iframe embed codes. All customizations are saved directly to `localStorage`.

### 5. Progress Tracking & LocalStorage Persistence
- Complete offline-ready data persistence in browser `localStorage`.
- XP scoring system (+50 XP per completed module, +25 XP per practice problem).
- Unlockable achievement badges (*Algebra Initiate*, *Polynomial Scholar*, *Pre-Calculus Master*, *Fluency Builder*, *Calculus 1 Ready*).
- **Backup & Reset Utility:** One-click JSON data export and complete state reset.

---

## 🎨 Design & Visual Identity

- **Primary Colors:** Deep Academic Navy (`#1E3A8A`) and Vibrant Royal Blue (`#2563EB`)
- **Accent Color:** Warm Tangerine / Coral Orange (`#F97316` / `#EA580C`)
- **Backgrounds:** Clean Slate (`#F8FAFC`) and Pure White (`#FFFFFF`)
- **Typography:** `Plus Jakarta Sans` with KaTeX CDN mathematical formula typesetting.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser:
```bash
# Optional: run a local static web server
npx serve .
# Or open directly in your browser:
# start index.html
```

---

## 📂 File Structure

```
precal-quest-app/
├── index.html              # Main Single-Page Application (SPA) structure
├── README.md               # Documentation and pedagogical guide
├── css/
│   └── styles.css          # Blue/Orange/White responsive academic styling
└── js/
    ├── data.js             # Seed JSON database (7 competencies, practice bank, Wordwall games)
    ├── storage.js          # LocalStorage controller & progress tracking
    ├── modules.js          # Renders lessons, formulas, step solutions, and teacher alerts
    ├── practice.js         # Guided practice engine with hints and scoring
    ├── games.js            # Wordwall embedded player and custom link editor modal
    └── app.js              # Routing, navigation, and application coordinator
```
