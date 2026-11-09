(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang');
  if (!['de', 'en'].includes(lang)) lang = navigator.language?.startsWith('de') ? 'de' : 'en';
  const titles = {index: ['Zehnfingerschreiben lernen', 'Learn touch typing'], privacy: ['Datenschutz', 'Privacy'], legal: ['Impressum', 'Legal notice']};
  function apply(next) {
    lang = next;
    document.documentElement.lang = lang;
    const page = location.pathname.split('/').pop()?.split('.')[0] || 'index';
    document.title = 'Tenfingo – ' + (titles[page] || titles.index)[lang === 'de' ? 0 : 1];
    document.querySelector('meta[name="description"]').content = lang === 'de' ? 'Tenfingo: Zehnfingerschreiben mit geführtem Kurs, Fingerfarben und lokalen Fortschritten. Für Windows. Offline üben, ohne Werbung oder App-Konto.' : 'Tenfingo: learn touch typing with guided lessons, finger colours and local progress. For Windows. Practise offline with no ads or app account.';
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (/^(index|privacy|legal)\.html(?:[?#]|$)/.test(href)) {
        const url = new URL(href, location.href);
        url.searchParams.set('lang', lang);
        a.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
      }
    });
    document.querySelectorAll('[data-shot]').forEach(img => {
      img.src = 'img/' + lang + '-' + img.dataset.shot + '.webp';
      img.alt = img.dataset[lang === 'de' ? 'altDe' : 'altEn'];
      img.parentElement.href = img.src;
      img.parentElement.setAttribute('aria-label', img.parentElement.dataset[lang === 'de' ? 'labelDe' : 'labelEn']);
    });
    document.querySelectorAll('[data-mail-de]').forEach(a => a.setAttribute('href', 'mailto:mip@gmx.biz?subject=' + a.dataset[lang === 'de' ? 'mailDe' : 'mailEn']));
    const button = document.querySelector('.language');
    button.textContent = lang === 'de' ? 'EN' : 'DE';
    button.setAttribute('aria-label', lang === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln');
  }
  document.querySelector('.language').addEventListener('click', () => {
    const next = lang === 'de' ? 'en' : 'de';
    const url = new URL(location.href);
    url.searchParams.set('lang', next);
    history.replaceState(null, '', url);
    apply(next);
  });
  apply(lang);
})();
