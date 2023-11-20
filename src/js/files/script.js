// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

//Показ-Приховування форми пошуку
let searchForm = document.querySelector(".form-box");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
};
