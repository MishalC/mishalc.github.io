// theme.js -- Tailwind config + helpers for the Agent mode prototype.
// 


const Theme = {
  escapeHtml(str) {
    if (str === undefined || str === null) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  },
};
