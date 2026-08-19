const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');
if(toggle){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();

// Cumulative update: external sites always open separately and preserve eaglevision.biz.
document.querySelectorAll('a[href^="http://"],a[href^="https://"]').forEach(link=>{
  try{const url=new URL(link.href,window.location.href);if(url.hostname!==window.location.hostname){link.target='_blank';link.rel='noopener noreferrer';}}catch(e){}
});
// Brand behavior: from any scroll position on the homepage, return smoothly to the top.
document.querySelectorAll('.brand').forEach(brand=>brand.addEventListener('click',e=>{e.preventDefault();window.history.replaceState(null,'',window.location.pathname);window.scrollTo({top:0,behavior:'smooth'});}));
