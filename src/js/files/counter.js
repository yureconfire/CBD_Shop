import { toggleCartStatus, calcTotalPrice } from "./cartStatus.js";
const totalCounter = document.querySelector(".cart-counter");
//!Добавляємо прослушку на цілому вікні браузера
window.addEventListener("click", function (event) {
  //?Змінна дял лічильника
  let counter;

  //?Перевіряємо клік строго по кнопках + і -
  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    //?Знаходимо обгортку лічильника

    const counterWrapper = event.target.closest(".counter-wrapper");

    //?Знаходимо div з числом лічильника

    counter = counterWrapper.querySelector("[data-counter]");
  }

  //?Перевіряємо чи була нажата кнопка +

  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }

  //?Перевіряємо чи була нажата кнопка -
  if (event.target.dataset.action === "minus") {
    //?Перевірка на товар в корзині

    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (
      event.target.closest(".cart-wrapper") &&
      parseInt(counter.innerText) === 1
    ) {
      event.target.closest(".cart-item").remove();
      totalCounter.textContent = --totalCounter.textContent;
      //?Відображаємо блок коли корзина пуста/порожня
      toggleCartStatus();

      //?Функція підрахунку загальної вартості товарів в корзині
      calcTotalPrice();
    }
  }

  //?Перевіряємо на клік +\- саме всередині корзини
  if (
    event.target.hasAttribute("data-action") &&
    event.target.closest(".cart-wrapper")
  ) {
    calcTotalPrice();
  }
});
