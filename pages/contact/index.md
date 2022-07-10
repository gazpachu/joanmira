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
    action="https://formspree.io/f/xwkydrpz"
    method="POST"
    class="form"
  >
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Name" required>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="Email" required>
    <label for="message">Message</label>
    <textarea name="message" id="message" placeholder="Message" required></textarea>
    <button type="submit" id="contact-form-button">Send</button>
    <p id="contact-form-status" data-thanks="Thanks for your submission!" data-error="Oops! There was a problem submitting your form. Please try again"></p>
  </form>
<div>

hello@joanmira.com

If you are interested in collaborating in a project, please send a message with your CV or LinkedIn profile and available times to talk. Many thanks! 

For open-source code-related questions, please open an issue in the relevant [GitHub repository](https://github.com/gazpachu) or [blog post](/blog).
</div>
</div>