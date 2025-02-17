import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatMoney } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productsPriceCents = 0;
  let shippingPriceCents = 0;
  let totalQuantity = 0;

  cart.cartItems.forEach((cartItem) => {
    let product = getProduct(cartItem.productId);
    productsPriceCents += product.priceCents * cartItem.quantity;
    totalQuantity += cartItem.quantity;

    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;
  const taxCents = (totalBeforeTaxCents * 10) / 100;
  const totalCents = totalBeforeTaxCents + taxCents;

  let paymentHtml = `
  <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatMoney(
              productsPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatMoney(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatMoney(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatMoney(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatMoney(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-order-btn">
            Place your order
          </button>`;

  document.querySelector(".payment-summary").innerHTML = paymentHtml;

  document
    .querySelector(".js-order-btn")
    .addEventListener("click", async () => {
      try {
        let res = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await res.json();
        addOrder(order);
      } catch (error) {
        console.log("Uexpected error. Tyr again later");
      }

      window.location.href = "orders.html";
    });
}
