import type { CourseCurriculum } from '../../types'

/**
 * AI & MACHINE LEARNING — applied ML for security-minded engineers.
 *
 * "AI & Machine Learning" (course id: ai-ml). A standalone Intermediate course
 * (no trackId) that takes a learner with basic programming comfort to an entry
 * ML Engineer / AI-Security Analyst, built and assessed end-to-end on real data.
 *
 * Strategic bet: AI/ML is the #1 cybersecurity skills gap of 2025 (cited by 41%
 * of teams). Rather than teach ML in the abstract, every applied module bridges
 * to Cyber Vidya's security focus — phishing/spam classification, log anomaly
 * detection, and alert-triage augmentation — so graduates are immediately useful
 * to a SOC, not just to a data team.
 *
 * Mirrors the flagship template (src/data/curriculum/career-program.ts) at
 * STRUCTURAL depth: complete module/lesson metadata throughout, with full block
 * depth on the 2–3 most important lessons (Stage-2 Python/ML fundamentals and the
 * Stage-3 AI-in-security application).
 *
 * Pedagogy baked into the shape (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min; coding labs/projects run longer.
 *  - Every module interleaves theory → coding lab → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Soft skills via model-documentation / results-communication reflection blocks.
 *  - NICE Work Role + Competency mapping on every module.
 */
export const aiMlCurriculum: CourseCurriculum = {
  courseId: 'ai-ml',
  title: 'AI & Machine Learning',
  format: 'Self-paced + cohort mentorship',
  totalEstimatedHours: 132,
  weeklyCommitment: '9–11 hrs/week (≈12 weeks)',
  outcomeRole: 'ML Engineer (entry) / AI-Security Analyst',
  capstoneCert: 'AWS Certified Machine Learning – Specialty / Microsoft Azure AI Fundamentals (AI-900)',
  niceWorkRoles: [
    'Data Analyst',
    'AI/ML Security Specialist',
    'Cyber Defense Analyst (ML-augmented)',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 2 · PYTHON & ML FUNDAMENTALS                              */
    /* ============================================================== */

    /* -------- M1: Python for Data (FULLY FLESHED) ---------------- */
    {
      id: 'aiml-m1',
      title: 'Python for Data & ML',
      tagline: 'The toolkit every model is built with.',
      stage: 2,
      estimatedHours: 20,
      summary:
        'Stand up a reproducible Python data stack and get fluent with the libraries the rest of the course leans on: NumPy arrays, pandas DataFrames, and quick plotting. You will load, clean and explore a real security-relevant dataset from the very first week.',
      objectives: [
        'Set up a reproducible Python environment with virtualenv and Jupyter',
        'Manipulate tabular data with pandas: load, filter, group and aggregate',
        'Use NumPy arrays and vectorized operations for numeric work',
        'Run a basic exploratory data analysis (EDA) on a real dataset',
      ],
      nice: {
        competencies: ['Programming', 'Data Analysis'],
        workRoles: ['Data Analyst', 'AI/ML Security Specialist'],
      },
      prerequisites: ['Basic programming comfort (variables, loops, functions in any language)'],
      masteryRequired: true,
      lessons: [
        {
          id: 'aiml-m1-l1',
          title: 'The Data Stack & Your ML Workbench',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Why Python won data science, the core libraries (NumPy, pandas, scikit-learn, matplotlib), and a reproducible Jupyter environment you will reuse for every project.',
          objectives: [
            'Explain what each core library in the stack is for',
            'Create an isolated virtualenv and launch Jupyter',
            'Run and document a notebook cell',
          ],
          blocks: [
            {
              id: 'aiml-m1-l1-b1',
              type: 'concept',
              title: 'The four libraries you will use constantly',
              body:
                'Almost all applied ML in this course rests on four libraries:\n\n- **NumPy** — fast numeric arrays; the math layer everything else sits on.\n- **pandas** — labelled tables (DataFrames) for loading and cleaning real data.\n- **scikit-learn** — the algorithms: train/test splits, models, metrics.\n- **matplotlib** — quick plots so you can *see* your data and your results.\n\nLearn these and you can read most ML code you will encounter on the job.',
            },
            {
              id: 'aiml-m1-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'Reproducibility is not optional',
              body:
                'A model that only runs on your laptop is worthless to a team. Pin your environment (a `requirements.txt`), set a random seed, and keep your work in a notebook that runs top-to-bottom without errors. "It worked yesterday" is the most expensive sentence in ML.',
            },
            {
              id: 'aiml-m1-l1-b3',
              type: 'check',
              question: {
                prompt: 'Which library would you reach for first to load a CSV of email metadata and filter the rows flagged as spam?',
                options: [
                  { id: 'a', label: 'matplotlib' },
                  { id: 'b', label: 'pandas' },
                  { id: 'c', label: 'NumPy' },
                  { id: 'd', label: 'scikit-learn' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'pandas owns tabular load/clean/filter. NumPy is the numeric layer underneath; scikit-learn trains models; matplotlib plots — all come later in the pipeline.',
              },
            },
          ],
        },
        {
          id: 'aiml-m1-l2',
          title: 'pandas: Load, Clean & Shape Real Data',
          kind: 'interactive',
          estimatedMinutes: 28,
          summary:
            'The everyday pandas skills — reading files, handling missing values, filtering, grouping and aggregating — practised on a messy, real-world security dataset.',
          objectives: [
            'Load a CSV into a DataFrame and inspect its shape and types',
            'Handle missing values and basic data-quality issues',
            'Filter, group and aggregate to answer a concrete question',
          ],
          blocks: [
            {
              id: 'aiml-m1-l2-b1',
              type: 'concept',
              title: 'Real data is dirty',
              body:
                'Public datasets are tidy; production data is not. Logs have malformed rows, timestamps in three formats, missing fields and duplicates. **80% of ML work is data wrangling** — getting comfortable cleaning data is the single highest-leverage skill in this module.',
            },
            {
              id: 'aiml-m1-l2-b2',
              type: 'lab',
              title: 'Lab: Wrangle a Phishing-Email Dataset',
              body:
                'Load a public phishing/ham email dataset, drop duplicates, fill or remove missing fields, and answer: what fraction of messages are phishing, and which sender domains appear most often? Submit the notebook.',
            },
          ],
        },
        {
          id: 'aiml-m1-l3',
          title: 'NumPy & Vectorized Thinking',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Arrays, broadcasting and why vectorized code beats Python loops for numeric work.',
          objectives: [
            'Create and index NumPy arrays',
            'Replace a loop with a vectorized operation',
          ],
          blocks: [],
        },
        {
          id: 'aiml-m1-l4',
          title: 'Exploratory Data Analysis (EDA)',
          kind: 'project',
          estimatedMinutes: 35,
          summary:
            'Profile a dataset before modelling: distributions, class balance, correlations and the plots that surface problems early.',
          objectives: [
            'Summarize distributions and spot class imbalance',
            'Produce plots that reveal signal and data-quality issues',
            'Write a short EDA findings note',
          ],
          blocks: [
            {
              id: 'aiml-m1-l4-b1',
              type: 'reflection',
              title: 'Communicate what you found',
              body:
                'In 4–5 sentences, summarize your EDA for a non-technical teammate: what the dataset contains, whether the classes are balanced, and one risk you spotted (e.g. leakage or imbalance). Clear write-ups are how ML work earns trust — this is a portfolio habit you will repeat all course.',
            },
          ],
        },
      ],
      assessment: {
        id: 'aiml-m1-assessment',
        title: 'Data Wrangling Notebook',
        type: 'project',
        description:
          'Submit a runnable notebook that loads a provided messy dataset, cleans it, and answers three analysis questions with one supporting plot each, plus a short written summary. Peer + mentor reviewed. ≥80% unlocks Module 2.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* -------- M2: ML Foundations (rich sample lesson) ------------ */
    {
      id: 'aiml-m2',
      title: 'Machine Learning Foundations',
      tagline: 'What learning from data actually means.',
      stage: 2,
      estimatedHours: 22,
      summary:
        'The mental model behind every algorithm: supervised vs unsupervised learning, features and labels, the train/validation/test split, and the bias–variance trade-off that explains why models overfit. You will train your first classifier end to end.',
      objectives: [
        'Distinguish supervised, unsupervised and the role of features vs labels',
        'Split data correctly and explain why a held-out test set matters',
        'Describe overfitting/underfitting via the bias–variance trade-off',
        'Train and run a first classifier with scikit-learn',
      ],
      nice: {
        competencies: ['Machine Learning Fundamentals', 'Data Analysis'],
        workRoles: ['Data Analyst', 'AI/ML Security Specialist'],
      },
      prerequisites: ['aiml-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'aiml-m2-l1',
          title: 'Supervised vs Unsupervised: The Map of ML',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'The two big families of learning and where security problems land on the map.',
          objectives: [
            'Distinguish supervised from unsupervised learning with examples',
            'Frame a security problem as classification, regression or clustering',
          ],
          blocks: [
            {
              id: 'aiml-m2-l1-b1',
              type: 'concept',
              title: 'Learning with and without labels',
              body:
                '**Supervised learning** trains on examples that already carry the answer (a **label**): emails marked spam/ham, logins marked malicious/benign. The model learns the mapping from **features** (the inputs) to the label, then predicts on new data. **Unsupervised learning** has no labels — it finds structure on its own, e.g. **clustering** similar log entries or flagging **anomalies** that do not fit the pattern.',
            },
            {
              id: 'aiml-m2-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Why security uses both',
              body:
                'Phishing classification is **supervised** — you have labelled examples. But novel attacks have no labels yet, so log **anomaly detection** is often **unsupervised**: learn "normal" and surface the outliers. A strong AI-Security Analyst knows which framing fits which problem.',
            },
            {
              id: 'aiml-m2-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'You have a year of network flows but no labels, and you want to surface unusual hosts that might be compromised. Which framing fits best?',
                options: [
                  { id: 'a', label: 'Supervised classification' },
                  { id: 'b', label: 'Supervised regression' },
                  { id: 'c', label: 'Unsupervised anomaly detection' },
                  { id: 'd', label: 'None — ML cannot help here' },
                ],
                correct: ['c'],
                multiple: false,
                explanation:
                  'No labels + "find the unusual ones" is textbook unsupervised anomaly detection. With a labelled malicious/benign set you could instead train a supervised classifier.',
              },
            },
          ],
        },
        {
          id: 'aiml-m2-l2',
          title: 'Train, Validate, Test — Without Cheating',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'Why you split data, what each split is for, and the leakage traps that inflate scores.',
          objectives: [
            'Explain the purpose of train/validation/test splits',
            'Identify a data-leakage mistake that would inflate accuracy',
          ],
          blocks: [
            {
              id: 'aiml-m2-l2-b1',
              type: 'concept',
              title: 'The held-out test set is sacred',
              body:
                'You **train** on one slice, tune on a **validation** slice, and only touch the **test** slice once, at the very end, to estimate real-world performance. If information from the test set leaks into training — even subtly, like fitting a scaler on all the data — your scores look great and collapse in production. Treat the test set like an exam you have not seen.',
            },
            {
              id: 'aiml-m2-l2-b2',
              type: 'check',
              question: {
                prompt: 'Why do we keep a test set completely separate until the end?',
                options: [
                  { id: 'a', label: 'It makes training faster' },
                  { id: 'b', label: 'To get an honest estimate of performance on unseen data' },
                  { id: 'c', label: 'Because scikit-learn requires three splits' },
                  { id: 'd', label: 'To increase the amount of training data' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The test set stands in for the future data the model has never seen. If you tune against it, you are no longer measuring generalization — you are memorizing the exam.',
              },
            },
          ],
        },
        {
          id: 'aiml-m2-l3',
          title: 'Overfitting & the Bias–Variance Trade-off',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Why a model that aces training can fail in the wild, and how to read the symptoms.',
          objectives: [
            'Describe overfitting and underfitting',
            'Relate model complexity to bias and variance',
          ],
          blocks: [],
        },
        {
          id: 'aiml-m2-l4',
          title: 'Your First Classifier, End to End',
          kind: 'project',
          estimatedMinutes: 32,
          summary:
            'Take the cleaned phishing dataset, split it, train a baseline classifier, and read its accuracy — the full loop in one notebook.',
          objectives: [
            'Build features and labels from a cleaned dataset',
            'Train and predict with a scikit-learn estimator',
            'Report a baseline accuracy honestly',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'aiml-m2-assessment',
        title: 'ML Foundations Quiz + Baseline Model',
        type: 'project',
        description:
          'Concept quiz on splits/leakage/overfitting, plus submit a notebook training a baseline classifier with a correct train/test split. Short written justification of one design choice. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 50,
      },
    },

    /* -------- M3: Core Algorithms & Model Building (structural) -- */
    {
      id: 'aiml-m3',
      title: 'Core Algorithms & Model Building',
      tagline: 'The workhorse models — and how to make them earn their keep.',
      stage: 2,
      estimatedHours: 24,
      summary:
        'The algorithms you will actually use: linear/logistic regression, decision trees and random forests, k-NN and clustering. Then the engineering that turns an algorithm into a model — feature engineering, scaling, and cross-validated hyperparameter tuning.',
      objectives: [
        'Explain when to reach for regression vs trees vs distance-based models',
        'Engineer and scale features that improve a model',
        'Tune hyperparameters with cross-validation',
        'Build a clean scikit-learn pipeline from features to prediction',
      ],
      nice: {
        competencies: ['Machine Learning Fundamentals', 'Model Development'],
        workRoles: ['Data Analyst', 'AI/ML Security Specialist'],
      },
      prerequisites: ['aiml-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'aiml-m3-l1',
          title: 'Regression & Logistic Regression',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Predicting a number vs predicting a probability — the two most-used baselines.',
          objectives: ['Fit a regression model', 'Use logistic regression for binary classification'],
          blocks: [],
        },
        {
          id: 'aiml-m3-l2',
          title: 'Decision Trees & Random Forests',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Interpretable trees and the ensemble that usually wins on tabular data.',
          objectives: ['Train a decision tree and read it', 'Explain why a random forest generalizes better'],
          blocks: [],
        },
        {
          id: 'aiml-m3-l3',
          title: 'k-NN & Clustering',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Distance-based classification and k-means clustering for unlabelled data.',
          objectives: ['Apply k-NN to a labelled set', 'Cluster unlabelled data with k-means'],
          blocks: [],
        },
        {
          id: 'aiml-m3-l4',
          title: 'Feature Engineering & Scaling',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'The single biggest lever on model quality: building, encoding and scaling features.',
          objectives: ['Encode categorical features', 'Scale features and explain why it matters for some models'],
          blocks: [],
        },
        {
          id: 'aiml-m3-l5',
          title: 'Hyperparameter Tuning & Pipelines',
          kind: 'project',
          estimatedMinutes: 34,
          summary: 'Cross-validated grid search inside a leak-proof pipeline — the professional way to tune.',
          objectives: [
            'Build an end-to-end scikit-learn pipeline',
            'Tune hyperparameters with cross-validation without leaking',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'aiml-m3-assessment',
        title: 'Model-Building Challenge',
        type: 'project',
        description:
          'Given a tabular dataset, build a tuned pipeline that beats a provided baseline on a held-out set, and submit a notebook plus a short note explaining your feature and model choices. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 75,
      },
    },

    /* -------- M4: Evaluation & Responsible AI (structural) ------- */
    {
      id: 'aiml-m4',
      title: 'Evaluation, Metrics & Responsible AI',
      tagline: 'A model is only as trustworthy as how you measured it.',
      stage: 2,
      estimatedHours: 18,
      summary:
        'Why accuracy lies on imbalanced security data, the metrics that do not (precision, recall, F1, ROC-AUC, confusion matrix), and the responsible-AI guardrails — bias, explainability and the cost of a false negative — that matter when a model decides what gets blocked.',
      objectives: [
        'Read a confusion matrix and choose the right metric for the problem',
        'Explain precision vs recall and the false-positive/false-negative trade-off',
        'Detect class imbalance and handle it',
        'Reason about bias, explainability and the harms of a wrong prediction',
      ],
      nice: {
        competencies: ['Model Evaluation', 'Responsible AI'],
        workRoles: ['Data Analyst', 'AI/ML Security Specialist'],
      },
      prerequisites: ['aiml-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'aiml-m4-l1',
          title: 'Beyond Accuracy: Precision, Recall & F1',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'Why 99% accuracy can be a terrible model, and the metrics that tell the truth.',
          objectives: [
            'Read a confusion matrix',
            'Choose precision vs recall for a given cost trade-off',
          ],
          blocks: [
            {
              id: 'aiml-m4-l1-b1',
              type: 'callout',
              variant: 'industry',
              title: 'False negatives cost more in security',
              body:
                'If 1% of emails are phishing, a model that calls everything "safe" is 99% accurate — and useless. In security a missed attack (**false negative**) is usually far costlier than a false alarm, so you optimize **recall**, then push precision up so analysts are not buried in noise.',
            },
          ],
        },
        {
          id: 'aiml-m4-l2',
          title: 'ROC, AUC & Threshold Tuning',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Trading precision for recall by moving the decision threshold, read off the ROC curve.',
          objectives: ['Interpret a ROC curve and AUC', 'Pick an operating threshold for a stated goal'],
          blocks: [],
        },
        {
          id: 'aiml-m4-l3',
          title: 'Imbalanced Data',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Resampling, class weights and the right metrics when one class is rare — the norm in security.',
          objectives: ['Diagnose class imbalance', 'Apply a resampling or weighting strategy'],
          blocks: [],
        },
        {
          id: 'aiml-m4-l4',
          title: 'Responsible AI: Bias, Explainability & Harm',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'When a model decides what gets blocked, fairness and explainability are not optional.',
          objectives: [
            'Identify sources of bias in data and models',
            'Explain why explainability matters for security decisions',
          ],
          blocks: [
            {
              id: 'aiml-m4-l4-b1',
              type: 'reflection',
              title: 'Whose error is it?',
              body:
                'In 4–5 sentences, describe a realistic harm if your phishing model is biased — e.g. it flags legitimate mail from a region or vendor as malicious. Who is affected, and how would you detect and reduce that bias? Documenting limitations is a core responsibility of an AI-Security Analyst.',
            },
          ],
        },
      ],
      assessment: {
        id: 'aiml-m4-assessment',
        title: 'Evaluation & Ethics Check',
        type: 'quiz',
        description:
          'Quiz on metrics and imbalance plus a short written responsible-AI analysis of a provided model card (sources of bias, chosen metric, and a limitation). ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 30,
      },
    },

    /* ============================================================== */
    /* STAGE 3 · APPLIED AI IN SECURITY                                */
    /* ============================================================== */

    /* -------- M5: AI in Cybersecurity (rich sample lesson) ------- */
    {
      id: 'aiml-m5',
      title: 'AI in Cybersecurity: Detection & Triage',
      tagline: 'Where ML meets the SOC — the bridge to Cyber Vidya’s mission.',
      stage: 3,
      estimatedHours: 26,
      summary:
        'The course’s centre of gravity: build ML that defends. Phishing/spam classification from raw text, unsupervised log anomaly detection, ML-augmented alert triage, and a sober look at adversarial ML — how attackers fool models. This is the #1 skills gap of 2025, made concrete.',
      objectives: [
        'Build a text classifier that detects phishing/spam from message content',
        'Detect anomalies in log data without labels',
        'Explain how ML augments (not replaces) a SOC analyst’s triage',
        'Describe common adversarial attacks against security models',
      ],
      nice: {
        competencies: ['Threat Detection', 'Anomaly Detection', 'Applied Machine Learning'],
        workRoles: ['AI/ML Security Specialist', 'Cyber Defense Analyst (ML-augmented)'],
      },
      prerequisites: ['aiml-m4'],
      masteryRequired: true,
      lessons: [
        {
          id: 'aiml-m5-l1',
          title: 'Why AI Is the #1 Security Skills Gap',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'The 2025 landscape: alert overload, the talent shortage, and where ML genuinely helps.',
          objectives: [
            'Explain why SOCs are turning to ML',
            'Identify which security problems ML fits — and which it does not',
          ],
          blocks: [
            {
              id: 'aiml-m5-l1-b1',
              type: 'concept',
              title: 'ML as a force multiplier for defenders',
              body:
                'A modern SOC drowns in alerts — far more than humans can triage. ML helps in three concrete ways: **classification** (is this email phishing?), **anomaly detection** (is this login normal for this user?), and **prioritization** (which of 10,000 alerts deserves a human first?). It does not replace analysts; it hands them a shorter, smarter queue.',
            },
            {
              id: 'aiml-m5-l1-b2',
              type: 'callout',
              variant: 'india',
              title: 'The 2025 skills gap is your opportunity',
              body:
                'AI/ML is the most-cited cybersecurity skills gap of 2025 — named by **41%** of security teams, ahead of cloud and every other domain. Indian SOCs and product teams are hiring for exactly the AI-Security blend this module builds. Pairing ML skills with security context is one of the most defensible early-career bets you can make.',
            },
            {
              id: 'aiml-m5-l1-b3',
              type: 'check',
              question: {
                prompt: 'Which is the most realistic description of ML’s role in a SOC today?',
                options: [
                  { id: 'a', label: 'It fully replaces human analysts' },
                  { id: 'b', label: 'It triages and prioritizes so analysts focus on what matters' },
                  { id: 'c', label: 'It is only useful for marketing, not security' },
                  { id: 'd', label: 'It guarantees zero false negatives' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'ML augments analysts by shrinking and ranking the queue. It does not replace human judgment and never guarantees zero misses — which is exactly why evaluation (Module 4) matters.',
              },
            },
          ],
        },
        {
          id: 'aiml-m5-l2',
          title: 'Phishing Detection from Text',
          kind: 'interactive',
          estimatedMinutes: 30,
          summary:
            'Turn raw email/SMS text into features (TF-IDF) and train a classifier that flags phishing — the canonical applied-security ML task.',
          objectives: [
            'Vectorize text with TF-IDF',
            'Train and evaluate a phishing/spam classifier',
            'Choose a threshold that respects the false-negative cost',
          ],
          blocks: [
            {
              id: 'aiml-m5-l2-b1',
              type: 'concept',
              title: 'From words to numbers',
              body:
                'Models need numbers, not text. **TF-IDF** scores each word by how often it appears in a message versus how rare it is across the whole corpus, so distinctive words ("verify", "suspended", a lookalike domain) get weight. Feed those vectors to a classifier — logistic regression or a tree ensemble — and you have a working phishing detector.',
            },
            {
              id: 'aiml-m5-l2-b2',
              type: 'lab',
              title: 'Lab: Train a Phishing Classifier',
              body:
                'Using the cleaned dataset from Module 1, build a TF-IDF + classifier pipeline, evaluate with precision/recall/F1, and tune the threshold for high recall. Report the confusion matrix and submit the notebook.',
            },
          ],
        },
        {
          id: 'aiml-m5-l3',
          title: 'Log Anomaly Detection (Unsupervised)',
          kind: 'interactive',
          estimatedMinutes: 28,
          summary:
            'Learn "normal" from log/flow data and surface the outliers — detecting attacks you have no labels for.',
          objectives: [
            'Engineer features from raw log data',
            'Apply an unsupervised anomaly detector (e.g. Isolation Forest)',
            'Interpret and justify the flagged anomalies',
          ],
          blocks: [
            {
              id: 'aiml-m5-l3-b1',
              type: 'lab',
              title: 'Lab: Flag the Anomalous Logins',
              labId: 'log-flag',
              body:
                'Featurize an auth-log sample (failed-login rate, off-hours access, new source IPs), fit an Isolation Forest, and surface the suspicious sessions. Connect each flag back to what a SOC analyst would do next.',
            },
          ],
          labIds: ['log-flag'],
        },
        {
          id: 'aiml-m5-l4',
          title: 'ML-Augmented Alert Triage',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'Scoring and ranking alerts so the human sees the dangerous ones first.',
          objectives: [
            'Explain alert scoring and prioritization with ML',
            'Describe the human-in-the-loop feedback that keeps a model fresh',
          ],
          blocks: [],
        },
        {
          id: 'aiml-m5-l5',
          title: 'Adversarial ML: When Attackers Fight Back',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Evasion, poisoning and model theft — why security models are themselves a target.',
          objectives: [
            'Describe evasion and data-poisoning attacks',
            'Name basic defenses and why monitoring a deployed model matters',
          ],
          blocks: [
            {
              id: 'aiml-m5-l5-b1',
              type: 'reflection',
              title: 'Document the threat model',
              body:
                'In 4–5 sentences, describe one way an attacker could try to evade your phishing classifier (e.g. obfuscated wording, image-only emails) and one thing you would monitor to catch the model degrading in production. Thinking adversarially about your own model is what separates an AI-Security Specialist from a generic data scientist.',
            },
          ],
        },
      ],
      assessment: {
        id: 'aiml-m5-assessment',
        title: 'Applied Security-ML Challenge',
        type: 'lab-challenge',
        description:
          'Given a phishing dataset and a log sample, build one supervised detector and one unsupervised anomaly detector, report the right metrics, and write a short note on a realistic adversarial risk. Scored on technical correctness + clarity of the write-up. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 90,
      },
    },

    /* -------- M6: From Notebook to Production (structural) ------- */
    {
      id: 'aiml-m6',
      title: 'From Notebook to Production',
      tagline: 'A model nobody can deploy is a science project.',
      stage: 3,
      estimatedHours: 16,
      summary:
        'The MLOps basics that make a model real: saving and loading models, serving predictions behind a simple API, monitoring for data drift, and an orientation to the cloud ML services (AWS SageMaker / Azure AI) that your capstone certification covers.',
      objectives: [
        'Serialize a trained model and load it for inference',
        'Serve predictions behind a minimal API',
        'Explain data drift and what to monitor after deployment',
        'Orient to cloud ML services aligned to the capstone certification',
      ],
      nice: {
        competencies: ['Model Deployment', 'Cloud Computing'],
        workRoles: ['AI/ML Security Specialist', 'Data Analyst'],
      },
      prerequisites: ['aiml-m5'],
      masteryRequired: true,
      lessons: [
        {
          id: 'aiml-m6-l1',
          title: 'Saving, Loading & Serving a Model',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'Persist a trained pipeline and stand up a minimal prediction endpoint.',
          objectives: ['Serialize and reload a model', 'Serve a prediction behind a simple API'],
          blocks: [],
        },
        {
          id: 'aiml-m6-l2',
          title: 'Monitoring & Data Drift',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Models decay as the world changes — what to watch so you catch it early.',
          objectives: ['Define data and concept drift', 'List signals that a deployed model is degrading'],
          blocks: [],
        },
        {
          id: 'aiml-m6-l3',
          title: 'Cloud ML & Your Certification Path',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'A tour of managed ML on AWS SageMaker and Azure AI, mapped to the AWS ML / Azure AI-900 certifications this course anchors to.',
          objectives: [
            'Describe what managed cloud ML services provide',
            'Map course skills to the capstone certification objectives',
          ],
          blocks: [],
        },
        {
          id: 'aiml-m6-l4',
          title: 'Packaging Your Work for a Portfolio',
          kind: 'project',
          estimatedMinutes: 28,
          summary: 'Turn a notebook into a clean, documented repo an employer (or interviewer) can run.',
          objectives: [
            'Structure a project repo with a README and pinned environment',
            'Write a model card documenting data, metrics and limitations',
          ],
          blocks: [
            {
              id: 'aiml-m6-l4-b1',
              type: 'reflection',
              title: 'The model card',
              body:
                'Write a one-page model card for your phishing classifier: what data it was trained on, the metrics it achieved, its intended use, and its known limitations. Recruiters and reviewers read the model card before they read your code — make it the front door to your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'aiml-m6-assessment',
        title: 'Deployment & Documentation Check',
        type: 'project',
        description:
          'Submit a packaged repo: a saved model served behind a minimal API, a README that runs cleanly, and a model card. Peer + mentor reviewed. ≥80% to proceed to the practicum.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'aiml-practicum',
    title: 'Applied ML Practicum: Ship a Security Model',
    format: 'Supervised ML build on a real security-relevant dataset',
    durationWeeks: 4,
    summary:
      'An apprenticeship-style phase that turns a trained learner into a day-one-productive ML practitioner. Working under a mentor, the learner takes one real, messy, security-relevant dataset (phishing/spam or log-anomaly) from raw data all the way to a trained, evaluated, documented model — producing the portfolio artifacts an employer can verify and re-run.',
    activities: [
      'Scope a problem and source/clean a real security-relevant dataset under mentor guidance',
      'Engineer features and iterate through several models, tracking experiments',
      'Evaluate honestly with the right metrics and tune the decision threshold for the security cost',
      'Write a model card and a results brief; defend design choices in a mentor review',
      'Present the trained model and findings to a panel role-playing security stakeholders',
    ],
    deliverables: [
      'A trained, serialized model with a runnable inference notebook',
      'An evaluation report: confusion matrix, precision/recall/F1/AUC, and threshold rationale',
      'A reproducible project repo with a README, pinned environment and a model card',
      'A recorded 5-minute results presentation for a non-technical stakeholder',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with an industry ML/AI-security mentor for the duration; daily async check-ins, two live model reviews per week, and a final assessed debrief on the trained model.',
    competencies: [
      'Applied Machine Learning',
      'Model Development',
      'Model Evaluation',
      'Threat Detection',
      'Technical Documentation',
    ],
    softSkills: [
      'Professional written communication (model cards, results briefs)',
      'Communicating model results and limitations to non-technical stakeholders',
      'Experiment discipline and reproducible working habits',
      'Problem-solving under realistic data constraints',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'aiml-badge-python-data',
      title: 'Python for Data',
      description: 'Set up the ML stack and wrangled real data with pandas and NumPy.',
      criteria: 'Pass the mastery check for Module 1.',
      icon: 'code',
    },
    {
      id: 'aiml-badge-ml-builder',
      title: 'ML Model Builder',
      description: 'Built, tuned and evaluated models across the core algorithm families.',
      criteria: 'Pass the mastery checks for Modules 2–4.',
      icon: 'chip',
    },
    {
      id: 'aiml-badge-security-ml',
      title: 'AI-Security Practitioner',
      description: 'Built ML detectors for phishing and log anomalies with sound evaluation.',
      criteria: 'Score ≥80% on the Applied Security-ML Challenge (M5).',
      icon: 'shield',
    },
    {
      id: 'aiml-badge-mlops',
      title: 'Model Deployer',
      description: 'Packaged, served and documented a model for production use.',
      criteria: 'Pass the Deployment & Documentation Check (M6).',
      icon: 'cloud',
    },
    {
      id: 'aiml-badge-graduate',
      title: 'AI & ML Graduate',
      description: 'Completed the full AI & Machine Learning course, practicum and capstone.',
      criteria: 'Earn all module badges, the practicum sign-off, and pass the capstone.',
      icon: 'cert',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'aiml-capstone',
    title: 'AI Capstone: End-to-End Security ML Project',
    type: 'project',
    description:
      'A multi-day capstone built on a real, security-relevant dataset (phishing/spam classification or log-anomaly detection). The learner runs the full lifecycle — data cleaning and EDA, feature engineering, model selection and cross-validated tuning, honest evaluation with the right metrics, and an adversarial-risk review — then delivers (1) a trained, reproducible model, (2) an evaluation report, and (3) a model card plus a stakeholder presentation. Assessed by mentors against the NICE work-role competencies, added to the learner’s portfolio, and aligned to AWS ML / Azure AI-900 exam readiness.',
    passThreshold: 0.8,
    estimatedMinutes: 600,
  },
}
