

// 1. Initial JavaScript test
console.log("P09 JavaScript aktif");

// 2. Product data: Array of Objects
const produkUmkm = [
  {
    nama: "Arabika Gayo",
    kategori: "Kopi",
    harga: 85000,
    stok: 12
  },
  {
    nama: "Robusta Temanggung",
    kategori: "Kopi",
    harga: 65000,
    stok: 4
  },
  {
    nama: "Paket Seduh",
    kategori: "Bundling",
    harga: 125000,
    stok: 0
  }
];

// Display product data in Console
console.table(produkUmkm);

// 3. Rupiah formatter
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

console.log(formatRupiah.format(produkUmkm[0].harga));

// 4. Conditional stock status
function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

// 5. Switch statement for categories
function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";

    case "Bundling":
      return "Paket hemat";

    default:
      return "Produk UMKM";
  }
}

// 6. Render products to HTML
function renderProduk() {
  const grid = document.querySelector("#produk-dynamic");
  const ringkasan = document.querySelector("#produk-ringkasan");

  // Prevent errors on other pages
  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);

    // Ternary operator
    const labelAksi =
      produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup += `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">
          ${formatRupiah.format(produk.harga)}
        </p>
        <span class="stock-badge ${status.className}">
          ${status.label}
        </span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;

  ringkasan.textContent =
    `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

// 7. Run after HTML has loaded
document.addEventListener("DOMContentLoaded", renderProduk);
