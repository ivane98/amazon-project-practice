import { orders } from "../data/orders.js";
import { getProduct, loadProductsAsync } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
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

console.log(product);

console.log(currentProduct);

let currentTime = dayjs();
let orderTime = dayjs(currentOrder.orderTime);
let deliveryTime = dayjs(product.estimatedDeliveryTime);
let progress =
  (currentTime.diff(orderTime) / deliveryTime.diff(orderTime)) * 100;

console.log(progress);

document.querySelector(".order-tracking").innerHTML = `
<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${dayjs(
          currentProduct.estimatedDeliveryTime
        ).format("dddd, MMMM D")}</div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">Quantity: ${currentProduct.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label ${
            progress < 50 ? "current-status" : ""
          }">Preparing</div>
          <div class="progress-label ${
            progress >= 50 && progress < 100 ? "current-status" : ""
          }">Shipped</div>
          <div class="progress-label ${
            progress >= 100 ? "current-status" : ""
          }">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div style="width: ${progress}%" class="progress-bar"></div>
        </div>
`;
