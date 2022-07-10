---
title: Contacto
---

<style>
  .form {
    min-width: 100%;
  }
  @media screen and (min-width: 651px) {
    .flex {
      display: flex;
    }

    .form {
      min-width: 50%;
      padding-right: calc(var(--gutter) * 2);
      margin-right: calc(var(--gutter) * 2);
      border-right: 1px solid var(--form-element-border-color);
    }
  }
  input, textarea {
    width: 100%;
    margin-bottom: var(--gutter);
  }
  textarea {
    height: 150px;
  }
</style>
<div class="flex">
  <form
    id="contact-form"
    action="https://formspree.io/f/xwkydrpz"
    method="POST"
    class="form"
  >
    <label for="name">Nombre</label>
    <input type="text" id="name" name="name" placeholder="Nombre" required>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="Email" required>
    <label for="message">Mensaje</label>
    <textarea name="message" id="message" placeholder="Mensaje" required></textarea>
    <button type="submit" id="contact-form-button">Enviar</button>
    <p id="contact-form-status" data-thanks="Gracias por el mensaje!" data-error="Oops! Ha habido un problema enviando el mensaje. Por favor, inténtalo de nuevo"></p>
  </form>
<div>

hello@joanmira.com

Si estás interesado en colaborar en algún proyecto, envía un mensaje con tu CV o perfil en LinkedIn y los horarios disponibles para hablar. ¡Muchas gracias!

Para preguntas relacionadas con proyectos de código abierto, por favor crea un "issue" en el [repositorio de Github](https://github.com/gazpachu) o [blog post](/es/blog) pertinente.
</div>
</div>