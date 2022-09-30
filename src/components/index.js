import '../pages/index.css';
import {openPopup, closePopup} from "./modal";
import enableValidation from "./validate";
import {prependElement} from "./card";

const arkhyz = new URL('../images/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL('../images/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const kholmogorsky = new URL('../images/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileFormElement = profilePopup.querySelector('.form');

const modalCloseBtns = document.querySelectorAll('.popup__close');

const elementPopup = document.querySelector('.popup-element');
const elementFormElement = elementPopup.querySelector('.form');
const elementPopupName = document.querySelector('#element-name');
const elementPopupLink = document.querySelector('#element-link');

const newElementBtn = document.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: arkhyz
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: kholmogorsky
  },
  {
    name: 'Байкал',
    link: baikal
  }
];


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
  prependElement(elementPopupName.value, elementPopupLink.value);
  closePopup(elementPopup);
  evt.target.reset();
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

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
elementFormElement.addEventListener('submit', handleElementFormSubmit);

// Создание стартовых карточке из массива
initialCards.forEach((value) => {
  prependElement(value.name, value.link);
})

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_state_error',
  errorClass: 'form__error-message_visible'
})
