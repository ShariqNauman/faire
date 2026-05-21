/**
 * js/evaluate.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Logic for the "Evaluate Candidate" screen.
 *
 * runEvaluation() — simulates an AI evaluation run:
 *   1. Puts the button in a loading state.
 *   2. After a 1.8 s delay, restores it and shows a result toast.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { showToast } from './toast.js';

const EVAL_DELAY_MS       = 1800;
const EVAL_RESULT_MESSAGE = 'Evaluation complete — 3 of 5 criteria matched. Refer to checklist.';

/**
 * Triggers the simulated evaluation run.
 * Exposed on window so the HTML onclick can call it.
 */
export function runEvaluation() {
  const btn = document.getElementById('run-eval-btn');
  if (!btn) return;

  // --- Loading state ---
  btn.classList.add('loading');
  btn.textContent = 'Running Evaluation…';

  setTimeout(() => {
    // --- Restore button ---
    btn.classList.remove('loading');
    btn.innerHTML = 'Run Evaluation &nbsp;&rarr;';

    showToast(EVAL_RESULT_MESSAGE);
  }, EVAL_DELAY_MS);
}
