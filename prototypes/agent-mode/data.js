// data.js -- Navigation, epic/story model and mock data for the
// Agent mode prototype. All screens read from this file.

/* ----------------------------------------------------------------------
   Shell
---------------------------------------------------------------------- */
const NAV_CONFIG = [
  {
    type: 'group', id: 'agent-tab', section: 'UI', label: 'Agent Tab',
    items: [
      { id: 'agent-projects', section: 'E1',   label: 'Projects',           href: 'agent-projects.html' },
      { id: 'agent-thread',   section: 'E1-4', label: 'Thread + hero flow', href: 'agent-thread.html' },
      { id: 'docked-panel',   section: 'E6',   label: 'Docked Panel',       href: 'docked-panel.html' },
    ],
  },
];

const PAGE_DATA = {
  title: 'Agent mode',
  version: 'Clickable prototype',
};


/* ----------------------------------------------------------------------
   Mock data -- a family Tokyo trip.
---------------------------------------------------------------------- */
const MOCK = {

  trip: {
    id: 'tr-family-a-tokyo', name: 'Family A — Tokyo', dates: 'Sep 12–19, 2026',
    nights: 7, travelers: '2 adults · 2 children (8, 11)',
    stage: 'Planning', client: 'Household A', advisor: 'Lead advisor',
  },

  // agent projects -- grouped by trip / client (E1-S1)
  projects: [
    { id: 'p-family-a', name: 'Family A — Tokyo', kind: 'trip', threads: 3, openTasks: 2, memory: 4,
      active: true, last: 'find a suite at Aman for these dates' },
    { id: 'p-client-b', name: 'Client B — Amalfi Coast', kind: 'trip', threads: 2, openTasks: 1, memory: 3,
      last: 'hotels near the ferry terminal' },
    { id: 'p-household-c', name: 'Household C', kind: 'client', threads: 4, openTasks: 0, memory: 7,
      last: 'chalet shortlist for the Feb half-term' },
    { id: 'p-client-d', name: 'Client D — Patagonia', kind: 'trip', threads: 1, openTasks: 1, memory: 2,
      last: 'lodge options near Torres del Paine' },
  ],

  // agent threads in the active project (E1-S2, E1-S3, E1-S4)
  threads: [
    { id: 'th-aman', title: 'find a suite at Aman for these dates', skill: 'hotel-search',
      status: 'open', msgs: 9, active: true },
    { id: 'th-hakone', title: 'ryokan options for the Hakone leg', skill: 'hotel-search',
      status: 'paused', msgs: 4 },
    { id: 'th-shortlist', title: 'first Tokyo hotel shortlist', skill: 'hotel-search',
      status: 'archived', msgs: 7 },
  ],

  // pre-loaded thread context (E2-S1)
  context: {
    tripContext: ['Family A — Tokyo', 'Sep 12–19, 2026 · 7 nights', '2 adults + 2 children'],
    clientFacts: ['Anniversary trip — splurge approved', 'No Maybourne (exclusion)',
                  'Prefers suites with onsen / spa / pool', 'Children 8 & 11 — connecting space matters'],
    orgInsights: ['Central Tokyo is the usual base for a first stay',
                  'Aman Kyoto on file (2024) — onsen rated 5/5'],
  },

  // grounded hotel recommendations (E2-S2, E2-S3)
  recs: [
    { id: 'rec-aman', name: 'Aman Tokyo', room: 'Pool Suite', area: 'Otemachi',
      rate: '$2,950 / night', total: '$20,650 · 7 nights', grounded: true, lead: true,
      why: 'The Aman the family named. Otemachi Tower top floors; 30m pool + onsen match their wind-down pattern.',
      source: { id: 'di_8814', label: 'destination record 8814',
                detail: '12 community signals · 4 testimonials · prior Aman stay on file (Aman Kyoto, 2024)' } },
    { id: 'rec-hoshinoya', name: 'Hoshinoya Tokyo', room: 'Kiku Suite', area: 'Otemachi',
      rate: '$1,780 / night', total: '$12,460 · 7 nights', grounded: true,
      why: 'Ryokan-style luxury, same district as Aman. Tatami suites + in-house onsen; fits the cultural-immersion note.',
      source: { id: 'di_5520', label: 'destination record 5520',
                detail: '9 community signals · 6 testimonials' } },
    { id: 'rec-janu', name: 'Janu Tokyo', room: 'Deluxe Room', area: 'Azabudai Hills',
      rate: '$1,420 / night', total: '$9,940 · 7 nights', grounded: true,
      why: 'Aman sister brand, opened 2024. Wellness-forward; quieter Azabudai Hills setting.',
      source: { id: 'di_9077', label: 'destination record 9077',
                detail: '5 community signals · 2 testimonials' } },
  ],

  // helper findings (E3)
  findings: [
    { id: 'f-exclusion', helper: 'exclusion-check', type: 'exclusion', kind: 'Sub-agent',
      fires: 'before a recommendation shows', model: 'Small model', latency: '≤ 1.5s', severity: 'pass',
      summary: 'No exclusion violation', target: '—',
      detail: 'Candidate set checked against client exclusions. "No Maybourne" — none of the 3 recs are Maybourne properties. Emit cleared.' },
    { id: 'f-factual', helper: 'factual-check', type: 'factual', kind: 'Independent',
      fires: 'when a recommendation shows', model: 'Small model', latency: '≤ 2s', severity: 'important',
      summary: 'Rate is for a Deluxe Room, not a suite', target: 'Janu Tokyo rec',
      detail: 'Advisor asked for a suite. The Janu Tokyo rec quotes a Deluxe Room ($1,420). Suite category at Janu starts ~$2,600/night. Confirm before presenting.' },
    { id: 'f-intent', helper: 'intent-match-verifier', type: 'intent', kind: 'Independent',
      fires: 'when a recommendation shows', model: 'Large model', latency: '≤ 3s', severity: 'important',
      summary: 'Sub-ask not fully covered', target: 'recommendation set',
      detail: 'The ask implies a suite for the whole family (2 adults + 2 children). None of the 3 recs confirm connecting-suite availability for the children. Coverage < 1.0.' },
  ],

  // tasks Agent Mode creates (E4) -- mapped to the task-layer vocabulary
  tasks: [
    { id: 't-book', title: 'Book Aman Tokyo — Pool Suite', kind: 'ai', tier: 'assist',
      anchor: 'trip', origin: 'agent-mode', via: 'Add to Trip', taskType: 'booking',
      note: 'AI proposes the booking action; advisor approves. An itinerary component is created on the Family A Tokyo trip.' },
    { id: 't-msg', title: 'Draft inquiry to Aman Tokyo', kind: 'ai', tier: 'assist',
      anchor: 'trip', origin: 'agent-mode', via: 'proposed action', taskType: 'messaging',
      note: 'messaging task. The AI drafts the supplier inquiry; the advisor reviews and sends with one click.' },
    { id: 't-human', title: 'Confirm connecting-suite availability for 2 children — Aman Tokyo',
      kind: 'human', tier: 'escalate', anchor: 'trip', origin: 'agent-mode', via: 'human task',
      taskType: 'research',
      note: 'AI grounded out — no curated source for connecting-room availability. Routed to a human task on the project owner\'s dashboard, deep-linked to this thread. On close, a task completed message posts back so the agent resumes.' },
  ],

  // operator-curated memory (E5)
  clientFacts: [
    { id: 'cf1', body: 'Anniversary trip — splurge approved by the household principal.',
      source: 'operator-authored' },
    { id: 'cf2', body: 'No Maybourne properties.', source: 'operator-authored', exclusion: true, stale: true },
    { id: 'cf3', body: 'Prefers suites with a wind-down ritual on-site: onsen, spa or pool.',
      source: 'operator-authored' },
    { id: 'cf4', body: 'Travels with two children, ages 8 and 11 — connecting space matters.',
      source: 'operator-authored' },
  ],
  insights: [
    { id: 'in1', body: 'Client loved the private tea ceremony on their Kyoto trip.',
      from: 'conversation insights · Kyoto 2024 wrap' },
    { id: 'in2', body: 'Client asked twice about late check-out — may value slow mornings.',
      from: 'conversation insights · Tokyo planning thread' },
  ],

  // hero-flow stepper script -- the 90-second moment (E2 + E3 + E4)
  heroSteps: [
    { n: 1, title: 'Cmd-K from the trip', stories: ['E2-S1'],
      caption: 'On the Family A Tokyo trip the advisor presses Cmd-K. A new hotel-search thread opens with Trip context, Client facts and Team insights pre-loaded.' },
    { n: 2, title: 'The ask', stories: ['E2-S2'],
      caption: 'The advisor types a plain-language request: "find a suite at Aman for these dates".' },
    { n: 3, title: 'Editable assumption chips', stories: ['E2-S4'],
      caption: 'Rather than stall on a clarifying question, the agent acts on best-guess assumptions and surfaces them as editable chips. Editing one re-fires the turn.' },
    { n: 4, title: 'exclusion-check runs (pre-emit)', stories: ['E3-S1'],
      caption: 'Before any recommendation renders, the exclusion-check sub-agent verifies the candidate set against client exclusions. "No Maybourne" — clear.' },
    { n: 5, title: '3 grounded recommendations', stories: ['E2-S2', 'E2-S3'],
      caption: 'Three recs render as cards. Each carries a one-line "why we picked" and a clickable source chip into the destination knowledge base.' },
    { n: 6, title: 'Helper finding chips', stories: ['E3-S2', 'E3-S3', 'E3-S4'],
      caption: 'factual-check and intent-match-verifier fire post-emit. Findings surface as Important-tier chips, coalesced — max one per finding kind.' },
    { n: 7, title: 'Add to Trip', stories: ['E4-S1'],
      caption: 'The advisor clicks Add to Trip on the Aman Tokyo suite. A Task and an itinerary component are created. Origin: agent-mode.' },
    { n: 8, title: 'AI proposes next actions', stories: ['E4-S2'],
      caption: 'The agent proposes downstream actions: book via a partner booking portal, or draft a supplier inquiry for the offline vendor.' },
    { n: 9, title: 'Messaging task → send', stories: ['E4-S3', 'E4-S4'],
      caption: '"Draft inquiry to Aman" creates a messaging task in the composer. The advisor reviews the AI draft and sends with one click. End-to-end under 90 seconds.' },
  ],
};
