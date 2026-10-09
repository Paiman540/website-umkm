
const form = document.#preview-form("#form-kontak");
const preview = document.#preview-form("#preview");

form.addEventListener("submit", function (event) {
  // Prevent the page from reloading or sending data to a server.
  event.preventDefault();

  // The browser checks required, email format, and minlength first.
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  preview.textContent =
    "Preview data formulir:\n\n" +
    "Nama: " + data.nama + "\n" +
    "Email: " + data.email + "\n" +
    "Telepon: " + (data.telepon || "Tidak diisi") + "\n" +
    "Paket: " + data.paket + "\n" +
    "Topik: " + data.topik + "\n" +
    "Pesan: " + data.pesan;
});

form.addEventListener("reset", function () {
  preview.textContent = "Data form akan muncul di sini setelah formulir valid dikirim.";
});
