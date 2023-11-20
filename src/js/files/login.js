//?Функція зміни форм логіну
function toggleForms() {
  const btnToggleLogin = document.querySelector(".toggle__login");
  const btnToggleSignUp = document.querySelector(".toggle__signup");
  const loginForms = document.querySelector(".login");
  const signUpForms = document.querySelector(".sign-up");

  btnToggleSignUp.addEventListener("click", function () {
    signUpForms.classList.remove("hide");
    loginForms.classList.add("hide");
  });
  btnToggleLogin.addEventListener("click", function () {
    signUpForms.classList.add("hide");
    loginForms.classList.remove("hide");
  });
}
toggleForms();

//!Функція Валідації
function validation(form) {
  let result = true;

  //?Функція щоб забрати повідомлення про помилку
  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  //?Функція створення і виведення помилки при валідації
  function createError(input, text) {
    const parent = input.parentNode;
    parent.classList.add("error");

    const errorField = document.createElement("label");

    errorField.classList.add("error-label");
    errorField.textContent = text;
    parent.prepend(errorField);
  }

  //?Функція валідації інпутів
  form.querySelectorAll("input").forEach((element) => {
    removeError(element);
    if (element.dataset.minLength) {
      if (element.value.length < element.dataset.minLength) {
        removeError(element);
        createError(
          element,
          `Мінімальна к-ість символів ${element.dataset.minLength}`
        );
        result = false;
      }
    }

    if (element.dataset.maxLength) {
      if (element.value.length > element.dataset.maxLength) {
        removeError(element);
        createError(
          element,
          `Максимальна к-ість символів ${element.dataset.maxLength}`
        );
        result = false;
      }
    }
    if (element.value === "") {
      removeError(element);
      createError(element, "Поле не заповнено*");
      result = false;
    }
  });

  return result;
}

//?Функції відправки даних з форм на сервер
const loginForm = document.querySelector(".login__form");
const signUpForm = document.querySelector(".sign-up__form");

//?Відправка даних на сервер з форми LOGIN
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validation(this) == true) {
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
});

//?Відправка даних на сервер з форми SIGN-UP
signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validation(this) == true) {
    const formData = new FormData(signUpForm);
    const data = Object.fromEntries(formData);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
});
