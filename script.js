/* Load Markdown, render, build TOC, add anchors, progress bar */
(async function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const res = await fetch('content.md');
  const md = await res.text();
  const html = marked.parse(md, {mangle:false, headerIds:true});
  const content = document.getElementById('content');
  content.innerHTML = html;

  // add anchor links
  const headings = content.querySelectorAll('h2, h3, h4');
  headings.forEach(h => {
    if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.className = 'anchor';
    a.textContent = '§';
    h.appendChild(a);
  });

  // build TOC
  const toc = document.getElementById('toc-list');
  const frag = document.createDocumentFragment();
  headings.forEach(h => {
    const link = document.createElement('a');
    link.href = `#${h.id}`;
    link.textContent = h.textContent.replace('§','').trim();
    link.dataset.level = h.tagName;
    const wrapper = document.createElement('div');
    wrapper.style.marginLeft = (h.tagName==='H2'?0:h.tagName==='H3'?12:24)+'px';
    wrapper.appendChild(link);
    frag.appendChild(wrapper);
  });
  toc.appendChild(frag);

  // active section highlight
  const opts = {rootMargin: '0px 0px -70% 0px', threshold: 0};
  const map = new Map([...headings].map(h=>[h.id, document.querySelector(`#toc-list a[href="#${h.id}"]`)]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e=>{
      if(e.isIntersecting){
        map.forEach(a=>a.classList && a.classList.remove('active'));
        const a = map.get(e.target.id);
        if (a) a.classList.add('active');
      }
    });
  }, opts);
  headings.forEach(h=>io.observe(h));

  // scroll progress
  const prog = document.getElementById('progress');
  const onScroll = () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    const p = Math.max(0, Math.min(1, docH ? y/docH : 0));
    prog.style.width = (p*100)+'%';
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
