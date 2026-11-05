const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes text and turns authored [[figure]] markers into stat chips (see `.stat` in global.css). */
export const withStats = (text: string) => escapeHtml(text).replace(/\[\[(.+?)\]\]/g, '<span class="stat">$1</span>');
