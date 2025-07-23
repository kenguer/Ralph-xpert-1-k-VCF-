// Initial loading
document.addEventListener("DOMContentLoaded", () => {
  loadContacts();
  loadFooter();
});

// Fichye done yo estoke lokalman pou demonstrasyon
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Chaje kontak yo nan lis la
function loadContacts() {
  const list = document.getElementById("contactsList");
  list.innerHTML = "";

  if (contacts.length === 0) {
    list.innerHTML = "<p class='text-muted'>Aucun contact enregistré.</p>";
  }

  contacts.forEach((contact, index) => {
    const item = document.createElement("div");
    item.className = "list-group-item bg-dark border-secondary text-light d-flex justify-content-between align-items-center";
    item.innerHTML = `
      <div>
        <strong>${contact.name}</strong><br/>
        📞 ${contact.phone} ${contact.email ? `<br/>✉️ ${contact.email}` : ""}
      </div>
      <div>
        <button class="btn btn-sm btn-outline-warning me-2" onclick="editContact(${index})">✏️</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteContact(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(item);
  });

  // Update counters
  document.getElementById("totalCount").textContent = contacts.length;
  document.getElementById("statTotal").textContent = contacts.length;
}

// Rechèch kontak
function searchContacts(term) {
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(term.toLowerCase()) ||
    c.phone.includes(term)
  );
  displayFilteredContacts(filtered);
}

function displayFilteredContacts(filtered) {
  const list = document.getElementById("contactsList");
  list.innerHTML = "";
  filtered.forEach((contact, index) => {
    const item = document.createElement("div");
    item.className = "list-group-item bg-dark border-secondary text-light d-flex justify-content-between align-items-center";
    item.innerHTML = `
      <div>
        <strong>${contact.name}</strong><br/>
        📞 ${contact.phone} ${contact.email ? `<br/>✉️ ${contact.email}` : ""}
      </div>
      <div>
        <button class="btn btn-sm btn-outline-warning me-2" onclick="editContact(${index})">✏️</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteContact(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(item);
  });
}

// Efase kontak
function deleteContact(index) {
  if (confirm("Ou sèten ou vle efase kontak sa?")) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadContacts();
  }
}

// Edit kontak (simple prompt)
function editContact(index) {
  const name = prompt("Modifye nom:", contacts[index].name);
  const phone = prompt("Modifye numéro:", contacts[index].phone);
  if (name && phone) {
    contacts[index].name = name;
    contacts[index].phone = phone;
    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadContacts();
  }
}

// Save footer config
function saveFooter() {
  const footer = {
    name: document.getElementById("footerName").value,
    email: document.getElementById("footerEmail").value,
    whatsapp: document.getElementById("footerWhatsapp").value,
    desc: document.getElementById("footerDesc").value,
    insta: document.getElementById("footerInsta").value,
    fb: document.getElementById("footerFb").value,
    twitter: document.getElementById("footerTwitter").value
  };
  localStorage.setItem("footerConfig", JSON.stringify(footer));
  alert("Footer sauvegardé !");
}

// Load saved footer config
function loadFooter() {
  const footer = JSON.parse(localStorage.getItem("footerConfig"));
  if (!footer) return;
  document.getElementById("footerName").value = footer.name || "";
  document.getElementById("footerEmail").value = footer.email || "";
  document.getElementById("footerWhatsapp").value = footer.whatsapp || "";
  document.getElementById("footerDesc").value = footer.desc || "";
  document.getElementById("footerInsta").value = footer.insta || "";
  document.getElementById("footerFb").value = footer.fb || "";
  document.getElementById("footerTwitter").value = footer.twitter || "";
}

// 📥 Kreye VCF otomatik
function downloadVCF() {
  let vcf = "";
  contacts.forEach(contact => {
    vcf += `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL:${contact.phone}\nEND:VCARD\n`;
  });

  const blob = new Blob([vcf], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contacts.vcf";
  a.click();
  URL.revokeObjectURL(url);
}
