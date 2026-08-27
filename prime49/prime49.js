(() => {
  const calc = document.querySelector('[data-p49-calculator]');
  if (!calc) return;
  const slider = calc.querySelector('#p49-volume');
  const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const update = () => {
    const volume = Number(slider.value || 50000);
    document.querySelectorAll('[data-p49-volume],[data-p49-monthly]').forEach(el => el.textContent = money(volume));
    document.querySelectorAll('[data-p49-annual]').forEach(el => el.textContent = money(volume * 12));
    document.querySelectorAll('[data-p49-form-volume]').forEach(el => el.value = money(volume));
    const hero = document.getElementById('hero-monthly-volume'); if (hero) hero.textContent = money(volume);
  };
  slider.addEventListener('input', update); update();

  const toggle = document.getElementById('p49-live-toggle');
  const panel = document.getElementById('p49-live-calculator');
  if (toggle && panel) toggle.addEventListener('click', () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    toggle.textContent = opening ? 'Close the Live Calculator' : 'Open the Live Calculator →';
    if (opening) {
      const frame = panel.querySelector('iframe[data-src]');
      if (frame && !frame.src) frame.src = frame.dataset.src;
      setTimeout(() => panel.scrollIntoView({behavior:'smooth',block:'start'}), 50);
    }
  });

  document.querySelectorAll('.p49-accordion details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.p49-accordion details').forEach(other => { if (other !== detail) other.open = false; });
    });
  });
})();
