// nav.js -- Sidebar (prototype menu) for the Agent mode prototype.
// Supports flat links and collapsible groups (submenus) via NAV_CONFIG entries
// with type 'link' or type 'group'.

function initNav() {
  const root = document.getElementById('nav-root');
  if (!root) return;

  const currentPage = window.CURRENT_PAGE || 'index';

  function renderLink(item, isSubItem) {
    const active = currentPage === item.id;
    const padding = isSubItem ? 'pl-10 pr-5' : 'px-5';
    return `
      <a href="${item.href}"
         class="flex items-center gap-3 ${padding} py-2.5 text-sm transition-colors ${active
           ? 'text-slate-100 bg-slate-800/50 border-l-2 border-indigo-500'
           : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border-l-2 border-transparent'}">
        <span class="font-mono text-[11px] ${active ? 'text-indigo-500' : 'text-slate-500'} w-12 flex-shrink-0">${item.section || ''}</span>
        <span>${item.label}</span>
      </a>`;
  }

  function renderGroup(group) {
    const hasActive = group.items.some(i => i.id === currentPage);
    return `
      <div class="nav-group">
        <button type="button" class="nav-group-toggle flex items-center gap-3 w-full px-5 py-2.5 text-sm transition-colors border-l-2 border-transparent ${hasActive
          ? 'text-slate-200' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}" data-expanded="${hasActive}">
          <span class="font-mono text-[11px] text-slate-500 w-12 flex-shrink-0">${group.section || ''}</span>
          <span class="flex-1 text-left">${group.label}</span>
          <svg class="nav-chevron w-3 h-3 transition-transform ${hasActive ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        <div class="nav-group-items ${hasActive ? '' : 'hidden'}">
          ${group.items.map(i => renderLink(i, true)).join('')}
        </div>
      </div>`;
  }

  const navItemsHtml = NAV_CONFIG
    .map(entry => entry.type === 'group' ? renderGroup(entry) : renderLink(entry, false))
    .join('');

  root.innerHTML = `
    <aside id="sidebar" class="fixed left-0 top-0 h-full w-[260px] bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 -translate-x-full">
      <!-- Header -->
      <div class="p-5 border-b border-slate-800">
        <h1 class="text-slate-100 font-semibold text-base">${PAGE_DATA.title}</h1>
        <p class="text-slate-500 text-xs mt-0.5 font-mono">${PAGE_DATA.version}</p>
      </div>

      <!-- Nav Links -->
      <nav class="flex-1 py-3 overflow-y-auto">${navItemsHtml}</nav>
    </aside>

    <!-- Mobile hamburger -->
    <button id="nav-toggle" class="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-slate-100 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>

    <!-- Mobile overlay -->
    <div id="nav-overlay" class="lg:hidden fixed inset-0 bg-black/50 z-40 hidden"></div>
  `;

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

  // Collapsible group toggles
  document.querySelectorAll('.nav-group-toggle').forEach(t => {
    t.addEventListener('click', () => {
      const expanded = t.dataset.expanded === 'true';
      t.dataset.expanded = String(!expanded);
      t.nextElementSibling.classList.toggle('hidden');
      t.querySelector('.nav-chevron').classList.toggle('rotate-90');
    });
  });
}

document.addEventListener('DOMContentLoaded', initNav);
