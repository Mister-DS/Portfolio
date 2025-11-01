// Gestion de la lightbox pour afficher les images en grand
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const projectImages = document.querySelectorAll('.project-image');

    // Ajouter un écouteur de clic sur chaque image
    projectImages.forEach(function(img) {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });

    // Fonction pour ouvrir la lightbox
    function openLightbox(imgElement) {
        lightbox.classList.add('active');
        lightboxImg.src = imgElement.src;
        lightboxCaption.textContent = imgElement.alt;
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    }

    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Réactiver le scroll
    }

    // Fermer avec le bouton X
    closeBtn.addEventListener('click', closeLightbox);

    // Fermer en cliquant en dehors de l'image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === lightboxImg) {
            closeLightbox();
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
