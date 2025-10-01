(async function () {
  const target = document.getElementById('app');
  try {
    const res = await fetch('content.md', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch content.md');
    const md = await res.text();
    target.innerHTML = marked.parse(md);
  } catch (err) {
    target.innerHTML = '<p style="color:#b00">Error loading content.md: ' + (err && err.message ? err.message : err) + '</p>';
  }
})();