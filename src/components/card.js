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
function getElement(name, link, id, likes, ownerId, userId) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__heading');
  const elementLike = element.querySelector('.element__like-btn');
  const elementDelete = element.querySelector('.element__delete');
  const elementLikeCounter = element.querySelector('.element__like-counter');

  elementImage.src = link;
  elementImage.alt = name;
  elementTitle.textContent = name;
  elementLike.addEventListener('click', toggleLike);
  if (ownerId === userId) {
    elementDelete.addEventListener('click', destroyElement)
  } else {
    elementDelete.remove();
  }
  elementImage.addEventListener('click', () => openImage(name, link))
  element.id = id;
  elementLikeCounter.textContent = likes;

  return element;
}

// вставка элемента в контейнер на странице
export function prependElement(name, link, id, likes, ownerId, userId) {
  const element = getElement(name, link, id, likes, ownerId, userId);
  elementContainer.prepend(element);
}

// удаление элемента
function destroyElement(evt) {
  evt.target.closest('.element').remove();
}

// обработчик события лайка
function toggleLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}
