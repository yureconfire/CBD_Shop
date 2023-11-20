//!Відображаємо або ховаємо Кордина пуста/повна
export function toggleCartStatus() {
  console.log("toggleCartStatus");

  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartEmptyBadge = document.querySelector("[data-cart-empty]");
  const orderForm = document.querySelector("#order-form");

  if (cartWrapper.children.length) {
    console.log("full");
    cartEmptyBadge.classList.add("hide");
    orderForm.classList.remove("hide");
  } else {
    console.log("empty");
    cartEmptyBadge.classList.remove("hide");
    orderForm.classList.add("hide");
  }
}

//!Підрахунок загальної суми товарів в корзині
export function calcTotalPrice() {
  const cartItems = document.querySelectorAll(".cart-item");

  const totalPriceEl = document.querySelector(".total-price");

  let totalPrice = 0;
  cartItems.forEach(function (item) {
    const amountEl = item.querySelector("[data-counter]");
    const priceEl = item.querySelector(".price");

    const currentPrice =
      parseFloat(amountEl.textContent) * parseFloat(priceEl.textContent);
    totalPrice += currentPrice;
  });

  totalPrice = totalPrice.toFixed(2);

  //?Відображаємо ціну на сторінці
  totalPriceEl.textContent = totalPrice;
}
