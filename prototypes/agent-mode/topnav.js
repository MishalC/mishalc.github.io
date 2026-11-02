// topnav.js -- the operations app header (tab bar) for the Agent Mode prototype.
// Injected as the first child of <main>. This prototype builds the Agent tab;
// the other tabs are shown for context only (not part of this mockup).
//
// Each page sets: <script>window.CURRENT_APP_TAB = 'agent';</script>

(function () {
  const ICONS = {
    overview: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    trips: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    agent: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    tasks: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  };
  const svg = d => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${d}"/></svg>`;

  // Agent is the tab this prototype builds. The rest are context-only.
  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'trips',    label: 'Trips' },
    { id: 'chat',     label: 'Chat' },
    { id: 'agent',    label: 'Agent', href: 'agent-projects.html' },
    { id: 'tasks',    label: 'Tasks' },
  ];

  function initTopNav() {
    const main = document.querySelector('main');
    if (!main) return;
    const active = window.CURRENT_APP_TAB || 'agent';

    const tabsHtml = TABS.map(t => {
      const isActive = t.id === active;
      const inner = `${svg(ICONS[t.id])}<span>${t.label}</span>`;
      if (isActive) {
        return `<a href="${t.href || '#'}" class="top-tab active">${inner}</a>`;
      }
      return `<span class="top-tab disabled" title="Not built in this mockup — Agent tab only">${inner}</span>`;
    }).join('');

    const header = document.createElement('header');
    header.className = 'topnav';
    header.innerHTML = `
      <div class="flex items-center gap-2 pr-5">
        <span class="text-slate-100 font-semibold text-base tracking-tight">Travel ops</span>
        <span class="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded px-1.5 py-0.5">Operations app</span>
      </div>
      <nav class="flex items-stretch">${tabsHtml}</nav>
      <div class="flex items-center gap-1 ml-auto pr-3">
        <button onclick="(window.onCmdK || ((window.Agent||{}).openCmdk) || function(){})()"
                class="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors" title="Command palette">
          <span class="kbd">⌘K</span>
        </button>
        <button class="p-1.5 text-slate-500 hover:text-slate-300 transition-colors" title="Notifications">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </button>
      </div>
    `;
    main.insertBefore(header, main.firstChild);
  }

  document.addEventListener('DOMContentLoaded', initTopNav);
})();
