const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');
if(toggle){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const yearEl=document.getElementById('year');if(yearEl){yearEl.textContent=new Date().getFullYear();}

/* V22 — Eagle Vision savings calculators */
(() => {
  const volumeMilestones = [3000, 5000, 10000, 25000, 40000, 60000, 100000, 200000, 500000, 1000000];
  const money = (n) => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  function ecosystemTier(volume) {if(volume<10000)return{upfront:250,monthly:10,custom:false};if(volume<20000)return{upfront:500,monthly:25,custom:false};if(volume<40000)return{upfront:1000,monthly:50,custom:false};if(volume<75000)return{upfront:1500,monthly:75,custom:false};if(volume<=100000)return{upfront:2000,monthly:100,custom:false};return{upfront:0,monthly:0,custom:true};}
  document.querySelectorAll('[data-processing-calc]').forEach(calc=>{const slider=calc.querySelector('[data-volume-slider]');if(!slider)return;const update=()=>{const volume=volumeMilestones[Number(slider.value)]||25000;const estimatedFees=volume*.04;const monthlySavings=estimatedFees*.99;const annualSavings=monthlySavings*12;calc.querySelectorAll('[data-volume-label]').forEach(el=>el.textContent=money(volume));calc.querySelectorAll('[data-est-fees]').forEach(el=>el.textContent=money(estimatedFees));calc.querySelectorAll('[data-monthly-save]').forEach(el=>el.textContent=money(monthlySavings));calc.querySelectorAll('[data-annual-save]').forEach(el=>el.textContent=money(annualSavings));};slider.addEventListener('input',update);update();});
  document.querySelectorAll('[data-ecosystem-calc]').forEach(calc=>{const slider=calc.querySelector('[data-volume-slider]');if(!slider)return;const update=()=>{const volume=volumeMilestones[Number(slider.value)]||25000;const tier=ecosystemTier(volume);const note=calc.querySelector('[data-custom-note]');calc.querySelectorAll('[data-volume-label]').forEach(el=>el.textContent=money(volume));if(tier.custom){calc.querySelectorAll('[data-upfront-save]').forEach(el=>el.textContent='CUSTOM');calc.querySelectorAll('[data-platform-save]').forEach(el=>el.textContent='CUSTOM');calc.querySelectorAll('[data-firstyear-save]').forEach(el=>el.textContent='CUSTOM QUOTE');if(note)note.hidden=false;}else{const firstYear=tier.upfront+tier.monthly*12;calc.querySelectorAll('[data-upfront-save]').forEach(el=>el.textContent=money(tier.upfront));calc.querySelectorAll('[data-platform-save]').forEach(el=>{el.textContent=el.closest('.ecosystem-result-hero')?`${money(tier.monthly)}/MO`:money(tier.monthly);});calc.querySelectorAll('[data-firstyear-save]').forEach(el=>el.textContent=money(firstYear));if(note)note.hidden=true;}};slider.addEventListener('input',update);update();});
})();

/* V24 — Preserve selected calculator volume */
(() => {const values=[3000,5000,10000,25000,40000,60000,100000,200000,500000,1000000];const closest=value=>{let best=0,diff=Infinity;values.forEach((v,i)=>{const d=Math.abs(v-value);if(d<diff){diff=d;best=i;}});return best;};document.querySelectorAll('[data-preserve-volume]').forEach(link=>{link.addEventListener('click',()=>{const type=link.getAttribute('data-preserve-volume');const card=link.closest(type==='processing'?'[data-processing-calc]':'[data-ecosystem-calc]');const slider=card&&card.querySelector('[data-volume-slider]');if(!slider)return;const selected=values[Number(slider.value)]||25000;const href=new URL(link.getAttribute('href'),window.location.href);href.searchParams.set('volume',selected);link.setAttribute('href',href.pathname+href.search+href.hash);},{passive:true});});const requested=Number(new URLSearchParams(location.search).get('volume'));if(requested>0){const idx=closest(requested);document.querySelectorAll('[data-volume-slider]').forEach(slider=>{slider.value=idx;slider.dispatchEvent(new Event('input',{bubbles:true}));});}})();

/* V57 — fixed-header anchor correction on mobile */
(() => {const mobile=()=>matchMedia('(max-width: 640px)').matches;const offset=()=>{const h=document.querySelector('.site-header');return(h?h.getBoundingClientRect().height:82)+28;};const move=(hash,smooth=false)=>{if(!mobile()||!hash||hash==='#top')return;let el;try{el=document.querySelector(hash);}catch(_){return;}if(!el)return;const y=el.getBoundingClientRect().top+scrollY-offset();scrollTo({top:Math.max(0,y),behavior:smooth?'smooth':'auto'});};document.addEventListener('DOMContentLoaded',()=>{if(location.hash)setTimeout(()=>move(location.hash),90);document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const hash=a.getAttribute('href');if(!mobile()||!hash||hash==='#')return;const target=document.querySelector(hash);if(!target)return;e.preventDefault();history.pushState(null,'',hash);move(hash,true);}));});addEventListener('hashchange',()=>setTimeout(()=>move(location.hash),20));})();

/* V71 — Propel Contractor Suite homepage feature */
(() => {const mount=()=>{if(!document.querySelector('link[href*="propel-contractor-home.css"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='propel-contractor-home.css?v=71';document.head.appendChild(link);}const mainNav=document.querySelector('.main-nav');if(mainNav&&!mainNav.querySelector('a[href="propel-contractor-suite/"]')){const item=document.createElement('a');item.href='propel-contractor-suite/';item.textContent='Contractor Suite';mainNav.insertBefore(item,mainNav.querySelector('.nav-cta')||null);}const footer=document.querySelector('footer');if(footer&&!footer.querySelector('a[href="propel-contractor-suite/"]')){const kingdom=[...footer.querySelectorAll('a')].find(a=>a.href.includes('kingdompropel.com'));const item=document.createElement('a');item.href='propel-contractor-suite/';item.textContent='Propel Contractor Suite';if(kingdom&&kingdom.parentNode)kingdom.parentNode.insertBefore(item,kingdom);}if(document.getElementById('contractor-suite'))return;const payments=document.getElementById('payments');if(!payments)return;payments.insertAdjacentHTML('beforebegin',`<section class="pcs-home-feature" id="contractor-suite" aria-labelledby="pcs-home-heading">
    <svg
      class="pcs-home-symbols"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <!--
          Lucide Hammer and Sprout: official, unmodified SVG geometry.
          Source: https://github.com/lucide-icons/lucide/tree/03eae6069edfc373673bd05d723491f05ba936e3/icons

          ISC License

          Copyright (c) 2026 Lucide Icons and Contributors

          Permission to use, copy, modify, and/or distribute this software for any
          purpose with or without fee is hereby granted, provided that the above
          copyright notice and this permission notice appear in all copies.

          THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
          WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
          MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
          ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
          WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
          ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
          OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
        -->
        <symbol id="pcs-home-i-hammer-clean" viewBox="0 0 24 24">
          <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" />
          <path d="m18 15 4-4" />
          <path
            d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
          />
        </symbol>
        <symbol id="pcs-home-i-sprout-clean" viewBox="0 0 24 24">
          <path
            d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"
          />
          <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
          <path d="M5 21h14" />
        </symbol>
        <symbol id="pcs-home-i-layers" viewBox="0 0 24 24">
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </symbol>
        <symbol id="pcs-home-i-users" viewBox="0 0 24 24">
          <circle cx="9" cy="7" r="3" />
          <path
            d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M21 21v-3a6 6 0 0 0-4-5"
          />
        </symbol>
        <symbol id="pcs-home-i-chart" viewBox="0 0 24 24">
          <path d="M4 20v-6h3v6zM11 20V9h3v11zM18 20V3h3v17z" />
        </symbol>
        <symbol id="pcs-home-i-handshake" viewBox="0 0 24 24">
          <path d="m2 9 4-4 4 1 4-1 8 5-4 7-3 2-3-1-3-2-3-4-4-3Z" />
          <path d="m10 6-3 4 3 2 3-3 6 5M12 18l2-3M15 19l2-3" />
        </symbol>
        <symbol id="pcs-home-i-user" viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="4" />
          <path d="M4 21v-3a8 8 0 0 1 16 0v3H4Z" />
        </symbol>
        <symbol id="pcs-home-i-file" viewBox="0 0 24 24">
          <path d="M6 3h8l4 4v14H6V3Z" />
          <path d="M14 3v5h4M9 12h6M9 16h6" />
        </symbol>
        <symbol id="pcs-home-i-shield" viewBox="0 0 24 24">
          <path d="m12 3 9 4v5c0 5-4 8-9 10-5-2-9-5-9-10V7l9-4Z" />
          <path d="m8 12 3 3 5-6" />
        </symbol>
        <symbol id="pcs-home-i-hardhat" viewBox="0 0 24 24">
          <path d="M4 17v-3a8 8 0 0 1 16 0v3M2 17h20v4H2v-4ZM9 10V3h6v7" />
        </symbol>
        <symbol id="pcs-home-i-tools" viewBox="0 0 24 24">
          <path d="M2 8.6 7.3 3.3h4v4H8.6l10.1 10.1-2 2L6.6 9.3l-2 2L2 8.6Z" />
          <path
            d="M15 3a5 5 0 0 0 6 6l-4 4M13 16l-5 5a2.1 2.1 0 0 1-3-3l5-5M15 3l3 3 3-3"
          />
        </symbol>
        <symbol id="pcs-home-i-clipboard-check" viewBox="0 0 24 24">
          <path
            d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"
          />
          <rect x="9" y="2" width="6" height="4" rx="1" />
          <path d="m8 13 3 3 5-5" />
        </symbol>
        <symbol id="pcs-home-i-infinity" viewBox="0 0 24 24">
          <path
            d="M12 12C9 7 7 6 5 7c-5 2-4 10 1 10 5 0 7-10 12-10 5 0 6 8 1 10-2 1-4 0-7-5Z"
          />
        </symbol>
        <symbol id="pcs-home-i-box" viewBox="0 0 24 24">
          <path
            d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm-9 5 9 5 9-5M12 12v10M7 5l9 5"
          />
        </symbol>
        <symbol id="pcs-home-i-dollar" viewBox="0 0 24 24">
          <path
            d="M12 2v20M18 6H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H5"
            transform="translate(0 -2)"
          />
        </symbol>
        <symbol id="pcs-home-i-gauge" viewBox="0 0 24 24">
          <path d="M4 19a10 10 0 1 1 16 0M12 12l5-5M5 12h2M12 4v2M17 12h2" />
          <circle cx="12" cy="12" r="2" />
        </symbol>
        <symbol id="pcs-home-i-headset" viewBox="0 0 24 24">
          <path
            d="M4 14V9a8 8 0 0 1 16 0v5M4 11H2v7h4v-7H4ZM20 11h2v7h-4v-7h2ZM20 18c0 4-4 4-8 4"
          />
        </symbol>
        <symbol id="pcs-home-i-voice" viewBox="0 0 24 24">
          <path d="M3 10v4M7 6v12M12 2v20M17 6v12M21 10v4" />
        </symbol>
        <symbol id="pcs-home-i-spark" viewBox="0 0 24 24">
          <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />
        </symbol>
        <symbol id="pcs-home-i-home" viewBox="0 0 24 24">
          <path d="m2 11 10-9 10 9M5 9v12h14V9M10 21v-8h4v8M18 3v4" />
        </symbol>
        <symbol id="pcs-home-i-leaf" viewBox="0 0 24 24">
          <path
            d="M20 3C7 3 3 6 5 15c9 4 15-1 15-12ZM3 22 16 8M4 4c-4 5-2 9 1 11"
          />
        </symbol>
        <symbol id="pcs-home-i-gear" viewBox="0 0 24 24">
          <path
            d="m10 2-1 3-3-1-2 3 2 2-3 2v3l3 1-1 3 3 2 2-2 2 3h3l1-3 3 1 2-3-2-2 3-2v-3l-3-1 1-3-3-2-2 2-2-3h-3Z"
          />
          <circle cx="12" cy="12" r="4" />
        </symbol>
        <symbol id="pcs-home-i-bolt" viewBox="0 0 24 24">
          <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />
        </symbol>
        <symbol id="pcs-home-i-building" viewBox="0 0 24 24">
          <path
            d="M3 22V2h11v20M14 9h7v13H3M7 6h3M7 10h3M7 14h3M7 18h3M17 13h1M17 17h1"
          />
        </symbol>
        <symbol id="pcs-home-i-services" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
        </symbol>
        <symbol id="pcs-home-i-roof" viewBox="0 0 24 24">
          <path d="m2 14 10-10 10 10M5 11v9h14v-9M8 8h8" />
        </symbol>
        <symbol id="pcs-home-i-phone" viewBox="0 0 24 24">
          <path d="M4 3 2 7c1 8 7 14 15 15l4-2-4-6-4 2-5-5 2-4-6-4Z" />
        </symbol>
        <symbol id="pcs-home-i-mail" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 5 10 8L22 5M3 19l6-7M21 19l-6-7" />
        </symbol>
        <symbol id="pcs-home-i-calendar" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3" />
        </symbol>
      </defs></svg
    >
<svg
          class="pcs-home-wave"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-80 230C190-70 310 115 585 203s470 95 960-174"
            stroke="#00543E"
            stroke-width="90"
            opacity=".5"
          />
          <path
            d="M-80 230C190-70 310 115 585 203s470 95 960-174"
            stroke="#48F5AD"
            stroke-width="2"
          />
          <path
            d="M-80 230C190 -70 310 115 585 203s470 95 960 -174"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.26"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 235C190 -58 310 124 585 206s470 92 960 -182"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.24200000000000002"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 240C190 -46 310 133 585 209s470 89 960 -190"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.224"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 245C190 -34 310 142 585 212s470 86 960 -198"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.20600000000000002"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 250C190 -22 310 151 585 215s470 83 960 -206"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.188"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 255C190 -10 310 160 585 218s470 80 960 -214"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.17"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 260C190 2 310 169 585 221s470 77 960 -222"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.15200000000000002"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 265C190 14 310 178 585 224s470 74 960 -230"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.134"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 270C190 26 310 187 585 227s470 71 960 -238"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.11600000000000002"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 275C190 38 310 196 585 230s470 68 960 -246"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.09800000000000003"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 280C190 50 310 205 585 233s470 65 960 -254"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.08000000000000002"
            stroke-dasharray="1 5"
          />
          <path
            d="M-80 285C190 62 310 214 585 236s470 62 960 -262"
            stroke="#48F5AD"
            stroke-width=".7"
            opacity="0.06200000000000003"
            stroke-dasharray="1 5"
          />
        </svg>
<div class="container pcs-home-grid">
  <div class="pcs-home-copy visible">
    <div class="pcs-home-pill"><i></i>CONTRACTOR PLATFORM PREVIEW</div>
    <div class="pcs-home-propel-lockup">
              <img
                src="/propel-contractor-suite/assets/propel-contractor-suite-approved-v73.webp"
                width="1614"
                height="522"
                loading="lazy" decoding="async" alt="Propel Contractor Suite by Eagle Vision"
              />
            </div>
    <h2 id="pcs-home-heading">Your business has more potential. <em>Propel it.</em></h2>
    <p>From the first inquiry to estimates, crews, job costs, customer communication and long-term property care—Propel is being built to bring your operation together.</p>
    <div class="pcs-home-points"><span><svg class="pcs-home-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#pcs-home-i-users" /></svg>CRM + Leads</span><span><svg class="pcs-home-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#pcs-home-i-file" /></svg>Estimates + Sales</span><span><svg class="pcs-home-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#pcs-home-i-hardhat" /></svg>Projects + Jobs</span><span><svg class="pcs-home-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#pcs-home-i-shield" /></svg>Profit Guard</span><span><svg class="pcs-home-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#pcs-home-i-home" /></svg>Property Passport</span><span><svg class="pcs-home-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#pcs-home-i-spark" /></svg>AI Tools</span></div>
    <div class="pcs-home-actions"><a class="pcs-home-primary pcs-home-button pcs-home-button-primary" href="https://eaglevision.biz/propel-contractor-suite/">Explore Contractor Suite <span aria-hidden="true">→</span></a><a class="pcs-home-secondary pcs-home-button pcs-home-button-ghost" href="https://eaglevision.biz/propel-contractor-suite/#request-demo">Request a Demo</a></div>
    <small class="pcs-home-readiness">Propel Contractor Suite is currently in development. Demonstrations, early access and feature availability are subject to readiness and approval. This preview does not authorize Release 1.0 or unapproved production capabilities.</small>
  </div>
  <div class="pcs-home-visual visible">          <div
            class="pcs-home-preview"
            role="img"
            aria-label="Product vision preview: laptop business dashboard with 18 open jobs, a $284K sales pipeline and 31.4% forecast margin, alongside a contractor field dashboard showing a crew-ready remodel and a connected job workflow"
          >
            <div class="pcs-home-screen">
              <div class="pcs-home-screenbar">
                <i></i><i></i><i></i><b>Propel Contractor Suite</b
                ><span>PLATFORM VISION</span>
              </div>
              <div class="pcs-home-app">
                <aside>
                  <div class="pcs-home-mark">
                    <img
                      src="/propel-contractor-suite/assets/propel-contractor-app-icon-approved-v80.webp"
                      alt=""
                      width="40"
                      height="43"
                    />
                  </div>
                  <span class="active"
                    ><svg
                      class="pcs-home-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <use href="#pcs-home-i-gauge" /></svg
                    ><b>Overview</b></span
                  ><span class=""
                    ><svg
                      class="pcs-home-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <use href="#pcs-home-i-user" /></svg
                    ><b>Leads</b></span
                  ><span class=""
                    ><svg
                      class="pcs-home-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <use href="#pcs-home-i-file" /></svg
                    ><b>Estimates</b></span
                  ><span class=""
                    ><svg
                      class="pcs-home-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <use href="#pcs-home-i-hardhat" /></svg
                    ><b>Jobs</b></span
                  ><span class=""
                    ><svg
                      class="pcs-home-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <use href="#pcs-home-i-home" /></svg
                    ><b>Property</b></span
                  ><span class=""
                    ><svg
                      class="pcs-home-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <use href="#pcs-home-i-chart" /></svg
                    ><b>Reports</b></span
                  >
                </aside>
                <div class="pcs-home-appmain">
                  <div class="pcs-home-apphead">
                    <div>
                      <small>OWNER COMMAND CENTER</small
                      ><strong>Business Overview</strong>
                    </div>
                    <span class="pcs-home-app-button">New Estimate +</span>
                  </div>
                  <div class="pcs-home-kpis">
                    <article>
                      <small>OPEN JOBS</small><b>18</b><em>6 crew-ready</em>
                    </article>
                    <article>
                      <small>SALES PIPELINE</small><b>$284K</b
                      ><em>12 opportunities</em>
                    </article>
                    <article>
                      <small>FORECAST MARGIN</small><b>31.4%</b
                      ><em>Profit Guard</em>
                    </article>
                  </div>
                  <div class="pcs-home-board">
                    <div class="pcs-home-board-heading">
                      <strong>Today’s jobs</strong><span>3 active crews</span>
                    </div>
                    <div class="pcs-home-board-row">
                      <i class="green"></i><b>Oak Ridge Remodel</b
                      ><span>Crew A · Field ready</span><em>›</em>
                    </div>
                    <div class="pcs-home-board-row">
                      <i class="blue"></i><b>Harbor Roof Repair</b
                      ><span>Materials confirmed</span><em>›</em>
                    </div>
                    <div class="pcs-home-board-row">
                      <i class="amber"></i><b>Pinecrest Maintenance</b
                      ><span>Customer approved</span><em>›</em>
                    </div>
                  </div>
                  <div class="pcs-home-app-footer">
                    <span>One connected operating picture</span
                    ><span>Sample data</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="pcs-home-laptop-base"></div>
            <div class="pcs-home-phone">
              <header class="pcs-home-phone-brand">
                <img
                  src="/propel-contractor-suite/assets/propel-contractor-app-icon-approved-v80.webp"
                  width="20"
                  height="22"
                  alt=""
                /><span>PROPEL / FIELD</span><i></i>
              </header>
              <h3>
                Your construction business. <em>One connected ecosystem.</em>
              </h3>
              <article class="pcs-home-phone-job">
                <div class="pcs-home-phone-job-label">
                  <span>TODAY’S JOB</span
                  ><span class="pcs-home-phone-ready">CREW READY</span>
                </div>
                <strong>Oak Ridge Remodel</strong
                ><small>Kitchen renovation · Crew A</small>
                <div class="pcs-home-phone-progress"><span></span></div>
                <div class="pcs-home-phone-progress-label">
                  <span>Job progress</span><b>68%</b>
                </div>
              </article>
              <ul class="pcs-home-phone-timeline">
                <li>Scope approved</li>
                <li>Crew scheduled</li>
                <li>Site updates connected</li>
              </ul>
              <div class="pcs-home-phone-nav">
                <span
                  ><svg
                    class="pcs-home-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <use href="#pcs-home-i-hardhat" /></svg
                  >Jobs</span
                ><span
                  ><svg
                    class="pcs-home-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <use href="#pcs-home-i-users" /></svg
                  >Crew</span
                ><span
                  ><svg
                    class="pcs-home-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <use href="#pcs-home-i-chart" /></svg
                  >Costs</span
                >
              </div>
            </div>
            <small class="pcs-home-preview-label"
              >ILLUSTRATIVE PRODUCT VISION · SAMPLE DATA</small
            >
          </div></div>
</div>
</section>`);};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount):mount();})();
