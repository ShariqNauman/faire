/**
 * js/toast.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Utility: show a brief auto-dismissing toast notification.
 *
 * Usage (from any other module):
 *   import { showToast } from './toast.js';
 *   showToast('Record saved successfully.');
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Appends a toast message to #toast-container and removes it after 3.5 s.
 * @param {string} message - Human-readable notification text.
 */
export function showToast(message) {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <!-- Checkmark icon -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Slide out then remove after 3.5 s
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
