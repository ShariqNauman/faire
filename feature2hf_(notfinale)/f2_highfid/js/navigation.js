/**
 * js/navigation.js — SPA routing via event delegation.
 * Handles dynamically injected sidebar items automatically.
 */

export function initNavigation() {
  const nav = document.querySelector('.sidebar-menu');
  if (!nav) return;
  nav.addEventListener('click', e => {
    const item = e.target.closest('.sidebar-item');
    if (item) _activateItem(item);
  });
}

export function goToView(viewId) {
  const item = document.querySelector(`.sidebar-item[data-view="${viewId}"]`);
  if (item) { _activateItem(item); } else { _swapView(viewId); }
}

function _activateItem(item) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
  const label = item.querySelector('span')?.textContent ?? '';
  const titleEl = document.getElementById('page-title-display');
  if (titleEl && label) titleEl.textContent = label;
  _swapView(item.dataset.view);
}

function _swapView(viewId) {
  const targetId = `view-${viewId}`;
  document.querySelectorAll('.view-section').forEach(s => {
    s.classList.toggle('active', s.id === targetId);
  });
}
