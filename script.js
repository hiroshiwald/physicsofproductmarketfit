// Build TOC + scrollspy; Jekyll already outputs HTML from Markdown.
(function(){
  const content=document.getElementById('content'); if(!content) return;
  const headings=[...content.querySelectorAll('h1,h2,h3')];
  headings.forEach(h=>{ if(!h.id){ const slug=h.textContent.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-'); h.id=slug||'section-'+Math.random().toString(36).slice(2);} });
  const toc=document.querySelector('#toc nav ul'); if(!toc) return;
  headings.forEach(h=>{ const depth=h.tagName==='H1'?1:(h.tagName==='H2'?2:3); const li=document.createElement('li'); li.className='depth-'+depth; const a=document.createElement('a'); a.href='#'+h.id; a.textContent=h.textContent.replace(/^#+\s*/,''); li.appendChild(a); toc.appendChild(li); });
  const links=[...document.querySelectorAll('#toc a')];
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ const id=e.target.id; links.forEach(l=>l.classList.toggle('active', l.getAttribute('href')==='#'+id)); } }); },{rootMargin:"0px 0px -70% 0px", threshold:0.01});
  headings.forEach(h=>io.observe(h));
})();