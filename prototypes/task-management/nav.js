// nav.js -- Sidebar navigation for Task management prototype

function initNav() {
  const root = document.getElementById('nav-root');
  if (!root) return;

  const currentPage = window.CURRENT_PAGE || 'index';
  // Links are relative to this folder.
  const basePath = window.location.pathname.endsWith('/')
    ? window.location.pathname
    : window.location.pathname.replace(/[^/]*$/, '');
  const immediateFolder = basePath.replace(/\/+$/, '').split('/').filter(Boolean).pop();
  const inPrototypeFolder = immediateFolder === 'prototype';
  function rewriteHref(href) {
    if (!inPrototypeFolder) return href;       // outline pages: data.js paths already resolve right
    if (href.startsWith('prototype/')) return href.slice('prototype/'.length); // strip redundant prefix
    return '../' + href;                        // outline link from inside prototype/: up one level
  }

  function renderLink(item, isSubItem) {
    const active = currentPage === item.id;
    const padding = isSubItem ? 'pl-10 pr-5' : 'px-5';
    return `
      <a href="${rewriteHref(item.href)}"
         class="flex items-center gap-3 ${padding} py-2.5 text-sm transition-colors ${active
           ? 'text-mtext bg-msurface border-l-2 border-maccent'
           : 'text-mtext3 hover:text-mtext2 hover:bg-msurface/50 border-l-2 border-transparent'}">
        <span class="font-mono text-[11px] text-mtext3 ${active ? 'text-maccent' : ''} w-12 flex-shrink-0">${item.section || ''}</span>
        <span>${item.label}</span>
      </a>
    `;
  }

  function renderGroup(group) {
    const hasActive = group.items.some(item => item.id === currentPage);
    const expanded = hasActive;
    return `
      <div class="nav-group" data-group-id="${group.id}">
        <button type="button" class="nav-group-toggle flex items-center gap-3 w-full px-5 py-2.5 text-sm transition-colors border-l-2 border-transparent ${hasActive ? 'text-mtext2' : 'text-mtext3 hover:text-mtext2 hover:bg-msurface/50'}"
                data-expanded="${expanded}">
          <span class="font-mono text-[11px] text-mtext3 w-12 flex-shrink-0">${group.section || ''}</span>
          <span class="flex-1 text-left">${group.label}</span>
          <svg class="nav-chevron w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        <div class="nav-group-items ${expanded ? '' : 'hidden'}">
          ${group.items.map(item => renderLink(item, true)).join('')}
        </div>
      </div>
    `;
  }

  const navItemsHtml = NAV_CONFIG.map(entry => {
    if (entry.type === 'group') return renderGroup(entry);
    return renderLink(entry, false);
  }).join('');

  const navHtml = `
    <aside id="sidebar" class="fixed left-0 top-0 h-full w-[260px] bg-mcard border-r border-mborder flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 -translate-x-full">
      <!-- Header -->
      <div class="p-5 border-b border-mborder">
        <h1 class="text-mtext font-semibold text-base">${PAGE_DATA.title}</h1>
        <p class="text-mtext3 text-xs mt-0.5 font-mono">${PAGE_DATA.version}</p>
      </div>

      <!-- Nav Links -->
      <nav class="flex-1 py-3 overflow-y-auto">
        ${navItemsHtml}
      </nav>
    </aside>

    <!-- Mobile hamburger -->
    <button id="nav-toggle" class="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-msurface text-mtext2 hover:text-mtext transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>

    <!-- Mobile overlay -->
    <div id="nav-overlay" class="lg:hidden fixed inset-0 bg-black/50 z-40 hidden"></div>
  `;

  root.innerHTML = navHtml;

  // Mobile toggle
  const toggle = document.getElementById('nav-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('nav-overlay');

  if (toggle && sidebar && overlay) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      overlay.classList.toggle('hidden');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
    });
  }

  // Group toggle
  document.querySelectorAll('.nav-group-toggle').forEach(t => {
    t.addEventListener('click', () => {
      const expanded = t.dataset.expanded === 'true';
      const newExpanded = !expanded;
      t.dataset.expanded = String(newExpanded);
      const items = t.nextElementSibling;
      const chevron = t.querySelector('.nav-chevron');
      if (newExpanded) {
        items.classList.remove('hidden');
        chevron.classList.add('rotate-90');
      } else {
        items.classList.add('hidden');
        chevron.classList.remove('rotate-90');
      }
    });
  });
}

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', initNav);
