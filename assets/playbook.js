
// Fetch Markdown and render with Marked (GFM tables). Build TOC and highlight active section.
const state = { headings: [] };

function buildTOC(){
  const nav = document.querySelector(".toc nav");
  nav.innerHTML = "";
  const hs = document.querySelectorAll("main h2, main h3");
  state.headings = Array.from(hs).map(h=>{
    const level = h.tagName === "H2" ? 2 : 3;
    const id = h.id || h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    h.id = id;
    return {id, level, text: h.textContent};
  });
  state.headings.forEach(({id, level, text})=>{
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = text;
    a.style.paddingLeft = (level===3? "16px":"4px");
    nav.appendChild(a);
  });
}

function activateOnScroll(){
  const links = Array.from(document.querySelectorAll(".toc a"));
  const sections = state.headings.map(h=>document.getElementById(h.id)).filter(Boolean);
  const opt = { rootMargin: "0px 0px -70% 0px", threshold: 0.0 };
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        links.forEach(a=>a.classList.toggle("active", a.getAttribute("href")==="#"+id));
      }
    });
  }, opt);
  sections.forEach(s=>obs.observe(s));
}

async function boot(){
  // Load marked from CDN (GFM support for tables)
  try{
    await import("https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js");
    marked.setOptions({ gfm: true, breaks: false });
  }catch(e){
    console.error("Failed to load marked from CDN", e);
  }
  const res = await fetch("content.md?cachebust="+Date.now());
  const md = await res.text();
  const main = document.querySelector("main");
  if (window.marked) {
    main.innerHTML = marked.parse(md);
  } else {
    main.textContent = md;
  }
  buildTOC();
  activateOnScroll();
}
boot();
