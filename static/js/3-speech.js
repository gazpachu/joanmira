document.addEventListener("DOMContentLoaded", function () {
  const listenButton = document.querySelector('#listen-button');
  const article = document.querySelector('.article');

  function cleanText(text) {
    return text
      .replace('  ', '')
      .replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '')
      .replaceAll('\n', '')
      .replace(/[^a-zA-Z0-9\s()\-\%\!\?\#\+\,\'\:\;\$]/g, '');
  }

  if (listenButton && article) {
    listenButton.addEventListener('click', () => {
      listenButton.remove();
      var audio = document.getElementById('post-audio');
      audio.style.display = 'block';
      var sources = audio.getElementsByTagName("source");
      const text = cleanText(article.textContent);
      sources[0].src = `https://talkify.net/api/speech/v1?text=${text}&key=95d959e2-12bf-4b04-9537-be9a4de80646`;
      audio.load();
      audio.play();
    });
  }
});