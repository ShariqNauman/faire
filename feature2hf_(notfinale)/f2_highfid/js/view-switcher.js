/**
 * js/view-switcher.js — 3-way mode switcher with dynamic sidebar rendering.
 *
 * SIDEBAR_CONFIG defines exactly which sections/items appear per mode.
 * renderSidebar(mode) injects HTML into .sidebar-menu.
 * setViewMode(mode)   updates tabs, badge, sidebar, and navigates to first item.
 */

import { goToView } from './navigation.js';

// ─── Role badge labels ───────────────────────────────────────────────────────
const ROLE_BADGES = {
  business:  'Company / HR',
  developer: 'ML Engineer',
  applicant: 'Candidate',
};

// ─── Inline SVG icons ────────────────────────────────────────────────────────
const ICONS = {
  'user-check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>`,
  'circle-check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`,
  'list': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  'clipboard': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
  'book-open': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
  'lock': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  'activity': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  'info': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
};

// ─── Sidebar configuration per mode ─────────────────────────────────────────
const SIDEBAR_CONFIG = {
  business: [
    {
      label: 'Applicant Feedback',
      items: [
        { label: 'Evaluate Candidate',   viewId: 'evaluate-candidate',    icon: 'user-check'    },
        { label: 'Decision Result',      viewId: 'decision-result',       icon: 'circle-check'  },
      ],
    },
    {
      label: 'Audit & Records',
      items: [
        { label: 'Screening Audit Log',     viewId: 'screening-audit-log',     icon: 'list'      },
        { label: 'Decision Record Detail',  viewId: 'decision-record-detail',  icon: 'clipboard' },
      ],
    },
  ],

  developer: [
    {
      label: 'Model Documentation',
      items: [
        { label: 'Document Model',    viewId: 'document-model',    icon: 'book-open' },
        { label: 'Justification Gate', viewId: 'justification-gate', icon: 'lock'     },
      ],
    },
  ],

  applicant: [
    {
      label: 'My Application',
      items: [
        { label: 'Application Status',       viewId: 'application-status',   icon: 'activity' },
        { label: 'How the AI Evaluated Me',  viewId: 'ai-evaluated-me',      icon: 'info'     },
      ],
    },
  ],
};

// Default first view to show when a mode is activated
const DEFAULT_VIEW = {
  business:  'evaluate-candidate',
  developer: 'document-model',
  applicant: 'application-status',
};

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Switch to a view mode — updates tabs, badge, sidebar, and navigation.
 * @param {string} mode - 'business' | 'developer' | 'applicant'
 */
export function setViewMode(mode) {
  if (!SIDEBAR_CONFIG[mode]) return;

  // 1. Update pill tab active state
  document.querySelectorAll('.view-switcher-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  // 2. Update role badge text
  const badge = document.getElementById('view-role-badge');
  if (badge) badge.textContent = ROLE_BADGES[mode];

  // 3. Re-render sidebar for this mode
  _renderSidebar(mode);

  // 4. Navigate to the first screen of this mode
  goToView(DEFAULT_VIEW[mode]);
}

/** Initialise the switcher — defaults to Business View on page load. */
export function initViewSwitcher() {
  setViewMode('business');
}

// ─── Private helpers ─────────────────────────────────────────────────────────

/**
 * Build and inject sidebar HTML for the given mode.
 * @param {string} mode
 */
function _renderSidebar(mode) {
  const nav = document.querySelector('.sidebar-menu');
  if (!nav) return;

  const sections = SIDEBAR_CONFIG[mode] ?? [];

  nav.innerHTML = sections.map(section => `
    <div class="sidebar-section">
      <span class="sidebar-section-label">${section.label}</span>
      <ul class="sidebar-menu-list">
        ${section.items.map(item => `
          <li class="sidebar-item" data-view="${item.viewId}">
            <a class="sidebar-link">
              ${ICONS[item.icon] ?? ''}
              <span>${item.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}
