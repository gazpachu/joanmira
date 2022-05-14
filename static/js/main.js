document.addEventListener("DOMContentLoaded", function() {
  const html = document.querySelector('html');
  const themeToggleButton = document.querySelector('.theme-toggle');

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  });

  themeToggleButton.addEventListener('click', event => {
    if (html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
    }
  });

  const mainMenuItems = document.querySelectorAll('#main-menu li');
  mainMenuItems && mainMenuItems.forEach(item => {
    if (window.location.pathname.includes(item.getAttribute('data-menu-item'))) {
      item.classList.add('active');
    }
  });
});