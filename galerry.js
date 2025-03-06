const photoContainer = document.querySelector('.photo-container');
const prevButton = document.getElementById('prev-photo');
const nextButton = document.getElementById('next-photo');
const photos = document.querySelectorAll('.photo-container img');

let currentPhotoIndex = 0;

// Afficher la première photo au chargement
photos[currentPhotoIndex].classList.add('active');

// Fonction pour afficher la photo suivante
function showNextPhoto() {
    if (currentPhotoIndex < photos.length - 1) {
        photos[currentPhotoIndex].classList.remove('active');
        currentPhotoIndex++;
        photos[currentPhotoIndex].classList.add('active');
    }
}

// Fonction pour afficher la photo précédente
function showPrevPhoto() {
    if (currentPhotoIndex > 0) {
        photos[currentPhotoIndex].classList.remove('active');
        currentPhotoIndex--;
        photos[currentPhotoIndex].classList.add('active');
    }
}

// Écouteurs d'événements pour les boutons
prevButton.addEventListener('click', showPrevPhoto);
nextButton.addEventListener('click', showNextPhoto);