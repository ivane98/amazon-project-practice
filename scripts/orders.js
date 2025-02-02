import { getProduct, loadProductsAsync } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatMoney } from "../scripts/utils/money.js";
import { cart } from "../data/cart-class.js";
await loadProductsAsync("https://supersimplebackend.dev/products");

let ordersHtml = "";

orders.forEach((order) => {
  ordersHtml += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format("MMMM D")}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatMoney(order.totalCostCents)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
          ${productsHtml(order)}
          </div>
        </div>
  `;
});

function productsHtml(order) {
  let productsHtml = "";
  order.products.forEach((productDetails) => {
    let product = getProduct(productDetails.productId);

    productsHtml += `
    <div class="product-image-container">
              <img src="${product.image}" />
            </div>
            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${dayjs(
                productDetails.estimatedDeliveryTime
              ).format("MMMM D")}</div>
              <div class="product-quantity">Quantity: ${
                productDetails.quantity
              }</div>
              <button data-productId=${
                productDetails.productId
              } class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${
      productDetails.productId
    }">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `;
  });
  return productsHtml;
}

document.querySelector(".js-orders-grid").innerHTML = ordersHtml;

document.querySelector(".cart-quantity").innerHTML =
  cart.calculateCartQuantity();

document.querySelectorAll(".buy-again-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    let productId = btn.dataset.productid;
    cart.addToCart(productId);
    document.querySelector(".cart-quantity").innerHTML =
      cart.calculateCartQuantity();
  });
});
