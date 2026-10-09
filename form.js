
const form = document.#preview-form("#form-kontak");
const preview = document.#preview-form("#preview");

form.addEventListener("submit", function (event) {
  // Prevent the page from reloading or sending data to a server.
  event.preventDefault();

  // The browser checks required, email format, and minlength first.
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

 
preview.textContent = [
  `Nama: ${data.get("nama")}`,
  `Email: ${data.get("email")}`,
  `Paket: ${data.get("paket")}`,
  `Waktu dihubungi: ${data.get("waktu") || "Belum dipilih"}`,
  `Topik: ${data.get("topik")}`,
  `Pesan: ${data.get("pesan")}`,
].join("\n");


form.addEventListener("reset", function () {
  preview.textContent = "Data form akan muncul di sini setelah formulir valid dikirim.";
});
