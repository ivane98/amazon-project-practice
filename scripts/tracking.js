import { orders } from "../data/orders.js";
import { getProduct, loadProductsAsync } from "../data/products.js";
await loadProductsAsync("https://supersimplebackend.dev/products");

console.log(orders);

let url = new URL(window.location.href);
let trackingOrderId = url.searchParams.get("orderId");
let trackingProductId = url.searchParams.get("productId");

let currentOrder = orders.find((order) => order.id === trackingOrderId);

let currentProduct = currentOrder.products.find(
  (product) => product.productId === trackingProductId
);

let product = getProduct(currentProduct.productId);

console.log(currentProduct);

document.querySelector(".order-tracking").innerHTML = `
<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on Monday, June 13</div>

        <div class="product-info">
          Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>

        <div class="product-info">Quantity: 1</div>

        <img
          class="product-image"
          src="images/products/athletic-cotton-socks-6-pairs.jpg"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
`;
