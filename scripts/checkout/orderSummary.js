import { cart } from "../../data/cart-class.js";
import { products, getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryOption,
} from "../../data/deliveryOptions.js";
import { formatMoney } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { isWeekend } from "../utils/weekend.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartHtml = "";

  cart.cartItems.forEach((cartItem) => {
    let productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    cartHtml += `<div class="cart-item-container js-${matchingProduct.id}">
              <div class="delivery-date">Delivery date: ${calculateDeliveryOption(
                deliveryOption
              )}</div>
  
              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">${matchingProduct.getPrice()}</div>
                  <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span> </span>
                    <span data-product-id="${
                      matchingProduct.id
                    }" class="update-quantity-link link-primary">
                      Update
                    </span>
                    <input type='text' class='quantity-input js-input-${
                      matchingProduct.id
                    }' />
                    <span data-product-id="${
                      matchingProduct.id
                    }" class='save-quantity-link link-primary'>Save</span>
                    
                    <span data-product-id="${
                      matchingProduct.id
                    }" class="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options
                ">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${displayDeliveryOptions(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
  `;
  });

  function displayDeliveryOptions(matchingProduct, cartItem) {
    let deliveryHtml = ``;

    deliveryOptions.forEach((deliveryOption) => {
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatMoney(deliveryOption.priceCents)} -`;

      let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHtml += `<div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${calculateDeliveryOption(deliveryOption)}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
          `;
    });

    return deliveryHtml;
  }

  document.querySelector(".order-summary").innerHTML = cartHtml;

  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      cart.removeFromCart(productId);
      renderOrderSummary();
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  function updateCartQuantity() {
    renderCheckoutHeader(cart.calculateCartQuantity());
  }

  updateCartQuantity();

  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      document
        .querySelector(`.js-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      document
        .querySelector(`.js-${productId}`)
        .classList.remove("is-editing-quantity");

      let value = Number(
        document.querySelector(`.js-input-${productId}`).value
      );
      cart.updateQuantity(productId, value);
      renderCheckoutHeader(cart.calculateCartQuantity());
      renderPaymentSummary();
      renderOrderSummary();
    });

    link.parentElement.children[1].computedStyleMap.display = "initial";
  });

  document.querySelectorAll(".js-delivery-option").forEach((link) => {
    link.addEventListener("click", (e) => {
      const { productId, deliveryOptionId } = link.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
