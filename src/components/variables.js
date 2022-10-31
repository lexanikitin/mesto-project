const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');
const avatarOpenBtn = document.querySelector('.profile__avatar-block');
const avatarPopup = document.querySelector('.popup-avatar');
const avatarFormElement = avatarPopup.querySelector('.form');
const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileFormElement = profilePopup.querySelector('.form');
const deletePopup = document.querySelector('.popup-delete');
const elementPopup = document.querySelector('.popup-element');
const elementFormElement = elementPopup.querySelector('.form');
const newElementBtn = document.querySelector('.profile__add-button');

// храним ID пользователя (позже стоит убрать в куки?)
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '8cf18d1a-5438-4fe9-84de-67a8b7385fb6',
    'Content-Type': 'application/json'
  }
}


export {
  profileName,
  profileSubtitle,
  profileOpenBtn,
  avatarOpenBtn,
  avatarPopup,
  avatarFormElement,
  profilePopup,
  profilePopupName,
  profilePopupSubtitle,
  profileFormElement,
  deletePopup,
  elementPopup,
  elementFormElement,
  newElementBtn,
  config
}
