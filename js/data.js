/**
 * PRE-CALCULUS LEARNING HUB - Seed Data
 * Tailored for First-Year Pre-Service Mathematics Teachers
 * Focus: Algebraic Expressions & Polynomial Competencies
 */

const SEED_DATA = {
  version: "1.0",
  appInfo: {
    title: "Pre-Calculus Learning Hub",
    subtitle: "Algebraic Expressions & Polynomial Mastery for Future Educators",
    description: "A specialized supplementary e-learning module empowering pre-service secondary mathematics teachers with procedural fluency, conceptual understanding, and diagnostic pedagogical skills for Calculus 1 preparation.",
    primaryCompetencies: [
      "Adding and Subtracting Polynomials",
      "Multiplying Algebraic Expressions",
      "Special Product Formulas",
      "Factoring Common Monomial and Binomial Factors",
      "Factoring Trinomials (Monic and Non-Monic)",
      "Special Factoring Formulas (Squares, Trinomials, Cubes)",
      "Factoring by Grouping Terms"
    ]
  },
  learningObjectives: [
    {
      id: "obj-1",
      title: "Algebraic Fluency for Calculus",
      desc: "Develop rapid and accurate operational fluency in expanding, factoring, and simplifying polynomial expressions required in limits, derivatives, and algebraic integration.",
      icon: "zap"
    },
    {
      id: "obj-2",
      title: "Structural Pattern Recognition",
      desc: "Instantly recognize underlying algebraic patterns such as differences of squares, perfect square trinomials, and sum/difference of cubes without relying on brute force.",
      icon: "eye"
    },
    {
      id: "obj-3",
      title: "Pedagogical Error Diagnosis",
      desc: "Identify, analyze, and remediate common secondary school misconceptions (e.g., the Freshman's Dream, negative sign drop) to prepare for high school teaching.",
      icon: "award"
    },
    {
      id: "obj-4",
      title: "Step-by-Step Mathematical Rigor",
      desc: "Communicate clear, sequential, and mathematically sound solutions with explicit algebraic reasoning and proper notation.",
      icon: "check-circle"
    }
  ],
  modules: [
    {
      id: "mod-1",
      order: 1,
      code: "ALG-01",
      title: "Adding and Subtracting Polynomials",
      summary: "Classifying polynomial degrees, standard forms, combining like terms, and distributing negative signs across grouping symbols.",
      objectives: [
        "Classify polynomials by degree (linear, quadratic, cubic, etc.) and number of terms.",
        "Write polynomial expressions in standard descending order.",
        "Accurately combine like terms involving single and multiple variables.",
        "Correctly distribute negative signs across grouping symbols during subtraction.",
        "Identify and remediate student errors in sign distribution."
      ],
      theory: `A **polynomial** in one variable $x$ is an algebraic expression of the form:
$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0$$
where $a_n \\neq 0$, the coefficients $a_i$ are real numbers, and the exponents $n, n-1, \\dots$ are non-negative integers ($0, 1, 2, \\dots$).

### Key Definitions:
1. **Degree:** The highest exponent of the variable in any term with a non-zero coefficient.
2. **Standard Form:** Terms are arranged in descending order of their degrees.
3. **Like Terms:** Terms that have the exact same variable parts raised to the exact same powers (e.g., $5x^2y$ and $-2x^2y$). Only coefficients are added or subtracted.

### Operational Principles:
- **Addition:** Remove grouping symbols and combine like terms using the Commutative and Associative Properties of addition:
$$(A + B) + (C + D) = (A + C) + (B + D)$$
- **Subtraction:** Distribute the negative sign to **every term** inside the subtrahend polynomial before combining like terms:
$$-(a - b + c) = -a + b - c$$`,
      formulaVault: [
        {
          name: "Standard Form of Polynomial",
          formula: "P(x) = a_n x^n + a_{n-1}x^{n-1} + \\dots + a_1 x + a_0, \\quad a_n \\neq 0"
        },
        {
          name: "Subtraction as Addition of Opposite",
          formula: "P(x) - Q(x) = P(x) + (-1) \\cdot Q(x)"
        },
        {
          name: "Distributive Property for Subtraction",
          formula: "-(b_k x^k + \\dots + b_0) = -b_k x^k - \\dots - b_0"
        }
      ],
      workedExamples: [
        {
          id: "ex-1-1",
          problem: "Simplify: $(4x^3 - 7x^2 + 5x - 9) - (2x^3 + 3x^2 - 8x - 14)$",
          steps: [
            {
              step: "Step 1: Distribute the negative sign to all terms in the second polynomial.",
              math: "= 4x^3 - 7x^2 + 5x - 9 - 2x^3 - 3x^2 + 8x + 14",
              explanation: "Notice the signs of the subtrahend change: $+2x^3 \\to -2x^3$, $+3x^2 \\to -3x^2$, $-8x \\to +8x$, and $-14 \\to +14$."
            },
            {
              step: "Step 2: Group like terms by descending powers of $x$.",
              math: "= (4x^3 - 2x^3) + (-7x^2 - 3x^2) + (5x + 8x) + (-9 + 14)",
              explanation: "Grouping allows systematic arithmetic of coefficients."
            },
            {
              step: "Step 3: Combine coefficients of like terms.",
              math: "= 2x^3 - 10x^2 + 13x + 5",
              explanation: "The resulting polynomial is in standard form with degree 3 (cubic) and 4 terms."
            }
          ]
        },
        {
          id: "ex-1-2",
          problem: "Evaluate and simplify the multi-variable expression: $(3a^2b - 5ab^2 + 7) + (2a^2b + 8ab^2 - 11) - (6a^2b - ab^2 + 4)$",
          steps: [
            {
              step: "Step 1: Remove parentheses and distribute the negative sign for the third group.",
              math: "= 3a^2b - 5ab^2 + 7 + 2a^2b + 8ab^2 - 11 - 6a^2b + ab^2 - 4",
              explanation: "Ensure the third group changes: $- (6a^2b - ab^2 + 4) = -6a^2b + ab^2 - 4$."
            },
            {
              step: "Step 2: Group like variable terms ($a^2b$, $ab^2$, and constants).",
              math: "= (3 + 2 - 6)a^2b + (-5 + 8 + 1)ab^2 + (7 - 11 - 4)",
              explanation: "Be careful not to mix $a^2b$ with $ab^2$, as their powers on $a$ and $b$ differ."
            },
            {
              step: "Step 3: Simplify.",
              math: "= -a^2b + 4ab^2 - 8",
              explanation: "Final simplified expression."
            }
          ]
        }
      ],
      misconceptions: [
        {
          title: "The Incomplete Negative Distribution",
          badMath: "-(2x^2 - 5x + 3) \\neq -2x^2 - 5x + 3",
          correction: "-(2x^2 - 5x + 3) = -2x^2 + 5x - 3",
          pedagogicalTip: "Students frequently negate only the leading term and leave the remaining terms unchanged. Guide students to explicitly insert a '$-1$' before parentheses: $-1(2x^2 - 5x + 3)$."
        },
        {
          title: "Confusing Unlike Terms With Dissimilar Exponents",
          badMath: "3x^2 + 2x^3 \\neq 5x^5 \\quad \\text{or} \\quad 5x^3",
          correction: "3x^2 + 2x^3 \\text{ cannot be combined further.}",
          pedagogicalTip: "Remind future teachers that exponents are tags representing dimensional units (e.g., area vs volume); unlike terms cannot be merged into a single power."
        }
      ]
    },
    {
      id: "mod-2",
      order: 2,
      code: "ALG-02",
      title: "Multiplying Algebraic Expressions",
      summary: "Monomial by polynomial distribution, FOIL method for binomials, and expanding general polynomials using exponent laws.",
      objectives: [
        "Apply the Product Rule of Exponents: $x^m \\cdot x^n = x^{m+n}$.",
        "Multiply monomials by multi-term polynomials using the Distributive Property.",
        "Expand binomial products accurately using the FOIL (First, Outer, Inner, Last) method.",
        "Multiply arbitrary polynomials systematically using the vertical or grid method.",
        "Connect algebraic expansion directly to difference quotients in Calculus 1."
      ],
      theory: `Multiplying algebraic expressions relies on the **Distributive Property**:
$$A(B + C) = AB + AC$$
and the **Product Rule of Exponents**:
$$x^m \\cdot x^n = x^{m+n}$$

### Binomial Multiplication (FOIL):
For any two binomials $(a + b)$ and $(c + d)$:
$$(a + b)(c + d) = \\underbrace{ac}_{\\text{First}} + \\underbrace{ad}_{\\text{Outer}} + \\underbrace{bc}_{\\text{Inner}} + \\underbrace{bd}_{\\text{Last}}$$

### Multiplying Larger Polynomials:
Every term of the first polynomial must multiply every term of the second polynomial:
$$(a + b + c)(d + e + f) = ad + ae + af + bd + be + bf + cd + ce + cf$$
This systematic expansion is foundational when evaluating limits of difference quotients such as $\\frac{f(x+h) - f(x)}{h}$ in Calculus 1.`,
      formulaVault: [
        {
          name: "Product Rule of Exponents",
          formula: "x^m \\cdot x^n = x^{m+n}, \\quad (cx^m)(dx^n) = (c \\cdot d)x^{m+n}"
        },
        {
          name: "FOIL Method for Binomials",
          formula: "(ax + b)(cx + d) = acx^2 + (ad + bc)x + bd"
        },
        {
          name: "General Distributive Expansion",
          formula: "P(x) \\cdot Q(x) = \\sum_{i} p_i x^i \\cdot Q(x)"
        }
      ],
      workedExamples: [
        {
          id: "ex-2-1",
          problem: "Expand and simplify: $(3x - 4)(2x^2 + 5x - 6)$",
          steps: [
            {
              step: "Step 1: Distribute each term of the binomial across the trinomial.",
              math: "= 3x(2x^2 + 5x - 6) - 4(2x^2 + 5x - 6)",
              explanation: "Partition into two simpler distributive multiplications."
            },
            {
              step: "Step 2: Carry out monomial multiplications.",
              math: "= (6x^3 + 15x^2 - 18x) - (8x^2 + 20x - 24)",
              explanation: "Be careful with the negative 4 distribution."
            },
            {
              step: "Step 3: Combine like terms.",
              math: "= 6x^3 + (15x^2 - 8x^2) + (-18x - 20x) + 24 = 6x^3 + 7x^2 - 38x + 24",
              explanation: "Final standard form expression."
            }
          ]
        },
        {
          id: "ex-2-2",
          problem: "Calculus Preparation: Expand and simplify $f(x+h) = 2(x+h)^2 - 5(x+h) + 1$",
          steps: [
            {
              step: "Step 1: Expand $(x+h)^2 = x^2 + 2xh + h^2$.",
              math: "= 2(x^2 + 2xh + h^2) - 5(x + h) + 1",
              explanation: "Apply the binomial expansion prior to distributing coefficients."
            },
            {
              step: "Step 2: Distribute the coefficients 2 and -5.",
              math: "= 2x^2 + 4xh + 2h^2 - 5x - 5h + 1",
              explanation: "Notice the middle term $4xh$, which produces the derivative term in Calculus 1."
            }
          ]
        }
      ],
      misconceptions: [
        {
          title: "Multiplying Exponents Instead of Adding",
          badMath: "(3x^2)(2x^3) \\neq 6x^6",
          correction: "(3x^2)(2x^3) = 6x^{2+3} = 6x^5",
          pedagogicalTip: "Students often multiply powers because the operation is multiplication. Use expanded notation: $(x \\cdot x) \\cdot (x \\cdot x \\cdot x) = x^5$ to reinforce the concept."
        },
        {
          title: "Missing Inner Terms in Multi-term Expansion",
          badMath: "(2x - 3)(x^2 + 4) \\neq 2x^3 - 12",
          correction: "(2x - 3)(x^2 + 4) = 2x^3 + 8x - 3x^2 - 12",
          pedagogicalTip: "Advise students to check the total number of expected terms before combining ($2 \\times 2 = 4$ terms)."
        }
      ]
    },
    {
      id: "mod-3",
      order: 3,
      code: "ALG-03",
      title: "Special Product Formulas",
      summary: "Recognizing and applying rapid shortcut identities: Square of a Binomial, Difference of Squares, Cube of a Binomial, and Sum/Difference of Cubes.",
      objectives: [
        "Memorize and instantly apply the Square of a Binomial formulas: $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$.",
        "Apply the Product of Sum and Difference (Difference of Two Squares): $(a+b)(a-b) = a^2 - b^2$.",
        "Expand Cubes of Binomials: $(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3$.",
        "Identify the Product yielding Sum and Difference of Cubes: $(a \\pm b)(a^2 \\mp ab + b^2) = a^3 \\pm b^3$.",
        "Vigorously diagnose and eliminate the infamous 'Freshman's Dream' misconception."
      ],
      theory: `Special product formulas are algebraic identities that bypass tedious manual distribution. In Calculus 1, instant recognition of these patterns is essential when rationalizing numerators, finding limits, and evaluating derivatives via definition.

### Summary of Special Products:
1. **Square of a Binomial:**
   $$(a + b)^2 = a^2 + 2ab + b^2$$
   $$(a - b)^2 = a^2 - 2ab + b^2$$
2. **Product of a Sum and Difference (Difference of Two Squares):**
   $$(a + b)(a - b) = a^2 - b^2$$
3. **Cube of a Binomial:**
   $$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$$
   $$(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$$
4. **Product yielding Sum / Difference of Two Cubes:**
   $$(a + b)(a^2 - ab + b^2) = a^3 + b^3$$
   $$(a - b)(a^2 + ab + b^2) = a^3 - b^3$$`,
      formulaVault: [
        {
          name: "Square of Binomial (Sum)",
          formula: "(a + b)^2 = a^2 + 2ab + b^2"
        },
        {
          name: "Square of Binomial (Difference)",
          formula: "(a - b)^2 = a^2 - 2ab + b^2"
        },
        {
          name: "Difference of Two Squares",
          formula: "(a + b)(a - b) = a^2 - b^2"
        },
        {
          name: "Cube of a Binomial (Sum & Diff)",
          formula: "(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3"
        },
        {
          name: "Sum and Difference of Cubes",
          formula: "(a \\pm b)(a^2 \\mp ab + b^2) = a^3 \\pm b^3"
        }
      ],
      workedExamples: [
        {
          id: "ex-3-1",
          problem: "Expand using special product formulas: $(3x^2 - 5y)^2$",
          steps: [
            {
              step: "Step 1: Identify components $a$ and $b$ in the formula $(a - b)^2 = a^2 - 2ab + b^2$.",
              math: "a = 3x^2, \\quad b = 5y",
              explanation: "Explicitly labeling $a$ and $b$ prevents substitution mistakes."
            },
            {
              step: "Step 2: Substitute into $a^2 - 2ab + b^2$.",
              math: "= (3x^2)^2 - 2(3x^2)(5y) + (5y)^2",
              explanation: "Notice the middle term has a negative sign while the last term is strictly positive."
            },
            {
              step: "Step 3: Simplify each term.",
              math: "= 9x^4 - 30x^2y + 25y^2",
              explanation: "Ensure $(3x^2)^2 = 9x^4$ and $(5y)^2 = 25y^2$."
            }
          ]
        },
        {
          id: "ex-3-2",
          problem: "Multiply without standard FOIL: $(2x + 7)(2x - 7)$",
          steps: [
            {
              step: "Step 1: Recognize the pattern $(a + b)(a - b) = a^2 - b^2$.",
              math: "a = 2x, \\quad b = 7",
              explanation: "Because outer and inner terms cancel ($+14x - 14x = 0$), only $a^2 - b^2$ remains."
            },
            {
              step: "Step 2: Compute $a^2 - b^2$.",
              math: "= (2x)^2 - (7)^2 = 4x^2 - 49",
              explanation: "Clean and instantaneous binomial difference."
            }
          ]
        },
        {
          id: "ex-3-3",
          problem: "Expand the cube of a binomial: $(2x - 3)^3$",
          steps: [
            {
              step: "Step 1: Apply $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$ where $a = 2x, b = 3$.",
              math: "= (2x)^3 - 3(2x)^2(3) + 3(2x)(3)^2 - (3)^3",
              explanation: "Signs alternate: positive, negative, positive, negative."
            },
            {
              step: "Step 2: Simplify each term.",
              math: "= 8x^3 - 3(4x^2)(3) + 3(2x)(9) - 27 = 8x^3 - 36x^2 + 54x - 27",
              explanation: "Crucial for expanding $(x+h)^3$ in Calculus 1 cubic derivatives."
            }
          ]
        }
      ],
      misconceptions: [
        {
          title: "The 'Freshman's Dream' (Omission of Middle Term)",
          badMath: "(a + b)^2 \\neq a^2 + b^2 \\quad \\text{and} \\quad (a - b)^2 \\neq a^2 - b^2",
          correction: "(a + b)^2 = a^2 + 2ab + b^2",
          pedagogicalTip: "This is arguably the most common algebra blunder in Calculus. Show geometric proof: a square with side length $(a+b)$ has total area $a^2 + 2ab + b^2$, not just $a^2 + b^2$."
        },
        {
          title: "Sign Error in the Middle Term of Cubes",
          badMath: "(a - b)^3 \\neq a^3 - 3a^2b - 3ab^2 - b^3",
          correction: "(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3",
          pedagogicalTip: "Highlight that $(-b)^2 = +b^2$, so the third term must have a plus sign."
        }
      ]
    },
    {
      id: "mod-4",
      order: 4,
      code: "ALG-04",
      title: "Factoring Common Factors (GCF)",
      summary: "Finding the Greatest Common Factor (GCF) of numerical coefficients and variable terms, factoring binomial common factors.",
      objectives: [
        "Determine the Greatest Common Factor (GCF) of polynomial coefficients and variables.",
        "Factor out monomial common factors using the Distributive Property in reverse.",
        "Recognize and factor out common binomial expressions such as $a(x-1) + b(x-1)$.",
        "Handle negative leading coefficients by factoring out negative GCFs.",
        "Emphasize GCF extraction as the mandatory first step in any factoring strategy."
      ],
      theory: `Factoring is the inverse process of multiplication. The very first rule of factoring any polynomial is:
> **Always look for and factor out the Greatest Common Factor (GCF) first!**

### Finding the GCF:
1. **Coefficients:** Find the greatest positive integer that divides all numerical coefficients.
2. **Variables:** For each common variable base, take the **smallest exponent** that appears across all terms.
3. **Factoring Out:** Divide each term of the original polynomial by the GCF:
$$A \\cdot B + A \\cdot C = A(B + C)$$

### Factoring with Negative Leading Coefficients:
If the leading term is negative, it is almost always best practice in Pre-Calculus to factor out the negative sign:
$$-6x^3 + 15x^2 - 9x = -3x(2x^2 - 5x + 3)$$`,
      formulaVault: [
        {
          name: "Monomial GCF Principle",
          formula: "c x^k \\cdot P(x) + c x^k \\cdot Q(x) = c x^k \\left[ P(x) + Q(x) \\right]"
        },
        {
          name: "Smallest Exponent Rule",
          formula: "\\text{GCF}(x^m, x^n) = x^{\\min(m,n)}"
        },
        {
          name: "Negative Leading Term Rule",
          formula: "-ax^n - bx^{n-1} = -(ax^n + bx^{n-1})"
        }
      ],
      workedExamples: [
        {
          id: "ex-4-1",
          problem: "Factor completely: $12x^5y^2 - 18x^3y^4 + 24x^2y^3$",
          steps: [
            {
              step: "Step 1: Determine the GCF of the numerical coefficients $(12, 18, 24)$.",
              math: "\\text{GCF}(12, 18, 24) = 6",
              explanation: "6 is the greatest integer dividing 12, 18, and 24."
            },
            {
              step: "Step 2: Determine the GCF of the variables $x$ and $y$.",
              math: "x^{\\min(5,3,2)} = x^2, \\quad y^{\\min(2,4,3)} = y^2 \\implies \\text{GCF} = 6x^2y^2",
              explanation: "Select the lowest power present in every term."
            },
            {
              step: "Step 3: Divide each term by the GCF $6x^2y^2$.",
              math: "= 6x^2y^2 \\left( \\frac{12x^5y^2}{6x^2y^2} - \\frac{18x^3y^4}{6x^2y^2} + \\frac{24x^2y^3}{6x^2y^2} \\right)",
              explanation: "Use exponent subtraction laws."
            },
            {
              step: "Step 4: Write the final factored expression.",
              math: "= 6x^2y^2(2x^3 - 3xy^2 + 4y)",
              explanation: "Verify by redistributing: multiplying back must yield the original polynomial."
            }
          ]
        },
        {
          id: "ex-4-2",
          problem: "Factor out the common binomial factor: $5x(2x - 3) - 7(2x - 3)$",
          steps: [
            {
              step: "Step 1: Identify the common factor shared by both terms.",
              math: "\\text{Common factor is the binomial } (2x - 3)",
              explanation: "Binomials inside parentheses can act as single algebraic units."
            },
            {
              step: "Step 2: Factor out $(2x - 3)$.",
              math: "= (2x - 3)(5x - 7)",
              explanation: "This principle serves as the second half of factoring by grouping."
            }
          ]
        }
      ],
      misconceptions: [
        {
          title: "Dropping the '1' When a Term Equals the GCF",
          badMath: "4x^3 + 2x \\neq 2x(2x^2) \\quad \\text{[Missing 1!]}",
          correction: "4x^3 + 2x = 2x(2x^2 + 1)",
          pedagogicalTip: "Students often think that when a term is identical to the GCF, it vanishes to zero. Emphasize that $\\frac{2x}{2x} = 1$, not $0$."
        },
        {
          title: "Incomplete GCF Factoring",
          badMath: "12x^4 - 8x^2 = 2x(6x^3 - 4x) \\quad \\text{[Incomplete!]}",
          correction: "12x^4 - 8x^2 = 4x^2(3x^2 - 2)",
          pedagogicalTip: "Always inspect the polynomial remaining in parentheses to confirm that no common factors remain."
        }
      ]
    },
    {
      id: "mod-5",
      order: 5,
      code: "ALG-05",
      title: "Factoring Trinomials",
      summary: "Factoring monic trinomials ($x^2 + bx + c$) and non-monic trinomials ($ax^2 + bx + c$) using sum-and-product reasoning and the ac-method.",
      objectives: [
        "Factor monic trinomials $x^2 + bx + c$ by finding integer pairs satisfying $p \\cdot q = c$ and $p + q = b$.",
        "Master the $ac$-method for non-monic trinomials $ax^2 + bx + c$ ($a \\neq 1$).",
        "Systematically analyze signs of $b$ and $c$ to deduce factor signs.",
        "Recognize prime (non-factorable over integers) trinomials.",
        "Equip pre-service teachers with diagnostic methods to explain why trial-and-error works."
      ],
      theory: `A quadratic trinomial has the general form $ax^2 + bx + c$.

### Case 1: Monic Trinomials ($a = 1$)
$$x^2 + bx + c = (x + p)(x + q)$$
Multiplying $(x+p)(x+q) = x^2 + (p+q)x + pq$. Therefore, we must find two integers $p$ and $q$ such that:
$$p \\cdot q = c \\quad \\text{and} \\quad p + q = b$$

**Sign Guidelines:**
- If $c > 0$: Both $p$ and $q$ have the **same sign** (matching the sign of $b$).
- If $c < 0$: $p$ and $q$ have **opposite signs** (the one with larger absolute value takes the sign of $b$).

### Case 2: Non-Monic Trinomials ($a \\neq 1$) via the $ac$-Method
1. Multiply $a \\cdot c$.
2. Find two factors of the product $ac$ that add up to $b$.
3. Split the middle term $bx$ into those two terms: $bx = px + qx$.
4. Factor the resulting 4-term polynomial by grouping.`,
      formulaVault: [
        {
          name: "Monic Trinomial Condition",
          formula: "x^2 + bx + c = (x + p)(x + q) \\iff p \\cdot q = c \\text{ and } p + q = b"
        },
        {
          name: "The ac-Method Setup",
          formula: "ax^2 + bx + c \\to ax^2 + px + qx + c, \\quad p \\cdot q = ac, \\; p + q = b"
        },
        {
          name: "Discriminant Factorability Check",
          formula: "D = b^2 - 4ac \\text{ is a perfect square } \\iff \\text{factorable over } \\mathbb{Q}"
        }
      ],
      workedExamples: [
        {
          id: "ex-5-1",
          problem: "Factor completely: $x^2 - 7x - 18$",
          steps: [
            {
              step: "Step 1: Identify $b = -7$ and $c = -18$.",
              math: "p \\cdot q = -18, \\quad p + q = -7",
              explanation: "Because $c = -18$ is negative, the factors must have opposite signs."
            },
            {
              step: "Step 2: List pairs of factors of -18.",
              math: "(1, -18) \\to -17, \\quad (2, -9) \\to -7, \\quad (3, -6) \\to -3",
              explanation: "The pair $(2, -9)$ sums to $-7$."
            },
            {
              step: "Step 3: Write the factored form.",
              math: "= (x + 2)(x - 9)",
              explanation: "Check: $(x+2)(x-9) = x^2 - 9x + 2x - 18 = x^2 - 7x - 18$."
            }
          ]
        },
        {
          id: "ex-5-2",
          problem: "Factor using the ac-method: $6x^2 + 11x - 10$",
          steps: [
            {
              step: "Step 1: Compute $a \\cdot c = 6 \\cdot (-10) = -60$.",
              math: "a \\cdot c = -60, \\quad b = 11",
              explanation: "Find two numbers multiplying to -60 and adding to +11."
            },
            {
              step: "Step 2: Find the matching factor pair.",
              math: "15 \\times (-4) = -60 \\quad \\text{and} \\quad 15 + (-4) = 11",
              explanation: "The pair is $+15$ and $-4$."
            },
            {
              step: "Step 3: Split the middle term $11x$ into $15x - 4x$.",
              math: "= 6x^2 + 15x - 4x - 10",
              explanation: "Rewriting the middle term prepares the expression for grouping."
            },
            {
              step: "Step 4: Factor by grouping.",
              math: "= 3x(2x + 5) - 2(2x + 5) = (2x + 5)(3x - 2)",
              explanation: "Both binomial groups share $(2x + 5)$."
            }
          ]
        }
      ],
      misconceptions: [
        {
          title: "Sign Confusion When $c$ is Negative",
          badMath: "x^2 - 5x - 6 \\neq (x - 2)(x - 3)",
          correction: "x^2 - 5x - 6 = (x - 6)(x + 1)",
          pedagogicalTip: "Students see $-5$ and think $-2 + -3 = -5$, forgetting that $(-2)(-3) = +6$, not $-6$. Remind pre-service teachers to train students to inspect the sign of $c$ first."
        },
        {
          title: "Direct Substitution in Non-Monic Trinomials",
          badMath: "6x^2 + 11x - 10 \\neq (x + 15)(x - 4)",
          correction: "6x^2 + 11x - 10 = (2x + 5)(3x - 2)",
          pedagogicalTip: "Students often forget that when $a \\neq 1$, the numbers found via $ac$ must split the middle term, not simply be dropped into $(x + p)(x + q)$."
        }
      ]
    },
    {
      id: "mod-6",
      order: 6,
      code: "ALG-06",
      title: "Special Factoring Formulas",
      summary: "Mastering the structural recognition of Difference of Two Squares, Perfect Square Trinomials, and Sum and Difference of Two Cubes.",
      objectives: [
        "Factor Differences of Two Squares: $a^2 - b^2 = (a - b)(a + b)$.",
        "Recognize and factor Perfect Square Trinomials: $a^2 \\pm 2ab + b^2 = (a \\pm b)^2$.",
        "Factor Sum and Difference of Two Cubes using SOAP (Same, Opposite, Always Positive): $a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$.",
        "Perform repeated factoring (e.g., $x^4 - 16$).",
        "Clarify why sums of squares ($a^2 + b^2$) do not factor over real numbers."
      ],
      theory: `Special factoring formulas are the exact reverse of special product formulas. Instantaneous structural recognition of these forms is among the highest-leverage skills for Calculus 1.

### 1. Difference of Two Squares
$$a^2 - b^2 = (a - b)(a + b)$$
*Note:* The sum of two squares, $a^2 + b^2$, is **prime** (cannot be factored over the real numbers).

### 2. Perfect Square Trinomials
$$a^2 + 2ab + b^2 = (a + b)^2$$
$$a^2 - 2ab + b^2 = (a - b)^2$$
*Diagnostic test:* Check if the first and last terms are positive squares, and if the middle term is exactly twice the product of their square roots ($2 \\cdot a \\cdot b$).

### 3. Sum and Difference of Two Cubes
$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$
$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$
*Memory Mnemonic: **SOAP***
- **S**ame sign as original inside the binomial $(a \\pm b)$.
- **O**pposite sign in the middle term of the trinomial $(\\mp ab)$.
- **A**lways **P**ositive for the final term $(+ b^2)$.
*Crucial theorem:* The quadratic factor $(a^2 \\mp ab + b^2)$ is **always irreducible** over the real numbers.`,
      formulaVault: [
        {
          name: "Difference of Squares",
          formula: "a^2 - b^2 = (a - b)(a + b)"
        },
        {
          name: "Perfect Square Trinomial",
          formula: "a^2 \\pm 2ab + b^2 = (a \\pm b)^2"
        },
        {
          name: "Sum of Cubes",
          formula: "a^3 + b^3 = (a + b)(a^2 - ab + b^2)"
        },
        {
          name: "Difference of Cubes",
          formula: "a^3 - b^3 = (a - b)(a^2 + ab + b^2)"
        }
      ],
      workedExamples: [
        {
          id: "ex-6-1",
          problem: "Factor completely: $81x^4 - 16$",
          steps: [
            {
              step: "Step 1: Recognize as a Difference of Two Squares where $a = 9x^2$ and $b = 4$.",
              math: "= (9x^2 - 4)(9x^2 + 4)",
              explanation: "Notice that $81x^4 = (9x^2)^2$ and $16 = 4^2$."
            },
            {
              step: "Step 2: Inspect factors to see if either can be factored further.",
              math: "9x^2 - 4 = (3x - 2)(3x + 2), \\quad 9x^2 + 4 \\text{ is prime over } \\mathbb{R}",
              explanation: "The first factor is another difference of squares. The sum of squares cannot be factored over real numbers."
            },
            {
              step: "Step 3: Combine all factors.",
              math: "= (3x - 2)(3x + 2)(9x^2 + 4)",
              explanation: "Factorization is now complete."
            }
          ]
        },
        {
          id: "ex-6-2",
          problem: "Factor the sum of cubes: $27x^3 + 64y^3$",
          steps: [
            {
              step: "Step 1: Identify the cube roots: $a = \\sqrt[3]{27x^3} = 3x$ and $b = \\sqrt[3]{64y^3} = 4y$.",
              math: "a = 3x, \\quad b = 4y",
              explanation: "Ensure cube roots of both coefficients and variables are evaluated."
            },
            {
              step: "Step 2: Apply the SOAP formula $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.",
              math: "= (3x + 4y)\\left[ (3x)^2 - (3x)(4y) + (4y)^2 \\right]",
              explanation: "Same sign (+), Opposite sign (-), Always Positive (+)."
            },
            {
              step: "Step 3: Simplify the terms inside the trinomial.",
              math: "= (3x + 4y)(9x^2 - 12xy + 16y^2)",
              explanation: "Remember: do not put a '2' on the middle term (it is $ab$, not $2ab$)."
            }
          ]
        }
      ],
      misconceptions: [
        {
          title: "Attempting to Factor Sum of Two Squares",
          badMath: "x^2 + 25 \\neq (x + 5)(x + 5) \\quad \\text{nor} \\quad (x - 5)(x + 5)",
          correction: "x^2 + 25 \\text{ is prime over real numbers.}",
          pedagogicalTip: "Students often conflate $x^2 - 25$ with $x^2 + 25$. Point out that expanding $(x+5)(x+5)$ produces $x^2 + 10x + 25$."
        },
        {
          title: "Inserting a '2' in the Trinomial Factor of Cubes",
          badMath: "a^3 - b^3 \\neq (a - b)(a^2 - 2ab + b^2)",
          correction: "a^3 - b^3 = (a - b)(a^2 + ab + b^2)",
          pedagogicalTip: "Students instinctively write $2ab$ by false transfer from the perfect square trinomial formula. Emphasize that the middle term in the cube formula has coefficient 1."
        }
      ]
    },
    {
      id: "mod-7",
      order: 7,
      code: "ALG-07",
      title: "Factoring by Grouping Terms",
      summary: "Partitioning 4-term polynomials into pairs, extracting partial common factors, managing negative signs, and grouping as 3-and-1.",
      objectives: [
        "Factor 4-term polynomials by grouping terms into pairs of two.",
        "Recognize when terms must be rearranged before factoring.",
        "Carefully manage sign changes when factoring a negative GCF from the second pair.",
        "Identify advanced grouping patterns (grouping a 3-term perfect square trinomial minus a square).",
        "Connect factoring by grouping directly to the $ac$-method in quadratic factoring."
      ],
      theory: `When a polynomial has **four or more terms**, there is frequently no single GCF shared by every term. Instead, we partition the terms into groups that each possess a local common factor.

### Standard 2-by-2 Grouping Procedure:
For a 4-term polynomial $Ax^3 + Bx^2 + Cx + D$:
1. Group the first two terms and the last two terms:
$$(Ax^3 + Bx^2) + (Cx + D)$$
2. Factor out the GCF from each individual pair:
$$x^2(Ax + B) + k(Ax + B)$$
3. If the resulting binomials are identical, factor out the common binomial:
$$(Ax + B)(x^2 + k)$$

### Critical Warning: Sign Management on Group 2
If the third term is preceded by a negative sign, factoring out a negative factor requires inverting the sign of the fourth term:
$$ax - ay - bx + by = a(x - y) - b(x - y) = (x - y)(a - b)$$

### Advanced 3-by-1 Grouping:
Sometimes four terms partition as $(a^2 \\pm 2ab + b^2) - c^2 = (a \\pm b)^2 - c^2$, which then factors as a Difference of Two Squares!`,
      formulaVault: [
        {
          name: "Standard 2-by-2 Grouping",
          formula: "ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b)"
        },
        {
          name: "Negative Sign Distribution in Grouping",
          formula: "ax + ay - bx - by = a(x + y) - b(x + y) = (x + y)(a - b)"
        },
        {
          name: "3-by-1 Difference of Squares Grouping",
          formula: "(x^2 + 2xy + y^2) - z^2 = (x + y)^2 - z^2 = (x + y - z)(x + y + z)"
        }
      ],
      workedExamples: [
        {
          id: "ex-7-1",
          problem: "Factor completely: $3x^3 - 6x^2 - 5x + 10$",
          steps: [
            {
              step: "Step 1: Group into pairs.",
              math: "= (3x^3 - 6x^2) + (-5x + 10)",
              explanation: "Keep the negative sign inside the second group initially to avoid sign loss."
            },
            {
              step: "Step 2: Factor out $3x^2$ from the first pair and $-5$ from the second pair.",
              math: "= 3x^2(x - 2) - 5(x - 2)",
              explanation: "Notice: factoring out $-5$ turns $+10$ into $-2$ so both binomials match $(x - 2)$."
            },
            {
              step: "Step 3: Factor out the common binomial $(x - 2)$.",
              math: "= (x - 2)(3x^2 - 5)",
              explanation: "Final factored form."
            }
          ]
        },
        {
          id: "ex-7-2",
          problem: "Factor the advanced 3-by-1 expression: $x^2 - 6x + 9 - y^2$",
          steps: [
            {
              step: "Step 1: Recognize that the first three terms form a perfect square trinomial.",
              math: "= (x^2 - 6x + 9) - y^2 = (x - 3)^2 - y^2",
              explanation: "Notice $(x-3)^2 = x^2 - 6x + 9$."
            },
            {
              step: "Step 2: Factor as a Difference of Two Squares: $A^2 - B^2 = (A - B)(A + B)$.",
              math: "= [(x - 3) - y][(x - 3) + y] = (x - y - 3)(x + y - 3)",
              explanation: "A sophisticated factoring technique frequently encountered in analytic geometry."
            }
          ]
        }
      ],
      misconceptions: [
        {
          title: "Sign Flipping Error on Third and Fourth Terms",
          badMath: "3x^2 - 6x - 2x + 4 \\neq 3x(x - 2) - 2(x + 2)",
          correction: "3x^2 - 6x - 2x + 4 = 3x(x - 2) - 2(x - 2) = (x - 2)(3x - 2)",
          pedagogicalTip: "Students forget that factoring out a '$-2$' changes $+4$ to $-2$. If the binomials do not match, advise them to check their sign factoring immediately."
        },
        {
          title: "Premature Stopping Before Factoring Binomials",
          badMath: "x^2(x + 3) + 4(x + 3) \\quad \\text{[Left in addition form!]}",
          correction: "(x + 3)(x^2 + 4)",
          pedagogicalTip: "Point out to future teachers that an expression with a '+' in the middle is not in factored form. Factoring means expressing as a product."
        }
      ]
    }
  ],
  practiceQuestions: [
    // Level 1: Basic
    {
      id: "pq-1",
      moduleId: "mod-1",
      difficulty: "Basic",
      level: 1,
      title: "Subtracting Polynomials and Distributing Signs",
      question: "Simplify the following expression: $$(5x^2 - 3x + 7) - (2x^2 + 4x - 6)$$",
      options: [
        "3x^2 - 7x + 13", 
        "3x^2 + x + 1",
        "3x^2 - 7x + 1",
        "7x^2 + x + 13"
      ],
      correctIndex: 0,
      hints: [
        "Distribute the negative sign to every term inside the second parentheses: $-(2x^2) - (4x) - (-6)$.",
        "Combine coefficients of like terms: $(5-2)x^2 + (-3-4)x + (7+6)$."
      ],
      solutionExplanation: "Distributing the negative gives: $5x^2 - 3x + 7 - 2x^2 - 4x + 6$. Grouping like terms: $(5-2)x^2 + (-3-4)x + (7+6) = 3x^2 - 7x + 13$.",
      teachingNote: "High school learners often mistakenly write $7 - 6 = 1$ by forgetting to negate $-6$ to $+6$."
    },
    {
      id: "pq-2",
      moduleId: "mod-2",
      difficulty: "Basic",
      level: 1,
      title: "Binomial Multiplication (FOIL)",
      question: "Multiply and simplify: $$(3x - 2)(4x + 5)$$",
      options: [
        "12x^2 + 7x - 10",
        "12x^2 - 7x - 10",
        "12x^2 - 10",
        "12x^2 + 23x - 10"
      ],
      correctIndex: 0,
      hints: [
        "Use FOIL: Multiply First ($3x \\cdot 4x$), Outer ($3x \\cdot 5$), Inner ($-2 \\cdot 4x$), and Last ($-2 \\cdot 5$).",
        "Combine the two middle terms: $15x - 8x$."
      ],
      solutionExplanation: "$\\text{First} = 12x^2$, $\\text{Outer} = +15x$, $\\text{Inner} = -8x$, $\\text{Last} = -10$. Summing: $12x^2 + (15x - 8x) - 10 = 12x^2 + 7x - 10$.",
      teachingNote: "Students often neglect the signs on the inner/outer products; verify that $-2 \\cdot 4x = -8x$."
    },
    {
      id: "pq-3",
      moduleId: "mod-4",
      difficulty: "Basic",
      level: 1,
      title: "Factoring the Greatest Common Factor",
      question: "Factor out the GCF completely: $$18x^4y^3 - 24x^2y^5$$",
      options: [
        "6x^2y^3(3x^2 - 4y^2)",
        "6xy(3x^3y^2 - 4xy^4)",
        "3x^2y^3(6x^2 - 8y^2)",
        "12x^2y^3(1.5x^2 - 2y^2)"
      ],
      correctIndex: 0,
      hints: [
        "Find the greatest integer dividing 18 and 24 (which is 6).",
        "For each variable, take the smallest exponent: for $x$ it is $\\min(4,2)=2$, and for $y$ it is $\\min(3,5)=3$."
      ],
      solutionExplanation: "The GCF is $6x^2y^3$. Dividing the terms: $\\frac{18x^4y^3}{6x^2y^3} = 3x^2$ and $\\frac{24x^2y^5}{6x^2y^3} = 4y^2$. Result: $6x^2y^3(3x^2 - 4y^2)$.",
      teachingNote: "Check that the terms inside parentheses have no remaining common factors: $\\gcd(3,4)=1$ and variable bases are distinct."
    },
    // Level 2: Intermediate
    {
      id: "pq-4",
      moduleId: "mod-3",
      difficulty: "Intermediate",
      level: 2,
      title: "Square of a Binomial with Fractional Exponents / Coefficients",
      question: "Expand using the special product formula: $$(4x^3 - 3y^2)^2$$",
      options: [
        "16x^6 - 24x^3y^2 + 9y^4",
        "16x^6 - 9y^4",
        "16x^5 - 24x^3y^2 + 9y^4",
        "16x^6 + 9y^4"
      ],
      correctIndex: 0,
      hints: [
        "Apply $(a - b)^2 = a^2 - 2ab + b^2$ where $a = 4x^3$ and $b = 3y^2$.",
        "Remember that $(x^3)^2 = x^{3 \\cdot 2} = x^6$ and the middle term is $-2(4x^3)(3y^2)$."
      ],
      solutionExplanation: "$a^2 = (4x^3)^2 = 16x^6$. $2ab = 2(4x^3)(3y^2) = 24x^3y^2$. $b^2 = (3y^2)^2 = 9y^4$. Combining with signs gives $16x^6 - 24x^3y^2 + 9y^4$.",
      teachingNote: "Options B and D target the classic 'Freshman's Dream' error where learners omit the $-24x^3y^2$ term."
    },
    {
      id: "pq-5",
      moduleId: "mod-5",
      difficulty: "Intermediate",
      level: 2,
      title: "Factoring Non-Monic Trinomials (ac-Method)",
      question: "Factor completely over the integers: $$6x^2 - 7x - 20$$",
      options: [
        "(2x - 5)(3x + 4)",
        "(2x + 5)(3x - 4)",
        "(6x - 5)(x + 4)",
        "(x - 5)(6x + 4)"
      ],
      correctIndex: 0,
      hints: [
        "Calculate $ac = 6 \\times (-20) = -120$. We need two factors of $-120$ that sum to $b = -7$.",
        "Test factor pairs: $-15$ and $+8$ multiply to $-120$ and add to $-7$. Split $-7x$ into $-15x + 8x$."
      ],
      solutionExplanation: "Write as $6x^2 - 15x + 8x - 20$. Group: $3x(2x - 5) + 4(2x - 5) = (2x - 5)(3x + 4)$.",
      teachingNote: "Ensure students check their work by testing the inner and outer products: $-15x + 8x = -7x$."
    },
    {
      id: "pq-6",
      moduleId: "mod-6",
      difficulty: "Intermediate",
      level: 2,
      title: "Factoring Difference of Cubes",
      question: "Factor completely: $$27x^3 - 8y^3$$",
      options: [
        "(3x - 2y)(9x^2 + 6xy + 4y^2)",
        "(3x - 2y)(9x^2 - 6xy + 4y^2)",
        "(3x - 2y)(9x^2 + 12xy + 4y^2)",
        "(3x - 2y)^3"
      ],
      correctIndex: 0,
      hints: [
        "Identify $a = \\sqrt[3]{27x^3} = 3x$ and $b = \\sqrt[3]{8y^3} = 2y$.",
        "Use the SOAP formula for difference of cubes: $(a - b)(a^2 + ab + b^2)$. Note the middle term is $+ab$, not $+2ab$."
      ],
      solutionExplanation: "Using $a = 3x, b = 2y$: $(a - b) = (3x - 2y)$. $a^2 = (3x)^2 = 9x^2$. $ab = (3x)(2y) = 6xy$. $b^2 = (2y)^2 = 4y^2$. Result: $(3x - 2y)(9x^2 + 6xy + 4y^2)$.",
      teachingNote: "Option C tests the mistake of inserting $2ab$, while Option B tests the sign mistake."
    },
    // Level 3: Calculus Readiness
    {
      id: "pq-7",
      moduleId: "mod-7",
      difficulty: "Calculus Readiness",
      level: 3,
      title: "Factoring by Grouping to Evaluate a Calculus Limit",
      question: "To evaluate the limit $\\lim_{x \\to 2} \\frac{x^3 - 2x^2 + 4x - 8}{x - 2}$ in Calculus 1, a pre-service teacher must factor the numerator. What is the factored form of $x^3 - 2x^2 + 4x - 8$?",
      options: [
        "(x - 2)(x^2 + 4)",
        "(x - 2)(x - 2)(x + 2)",
        "(x - 2)(x^2 - 4)",
        "(x + 2)(x^2 - 4)"
      ],
      correctIndex: 0,
      hints: [
        "Group into two pairs: $(x^3 - 2x^2) + (4x - 8)$.",
        "Factor $x^2$ from the first pair and $4$ from the second pair."
      ],
      solutionExplanation: "Group: $x^2(x - 2) + 4(x - 2) = (x - 2)(x^2 + 4)$. In Calculus 1, the factor $(x - 2)$ cancels with the denominator, allowing direct substitution $2^2 + 4 = 8$.",
      teachingNote: "This illustrates to future teachers why grouping is immediately necessary in week 2 of Calculus 1 for removable indeterminate forms $\\frac{0}{0}$."
    },
    {
      id: "pq-8",
      moduleId: "mod-2",
      difficulty: "Calculus Readiness",
      level: 3,
      title: "Expanding Difference Quotients: $\\frac{f(x+h) - f(x)}{h}$",
      question: "For $f(x) = 3x^2 - 2x$, expand and simplify the difference quotient numerator: $$f(x+h) - f(x)$$",
      options: [
        "6xh + 3h^2 - 2h",
        "6xh + 3h^2 + 2h",
        "3h^2 - 2h",
        "6xh - 2h"
      ],
      correctIndex: 0,
      hints: [
        "First expand $f(x+h) = 3(x+h)^2 - 2(x+h) = 3(x^2 + 2xh + h^2) - 2x - 2h$.",
        "Subtract $f(x) = 3x^2 - 2x$ and verify that all terms not containing $h$ cancel out."
      ],
      solutionExplanation: "$f(x+h) = 3x^2 + 6xh + 3h^2 - 2x - 2h$. Subtracting $(3x^2 - 2x)$ yields: $(3x^2 - 3x^2) + 6xh + 3h^2 + (-2x - (-2x)) - 2h = 6xh + 3h^2 - 2h$. Dividing by $h$ produces $6x + 3h - 2$, which as $h \\to 0$ gives $f'(x) = 6x - 2$!",
      teachingNote: "Mastery of this expansion prevents pre-service teachers and their students from struggling with the algebraic mechanics of the derivative definition."
    },
    {
      id: "pq-9",
      moduleId: "mod-6",
      difficulty: "Calculus Readiness",
      level: 3,
      title: "Multi-Stage Special Factoring",
      question: "Factor completely over the real numbers: $$x^8 - 256$$",
      options: [
        "(x - 2)(x + 2)(x^2 + 4)(x^4 + 16)",
        "(x^4 - 16)(x^4 + 16)",
        "(x - 2)^4 (x + 2)^4",
        "(x - 2)(x + 2)(x^2 - 4)(x^4 + 16)"
      ],
      correctIndex: 0,
      hints: [
        "First step is a difference of squares: $(x^4 - 16)(x^4 + 16)$.",
        "The factor $(x^4 - 16)$ is another difference of squares: $(x^2 - 4)(x^2 + 4)$, and $(x^2 - 4) = (x - 2)(x + 2)$. Remember that sum of squares like $(x^2+4)$ and $(x^4+16)$ do not factor over $\\mathbb{R}$."
      ],
      solutionExplanation: "$x^8 - 256 = (x^4 - 16)(x^4 + 16) = (x^2 - 4)(x^2 + 4)(x^4 + 16) = (x - 2)(x + 2)(x^2 + 4)(x^4 + 16)$.",
      teachingNote: "Students often leave factorizations half-done or attempt to factor $(x^2+4)$ as $(x+2)^2$."
    }
  ],
  wordwallGames: [
    {
      id: "game-1",
      moduleId: "mod-1",
      title: "Polynomial Operations Speed Sort",
      topic: "Adding & Subtracting Polynomials",
      gameType: "Match-Up / Quiz",
      embedUrl: "https://wordwall.net/embed/406085a8616149d5a7617b4476908588",
      description: "Fast-paced match-up activity to practice classifying polynomial degrees and combining like terms with negative signs.",
      badge: "Degree Master"
    },
    {
      id: "game-2",
      moduleId: "mod-3",
      title: "Special Products & FOIL Challenge",
      topic: "Special Product Formulas & Expansion",
      gameType: "Gameshow / Maze Chase",
      embedUrl: "https://wordwall.net/embed/406085a8616149d5a7617b4476908588",
      description: "Quick-fire questions challenging students to spot the middle term of squared binomials and difference of squares.",
      badge: "Product Prodigy"
    },
    {
      id: "game-3",
      moduleId: "mod-5",
      title: "Factoring Trinomials & Common Factors",
      topic: "Factoring Monic & Non-Monic Trinomials",
      gameType: "Wordwall Wheel / Group Sort",
      embedUrl: "https://wordwall.net/embed/406085a8616149d5a7617b4476908588",
      description: "Categorize quadratic trinomials by their factor pairs and test mental calculation of the ac-method.",
      badge: "Trinomial Tactician"
    },
    {
      id: "game-4",
      moduleId: "mod-6",
      title: "Difference of Squares & Cubes Arcade",
      topic: "Special Factoring Formulas (SOAP Rule)",
      gameType: "Whack-A-Mole / Quiz",
      embedUrl: "https://wordwall.net/embed/406085a8616149d5a7617b4476908588",
      description: "Speed-test your recognition of perfect squares vs perfect cubes and apply the SOAP mnemonic under time pressure.",
      badge: "Formula Champion"
    }
  ]
};

// Expose globally
window.SEED_DATA = SEED_DATA;
