const promoButton = document.querySelector("#promoButton");

promoButton.addEventListener("click", () => {
  promoButton.textContent = "Promo: Beli 2 gratis tester!";
  console.log("Promo Kopi Nusa berhasil ditampilkan.");
});
const rows = document.querySelectorAll("tbody tr");

console.log("Jumlah produk pada tabel:", rows.length);
console.log("Caption tabel:", document.querySelector("caption").textContent);
console.log("Baris data:", document.querySelectorAll("tbody tr").length);

