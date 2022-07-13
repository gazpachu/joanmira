document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contact-form');
  const button = document.getElementById('contact-form-button');
    
  async function handleSubmit(event) {
    event.preventDefault();
    button.setAttribute('aria-busy', true);
    const status = document.getElementById('contact-form-status');
    const data = new FormData(event.target);
    fetch('/', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      button.removeAttribute('aria-busy');
      if (response.ok) {
        status.innerHTML = status.getAttribute('data-thanks');
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = status.getAttribute('data-error');
          }
        })
      }
    }).catch(error => {
      status.innerHTML = status.getAttribute('data-error');
      button.removeAttribute('aria-busy');
    });
  }
  if (form) form.addEventListener("submit", handleSubmit);
});