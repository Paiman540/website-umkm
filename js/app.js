// ==========================================
// P10: FUNCTION, LOOP, ARRAY METHODS, DEBUGGING
// ==========================================

// 1. Initial JavaScript test
console.log("P10 JavaScript aktif");

// 2. Product data: Array of Objects
const produkUmkm = [
  {
    nama: "Arabika Gayo",
    kategori: "Kopi",
    harga: 85000,
    stok: 12,
    unggulan: true
  },
  {
    nama: "Robusta Temanggung",
    kategori: "Kopi",
    harga: 65000,
    stok: 4,
    unggulan: false
  },
  {
    nama: "Paket Seduh",
    kategori: "Bundling",
    harga: 125000,
    stok: 0,
    unggulan: false
  },
  {
    nama: "Drip Bag Nusantara",
    kategori: "Kopi",
    harga: 45000,
    stok: 18,
    unggulan: false
  }
];

// 3. Rupiah formatter
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}

// 4. Conditional stock status
function statusStok(stok) {
  if (stok <= 0) {
    return {
      label: "Habis",
      className: "empty"
    };
  }

  if (stok <= 5) {
    return {
      label: "Stok terbatas",
      className: "warning"
    };
  }

  return {
    label: "Tersedia",
    className: ""
  };
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

// 6. Create product card using a function
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const kategori = labelKategori(produk.kategori);

  const labelAksi =
    produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>

      <p class="category-note">
        ${kategori}
      </p>

      <p class="price">
        ${formatRupiah(produk.harga)}
      </p>

      <p>
        Jumlah stok: ${produk.stok}
      </p>

      <span class="stock-badge ${status.className}">
        ${status.label}
      </span>

      <p>${labelAksi}</p>
    </article>
  `;
}

// 7. Render products using array methods
function renderProduk() {

  // Get HTML elements
  const grid =
    document.querySelector("#produk-dinamis") ||
    document.querySelector("#produk-dynamic");

  const ringkasan =
    document.querySelector("#produk-ringkasan");

  const unggulan =
    document.querySelector("#produk-unggulan");

  // Prevent errors if HTML elements are missing
  if (!grid || !ringkasan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  // forEach: Display product information in Console
  produkUmkm.forEach((produk) => {
    console.log(
      "Debug produk:",
      produk.nama,
      "Stok:",
      produk.stok
    );
  });

  // filter: Get products that have available stock
  const produkTersedia = produkUmkm.filter(
    (produk) => produk.stok > 0
  );

  // find: Find the featured product
  const produkUnggulan = produkUmkm.find(
    (produk) => produk.unggulan === true
  );

  // map: Create HTML for each available product
  // join: Combine all HTML strings
  const markupProduk = produkTersedia
    .map((produk) => buatKartuProduk(produk))
    .join("");

  // Display products
  grid.innerHTML = markupProduk;

  // Display product summary
  ringkasan.textContent =
    `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;

  // Display featured product
  if (unggulan) {
    unggulan.textContent = produkUnggulan
      ? `Produk unggulan: ${produkUnggulan.nama}`
      : "Belum ada produk unggulan.";
  }

  // Display data in Console
  console.table(produkUmkm);

  console.log(
    "Jumlah produk tersedia:",
    produkTersedia.length
  );
}

// 8. Run after HTML has loaded
document.addEventListener(
  "DOMContentLoaded",
  renderProduk
);

// 9. Function testing
console.log(formatRupiah(85000));

console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));