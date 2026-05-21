# FaiRe — Modern React + Tailwind CSS Auditing Platform

FaiRe has been upgraded to a cutting-edge React 18 single-page application (SPA) featuring Tailwind CSS for styling and Framer Motion for premium micro-animations.

---

## 📁 Upgraded Architecture

The entire presentation layer, state management, and application views are now fully encapsulated inside a fast, high-performance, and reactive structure:

```
f2_highfid/
├── index.html         # 🚀 Core React UMD + Tailwind CSS + Framer Motion Application
├── app.js             # Legacy application pointer (deprecated)
├── css/               # Legacy modular CSS directories (deprecated, styling now handled by Tailwind CSS)
├── js/                # Legacy modular JavaScript directories (deprecated, logic now handled by React)
└── DOCUMENTATION.md   # Project overview and modular structure details
```

---

## 🛠️ Tech Stack & Dependencies

The system has been completely rebuilt using the following modern stack:

1. **Google Fonts**: Poppins (for display headlines) + Lato (for readable body copy).
2. **Tailwind CSS Play CDN**: Configured with custom `brand` color tokens, `sans` and `display` font families, and premium custom shadows (`soft`, `glow`, `nav`).
3. **React 18 (UMD)**: Declarative UI, state management, hooks, and clean virtual DOM updates.
4. **Framer Motion (UMD)**: Immersive transitions, sidebar highlights, and smooth view entry animations.
5. **Babel Standalone**: Real-time transpilation of JSX scripts directly in the client browser.

---

## ⚙️ Core Configuration Extended

### Brand Color Tokens
*   `brand` (#00988F) - Primary brand teal
*   `brand-light` (#4BBAD9) - Accent blue-teal
*   `brand-dark` (#00706A) - Dark teal
*   `brand-accent` (#E6F5F4) - Light background cyan tint
*   `brand-50` (#F0F9F8)
*   `brand-100` (#E1F3F2)
*   `brand-200` (#BCE3E1)
*   `brand-900` (#004C47)

### Premium Custom Shadows
*   `shadow-soft`: Sleek overlay cards shadow
*   `shadow-glow`: Brand-focused radiant glow for buttons/badges
*   `shadow-nav`: Modern navigation sidebars shadow

---

## 📱 Dynamic SPA Views

The upgraded React system manages three distinct role views, toggling the sidebar links and actions dynamically:

1.  **🏢 Business View**:
    *   **My Dashboard**: Overall stats overview (142 candidates, 3 models, 0 undocumented rejections).
    *   **Evaluate Candidate**: interactive resume text view with 5-point job criteria checklist (Python, SQL, Data Analysis, ML, 3+ years experience).
    *   **Decision Feedback**: Soft red unsuccessful status alert card and auto-generated applicant email showing coverage details (60% match).
    *   **Screening Audit Log**: Append-only log of all applicant decision records.

2.  **🛠️ Developer View**:
    *   **Model Parameters**: Scanning portal for parameter verification. Scan checks for sensitive parameters (`age_threshold`, `years_experience_minimum`) and alerts for justification.
    *   **Justification Gate**: Interactive de-biasing portal enforcing a minimum `50` character deontology justification before sealing model blocks.
    *   **Screening Audit Log**: Log containing standard candidate rejections plus newly compiled/sealed model config blocks.

3.  **👤 Applicant View**:
    *   **Application Status**: Interactive candidate dashboard displaying unsuccessful status banner, missing criteria checklist pills, and what they did well.
    *   **How the AI Evaluated Me**: Highly detailed criteria table showing checks completed by the AI model, decision weights bars, and technical details of the AI model.

---

## 🔒 Append-Only Cryptographic Log

Whenever a developer justifies a high-risk parameter in the **Justification Gate** and clicks **Save Model**, the React state dynamically appends a new transaction block (e.g. `REC-006`) to the Screening Audit Log with a cryptographically simulated block hash, ensuring immediate traceability and complete compliance tracking.
