/**
 * js/document-model.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Logic for the "Document Model" screen.
 *
 * scanParameters() — scans model parameters for sensitive terms:
 *   1. Puts the scan button into a loading/scanning state.
 *   2. Simulates backend API analysis with a 1.4 s delay.
 *   3. Displays the validation results card (#scan-result-card).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { showToast } from './toast.js';

const SCAN_DELAY_MS = 1400;

/**
 * Initiates the parameter scanning simulation.
 * Disables the button temporarily and displays a loading icon.
 */
export function scanParameters() {
  const btn = document.getElementById('scan-params-btn');
  const resultCard = document.getElementById('scan-result-card');
  if (!btn || !resultCard) return;

  // --- Loading State ---
  btn.style.opacity = '0.65';
  btn.style.pointerEvents = 'none';
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    Scanning…
  `;

  setTimeout(() => {
    // --- Restore Button ---
    btn.style.opacity = '';
    btn.style.pointerEvents = '';
    btn.innerHTML = originalHTML;

    // --- Show Validation Results ---
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast('Scan complete — 2 sensitive parameters flagged for review.');
  }, SCAN_DELAY_MS);
}
