document.addEventListener("DOMContentLoaded", function () {
  const listenButton = document.querySelector('#listen-button');
  const article = document.querySelector('.article');

  if (listenButton && article) {
    listenButton.addEventListener('click', () => {
      listenButton.remove();
      var audio = document.getElementById('post-audio');
      audio.style.display = 'block';
      var sources = audio.getElementsByTagName("source");
      sources[0].src = `${window.location.href}/audio.m4a`;
      audio.load();
      audio.play();
    });
  }
});
