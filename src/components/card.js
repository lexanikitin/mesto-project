import {openPopup} from "./modal";

const elementTemplate = document.querySelector('.element-template').content;
const elementContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup-image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupName = imagePopup.querySelector('.popup__image-name');

function openImage(name, link) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupName.textContent = name;
  openPopup(imagePopup);
}

// генерация элемента из шаблона и наполнение
function getElement(name, link, id) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__heading');
  const elementLike = element.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete');

  elementImage.src = link;
  elementImage.alt = name;
  elementTitle.textContent = name;
  elementLike.addEventListener('click', toggleLike);
  elementDelete.addEventListener('click', destroyElement)
  elementImage.addEventListener('click', ()=> openImage(name, link))
  element.id=id;

  return element;
}

// вставка элемента в контейнер на странице
export function prependElement(name, link, id) {
  const element = getElement(name, link, id);
  elementContainer.prepend(element);
}

// удаление элемента
function destroyElement(evt) {
  evt.target.closest('.element').remove();
}

// обработчик события лайка
function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}
