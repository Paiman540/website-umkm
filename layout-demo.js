
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#demo-product-grid");
  const addButton = document.querySelector("#add-product");
  const runButton = document.querySelector("#run-demo");
  const resetButton = document.querySelector("#reset-demo");
  const status = document.querySelector("#demo-status");

  if (!grid || !addButton || !runButton || !resetButton) {
    return;
  }

  const originalCards = Array.from(grid.children);
  let productCount = originalCards.length;

  addButton.addEventListener("click", () => {
    productCount += 1;

    const card = document.createElement("article");
    card.className = "product-card";

    const title = document.createElement("h3");
    title.textContent = `Demo Product ${productCount}`;

    const description = document.createElement("p");
    description.textContent =
      "Contoh kartu untuk menguji CSS Grid dan Flexbox.";

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const link = document.createElement("a");
    link.className = "button";
    link.href = "kontak.html";
    link.textContent = "Tanya produk";

    actions.appendChild(link);
    card.append(title, description, actions);
    grid.appendChild(card);

    status.textContent = `Kartu produk ${productCount} berhasil ditambahkan.`;
  });

  runButton.addEventListener("click", () => {
    grid.classList.toggle("demo-highlight");
    status.textContent =
      "Grid mengatur kartu; Flexbox mengatur tombol aksi.";
  });

  resetButton.addEventListener("click", () => {
    grid.replaceChildren(...originalCards);
    productCount = originalCards.length;
    grid.classList.remove("demo-highlight");
    status.textContent = "Demonstrasi dikembalikan ke kondisi awal.";
  });
});
