
const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview");

form.addEventListener("submit", function (event) {

  // Prevent the page from reloading
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Display form preview
  preview.textContent = [
    `Nama: ${data.nama}`,
    `Email: ${data.email}`,
    `Paket: ${data.paket}`,
    `Waktu dihubungi: ${data.waktu || "Belum dipilih"}`,
    `Topik: ${data.topik}`,
    `Pesan: ${data.pesan}`
  ].join("\n");

});

// Reset form preview
form.addEventListener("reset", function () {

  preview.textContent =
    "Data form akan muncul di sini setelah formulir valid dikirim.";

});