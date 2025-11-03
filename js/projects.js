// Gestion de la lightbox pour afficher les images en grand
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments de la lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const projectImages = document.querySelectorAll('.project-image');

    // Ajouter un écouteur de clic sur chaque image pour ouvrir la lightbox
    projectImages.forEach(function(img) {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });

    // Fonction pour ouvrir la lightbox
    function openLightbox(imgElement) {
        lightbox.classList.add('active');
        lightboxImg.src = imgElement.src;
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    }

    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Réactiver le scroll
    }

    // Fermer avec le bouton X
    closeBtn.addEventListener('click', closeLightbox);

    // Fermer en cliquant en dehors de l'image (sur l'overlay lightbox)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- Début du carrousel jQuery ---

    // Déclaration des variables du carrousel
    var carousel = $(".carousel"),
        items = $(".item"), // Sélectionne les cartes .item
        currdeg  = 0;

    // Fonction de rotation
    function rotate(direction){
        if(direction=="n"){
            currdeg = currdeg - 120; // 120 degrés pour 3 images
        } else if(direction=="p"){
            currdeg = currdeg + 120; // 120 degrés pour 3 images
        }

        // Applique la rotation au carrousel (le "manège")
        carousel.css({
            "transform": "rotateY("+currdeg+"deg)"
        });

        items.css({
            "transform": "rotateY("+(-currdeg)+"deg)"
        });
    }

    // --- Défilement automatique toutes les 5 secondes ---
    let autoRotate = setInterval(function() {
        rotate("n"); // Fait avancer le carrousel
    }, 5000); // 5000 ms = 5 secondes


});