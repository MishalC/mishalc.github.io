// data.js -- Sidebar for the task management prototype: app screens only.
const NAV_CONFIG = [
  {
    type: 'group', id: 'prototype', section: 'UI', label: 'Prototype (clickable)',
    items: [
      { id: 'proto-overview',       section: '',    label: 'Overview',            href: 'overview.html' },
      { id: 'proto-trips',          section: '',    label: 'Trips',               href: 'trips.html' },
      { id: 'proto-task-board',     section: '',    label: 'Tasks',               href: 'task-board.html' },
      { id: 'proto-follow-ups',     section: 'new', label: 'Follow-ups (proposed)', href: 'follow-ups.html' },
      { id: 'proto-inline-create',  section: '',    label: 'Chat',                href: 'inline-create.html' },
      { id: 'proto-agent',          section: '',    label: 'Agent',               href: 'agent.html' },
      { id: 'proto-admin-panel',    section: '',    label: 'Admin',               href: 'admin-panel.html' },
      { id: 'proto-admin-panel-v2', section: 'v2',  label: 'Admin (v2 proposed)', href: 'admin-panel-v2.html' },
    ],
  },
];

const PAGE_DATA = {
  title: 'Task management',
  version: 'Clickable prototype',
};
