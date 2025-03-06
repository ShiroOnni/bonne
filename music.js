const audio = document.getElementById('background-music');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const playPauseButton = document.getElementById('play-pause');

// Récupérer l'état de la musique depuis le localStorage
const savedTime = localStorage.getItem('musicTime');
const isPlaying = localStorage.getItem('isPlaying') === 'true';

// Si un temps est sauvegardé, reprendre la musique à ce moment
if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
}

// Si la musique était en lecture, la relancer
if (isPlaying) {
    audio.play();
    playPauseButton.textContent = '⏸';
} else {
    audio.pause();
    playPauseButton.textContent = '⏵';
}

// Démarrer ou mettre en pause la musique
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸';
        localStorage.setItem('isPlaying', 'true');
    } else {
        audio.pause();
        playPauseButton.textContent = '⏵';
        localStorage.setItem('isPlaying', 'false');
    }
});

// Mettre à jour la barre de progression
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    localStorage.setItem('musicTime', audio.currentTime);
});

// Cliquer sur la barre de progression pour changer la position de la musique
progressBar.addEventListener('click', (e) => {
    const clickPosition = e.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const newTime = (clickPosition / progressBarWidth) * audio.duration;
    audio.currentTime = newTime;
    localStorage.setItem('musicTime', newTime);
});

// Démarrer la musique automatiquement (si autorisé)
audio.play().catch(() => {
    console.log("La lecture automatique est bloquée. Cliquez sur la page pour démarrer la musique.");
});

// Démarrer la musique au clic si la lecture automatique est bloquée
document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸';
        localStorage.setItem('isPlaying', 'true');
    }
});