# 🧠 Hiring AI Ethics System — Full Vibe Code Prompt

## Project Overview

Build a **multi-role web application** called **"FaiRe"** — an ethical AI hiring system with bias auditing, transparency, and policy compliance. The app has three user portals: **Applicant**, **Business**, and **Developer**. The UI must be polished, animated, and presentation-ready.

---

## Design System

### Colors
```css
--yellow: #FFE70D;
--red:    #FD3333;
--black:  #0A0A0A;
--white:  #F5F5F5;
--gray:   #1A1A1A;
--muted:  #2E2E2E;
```

### Aesthetic Direction
- **Dark industrial** base (`#0A0A0A` background) with `#FFE70D` yellow as the dominant accent and `#FD3333` red for warnings/errors/violations
- Font pairing: **`Syne`** (display/headings) + **`IBM Plex Mono`** (body/data/code) — load from Google Fonts
- Geometric, grid-based layout with hard edges, no border-radius softness unless intentional
- Micro-animations on every state transition: page loads, button clicks, status changes, step completions
- Use **GSAP** (from cdnjs) for orchestrated animations, **Chart.js** for data visualizations

### External Libraries (load via CDN)
```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">

<!-- GSAP for animation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Chart.js for visualizations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>

<!-- Lucide icons -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/lucide.min.js"></script>
```

---

## File Structure

```
FaiRe/
├── index.html              # Home / Role selector page
├── styles/
│   └── global.css          # Design tokens, shared styles, animations
├── applicant/
│   └── feedback.html       # 2.1 — Applicant feedback / rejection email view
├── business/
│   ├── records.html        # 2.3 — Decision records (login-gated)
│   ├── checkpoints.html    # 3.1 — Three-stage compliance checkpoints
│   └── reviewer.html       # 3.2 — Independent reviewer final sign-off
└── developer/
    ├── data-audit.html     # 1.1 — Data auditing pipeline
    ├── model-training.html # 1.2 — Model training + parity test
    ├── bias-check.html     # 1.3 — AI bias check + manual review
    └── documentation.html  # 2.2 — Document model development
```

---

## Page-by-Page Specifications

---

### `index.html` — Home / Role Selector

**Layout:** Full-screen dark landing page. Centered title "FaiRe" in massive Syne 800 weight. Subtitle: "Ethical AI Hiring Infrastructure." Three large role cards below in a row.

**Role Cards:**
- 🧑‍💼 **Applicant** → links to `applicant/feedback.html`
- 🏢 **Business** → links to `business/records.html`
- 👨‍💻 **Developer** → links to `developer/data-audit.html`

**Animation:** On page load, use GSAP to stagger-reveal the title (slide up + fade), then each card reveals with a 0.15s delay between them. Cards have a hover state that lifts them with a yellow left-border flash.

---

### `styles/global.css` — Shared Styles

Define all CSS variables. Include:
- A `.step-panel` component: horizontal accordion-style layout where each step is a slim vertical tab that expands to full width when active. Steps are labeled Step 1, Step 2, etc. Active step has a `#FFE70D` left border.
- A `.status-badge` for APPROVED (green), FAILED (red `#FD3333`), PENDING (yellow `#FFE70D`) states
- A `.violation-card` with a red left border and monospace text
- A `.progress-bar` styled in yellow fill on dark track
- Navigation breadcrumb at top of every sub-page: role name → feature name
- A reusable `.modal` overlay component

---

### `developer/data-audit.html` — Feature 1.1: Data Auditing

**Concept:** 5-step pipeline visualized as the `.step-panel` accordion.

**Step 1 — Input Raw Data**
- Two file upload zones: "Applicant Data" and "Historical Training Data"
- On upload, show file name and a green checkmark
- Button: "Begin Audit"

**Step 2 — Clean Data**
- Shows a table of detected sensitive fields: Age, Gender, Race, Postcode (proxy)
- Each row has a toggle to confirm stripping. All toggled on by default.
- Shows before/after column count
- Button: "Confirm & Strip Fields"

**Step 3 — Fairness Testing**
- Shows a **Chart.js bar chart**: demographic group vs. historical acceptance rate
- If any group gap > 5%, that bar turns `#FD3333` red and a warning badge appears: "Historical Imbalance Detected"
- Log output below in monospace text (simulated)
- Button: "Run Adversarial Scan"

**Step 4 — Adversarial Model (Secondary AI)**
- Animated scanning sequence: a progress bar fills to 100% with text like "Scanning for hidden proxies..." "Checking postcode correlation..." "Analysing name patterns..."
- Output: a list of `.violation-card` items showing detected hidden proxies (e.g. "Postcode → correlated with ethnicity", "University name → proxy for socioeconomic status")
- Each proxy has a checkbox to flag for human review

**Step 5 — Human Audit**
- Shows flagged proxies from Step 4 in a review table
- Auditor can mark each as: Confirmed Bias / False Positive
- Text area: "Audit Notes"
- Buttons: "Reject Dataset" (red) | "Approve & Proceed to Model Training" (yellow)
- On approve: GSAP animation — green checkmark sweeps across, status badge updates to APPROVED

**Pseudocode reference:**
```
DataAuditing(RawApplicantData, HistoricalTrainingData, SensitiveFields)
→ Combine → StripSensitiveFields → CheckHistoricalImbalances
→ SecondaryAI_AdversarialModel.HuntForProxies
→ IF proxies found → RouteToHumanAuditor
→ RETURN FinalAuditedData
```

---

### `developer/model-training.html` — Feature 1.2: Model Training

**Concept:** 4-step panel layout (matches wireframe Image 7).

**Step 1 — Train Model**
- Dropdown: Select algorithm (RandomSearchCV / Optuna / GridSearchCV)
- Upload or "use audited data" toggle
- Button: "Train Model" → triggers an animated terminal-style log output (simulated training epochs)

**Step 2 — Parity Test**
- After training, shows a **Chart.js grouped bar chart**: rejection rates per demographic group
- A horizontal dashed line marks the 5% threshold
- If any group gap exceeds 5%: red warning banner "Rejection Rate Gap Exceeds 5% — Retraining Required"
- Shows a table: Group A vs Group B | Gap % | Status (PASS / FAIL)
- Button: "Auto-Retrain" (triggers recursive loop animation — counter shows "Attempt 2 of N")
- Button: "Proceed to Bias Check" (enabled only when all gaps ≤ 5%)

**Step 3 — Test**
- Upload a separate test dataset
- Runs validation metrics: Accuracy, Precision, Recall, Fairness Score
- Displayed as animated number counters (count up from 0 to value)
- Button: "Run Full Test"

**Step 4 — Audit**
- Summary card: model ID, timestamp, algorithm used, training data hash, parity result
- Button: "Send to AI Bias Check →" links to `bias-check.html`

**Pseudocode reference:**
```
ModelTraining(AuditedData)
→ TrainModel(Method = RandomSearchCV/Optuna/GridSearchCV)
→ TestAcrossDemographicGroups → IF gap > 5% → RETRAIN (recursive)
→ ELSE → RETURN Model
```

---

### `developer/bias-check.html` — Feature 1.3: AI Bias Check (Manual Review)

**Concept:** 4-step panel. This is the final gate before deployment.

**Step 1 — Check Hard-Coded Company Rules**
- A text area where company rules can be pasted or uploaded
- Button: "Scan Rules"
- Output: list of scanned rules, each tagged as SAFE or DISCRIMINATORY
- Discriminatory ones shown as red `.violation-card` with reason

**Step 2 — Are Manual Rules Discriminatory?**
- If any flagged: block gate shows with message "Deployment Blocked — Discriminatory Rule Detected"
- If clean: green "Rules Cleared" badge appears

**Step 3 — Full Pipeline Validation**
- Animated progress through sub-checks: Fairness Score / Transparency Score / Bias Score
- Each check shown as a filling progress bar
- Final summary panel showing all three scores with PASS/FAIL

**Step 4 — Human Review**
- Reviewer sees full pipeline report
- Toggle list of flagged items — reviewer can mark each as Acknowledged
- Text area: "Reviewer Notes"
- Two outcome buttons:
  - "Flag Bias — Block Deployment" (red, `#FD3333`)
  - "Approve — Clear for Deployment" (yellow, `#FFE70D`)
- On approve: full-screen GSAP celebration — "✓ SYSTEM CLEARED FOR DEPLOYMENT" sweeps across

**Pseudocode reference:**
```
AIBiasCheck(Model, CompanyRules)
→ ReviewHardCodedRules → IF discriminatory → BlockDeployment
→ RunFullPipelineValidation
→ RouteToHumanReviewer → IF BiasDetected → BlockDeployment
→ ELSE → "System cleared for deployment"
```

---

### `developer/documentation.html` — Feature 2.2: Document Model Development

**Layout:** Single-page form with append-only log viewer on the right side.

**Form fields:**
- Model ID (auto-generated, read-only)
- Developer ID (text input)
- Training Data Summary (textarea)
- Model Parameters (key-value pair editor — add/remove rows)
- Sensitive Flags (auto-detected from parameters — shown as yellow tags)
- For each sensitive flag: a required "Written Justification" textarea appears inline
- Plain Language Description (textarea)

**Behavior:**
- If any sensitive flag has an empty justification: "Save Model" button is disabled and shows tooltip "All sensitive parameters require written justification"
- On save: record is appended to the **Append-Only Log** panel on the right (records cannot be deleted — visually show no delete button, add a lock icon)
- Log entries show: timestamp, model ID, developer ID, flags count

**Pseudocode reference:**
```
DocumentModelDevelopment(ModelID, TrainingData, ModelParameters, DeveloperID)
→ SCAN_FOR_SENSITIVE_PARAMETERS → IF flags found → REQUEST_WRITTEN_JUSTIFICATION
→ IF Justification EMPTY → ERROR "Cannot save model"
→ DOCUMENTATION_DATABASE.APPEND_ONLY_INSERT(DevelopmentRecord)
```

---

### `applicant/feedback.html` — Feature 2.1: Applicant Feedback

**Layout:** Clean email-style card, centered on page. Simulate an applicant logging in with their application ID.

**Login:**
- Input: Application ID
- Button: "Check Status"

**Result View (after login):**
- Status badge: ACCEPTED (green) or REJECTED (red)
- If rejected:
  - Section: "Why your application was not successful"
  - List of missing criteria in plain language (no jargon) — e.g. "You did not meet the minimum experience requirement of 3 years in Python"
  - Each missing criterion shown as a card with an icon
- If accepted:
  - "Congratulations! You have been invited to interview."
  - Next steps shown

**Animation:** Status badge animates in with a pop scale effect. Missing criteria cards stagger in one by one.

**Pseudocode reference:**
```
EvaluateCandidate(Resume, JobCriteria)
→ MissingCriteria = AI_Model.Compare(Resume, JobCriteria)
→ IF MissingCriteria NOT EMPTY → ScreenDecisionNotification(reject)
→ GeneratePlainLanguageSummary(MissingCriteria) → SEND_EMAIL
```

---

### `business/records.html` — Feature 2.3: Decision Records

**Login Gate:**
- Staff ID input + password input (masked)
- Button: "Enter"
- On wrong credentials: shake animation on the form, red error text

**Decision Record Table (after login):**
- Columns: App ID | Year | Name | Decision (ACCEPTED / REJECTED badge)
- Sortable columns (click to sort)
- Search bar to filter by name or ID
- Each row is clickable → opens a detail modal

**Detail Modal:**
- Name, App ID, Status badge
- Justification / Summary section (same plain language output as 2.1)
- Model Parameters used
- Feature Weights
- Record Hash (tamper-evidence)
- Buttons: "Exit" | "Flag for Review"
- NO delete or edit button (append-only principle — add a lock icon with tooltip "Records are immutable")

**Pseudocode reference:**
```
RecordScreeningDecision(CandidateID, Resume, ModelParameters, FeatureWeights, Decision, MissingCriteria, RequestingUserID)
→ IF VerifyAccessLevel == UNAUTHORISED → LogAccessEvent → ERROR
→ APPEND_ONLY_INSERT(DecisionRecord with hash)
→ LogAccessEvent("RECORD_CREATED")
```

---

### `business/checkpoints.html` — Feature 3.1: Three-Stage Compliance Checkpoints

**Layout:** Three large stage cards in sequence, connected by arrows. Each stage has a status badge.

**Stage 1 — Pre-Development Legal Check**
- Input: Feature list (textarea or paste JSON)
- Button: "Run Legal Scan"
- Output: Each feature listed with result — APPROVED or VIOLATION
- Violations shown as red `.violation-card`: "Feature: age_filter_rule | Reason: Violates ADEA — age discrimination"
- If any violation: Stage 1 badge = FAILED, Stage 2 locked
- If all clear: Stage 1 badge = APPROVED, Stage 2 unlocks with animation

**Stage 2 — Pre-Testing Ethical Review**
- Three meters (animated progress arcs): Fairness Score | Transparency Score | Bias Score
- Each has a MIN_STANDARD threshold line
- If any score < threshold: badge = FAILED
- If all pass: badge = APPROVED, Stage 3 unlocks

**Stage 3 — Pre-Deployment Legal Audit**
- Checklist: Stage 1 Approved? ✓ | Stage 2 Approved? ✓
- If both approved: "Perform Final Legal Audit" button activates
- Legal audit: upload a legal review document or simulate
- Final sign-off: dropdown "Reviewer Role" (Legal Counsel / Compliance Officer) + signature line
- Buttons: "Approve Deployment" (yellow) | "Reject" (red)
- On approve: animated deployment banner "🚀 DEPLOYMENT AUTHORIZED"

**Pseudocode reference:**
```
pre_development_check(feature_list) → check_against_employment_law → detect_discriminatory_law → RETURN APPROVED/FAILED
pre_testing_review(system_build) → check_fairness + check_transparency + run_bias_test → RETURN APPROVED/FAILED
Stage 3: Verify Stage 1 + Stage 2 → final legal audit → RETURN APPROVED/FAILED
```

---

### `business/reviewer.html` — Feature 3.2: Independent Reviewer

**Layout:** Dashboard for the independent compliance reviewer.

**Header:** Shows reviewer identity (not from dev team — enforced label: "Independent Reviewer — External to Development Team")

**Three checkpoint status overview:**
- Visual pipeline: Stage 1 → Stage 2 → Stage 3 with current status badges
- Each stage has a collapsible details panel

**Review Action Panel:**
- Current stage to review highlighted in yellow
- Reviewer sees: what was checked, results, flags
- Action buttons per stage: "Sign Off ✓" | "Reject & Return"
- Signature + role confirmation required before sign-off

**Audit Trail:**
- Right panel: append-only log of all reviewer actions with timestamps
- Cannot delete entries (lock icon)

**Pseudocode reference:**
```
Independent reviewer has structural obligation to check 3 stages.
Dev team members CANNOT be the reviewer (enforced by role-based access).
Reviewer must have integrity to block deployment under pressure.
```

---

## Animation Guidelines

Use GSAP for:
1. **Page load:** `.from()` stagger on all major elements — slide up 30px + fade in, 0.6s duration, staggered 0.1s
2. **Step transitions:** When a step completes, the panel "collapses" and the next one "expands" — use GSAP `to()` on height/opacity
3. **Status badge reveal:** Scale from 0 → 1.1 → 1 (pop effect) with color flash
4. **Violation card entry:** Slide in from left with red flash on border
5. **Progress bars:** Animate width from 0 to value over 1s with easing
6. **Approval/success:** Full overlay flash of yellow, then fades — "✓ APPROVED" center text
7. **Error/block:** Form shake (translateX oscillation), red border pulse

---

## Shared UI Components (reuse across all pages)

- **Top nav bar:** "FaiRe" logo left, breadcrumb center, role badge right (color-coded per role)
- **Step panel:** Horizontal layout, slim inactive tabs expand when active, yellow border on active
- **Status badge:** Pill-shaped, color-coded: green = APPROVED, red = FAILED, yellow = PENDING
- **Violation card:** Dark card, `#FD3333` left border, monospace text, icon on left
- **Append-only log:** Scrollable panel, entries show timestamp + action, lock icon in header, no delete controls
- **Modal overlay:** Dark semi-transparent backdrop, card pops in with GSAP scale animation
- **Progress arc:** SVG circle chart for score meters (like a gauge)

---

## Important Notes

1. All pseudocode logic must be simulated faithfully in the UI — every branch (APPROVED / FAILED / BLOCKED) must be reachable through the interface
2. Role-based access: Developer pages should not link to Business pages directly — routing goes through Home
3. Append-only principle: No delete buttons anywhere on record/log views
4. The 5% parity threshold is a hard rule — if the gap exceeds it, the "Proceed" button must be disabled until retraining
5. Independent reviewer cannot be from the dev team — simulate this with a role check on login
6. Every sensitive model parameter MUST have a written justification before saving — enforce this in the form
