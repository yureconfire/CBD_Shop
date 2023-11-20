import { toggleCartStatus, calcTotalPrice } from "./cartStatus.js";

//?Знаходимо оболонку для всі карточок
const cartWrapper = document.querySelector(".cart-wrapper");
const totalCounter = document.querySelector(".cart-counter");
//?Відслідковуємо клік на сторінці
window.addEventListener("click", function (event) {
  //?Перевіряємо що клік відбувся на правильній кнопці
  if (event.target.hasAttribute("data-cart")) {
    //?Знаходимо карточку з товаром по якій клікнули
    const card = event.target.closest(".products-card");

    //?Збираємо дані з цієї карточку на яку клікнули, і зберігаємо в об'єкт
    const cardInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector(".product-img").getAttribute("src"),
      title: card.querySelector(".products-card__link-title").textContent,
      raiting: card.querySelector(".rating__value").textContent,
      counter: card.querySelector("[data-counter]").textContent,
      price: card.querySelector(".current__price").textContent,
    };

    //?Перевіряємо чи є певний товар вже в корзині
    const itemInCart = cartWrapper.querySelector(`[data-id="${cardInfo.id}"]`);

    //?Якщо товар є в корзині
    if (itemInCart) {
      const counterEl = itemInCart.querySelector("[data-counter]");
      counterEl.textContent =
        parseInt(counterEl.textContent) + parseInt(cardInfo.counter);
    } else {
      //?Додаємо товар до загального лічильника корзини
      totalCounter.textContent = ++totalCounter.textContent;
      //?Якщо товару немає в корзині
      //?Створюємо шаблон і підставляємо дані з об'єкта
      const cartItemHTML = `
    <div class="cart-item" data-id="${cardInfo.id}">
          <div class="cart-item__image-ibg--contain">
            <img src="${cardInfo.imgSrc}" alt="" />
          </div>
          <div class="cart-item__desc">
            <div class="cart-item__title">${cardInfo.title}</div>
            <div class="cart-item__raiting">Raiting : ${cardInfo.raiting}</div>
            <div class="cart-item__details">
              <div class="items items--small counter-wrapper">
                <div class="items__control" data-action="minus">-</div>
                <div class="items__current" data-counter="">${cardInfo.counter}</div>
                <div class="items__control" data-action="plus">+</div>
              </div>
              <div class="price">${cardInfo.price}</div><span class="dollar">$</span>
            </div>
          </div>
        </div>
    `;

      //?Відобраджаємо товар в корзині
      cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
    }

    card.querySelector("[data-counter]").textContent = "1";

    //?Відображаємо блок коли корзина пуста/порожня
    toggleCartStatus();
    //?Функція підрахунку загальної вартості товарів в корзині
    calcTotalPrice();
  }
});
