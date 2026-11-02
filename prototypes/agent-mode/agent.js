// agent.js -- shared interactions for the Agent mode prototype.
// The hero-flow stepper lives inline with agent-thread.html; this file holds
// what is shared across screens: the app-bar, the Cmd-K palette, generic
// open/close for sheets and modals.

const Agent = {

  open(id)   { const el = document.getElementById(id); if (el) el.classList.add('open'); },
  close(id)  { const el = document.getElementById(id); if (el) el.classList.remove('open'); },
  toggle(id) { const el = document.getElementById(id); if (el) el.classList.toggle('open'); },

  // ---- Command palette (Cmd-K) ----
  cmdkCommands: [
    { label: 'New hotel-search thread',       hint: 'E2', href: 'agent-thread?step=1' },
    { label: 'Open the Agent tab (Projects)', hint: 'E1', href: 'agent-projects.html' },
    { label: 'Open the docked Agent panel',   hint: 'E6', href: 'docked-panel.html' },
  ],

  initCmdk() {
    // A page can opt out (e.g. docked-panel.html binds Cmd-K to its own panel).
    if (window.SKIP_CMDK) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div id="cmdk-backdrop" class="docked-backdrop"></div>
      <div id="cmdk" class="cmdk" role="dialog" aria-label="Command palette">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
          <span class="kbd">⌘K</span>
          <input id="cmdk-input" type="text" placeholder="Search Agent Mode…" autocomplete="off"
                 class="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none">
          <span class="text-[10px] text-slate-600">esc to close</span>
        </div>
        <div id="cmdk-list" class="py-2 max-h-[320px] overflow-y-auto"></div>
      </div>`;
    document.body.appendChild(wrap);

    const render = (q = '') => {
      const ql = q.toLowerCase();
      const items = Agent.cmdkCommands.filter(c => c.label.toLowerCase().includes(ql));
      const list = document.getElementById('cmdk-list');
      list.innerHTML = items.length
        ? items.map(c => `
            <a href="${c.href}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800/70 transition-colors">
              <span class="text-indigo-500 text-xs">▸</span>
              <span class="text-sm text-slate-200 flex-1">${c.label}</span>
              <span class="font-mono text-[10px] text-slate-500">${c.hint}</span>
            </a>`).join('')
        : '<div class="px-4 py-6 text-center text-xs text-slate-600">No matches</div>';
    };
    render();

    document.getElementById('cmdk-input').addEventListener('input', e => render(e.target.value));
    document.getElementById('cmdk-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') { const a = document.querySelector('#cmdk-list a'); if (a) a.click(); }
    });
    document.getElementById('cmdk-backdrop').addEventListener('click', Agent.closeCmdk);
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Agent.toggleCmdk(); }
      if (e.key === 'Escape') Agent.closeCmdk();
    });
  },
  openCmdk() {
    Agent.open('cmdk'); Agent.open('cmdk-backdrop');
    const i = document.getElementById('cmdk-input'); if (i) { i.value = ''; setTimeout(() => i.focus(), 30); }
  },
  closeCmdk()  { Agent.close('cmdk'); Agent.close('cmdk-backdrop'); },
  toggleCmdk() {
    document.getElementById('cmdk').classList.contains('open') ? Agent.closeCmdk() : Agent.openCmdk();
  },
};

document.addEventListener('DOMContentLoaded', Agent.initCmdk);
