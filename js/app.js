
// ==========================================
// P10 + P11: PRODUCT DATA, FUNCTIONS,
// ARRAY METHODS, DOM, EVENTS, AND RENDERING
// ==========================================

// 1. Initial JavaScript test
console.log("P10 + P11 JavaScript aktif");

// ==========================================
// P10 - PRODUCT DATA
// ==========================================

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

// 6. P10: Create product card using HTML template
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

// ==========================================
// P11 - DOM ELEMENT CREATION
// ==========================================

// 7. Create product card using DOM methods
function buatElemenProduk(produk) {
  const status = statusStok(produk.stok);

  // Create main product card
  const card = document.createElement("article");
  card.classList.add("product-card", "js-product-card");

  // Create product name
  const nama = document.createElement("h3");
  nama.textContent = produk.nama;

  // Create category
  const kategori = document.createElement("p");
  kategori.classList.add("category-note");
  kategori.textContent = labelKategori(produk.kategori);

  // Create price
  const harga = document.createElement("p");
  harga.classList.add("price");
  harga.textContent = formatRupiah(produk.harga);

  // Create stock information
  const stok = document.createElement("p");
  stok.textContent = `Jumlah stok: ${produk.stok}`;

  // Create stock badge
  const badge = document.createElement("span");
  badge.classList.add("stock-badge");

  if (status.className) {
    badge.classList.add(status.className);
  }

  badge.textContent = status.label;

  // Create order information
  const aksi = document.createElement("p");
  aksi.textContent =
    produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

  // Create temporary hide button
  const tombolSembunyikan = document.createElement("button");
  tombolSembunyikan.type = "button";
  tombolSembunyikan.classList.add("ghost-button");
  tombolSembunyikan.textContent = "Sembunyikan";

  // Append elements to product card
  card.append(
    nama,
    kategori,
    harga,
    stok,
    badge,
    aksi,
    tombolSembunyikan
  );

  // Add click event to hide button
  tombolSembunyikan.addEventListener("click", function () {
    const gridElement = card.parentElement;
    const statusElement = document.querySelector("#produk-status");

    card.remove();

    if (gridElement && statusElement) {
      statusElement.textContent =
        `${gridElement.children.length} produk sedang ditampilkan.`;
    }
  });

  return card;
}

// 8. Create empty state message
function buatEmptyState(kategori) {
  const pesan = document.createElement("p");

  pesan.classList.add("empty-state");

  pesan.textContent =
    `Tidak ada produk untuk kategori "${kategori}".`;

  return pesan;
}

// ==========================================
// P10 + P11 - RENDER PRODUCT FUNCTION
// ==========================================

// 9. Render products using DOM and array methods
function renderProduk(kategoriAktif = "Semua") {

  // Get P11 HTML elements
  const grid = document.querySelector("#produk-grid");
  const produkStatus = document.querySelector("#produk-status");

  // Get optional P10 HTML elements
  const gridP10 =
    document.querySelector("#produk-dinamis") ||
    document.querySelector("#produk-dynamic");

  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  // P10: Display product debugging information
  produkUmkm.forEach((produk) => {
    console.log(
      "Debug produk:",
      produk.nama,
      "Stok:",
      produk.stok
    );
  });

  // P10: Find featured product
  const produkUnggulan = produkUmkm.find(
    (produk) => produk.unggulan === true
  );

  // P10: Filter products with available stock
  const produkTersedia = produkUmkm.filter(
    (produk) => produk.stok > 0
  );

  // P10: Update optional summary
  if (ringkasan) {
    ringkasan.textContent =
      `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  }

  // P10: Update optional featured product
  if (unggulan) {
    unggulan.textContent = produkUnggulan
      ? `Produk unggulan: ${produkUnggulan.nama}`
      : "Belum ada produk unggulan.";
  }

  // P10: Render using map() and join() for old HTML targets
  if (!grid && gridP10) {
    const markupProduk = produkTersedia
      .map((produk) => buatKartuProduk(produk))
      .join("");

    gridP10.innerHTML = markupProduk;

    return;
  }

  // Check P11 HTML targets
  if (!grid || !produkStatus) {
    console.warn(
      "Target P11 produk-grid atau produk-status tidak ditemukan."
    );
    return;
  }

  // P11: Filter products by selected category
  const produkDitampilkan =
    kategoriAktif === "Semua"
      ? produkUmkm
      : produkUmkm.filter(
          (produk) => produk.kategori === kategoriAktif
        );

  // P11: Clear previous product cards
  grid.replaceChildren();

  // P11: Show empty state when no products are found
  if (produkDitampilkan.length === 0) {
    grid.append(buatEmptyState(kategoriAktif));

    produkStatus.textContent =
      `Tidak ada produk dalam kategori ${kategoriAktif}.`;

    return;
  }

  // P11: Create product cards using map()
  const kartuProduk = produkDitampilkan.map(
    (produk) => buatElemenProduk(produk)
  );

  // P11: Append all product cards
  grid.append(...kartuProduk);

  // Update product status
  produkStatus.textContent =
    `Menampilkan ${produkDitampilkan.length} produk dari ${produkUmkm.length} data.`;
}

// ==========================================
// P11 - EVENT LISTENERS
// ==========================================

// 10. Get all category filter buttons
const tombolFilter = document.querySelectorAll("[data-filter]");

// 11. Add click event to each filter button
tombolFilter.forEach((tombol) => {

  tombol.addEventListener("click", function (event) {

    // Get the button that was clicked
    const tombolAktif = event.currentTarget;

    // Get selected category
    const kategori = tombolAktif.dataset.filter;

    // Remove active class and update accessibility state
    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });

    // Add active class to selected button
    tombolAktif.classList.add("is-active");
    tombolAktif.setAttribute("aria-pressed", "true");

    // Render products based on selected category
    renderProduk(kategori);
  });

});

// ==========================================
// P10 + P11 - INITIALIZATION AND DEBUGGING
// ==========================================

// 12. Display product data in Console
console.table(produkUmkm);

console.log("Jumlah seluruh produk:", produkUmkm.length);

console.log("Contoh format Rupiah:", formatRupiah(85000));

console.log("Status stok 0:", statusStok(0));
console.log("Status stok 3:", statusStok(3));
console.log("Status stok 12:", statusStok(12));

// 13. Initial product rendering
renderProduk();
