/**
 * js/justification.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Logic for the "Justification Gate" screen.
 *
 * Implements real-time length validation (50 characters minimum) for
 * the sensitive parameters: age_threshold and years_experience_minimum.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { showToast } from './toast.js';

export const JUST_MIN_CHARS = 50;

/**
 * Handles text input event for a parameter justification box.
 * Updates character count display, highlights target state if met,
 * and recalculates if the entire gate is cleared to enable saving.
 *
 * @param {string} textareaId - Text area DOM element ID.
 * @param {string} counterId - Character counter container DOM element ID.
 */
export function updateJustCounter(textareaId, counterId) {
  const textarea = document.getElementById(textareaId);
  const counter  = document.getElementById(counterId);
  if (!textarea || !counter) return;

  const len = textarea.value.length;
  const remaining = JUST_MIN_CHARS - len;

  if (remaining > 0) {
    counter.textContent = `${len} / ${JUST_MIN_CHARS} minimum characters`;
    counter.classList.remove('met');
  } else {
    counter.textContent = `✓ ${len} characters — minimum met`;
    counter.classList.add('met');
  }

  checkJustSaveReady();
}

/**
 * Validates if all justifications meet the length requirement.
 * Toggles the save button state and label style accordingly.
 */
export function checkJustSaveReady() {
  const t1 = document.getElementById('just-text-1');
  const t2 = document.getElementById('just-text-2');
  const btn = document.getElementById('just-save-btn');
  if (!t1 || !t2 || !btn) return;

  const ready = t1.value.length >= JUST_MIN_CHARS && t2.value.length >= JUST_MIN_CHARS;

  if (ready) {
    btn.disabled = false;
    btn.className = 'just-save-btn just-save-btn--active';
    btn.innerHTML = '&#9989; Save Model &amp; Generate Documentation Record';
  } else {
    btn.disabled = true;
    btn.className = 'just-save-btn just-save-btn--disabled';
    btn.innerHTML = 'Save Model &mdash; Justification Required';
  }
}

/**
 * Simulates saving model configurations once validations pass.
 * Shows feedback toast and resets the form controls.
 */
export function saveModelJustification() {
  const t1 = document.getElementById('just-text-1');
  const t2 = document.getElementById('just-text-2');
  if (!t1 || !t2) return;
  if (t1.value.length < JUST_MIN_CHARS || t2.value.length < JUST_MIN_CHARS) return;

  showToast('Model documented and cleared for next stage.');

  // Reset form controls
  t1.value = '';
  t2.value = '';
  ['just-counter-1', 'just-counter-2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = '0 / 50 minimum characters';
      el.classList.remove('met');
    }
  });
  checkJustSaveReady();
}
