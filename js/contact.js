document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('.submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi...';

  try {
    const res = await fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      this.style.display = 'none';
      document.getElementById('form-success').classList.remove('hidden');
    } else {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
      alert('Erreur lors de l\'envoi. Essayez directement par email.');
    }
  } catch {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
    alert('Erreur réseau. Essayez directement par email.');
  }
});
