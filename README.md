# Faire — Ethical AI Hiring Compliance Platform
### FIT1055 - Assignment 2b: Demonstration Technical AI Solution (S1, 2026)

**Faire** is an interactive, high-fidelity Web-based AI hiring compliance platform designed to prevent discriminatory hiring decisions from ever reaching applicants. It embeds algorithmic diligence, strict policy checkpoints, and transparent communication protocols directly into the hiring software pipeline.

A primary design context of the prototype is modeled around the real-world **iTutorGroup age-discrimination lawsuit (EEOC, 2022)**, where recruiting software silently auto-rejected older candidates. **Faire** structurally prevents such unethical practices from being deployed.

---

## 🎨 Visual Identity & Styling
The platform is designed with a premium, clean administrative aesthetic:
- **Fonts**: Poppins (headers & brand display), Lato (body paragraphs & subtitles).
- **Core Palette**:
  - **Main Accent**: `#00988F` (Teal)
  - **Secondary Gradient**: `#4BBAD9` (Light Blue)
  - **Background**: `#F9FAFB` (Off-White / Pale Grey)
  - **Semantic tones**: Emerald Green (Pass / Verified), Rose Red (Warning / Blocked), Amber Gold (Human-in-the-loop audit gates).

---

## 🚀 Key Features Implemented

### 1. Global Stakeholder Perspective Switcher (Top Right)
The interface dynamically morphs its dashboard widgets and actionable options based on who is viewing the platform:
- **Job Applicant (Robert Vance, Age 62)**: Submit resumes, examine transparency feedback, and test human-centric disclosure feeds.
- **AI Developer (Arjun)**: Drive adversarial proxy hunts, configure hyper-parameter weights, and document code parameters.
- **Legal Compliance Officer (Sarah)**: Manage the three-year signoff checkpoints and verify discriminatory specification lists.
- **EEOC External Auditor (Elena)**: Query secure ledger blocks, test database tampering alerts, and inspect RBAC restriction logs.

### 2. Feature 1: Automated Bias Audit Layer (Data & Model)
- **Subfeature 1: Adversarial Proxy Hunter (Virtue Ethics)**: Actively deploys a secondary AI scanning utility to flag hidden proxies (like *Graduation Year* or *Retirement Benefit Plan Eligibility*) that strongly correlate with protected age features.
- **Subfeature 2: Parity Guard Gate (Deontology & Utilitarianism)**: Enforces an unbypassable rule where neural training is blocked if the selection rate gap between demographic groups exceeds a strict **5.0%** threshold. 

### 3. Feature 2: Transparency System & Honest Communication
- **Subfeature 1: Plain-Language Feedback (Deontology)**: Evaluates candidates solely on job skills. Generates clear, custom notifications for candidates explaining the exact criteria they lacked, eliminating confusing jargon and passive rejections.
- **Subfeature 2: Parameter Documentation (Deontology)**: Scans developer code modules. If sensitive indicators exist, saving the model is blocked until a detailed, written ethical justification is provided.
- **Subfeature 3: Cryptographic Append-Only Logs (Deontology)**: Implements block hash indicators (SHA-256 ledger) to maintain audit trails. Attempting to modify or delete logs is blocked by Role-Based Access controls (RBAC) and immediately flags a hashing mismatch alert to auditors.

### 4. Feature 3: Policy Compliance Process (Checkpoints)
- Enforces three-stage sequential code checkpoints:
  1. **Pre-Development Compliance (Checkpoint 1)**: Audits feature checklists against employment laws (ADEA / EEOC). Catch and prune early-stage age filters of unethical code files.
  2. **Pre-Testing Parity (Checkpoint 2)**: Re-validates model weights to ensure selection gaps fall below the 5% threshold before pushing code to QA staging.
  3. **Pre-Deployment Legal Sign-Off (Checkpoint 3)**: Locks system releases until compliance reviews grant final authorization signatures.

---

## 🛠️ Technology Stack & Execution
- **Stack**: Single-Page Application (SPA) built using **HTML5**, **Tailwind CSS v3 (CDN)**, **Lucide Custom Renderings (SVG)**, **React v18 (CDN)**, and **Babel Standalone compiler (CDN)**.
- **No Setup Required**: Free of complex `node_modules` or local build setups. The marker can run this on any operating system (Windows, MacOS, Linux) by simply opening `index.html` inside any standard browser (Chrome, Safari, Edge, Firefox).

### Instructions to Run:
1. Double-click the `index.html` file in your system's File Explorer.
2. Interact with the different tabs and experience the dynamic viewpoint adjustments by selecting different personas from the dropdown inside the top header.
