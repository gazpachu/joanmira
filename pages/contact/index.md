---
title: Contact
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
    netlify
    class="form"
  >
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Name" required>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="Email" required>
    <label>Attach a file (max. 8 MB)</label>
    <input type="file" name="upload">
    <label for="message">Message</label>
    <textarea name="message" id="message" placeholder="Message" required></textarea>
    <button type="submit" id="contact-form-button">Send</button>
    <p id="contact-form-status" data-thanks="Thanks for your submission!" data-error="Oops! There was a problem submitting your form. Please try again"></p>
  </form>
<div>

<a href="https://maps.app.goo.gl/RuEUrNHcSVeM9U6Y7" target="_blank">Calle Perú 14, Local 11. Alicante, Spain</a><br />(Office in Momardi Art Collective)

Tel. [613 02 04 16](tel:+34613020416) · [WhatsApp](https://wa.me/34613020416)

Email: [hello@joanmira.com](https://mailto:hello@joanmira.com)

To **request a quote**, please include company and project information, your CV or LinkedIn profile, and availability for an online meeting.

If you are **looking for a job** or are interested in **collaborating on a project**, please include your CV or LinkedIn profile and available timeslots for an online meeting.

For open-source code-related questions, please open an issue in the relevant [GitHub repository](https://github.com/gazpachu) or [blog post](/blog).
</div>
</div>