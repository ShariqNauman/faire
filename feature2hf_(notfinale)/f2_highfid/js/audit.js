/**
 * js/audit.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Database store and search logic for candidate screening and audit logs.
 * Includes hash signature clipboard helpers.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { showToast } from './toast.js';
import { goToView } from './navigation.js';

// Secure candidate database mockup
export const candidateDb = {
  'HG-29471': {
    name: 'Sarah Jenkins',
    meta: 'Senior Software Engineer Application',
    status: 'passed',
    timeline: [
      { time: 'May 21, 2026 15:32', title: 'Audit Engine Passed', desc: 'Bias parameters met 0.80 criteria boundary (0.96 ratio).' },
      { time: 'May 21, 2026 15:30', title: 'CV Masking Executed', desc: 'Identifiers (name, gender) replaced with tokens.' }
    ]
  },
  'HG-90231': {
    name: 'Emily R.',
    meta: 'Senior Product Manager Application',
    status: 'passed',
    timeline: [
      { time: 'May 21, 2026 14:55', title: 'Offer Extended', desc: 'Human resource representative validated system assessment.' },
      { time: 'May 21, 2026 14:48', title: 'Audit Engine Clearance', desc: 'Audit successfully completed with disparate impact index within approved limits (0.95 ratio).' },
      { time: 'May 21, 2026 14:45', title: 'Candidate Screened by AI Engine', desc: 'Calculated score of 89/100 based on core technical capabilities.' }
    ]
  },
  'HG-88402': {
    name: 'David L.',
    meta: 'Fullstack Dev Application',
    status: 'passed',
    timeline: [
      { time: 'May 21, 2026 14:15', title: 'Compliance Check Passed', desc: 'Automatic clearance given under fair tenure standards.' }
    ]
  },
  'HG-77409': {
    name: 'Aaron K.',
    meta: 'DevOps Lead Application',
    status: 'failed',
    timeline: [
      { time: 'May 21, 2026 13:22', title: 'Rejected by System', desc: 'Technical requirements score (42/100) below minimum criteria (60/100).' }
    ]
  },
  'HG-63200': {
    name: 'Sophia Z.',
    meta: 'Machine Learning Research Lead',
    status: 'warning',
    timeline: [
      { time: 'May 21, 2026 14:02', title: 'Sent to Justification Gate', desc: 'Domain Disparity flag requires human override and audit justification.' }
    ]
  },
  'HG-19028': {
    name: 'Leonard H.',
    meta: 'System Administrator Application',
    status: 'passed',
    timeline: [
      { time: 'May 21, 2026 11:05', title: 'Audit Clearance Complete', desc: 'System output recorded (Score: 47/100).' }
    ]
  }
};

/**
 * Searches the candidate database for the reference code specified in input.
 * Dynamically constructs timeline elements for the candidate's screening path.
 */
export function searchRecord() {
  const idInput = document.getElementById('lookup-candidate-id').value.trim().toUpperCase();
  const nameEl = document.getElementById('detail-candidate-name');
  const metaEl = document.getElementById('detail-candidate-meta');
  const detailsCard = document.getElementById('record-details-card');

  if (!idInput) {
    showToast('Please enter a candidate reference ID');
    return;
  }

  const record = candidateDb[idInput];
  if (!record) {
    showToast(`Candidate ID ${idInput} not found in secure records.`);
    return;
  }

  // Update UI Elements
  if (nameEl) nameEl.innerText = record.name;
  if (metaEl) metaEl.innerText = `${record.meta} • ID: ${idInput}`;

  // Update details timeline if it exists
  if (detailsCard) {
    const timelineContainer = detailsCard.querySelector('.timeline');
    if (timelineContainer) {
      timelineContainer.innerHTML = '';
      record.timeline.forEach(step => {
        const item = document.createElement('div');
        item.className = 'timeline-item';

        let dotClass = 'info';
        if (record.status === 'failed') dotClass = 'failed';
        else if (record.status === 'warning') dotClass = 'warning';
        else if (record.status === 'passed') dotClass = 'passed';

        item.innerHTML = `
          <div class="timeline-dot ${dotClass}"></div>
          <div class="timeline-content">
            <div class="timeline-time">${step.time}</div>
            <div class="timeline-title">${step.title}</div>
            <div class="timeline-desc">${step.desc}</div>
          </div>
        `;
        timelineContainer.appendChild(item);
      });
    }
  }

  showToast(`Successfully retrieved record for ${record.name}`);
}

/**
 * Navigates directly to the detail view and performs a lookup for the specified candidate ID.
 * @param {string} candidateId - Reference ID of target candidate.
 */
export function viewRecord(candidateId) {
  const lookupInput = document.getElementById('lookup-candidate-id');
  if (lookupInput) {
    lookupInput.value = candidateId;
  }
  goToView('decision-record-detail');
  searchRecord();
}

/**
 * Copies the integrity hash of the decision record to the system clipboard.
 */
export function copyHash() {
  const hash = 'b7e1d4f3a29c81e0d';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(hash).then(() => {
      showToast('Hash copied to clipboard.');
    });
  } else {
    showToast('Hash: ' + hash);
  }
}

/**
 * Simulates exporting compliance records.
 */
export function exportData() {
  showToast('Compliance CSV export scheduled. File will download shortly.');
}
