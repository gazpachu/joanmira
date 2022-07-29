const themeKey = 'theme';
const consentKey = 'dataCaptureConsent';
const langClickedKey = 'lang';

function setConsentModalState(state) {
  const modalConsent = document.getElementById('modal-consent');
  if (state) {
    modalConsent.setAttribute('open', '');
  } else {
    modalConsent.removeAttribute('open');
    localStorage.setItem(consentKey, true);
  }
}

function initDataCapture() {
  posthog.init('phc_kdoxm8bjiwFIoptB4uIiFn61ffgWwMLKM96j3zZE5Tg',{api_host:'https://app.posthog.com'});
}

document.addEventListener("DOMContentLoaded", function() {
  const html = document.querySelector('html');
  const langDetection = document.getElementById('lang-detection');
  const themeToggleButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem(themeKey);
  const langClicked = localStorage.getItem(langClickedKey);
  const hasConsent = localStorage.getItem(consentKey);
  const match = navigator.languages.find(lang => {
    if (lang && lang.toLowerCase().includes('es')) {
      return true;
    }
  });
  if (!langClicked && match && (match.includes('es') && html.getAttribute('lang') === 'en') ||
    (match.includes('en') && html.getAttribute('lang') === 'es')) {
      langDetection.style.display = 'flex';
  }

  function utterancesTheme() {
    if (document.querySelector('.utterances-frame')) {
      const theme = html.getAttribute('data-theme') === 'dark' ? 'github-dark' : 'github-light';
      const message = {
        type: 'set-theme',
        theme: theme
      };
      const iframe = document.querySelector('.utterances-frame');
      iframe.contentWindow.postMessage(message, 'https://utteranc.es');
    }
  }

  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
    if (hasConsent) {
      localStorage.setItem(themeKey, 'dark');
    }
  }

  // wait for utterances to load and send it's first message.
  addEventListener('message', event => {
    if (event.origin !== 'https://utteranc.es') {
      return;
    }
    utterancesTheme();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      html.setAttribute('data-theme', 'dark');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'dark');
      }
    } else {
      html.setAttribute('data-theme', 'light');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'light');
      }
    }
    utterancesTheme();
  });

  themeToggleButton.addEventListener('click', event => {
    if (html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'light');
      }
    } else {
      html.setAttribute('data-theme', 'dark');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'dark');
      }
    }
    utterancesTheme();
  });

  // Top nav active element
  const mainMenuItems = document.querySelectorAll('#main-menu li');
  mainMenuItems && mainMenuItems.forEach(item => {
    if (window.location.pathname.includes(item.getAttribute('data-menu-item'))) {
      item.classList.add('active');
    }
  });

  // Blog nav active element
  const blogCategoryItems = document.querySelectorAll('#filters a');
  const allFilterButton = document.getElementById('all-filter');
  if (blogCategoryItems) {
    let foundCategory = false;
    blogCategoryItems.forEach(item => {
      if (window.location.pathname.includes(item.getAttribute('data-blog-category'))) {
        item.classList.remove('secondary');
        foundCategory = true;
      }
    });
    if (!foundCategory && allFilterButton) {
      allFilterButton.classList.remove('secondary');
    }
  }

  // Modal consent
  if (!hasConsent && !window.location.pathname.includes('/privacy')) {
    setConsentModalState(true);
  }
  if (hasConsent && !window.location.host.includes('localhost')) {
    initDataCapture();
  }

  // Header logo animation
  const el = document.querySelector('.logo-wording');
  let i = 0;
  const txt1 = 'JOAN MIRA';
  const txt2 = html.getAttribute('lang') === 'es' ? 'ESTUDIO' : 'STUDIO';
  let currentText = txt1;
  const speed = 200;
  const delay = 3000;

  function typeWriter() {
    if (i === 0) {
      el.innerHTML = '';
    }
    if (i < currentText.length) {
      el.innerHTML += currentText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      i = 0;
      currentText = currentText === txt1 ? txt2 : txt1;
      setTimeout(typeWriter, delay);
    }
  }
  typeWriter();
});

// Posthog script
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
