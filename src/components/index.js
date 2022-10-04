import '../pages/index.css';
import {openPopup, closePopup} from "./modal";
import enableValidation from "./validate";
import {prependElement} from "./card";
import {getUserInfo, getCards} from "./api";

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileFormElement = profilePopup.querySelector('.form');
const profileAvatar = document.querySelector('.profile__avatar');


const modalCloseBtns = document.querySelectorAll('.popup__close');

const elementPopup = document.querySelector('.popup-element');
const elementFormElement = elementPopup.querySelector('.form');
const elementPopupName = document.querySelector('#element-name');
const elementPopupLink = document.querySelector('#element-link');

const newElementBtn = document.querySelector('.profile__add-button');

// получаем профиль пользователя
const promiseUserInfo = getUserInfo()
  .then((result) => {
    profileName.textContent = result.name;
    profileSubtitle.textContent = result.about;
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.error('Ошибка при получении данных пользователя.',err);
  });

// получаем карточки
const promiseGetCards = getCards()
  .then((result) => {
    console.log(result);
    // Создание стартовых карточке из массива
    result.forEach((card) => {
      prependElement(card.name, card.link, card._id);
    })
  })
  .catch((err) => {
    console.error('Ошибка при получении карточек.',err);
  });

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



enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_state_error',
  errorClass: 'form__error-message_visible'
})
