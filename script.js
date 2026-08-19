const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');
if(toggle){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const yearEl=document.getElementById('year');if(yearEl){yearEl.textContent=new Date().getFullYear();}


/* =========================================================
   V22 — Eagle Vision savings calculators
   ========================================================= */
(() => {
  const volumeMilestones = [3000, 5000, 10000, 25000, 40000, 60000, 100000, 200000, 500000, 1000000];

  const money = (n) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(n);

  const volumeText = (n) => money(n);

  function ecosystemTier(volume) {
    if (volume < 10000) return { upfront: 250, monthly: 10, custom: false };
    if (volume < 20000) return { upfront: 500, monthly: 25, custom: false };
    if (volume < 40000) return { upfront: 1000, monthly: 50, custom: false };
    if (volume < 75000) return { upfront: 1500, monthly: 75, custom: false };
    if (volume <= 100000) return { upfront: 2000, monthly: 100, custom: false };
    return { upfront: 0, monthly: 0, custom: true };
  }

  document.querySelectorAll('[data-processing-calc]').forEach(calc => {
    const slider = calc.querySelector('[data-volume-slider]');
    if (!slider) return;

    const update = () => {
      const volume = volumeMilestones[Number(slider.value)] || 25000;
      const estimatedFees = volume * 0.04;
      const monthlySavings = estimatedFees * 0.99;
      const annualSavings = monthlySavings * 12;

      calc.querySelectorAll('[data-volume-label]').forEach(el => el.textContent = volumeText(volume));
      calc.querySelectorAll('[data-est-fees]').forEach(el => el.textContent = money(estimatedFees));
      calc.querySelectorAll('[data-monthly-save]').forEach(el => el.textContent = money(monthlySavings));
      calc.querySelectorAll('[data-annual-save]').forEach(el => el.textContent = money(annualSavings));
    };

    slider.addEventListener('input', update);
    update();
  });

  document.querySelectorAll('[data-ecosystem-calc]').forEach(calc => {
    const slider = calc.querySelector('[data-volume-slider]');
    if (!slider) return;

    const update = () => {
      const volume = volumeMilestones[Number(slider.value)] || 25000;
      const tier = ecosystemTier(volume);
      const note = calc.querySelector('[data-custom-note]');

      calc.querySelectorAll('[data-volume-label]').forEach(el => el.textContent = volumeText(volume));

      if (tier.custom) {
        calc.querySelectorAll('[data-upfront-save]').forEach(el => el.textContent = 'CUSTOM');
        calc.querySelectorAll('[data-platform-save]').forEach(el => el.textContent = 'CUSTOM');
        calc.querySelectorAll('[data-firstyear-save]').forEach(el => el.textContent = 'CUSTOM QUOTE');
        if (note) note.hidden = false;
      } else {
        const firstYear = tier.upfront + tier.monthly * 12;
        calc.querySelectorAll('[data-upfront-save]').forEach(el => el.textContent = money(tier.upfront));
        calc.querySelectorAll('[data-platform-save]').forEach(el => {
          el.textContent = el.closest('.ecosystem-result-hero') ? `${money(tier.monthly)}/MO` : money(tier.monthly);
        });
        calc.querySelectorAll('[data-firstyear-save]').forEach(el => el.textContent = money(firstYear));
        if (note) note.hidden = true;
      }
    };

    slider.addEventListener('input', update);
    update();
  });
})();


/* =========================================================
   V24 — Preserve selected calculator volume on click-through
   and initialize Payments-page calculators from ?volume=
   ========================================================= */
(() => {
  const volumeMilestonesV24 = [3000, 5000, 10000, 25000, 40000, 60000, 100000, 200000, 500000, 1000000];

  const closestIndex = (value) => {
    let best = 0;
    let diff = Infinity;
    volumeMilestonesV24.forEach((v, i) => {
      const d = Math.abs(v - value);
      if (d < diff) { diff = d; best = i; }
    });
    return best;
  };

  document.querySelectorAll('[data-preserve-volume]').forEach(link => {
    link.addEventListener('click', (e) => {
      const type = link.getAttribute('data-preserve-volume');
      const card = link.closest(type === 'processing' ? '[data-processing-calc]' : '[data-ecosystem-calc]');
      const slider = card && card.querySelector('[data-volume-slider]');
      if (!slider) return;

      const selected = volumeMilestonesV24[Number(slider.value)] || 25000;
      const href = new URL(link.getAttribute('href'), window.location.href);
      href.searchParams.set('volume', selected);
      link.setAttribute('href', href.pathname + href.search + href.hash);
    }, { passive: true });
  });

  const params = new URLSearchParams(window.location.search);
  const requestedVolume = Number(params.get('volume'));
  if (requestedVolume > 0) {
    const idx = closestIndex(requestedVolume);
    document.querySelectorAll('[data-volume-slider]').forEach(slider => {
      slider.value = idx;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }
})();

/* =========================================================
   V57 — fixed-header anchor correction on mobile
   Ensures same-page sections never land underneath the header.
   ========================================================= */
(() => {
  const mobile = () => window.matchMedia('(max-width: 640px)').matches;
  const headerOffset = () => {
    const h = document.querySelector('.site-header');
    return (h ? h.getBoundingClientRect().height : 82) + 28;
  };
  const scrollToHash = (hash, smooth = false) => {
    if (!mobile() || !hash || hash === '#top') return;
    let el;
    try { el = document.querySelector(hash); } catch (_) { return; }
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'auto' });
  };
  document.addEventListener('DOMContentLoaded', () => {
    if (location.hash) setTimeout(() => scrollToHash(location.hash, false), 90);
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const hash = a.getAttribute('href');
      if (!mobile() || !hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', hash);
      scrollToHash(hash, true);
    }));
  });
  window.addEventListener('hashchange', () => setTimeout(() => scrollToHash(location.hash, false), 20));
})();
