import { cart } from "../data/cart-class.js";
import { products, loadProductsAsync } from "../data/products.js";

await loadProductsAsync("https://supersimplebackend.dev/products");

let url = new URL(window.location.href);
let searchQuery = url.searchParams.get("search");

let newProducts;

if (url.searchParams.get("search")) {
  newProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.keywords.includes(searchQuery.toLowerCase())
  );
  loadProductsOnPage(newProducts);
} else {
  loadProductsOnPage(products);
}

function loadProductsOnPage(productsArray) {
  let productHtml = ``;

  productsArray.forEach((product) => {
    productHtml += `
    <div class="product-container">
            <div class="product-image-container">
              <img
                class="product-image"
                src="${product.image}"
              />
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img
                class="product-rating-stars"
                src="${product.getStars()}"
              />
              <div class="product-rating-count link-primary">${
                product.rating.count
              }</div>
            </div>
  
            <div class="product-price">${product.getPrice()}</div>
  
            <div class="product-quantity-container">
              <select class = "js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            ${product.extraInfoHtml()}
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart product-${product.id}">
              <img src="images/icons/checkmark.png" />
              Added
            </div>
  
            <button class="add-to-cart-button button-primary" data-product-id="${
              product.id
            }">Add to Cart</button>
          </div>
    `;
  });

  document.querySelector(".products-grid").innerHTML = productHtml;

  cart.updateCartQuantity();

  document.querySelectorAll(".add-to-cart-button").forEach((product) => {
    product.addEventListener("click", () => {
      let { productId } = product.dataset;
      cart.addToCart(productId);
      cart.updateCartQuantity();

      document.querySelector(`.product-${productId}`).style.opacity = 1;

      setTimeout(() => {
        document.querySelector(`.product-${productId}`).style.opacity = 0;
      }, 2000);
    });
  });

  document.querySelector(".search-button").addEventListener("click", () => {
    let query = document.querySelector(".search-bar").value;
    window.location.href = `amazon.html?search=${query}`;
  });

  document.querySelector(".search-bar").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let query = document.querySelector(".search-bar").value;
      window.location.href = `amazon.html?search=${query}`;
    }
  });
}
