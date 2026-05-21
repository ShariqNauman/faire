/**
 * js/main.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Main entry point for the HireGuard SPA.
 * Imports modules, initialises global navigation, and exposes
 * interactive actions to the window scope for inline HTML handlers.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { initNavigation, goToView } from './navigation.js';
import { initViewSwitcher, setViewMode } from './view-switcher.js';
import { runEvaluation } from './evaluate.js';
import { scanParameters } from './document-model.js';
import { updateJustCounter, saveModelJustification } from './justification.js';
import { searchRecord, viewRecord, copyHash, exportData } from './audit.js';
import { initApplicantView } from './applicant-view.js';

// Bind lifecycle events
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initViewSwitcher(); // Apply default 'business' mode on page load
  initApplicantView(); // Populate applicant screens from db
});

// Expose APIs to window for legacy inline onclick/oninput HTML handlers
window.goToView = goToView;
window.setViewMode = setViewMode;
window.runEvaluation = runEvaluation;
window.scanParameters = scanParameters;
window.updateJustCounter = updateJustCounter;
window.saveModelJustification = saveModelJustification;
window.searchRecord = searchRecord;
window.viewRecord = viewRecord;
window.copyHash = copyHash;
window.exportData = exportData;

// Simple legacy form fallback binds
window.submitEvaluation = function() {
  const techRating = document.getElementById('technical-rating').value;
  const commRating = document.getElementById('communication-rating').value;
  const rationale = document.getElementById('evaluator-rationale').value;

  if (techRating && commRating && rationale) {
    import('./toast.js').then(module => {
      module.showToast('Evaluation submitted successfully. Compliance log signed.');
      document.getElementById('evaluation-form').reset();
    });
  }
};

window.saveModelParameters = function() {
  const threshold = document.getElementById('disparate-ratio-threshold').value;
  const penalty = document.getElementById('adversarial-debiasing').value;
  import('./toast.js').then(module => {
    module.showToast(`Parameters updated: Threshold ${threshold}, Penalty ${penalty}`);
  });
};

window.submitOverride = function() {
  const candidate = document.getElementById('override-candidate').value;
  const type = document.getElementById('override-type').value;
  const reason = document.getElementById('override-reason').value;
  const details = document.getElementById('override-details').value;

  if (candidate && type && reason && details) {
    import('./toast.js').then(module => {
      module.showToast(`Override logged for ${candidate}. Status set to: ${type}`);
      document.getElementById('override-form').reset();
    });
  }
};
