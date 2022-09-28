const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileFormElement = profilePopup.querySelector('.form');

const modalCloseBtns = document.querySelectorAll('.popup__close');
const modalOverlays = document.querySelectorAll('.popup');

const elementPopup = document.querySelector('.popup-element');
const elementFormElement = elementPopup.querySelector('.form');
const elementTemplate = document.querySelector('.element-template').content;
const elementContainer = document.querySelector('.elements');
const elementPopupName = document.querySelector('#element-name');
const elementPopupLink = document.querySelector('#element-link');

const newElementBtn = document.querySelector('.profile__add-button');

const imagePopup = document.querySelector('.popup-image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupName =  imagePopup.querySelector('.popup__image-name');


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

function escapePopup(evt){
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapePopup);
}

// функция закрытия модального окна
function closePopup(popup) {
  document.removeEventListener('keydown', escapePopup);
  popup.classList.remove('popup_opened');
}

// обработчик сохранения окна профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupSubtitle.value;
  closePopup(profilePopup);
}

// обработчик сохранения формы нового элемента
function handleElementFormSubmit(evt) {
  evt.preventDefault();
  createElement(elementPopupName.value, elementPopupLink.value);
  closePopup(elementPopup);
  evt.target.reset();
}

function openImage(evt){
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
function createElement(name, link) {
  const element = getElement(name, link);
  elementContainer.prepend(element);
}
// удаление элемента
function destroyElement(evt){
  evt.target.closest('.element').remove();
}

// обработчик события лайка
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
modalCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
})
modalOverlays.forEach((overlay)=>{
  overlay.addEventListener('click',(evt)=>{
    closePopup(evt.target.closest('.popup'));
  })
})




profileFormElement.addEventListener('submit', handleProfileFormSubmit);
elementFormElement.addEventListener('submit', handleElementFormSubmit);

// Создание стартовых карточке из массива
initialCards.forEach((value) => {
  createElement(value.name, value.link);
})
