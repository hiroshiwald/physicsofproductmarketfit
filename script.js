// Build a Table of Contents by scanning h1..h3, add anchors, and enable scrollspy
(function() {
  const content = document.getElementById('content');
  if (!content) return;

  // Ensure headings have ids
  const headings = [...content.querySelectorAll('h1, h2, h3')];
  headings.forEach(h => {
    if (!h.id) {
      const slug = h.textContent.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      h.id = slug || 'section-' + Math.random().toString(36).slice(2);
    }
    // Add anchor link
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.className = 'anchor';
  });

  // Build TOC
  const tocNav = document.querySelector('#toc nav ul');
  if (tocNav) {
    headings.forEach(h => {
      const depth = h.tagName === 'H1' ? 1 : (h.tagName === 'H2' ? 2 : 3);
      const li = document.createElement('li');
      li.className = 'depth-' + depth;
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace(/^#+\s*/, '');
      li.appendChild(a);
      tocNav.appendChild(li);
    });
  }

  // Scrollspy
  const links = [...document.querySelectorAll('#toc a')];
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: "0px 0px -70% 0px", threshold: 0.01 });

  headings.forEach(h => io.observe(h));

  // Optional console note for build process
  if (window.__FALLBACK_USED__ === "true") {
    console.warn("Used fallback Markdown converter. For perfect fidelity, convert Markdown to HTML with a full GFM parser and replace #content innerHTML.");
  }
})();