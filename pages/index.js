const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileCloseBtn = document.querySelector('.popup__close');
const profileFormElement = profilePopup.querySelector('.form');

const elementTemplate = document.querySelector('.element-template').content;
const elementContainer = document.querySelector('.elements');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupSubtitle.value;
  closePopup(profilePopup);
}

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

function createElement(name, link) {
  const element = getElement(name, link);
  elementContainer.prepend(element);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

profileOpenBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupSubtitle.value = profileSubtitle.textContent;
});

profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

profileFormElement.addEventListener('submit', formProfileSubmitHandler);

initialCards.forEach((value) => {
  createElement(value.name, value.link);
})
