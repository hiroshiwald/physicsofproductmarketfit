(function(){
  const content = document.querySelector('.content');
  const tocEl = document.getElementById('toc');
  if(!content || !tocEl) return;

  // Collect headings (h2/h3)
  const headings = [...content.querySelectorAll('h2, h3')].filter(h => h.id || true);
  headings.forEach(h => {
    if(!h.id){
      h.id = h.textContent.trim().toLowerCase()
        .replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').slice(0,80);
    }
    // add anchor
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.className = 'anchor';
  });

  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  headings.forEach(h => {
    const li = document.createElement('li');
    li.style.marginLeft = (h.tagName === 'H3') ? '1rem' : '0';
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    ul.appendChild(li);
  });
  const title = document.createElement('div');
  title.className = 'toc-title';
  title.textContent = 'On this page';
  nav.appendChild(ul);
  tocEl.appendChild(title);
  tocEl.appendChild(nav);

  // Active section highlight
  const links = [...ul.querySelectorAll('a')];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const i = links.findIndex(l => l.getAttribute('href') === '#' + e.target.id);
      if(i >= 0 && e.isIntersecting){
        links.forEach(x => x.classList.remove('active'));
        links[i].classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: 0.0 });
  headings.forEach(h => obs.observe(h));
})();
