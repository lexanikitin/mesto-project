const elementTemplate = document.querySelector('.element-template').content;
const elementContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup-image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupName = imagePopup.querySelector('.popup__image-name');

function openImage(evt) {
  const targetElement = evt.target.closest('.element');
  const targetImage = targetElement.querySelector('.element__image');
  const targetName = targetElement.querySelector('.element__heading');

  imagePopupImg.src = targetImage.src;
  imagePopupImg.alt = targetImage.alt;
  imagePopupName.textContent = targetName.textContent;

  openPopup(imagePopup);
}

// генерация элемента из шаблона и наполнение
function getElement(name, link) {
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
  elementImage.addEventListener('click', openImage)

  return element;
}

// вставка элемента в контейнер на странице
export function createElement(name, link) {
  const element = getElement(name, link);
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
