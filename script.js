// Simulasyon kantite moun ki deja enskri
let totalInscriptions = 254; // Ou ka mete sa dinamik pita
let percentProgress = (totalInscriptions / 1000) * 100; // Egzanp: max 1000 moun

// Mete sa sou paj la
document.addEventListener('DOMContentLoaded', () => {
  // Affiche kantite moun
  document.getElementById('counter').innerText = totalInscriptions;

  // Affiche progresyon an %
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = percentProgress + '%';
  progressBar.innerText = Math.floor(percentProgress) + '%';
  function displayRecent() {
  const entries = JSON.parse(localStorage.getItem("recentUsers")) || [];
  const list = document.getElementById("recentEntries");
  list.innerHTML = ""; // netwaye lis la

  entries.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `👤 ${e.name} — ${e.number}`;
    li.style.padding = "5px 0";
    list.appendChild(li);
  });
  }
// Afiche lis 5 dènye moun ki enskri yo lè paj la louvri
window.onload = displayRecent;
  
  // Limite modifikasyon non apre
  const nameInput = document.getElementById('fullname');
  let alreadySubmitted = false;

  document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const countryCode = document.getElementById('countryCode').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!name || !countryCode || !termsAccepted) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    // Simulasyon sove done an (ou ka ajoute API call pi ta)
    alert(`Bienvenue ${name} ! 🎉\nVotre contact a été enregistré.`);

    totalInscriptions++;
    document.getElementById('counter').innerText = totalInscriptions;
    percentProgress = (totalInscriptions / 1000) * 100;
    progressBar.style.width = percentProgress + '%';
    progressBar.innerText = Math.floor(percentProgress) + '%';

    // Anpeche modifye nom la
    nameInput.disabled = true;
    alreadySubmitted = true;
  });

  // Sèlman retire emoji si modifye
  nameInput.addEventListener('input', function() {
    if (alreadySubmitted) {
      this.value = this.value.replace(/[^\w\s\-']/gi, '');
    }
  });
});
function toggleFAQ(el) {
  const answer = el.nextElementSibling;
  const icon = el.querySelector('.faq-icon');
  const isOpen = answer.style.display === 'block';

  answer.style.display = isOpen ? 'none' : 'block';
  icon.textContent = isOpen ? '➕' : '➖';
}
window.onload = displayRecent;
