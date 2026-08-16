const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');
if(toggle){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();


/* =========================================================
   V22 — Eagle Vision savings calculators
   ========================================================= */
(() => {
  const volumeMilestones = [
    3000, 5000, 10000, 15000, 20000, 25000, 40000, 50000,
    75000, 100000, 150000, 200000, 400000, 500000, 750000, 1000000
  ];

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
