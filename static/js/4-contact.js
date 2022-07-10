document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contact-form');
  const button = document.getElementById('contact-form-button');
    
  async function handleSubmit(event) {
    event.preventDefault();
    button.setAttribute('disabled', '');
    const status = document.getElementById('contact-form-status');
    const data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      button.removeAttribute('disabled');
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
      button.removeAttribute('disabled');
    });
  }
  if (form) form.addEventListener("submit", handleSubmit);
});