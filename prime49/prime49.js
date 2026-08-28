(() => {
  const calc = document.querySelector('[data-p49-calculator]');
  if (!calc) return;

  const volumeSlider = calc.querySelector('#p49-volume');
  const rateSlider = calc.querySelector('#p49-effective-rate');
  const VOLUME_INCREMENT = 5000;
  const PAYOUT_PER_INCREMENT = 20;
  const DEFAULT_VOLUME = 15000;
  const DEFAULT_RATE = 4.5;

  const money = n => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Math.round(n));

  const rateText = n => `${Number(n).toFixed(1)}%`;
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach(el => {
      el.textContent = value;
    });
  };
  const setValue = (selector, value) => {
    document.querySelectorAll(selector).forEach(el => {
      el.value = value;
    });
  };

  const update = () => {
    const volume = Number(volumeSlider.value || DEFAULT_VOLUME);
    const effectiveRatePercent = Number(rateSlider.value || DEFAULT_RATE);
    const effectiveRate = effectiveRatePercent / 100;

    const annualVolume = volume * 12;
    const monthlyPayout = (volume / VOLUME_INCREMENT) * PAYOUT_PER_INCREMENT;
    const annualPayout = monthlyPayout * 12;
    const monthlyFeeSavings = volume * effectiveRate;
    const annualFeeSavings = monthlyFeeSavings * 12;
    const totalMonthlyImpact = monthlyPayout + monthlyFeeSavings;
    const totalAnnualImpact = annualPayout + annualFeeSavings;

    volumeSlider.setAttribute('aria-valuenow', String(volume));
    volumeSlider.setAttribute('aria-valuetext', `${money(volume)} monthly card volume; ${money(monthlyPayout)} estimated monthly Prime49 payout`);
    rateSlider.setAttribute('aria-valuenow', effectiveRatePercent.toFixed(1));
    rateSlider.setAttribute('aria-valuetext', `${rateText(effectiveRatePercent)} estimated all-in effective payment cost rate`);

    setText('[data-p49-volume],[data-p49-monthly],[data-p49-result-volume]', money(volume));
    setText('[data-p49-annual]', money(annualVolume));
    setText('[data-p49-monthly-payout],[data-p49-result-monthly],[data-p49-hero-payout]', money(monthlyPayout));
    setText('[data-p49-annual-payout],[data-p49-result-annual]', money(annualPayout));
    setText('[data-p49-rate]', rateText(effectiveRatePercent));
    setText('[data-p49-rate-copy],[data-p49-rate-formula]', rateText(effectiveRatePercent));
    setText('[data-p49-fee-monthly],[data-p49-result-fee-monthly]', money(monthlyFeeSavings));
    setText('[data-p49-fee-annual],[data-p49-result-fee-annual]', money(annualFeeSavings));
    setText('[data-p49-total-monthly],[data-p49-breakdown-total-monthly]', money(totalMonthlyImpact));
    setText('[data-p49-total-annual],[data-p49-breakdown-total-annual]', money(totalAnnualImpact));

    setValue('[data-p49-form-volume]', money(volume));
    setValue('[data-p49-form-rate]', rateText(effectiveRatePercent));
    setValue('[data-p49-form-monthly-payout]', money(monthlyPayout));
    setValue('[data-p49-form-annual-payout]', money(annualPayout));
    setValue('[data-p49-form-monthly-fee-savings]', money(monthlyFeeSavings));
    setValue('[data-p49-form-annual-fee-savings]', money(annualFeeSavings));
    setValue('[data-p49-form-total-monthly]', money(totalMonthlyImpact));
    setValue('[data-p49-form-total-annual]', money(totalAnnualImpact));

    const hero = document.getElementById('hero-monthly-volume');
    if (hero) hero.textContent = money(volume);
  };

  volumeSlider.addEventListener('input', update);
  volumeSlider.addEventListener('change', update);
  rateSlider.addEventListener('input', update);
  rateSlider.addEventListener('change', update);
  update();

  document.querySelectorAll('.p49-accordion details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.p49-accordion details').forEach(other => {
        if (other !== detail) other.open = false;
      });
    });
  });
})();
