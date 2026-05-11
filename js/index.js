const roles = [
  'Développeur Full-Stack',
  'Étudiant EPHEC BAC 3',
  'Passionné Réseaux & Cybersécurité',
  'Builder de projets perso'
];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');

function type() {
  const current = roles[ri];
  if (!deleting) {
    el.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 45 : 80);
}
type();
