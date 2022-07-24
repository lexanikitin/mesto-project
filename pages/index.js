const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileFormElement = profilePopup.querySelector('.form');

const modalCloseBtn = document.querySelectorAll('.popup__close');

const elementPopup = document.querySelector('.popup-element');
const elementFormElement = elementPopup.querySelector('.form');
const elementTemplate = document.querySelector('.element-template').content;
const elementContainer = document.querySelector('.elements');
const elementPopupName = document.querySelector('#element-name');
const elementPopupLink = document.querySelector('#element-link');

const newElementBtn = document.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const likes = document.querySelectorAll('.element__like')

// функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// обработчик сохранения окна профиля
function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupSubtitle.value;
  closePopup(profilePopup);
}
// обработчик сохранения формы нового элемента
function formElementSubmitHandler(evt) {
  evt.preventDefault();
  createElement(elementPopupName.value, elementPopupLink.value);
  closePopup(elementPopup);
  evt.target.reset();
}

// генерация элемента из шаблона и наполнение
function getElement(name, link) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__heading');
  const elementLike = element.querySelector('.element__like');

  elementImage.src = link;
  elementImage.alt = name;
  elementTitle.textContent = name;

  return element;
}

// вставка элемента в контейнер на странице
function createElement(name, link) {
  const element = getElement(name, link);
  elementContainer.prepend(element);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

// открытие окна редактирования профиля
profileOpenBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupSubtitle.value = profileSubtitle.textContent;
});

// открытие окна нового элемента
newElementBtn.addEventListener('click', () => {
  openPopup(elementPopup);
});

// событие на кнопки закрытия на всех модальных окнах
modalCloseBtn.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
})

profileFormElement.addEventListener('submit', formProfileSubmitHandler);
elementFormElement.addEventListener('submit', formElementSubmitHandler);

// Создание стартовых карточке из массива
initialCards.forEach((value) => {
  createElement(value.name, value.link);
})
