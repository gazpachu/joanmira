document.addEventListener("DOMContentLoaded", function() {
  const html = document.querySelector('html');
  const themeToggleButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const hasConsent = localStorage.getItem('dataCaptureConsent');

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
      localStorage.setItem('theme', 'dark');
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
        localStorage.setItem('theme', 'dark');
      }
    } else {
      html.setAttribute('data-theme', 'light');
      if (hasConsent) {
        localStorage.setItem('theme', 'light');
      }
    }
    utterancesTheme();
  });

  themeToggleButton.addEventListener('click', event => {
    if (html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
      if (hasConsent) {
        localStorage.setItem('theme', 'light');
      }
    } else {
      html.setAttribute('data-theme', 'dark');
      if (hasConsent) {
        localStorage.setItem('theme', 'dark');
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
});