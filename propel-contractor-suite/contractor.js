(() => {
  const menu = document.querySelector('.pcs-menu');
  const nav = document.querySelector('.pcs-main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('.pcs-reveal').forEach(el => {
    if (!('IntersectionObserver' in window)) { el.classList.add('visible'); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -50px' });
    observer.observe(el);
  });

  const year = document.getElementById('pcs-year');
  if (year) year.textContent = new Date().getFullYear();

  const params = new URLSearchParams(location.search);
  const attributionFields = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'];
  attributionFields.forEach(name => {
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) input.value = params.get(name) || '';
  });
  const referrer = document.querySelector('input[name="referrer"]');
  if (referrer) referrer.value = document.referrer || '';
  const submittedAt = document.querySelector('input[name="submitted_at"]');
  if (submittedAt) submittedAt.value = new Date().toISOString();

  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    if (window.dataLayer) window.dataLayer.push({ event: 'propel_contractor_cta', target: link.getAttribute('href'), label: link.textContent.trim() });
  }));

  const form = document.querySelector('form[name="propel-contractor-interest"]');
  if (form) {
    const interests = [...form.querySelectorAll('input[name="interest"]')];
    const error = document.getElementById('interest-error');
    interests.forEach(box => box.addEventListener('change', () => {
      if (interests.some(item => item.checked) && error) error.hidden = true;
    }));
    form.addEventListener('submit', event => {
      if (!interests.some(item => item.checked)) {
        event.preventDefault();
        if (error) error.hidden = false;
        interests[0]?.focus();
        return;
      }
      if (submittedAt) submittedAt.value = new Date().toISOString();
      if (window.dataLayer) window.dataLayer.push({ event: 'propel_contractor_lead_submit' });
    });
  }
})();
