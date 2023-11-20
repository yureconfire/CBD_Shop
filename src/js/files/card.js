// Додаємо нові картки товарів на сайт

//Дані для карток
const cardData = [
  {
    heading: "CBD 500 mg Orange Flavor Tincture",
    image: "product1.jpg",
    price: "49.99",
    id: "1",
    rating: "3.5",
  },
  {
    heading: "Black ICE CBD Muscle Rub 200 mg",
    image: "product2.jpg",
    price: "59.99",
    id: "2",
    rating: "4",
  },
  {
    heading: "CBD+Curcumin Coffee 750 mg",
    image: "product3.jpg",
    price: "79.99",
    id: "3",
    rating: "3",
  },
  {
    heading: "CBD 250 mg Orange Flavor Tincture",
    image: "product1.jpg",
    price: "29.99",
    id: "4",
    rating: "5",
  },
  {
    heading: "Black ICE CBD Muscle Rub 100 mg",
    image: "product2.jpg",
    price: "39.99",
    id: "5",
    rating: "4.5",
  },
  {
    heading: "CBD+Curcumin Coffee 400 mg",
    image: "product3.jpg",
    price: "49.99",
    id: "6",
    rating: "5",
  },
];

//Скрипт рендеру карток
const cardsContainer = document.querySelector(".products-slider__wrapper");
function renderCards() {
  cardsContainer.innerHTML = "";
  cardData.map((cardData) => {
    const cardElement = `
    <div class="products-slider__slide swiper-slide">
    <article class="products-card" data-id="${cardData.id}">
    <div class="products-card__body">
      <div class="products-card__rating rating rating_set">
        <div class="rating__body">
          <div class="rating__active"></div>
          <div class="rating__items">
            <input
              type="radio"
              class="rating__item"
              value="1"
              name="rating"
            />
            <input
              type="radio"
              class="rating__item"
              value="2"
              name="rating"
            />
            <input
              type="radio"
              class="rating__item"
              value="3"
              name="rating"
            />
            <input
              type="radio"
              class="rating__item"
              value="4"
              name="rating"
            />
            <input
              type="radio"
              class="rating__item"
              value="5"
              name="rating"
            />
          </div>
        </div>
        <div class="rating__value">${cardData.rating}</div>
      </div>
      <h3 class="products-card__title">
        <a href="" class="products-card__link-title">${cardData.heading}</a>
      </h3>
    </div>
    <a
      href=""
      class="products-card__image-ibg products-card__image-ibg--contain"
      ><img class="product-img" src="./img/${cardData.image}" alt="Картинка"
    />
    </a>
    <div class="items counter-wrapper">
                      <div class="items__control" data-action="minus">-</div>
                      <div class="items__current" data-counter>1</div>
                      <div class="items__control" data-action="plus">+</div>
                    </div>
    <div class="products-card__footer">
      <div class="products-card__price">$<span class="current__price">${cardData.price}</span> USD</div>
      <button data-cart type="button" class="products-card__shop">
        <span data-cart>Shop</span>
      </button>
    </div>
  </article>
  </div>
 
    `;
    cardsContainer.insertAdjacentHTML("beforeend", cardElement);
  });
}
renderCards(); //Рендеримо картки

//Скрипт для рендеру надпису якщо пошук не дав результатів
const prodNotFound = document.createElement("div");
function renderError() {
  prodNotFound.classList.add("swiper__error-box");
  prodNotFound.innerHTML = `
    <p class="swiper__error">Product not Found!</p>
    `;
  cardsContainer.appendChild(prodNotFound);
  prodNotFound.classList.add("hide");
}
renderError();

//Скрипт для пошуку товарів
document
  .getElementById("search-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".products-card__link-title");
    let card = document.querySelectorAll(".swiper-slide");
    let resultsFound = false;
    card.forEach((slide) => {
      slide.classList.remove("hide");
    });

    //Перевіряємо значення в інпуті з назвами товару
    elements.forEach((element, index) => {
      if (element.innerText.includes(searchInput.toUpperCase())) {
        card[index].classList.remove("hide");
        resultsFound = true;
      } else {
        card[index].classList.add("hide");
      }
    });

    //Виводимо або ховаємо надпис про відсутність товару
    if (resultsFound) {
      prodNotFound.classList.add("hide"); // Приховуємо повідомлення про відсутність результатів
    } else {
      prodNotFound.classList.remove("hide"); // Показуємо повідомлення про відсутність результатів
    }
  });
