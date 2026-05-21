/**
 * js/applicant-view.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads from the in-memory db and populates both Applicant View screens:
 *   • #view-application-status  (Application Status)
 *   • #view-ai-evaluated-me     (How the AI Evaluated Me)
 *
 * Call initApplicantView() once on DOMContentLoaded from main.js.
 * The views must have the IDs defined below present in index.html.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { getActiveApplicant } from './data/db.js';

// ─── Public API ──────────────────────────────────────────────────────────────

/** Render both applicant screens from the active applicant in the database. */
export function initApplicantView() {
  const applicant = getActiveApplicant();
  if (!applicant) {
    console.warn('[applicant-view] No active applicant found in db.');
    return;
  }
  _renderApplicationStatus(applicant);
  _renderAIEvaluated(applicant);
}

// ─── Application Status screen ────────────────────────────────────────────────

function _renderApplicationStatus(a) {
  _setText('appstatus-name',    a.name);
  _setText('appstatus-role',    a.role);
  _setText('appstatus-company', a.company);
  _setText('appstatus-date',    a.applicationDate);

  // Status indicator
  const isPass = a.status === 'successful';
  _setText('appstatus-result-title', isPass ? '✅ Successful' : '❌ Unsuccessful');

  const resultEl = document.getElementById('appstatus-result');
  if (resultEl) {
    resultEl.style.background    = isPass ? '#F0FDF4' : '#FEF2F2';
    resultEl.style.borderColor   = isPass ? 'rgba(16,185,129,0.2)' : 'rgba(229,62,62,0.2)';
  }
  const iconEl = document.getElementById('appstatus-result-icon');
  if (iconEl) {
    iconEl.style.backgroundColor = isPass ? 'rgba(16,185,129,0.12)' : 'rgba(229,62,62,0.12)';
    iconEl.innerHTML = isPass ? _svgCheck() : _svgX();
    iconEl.querySelector('svg').style.stroke = isPass ? '#10B981' : '#E53E3E';
  }
  const titleEl = document.getElementById('appstatus-result-title');
  if (titleEl) titleEl.style.color = isPass ? '#10B981' : '#E53E3E';

  // Missing criteria red pills
  const missingCriteria = a.criteria.filter(c => !c.found);
  _setHTML('appstatus-missing-tags', missingCriteria
    .map(c => `<span class="appstatus-tag appstatus-tag--missing">✗ ${c.name}</span>`)
    .join(''));

  // Matched skills teal pills
  const matchedCriteria = a.criteria.filter(c => c.found);
  _setHTML('appstatus-matched-tags', matchedCriteria
    .map(c => `<span class="appstatus-tag appstatus-tag--matched">✓ ${c.name}</span>`)
    .join(''));

  // Explanation text count
  const missingCount = missingCriteria.length;
  _setText('appstatus-explanation',
    `After reviewing your application, our system found that you did not meet ${missingCount} of the required ` +
    `criteria for this role. This decision was made automatically based on the job requirements set by the employer.`
  );
}

// ─── AI Evaluated Me screen ───────────────────────────────────────────────────

function _renderAIEvaluated(a) {
  // Criteria table rows
  const tbody = document.getElementById('aiev-criteria-tbody');
  if (tbody) {
    tbody.innerHTML = a.criteria.map(c => `
      <tr class="${c.found ? 'aiev-row--pass' : 'aiev-row--fail'}">
        <td>${c.name}</td>
        <td>${c.required ? 'Yes' : 'No'}</td>
        <td>${c.detail}</td>
        <td>${c.result}</td>
      </tr>
    `).join('');
  }

  // Weight progress bars
  const weightContainer = document.getElementById('aiev-weights-container');
  if (weightContainer) {
    weightContainer.innerHTML = a.weights.map(w => `
      <div class="aiev-weight-row">
        <div class="aiev-weight-label">
          <span>${w.label}</span>
          <span class="aiev-weight-pct">${w.pct}% weight</span>
        </div>
        <div class="aiev-bar-track">
          <div class="aiev-bar-fill aiev-bar-fill--${w.type}" style="width: ${w.pct}%;"></div>
        </div>
      </div>
    `).join('');
  }

  // Score note
  _setText('aiev-score-note-val',
    `Your overall match score: ${a.matchScore}% — Minimum required: ${a.minRequiredScore}% of mandatory criteria must be met.`
  );

  // Model info fields
  _setText('aiev-model-id',     a.model.id);
  _setText('aiev-model-date',   a.model.lastDocumented);
  _setText('aiev-model-params',
    a.model.sensitiveParamsReviewed
      ? `✅ Yes — ${a.model.sensitiveParamsNote}`
      : '❌ Not reviewed'
  );
  _setText('aiev-model-docs',   a.model.documentationStatus
    ? `✅ ${a.model.documentationStatus}`
    : '⚠️ Incomplete'
  );
}

// ─── Private helpers ─────────────────────────────────────────────────────────

function _setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function _setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function _svgCheck() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
}

function _svgX() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
}
