document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // Logique de basculement de thème
    // ===============================================
    const themeToggle = document.getElementById('theme-toggle');
    // S'il n'y a pas de bouton de thème sur la page, ne rien faire
    if (!themeToggle) {
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Définir l'icône initiale en fonction de la classe du body
    // (qui a été définie par le script en ligne dans le HTML)
    if (body.classList.contains('light-mode')) {
        // Mode clair : on affiche la lune
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        // Mode sombre (par défaut) : on affiche le soleil
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Ajouter l'écouteur d'événement pour le clic
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Empêcher le lien de remonter en haut de page
        
        // Basculer la classe sur le body
        body.classList.toggle('light-mode');

        // Mettre à jour l'icône et sauvegarder dans localStorage
        if (body.classList.contains('light-mode')) {
            // On vient de passer en mode CLAIR, on affiche la LUNE
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            // On vient de passer en mode SOMBRE, on affiche le SOLEIL
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
});