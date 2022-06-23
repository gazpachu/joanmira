if ('speechSynthesis' in window) {
  document.addEventListener("DOMContentLoaded", function () {
    let voices = [];
    let selectedVoiceIndex = 0;
    let speechUtterance = null;
    const listenButton = document.querySelector('#listen-button');
    const buttonText = document.querySelector('#listen-button span');
    const voiceControls = document.querySelector('.voice-controls');
    const playSvg = document.getElementById('play-svg');
    const pauseSvg = document.getElementById('pause-svg');
    const article = document.querySelector('.article');
    const [html] = document.getElementsByTagName('html');
    const lang = html.getAttribute('lang');
    let playingState = null;

    function populateVoiceList() {
      if(typeof speechSynthesis === 'undefined') {
        if (voiceControls) voiceControls.remove();
        return;
      }

      voices = speechSynthesis.getVoices();
      const voiceSelect = document.getElementById('voice-select');

      for(let i = 0; i < voices.length; i++) {
        let option = document.createElement('option');
        option.textContent = voices[i].name;
        if (voices[i].lang.includes(lang)) {
          option.setAttribute('value', i);
          voiceSelect.appendChild(option);
        }
      }

      voiceSelect.addEventListener('change', function() {
        selectedVoiceIndex = this.value;
        if (speechUtterance) {
          console.log(selectedVoiceIndex, voices[selectedVoiceIndex]);
          speechUtterance.voice = voices[selectedVoiceIndex];
          speechSynthesis.cancel();
          speechSynthesis.speak(speechUtterance);
        }
      });
    }

    populateVoiceList();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    if (listenButton && article) {
      listenButton.addEventListener('click', () => {
        if (playingState === 'playing') {
          speechSynthesis.pause();
          playingState = 'paused';
          buttonText.innerText = 'Listen';
          playSvg.style.display = 'block';
          pauseSvg.style.display = 'none';
        } else if (playingState === 'paused') {
          speechSynthesis.resume();
          playingState = 'playing';
          buttonText.innerText = 'Pause';
          playSvg.style.display = 'none';
          pauseSvg.style.display = 'block';
        }

        if (!playingState) {
          speechUtterance = new SpeechSynthesisUtterance();
          console.log(speechUtterance);
          speechUtterance.text = article.textContent;
          speechUtterance.lang = lang || 'en';
          speechUtterance.voice = voices[selectedVoiceIndex];
          speechUtterance.onerror = (err) => console.log(err);
          speechUtterance.volume = 1; // From 0 to 1
          speechUtterance.rate = 1; // From 0.1 to 10
          speechUtterance.pitch = 1; // From 0 to 2
          speechSynthesis.speak(speechUtterance);
          speechSynthesis.resume();
          playingState = 'playing';
          buttonText.innerText = 'Pause';
          playSvg.style.display = 'none';
          pauseSvg.style.display = 'block';
        }
      });
    }
  });
}