const sections=[...document.querySelectorAll('.scene')];
const nav=document.getElementById('railNav');
sections.forEach((s,i)=>{const a=document.createElement('a');a.href='#'+s.id;a.dataset.num=String(i+1).padStart(2,'0');a.textContent=s.dataset.title;nav.appendChild(a)});
const links=[...nav.querySelectorAll('a')];
const pNum=document.getElementById('progressNum'),pTitle=document.getElementById('progressTitle');
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.reveal').forEach((el,j)=>setTimeout(()=>el.classList.add('in'),j*90));const i=sections.indexOf(e.target);links.forEach((l,k)=>l.classList.toggle('active',k===i));pNum.textContent=String(i+1).padStart(2,'0');pTitle.textContent=e.target.dataset.title}})},{threshold:.28});
sections.forEach(s=>io.observe(s));
document.getElementById('mobileProgress').addEventListener('click',()=>{const i=sections.findIndex(s=>s.dataset.title===pTitle.textContent);sections[Math.min(i+1,sections.length-1)].scrollIntoView({behavior:'smooth'})});
