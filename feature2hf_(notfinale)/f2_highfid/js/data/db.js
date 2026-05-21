/**
 * js/data/db.js
 * ─────────────────────────────────────────────────────────────────────────────
 * In-memory database — loads from seed.js and exposes simple query functions.
 *
 * All reads go through this module. To reset to seed data at any point,
 * call resetToSeed(). This prevents data loss when switching demo applicants.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SEED_DATA } from './seed.js';

// Deep-clone seed data into a mutable in-memory store
let _store = _clone(SEED_DATA);

// ─── Public query API ────────────────────────────────────────────────────────

/** Return the applicant currently selected for the Applicant View. */
export function getActiveApplicant() {
  return _findById(_store.activeApplicantId);
}

/** Return a specific applicant by ID, or null if not found. */
export function getApplicantById(id) {
  return _findById(id);
}

/** Return all applicants in the store. */
export function getAllApplicants() {
  return _store.applicants;
}

/**
 * Switch the active demo applicant.
 * @param {string} id - Applicant ID (e.g. 'APP-001')
 */
export function setActiveApplicant(id) {
  if (_findById(id)) {
    _store.activeApplicantId = id;
  } else {
    console.warn(`[db] Applicant ${id} not found in store.`);
  }
}

/** Reset the in-memory store back to seed data (useful for demos). */
export function resetToSeed() {
  _store = _clone(SEED_DATA);
}

// ─── Private helpers ─────────────────────────────────────────────────────────

function _findById(id) {
  return _store.applicants.find(a => a.id === id) ?? null;
}

function _clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
