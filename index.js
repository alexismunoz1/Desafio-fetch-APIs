function removeCards() {
  const productEl = document.querySelectorAll(".result-item");

  if (productEl.length == 0) return;

  productEl.forEach((prod) => prod.remove());
}

function mostrarResultado(results) {
  removeCards();

  console.log(results);

  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#result-item-template");

  for (const r of results) {
    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title;

    const conditionEl = template.content.querySelector(
      ".result-item-condition",
    );
    conditionEl.textContent = r.condition;

    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = "$" + r.price;

    const countEl = template.content.querySelector(
      ".result-item-sell-count",
    );
    countEl.textContent = "Vendidos: " + r.sold_quantity;

    const thumbnailEl = template.content.querySelector(".result-item-img");
    thumbnailEl.setAttribute("src", r.thumbnail);

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const formEl = document.querySelector(".search-form");

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const palabaBuscar = e.target.buscar.value;
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabaBuscar)
      .then((response) => response.json())
      .then((data) => mostrarResultado(data.results));
  });
}
main();
