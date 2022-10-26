import '../pages/index.css';
import {openPopup, closePopup} from "./modal";
import enableValidation from "./validate";
import {prependElement, redrawLikeCounter} from "./card";

import Card from "./classCard";
const elementContainer = document.querySelector('.elements');
import Section from "./Section";
import classApi from "./classApi";

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');
const avatarOpenBtn = document.querySelector('.profile__avatar-block');
const avatarPopup = document.querySelector('.popup-avatar');
const avatarFormElement = avatarPopup.querySelector('.form');
const avatarPopupLink = document.querySelector('#avatar-link');

const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileFormElement = profilePopup.querySelector('.form');
const profileAvatar = document.querySelector('.profile__avatar');

const deletePopup = document.querySelector('.popup-delete');
const deleteFormElement = deletePopup.querySelector('.form');

const modalCloseBtns = document.querySelectorAll('.popup__close');

const elementPopup = document.querySelector('.popup-element');
const elementFormElement = elementPopup.querySelector('.form');
const elementPopupName = document.querySelector('#element-name');
const elementPopupLink = document.querySelector('#element-link');

const newElementBtn = document.querySelector('.profile__add-button');

// храним ID пользователя (позже стоит убрать в куки?)
let userId;
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '8cf18d1a-5438-4fe9-84de-67a8b7385fb6',
    'Content-Type': 'application/json'
  }
}
const api = new classApi(config);
Promise.all([api.getUserInfo(), api.getCards()])
  .then((result) => {
    profileName.textContent = result[0].name;
    profileSubtitle.textContent = result[0].about;
    profileAvatar.src = result[0].avatar;
    userId = result[0]._id;
    const items = result[1];
    const cardsList = new Section({
      items,
      renderer: (item) => {
        const card = new Card({
          data: item,
          userId,
          handleCardClick: (name, link) => {
            //TODO создать объект popupImage
            const imagePopup = document.querySelector('.popup-image');
            const imagePopupImg = imagePopup.querySelector('.popup__image');
            const imagePopupName = imagePopup.querySelector('.popup__image-name');
            imagePopupImg.src = link;
            imagePopupImg.alt = name;
            imagePopupName.textContent = name;
            openPopup(imagePopup);
          },
          handleDeleteCard: (evt) => {
            //TODO создать объект popupImageDelete
            console.log(evt.target.closest('.element').id);
          },
          handlePutLike: (cardId) => {
            api.putLike(cardId)
              .then((result) => {
                document.getElementById(cardId).querySelector('.element__like-btn').classList.add('element__like-btn_active');
                card.redrawLikeCounter(cardId, result.likes.length)
              })
              .catch((err) => {
                console.error('Ошибка при сохранении лайка на сервере.', err);
              })
          }, handleDeleteLike: (cardId) => {
            api.deleteLike(cardId)
              .then((result) => {
                document.getElementById(cardId).querySelector('.element__like-btn').classList.remove('element__like-btn_active');
                card.redrawLikeCounter(cardId, result.likes.length)
              })
              .catch((err) => {
                console.error('Ошибка при удалении лайка на сервере.', err);
              })
          }
        }, '.element-template');
        const cardElement = card.genarate();
        cardsList.addItem(cardElement);
      },
    }, '.elements');
    // отрисовка карточек
    cardsList.renderItems();

  })
  .catch((err)=>{
    console.error('Ошибка при загрузке данных с сервера.', err);
  });

// обработчик сохранения окна профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  //const promisePatchUserInfo = patchUserInfo(profilePopupName.value, profilePopupSubtitle.value)
    api.patchUserInfo(profilePopupName.value, profilePopupSubtitle.value)
    .then(() => {
      profileName.textContent = profilePopupName.value;
      profileSubtitle.textContent = profilePopupSubtitle.value;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.error('Ошибка при сохранении профиля.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить'
    });
}

// обработчик сохранения формы нового элемента
function handleElementFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  //const promisePostCard = postCard(elementPopupName.value, elementPopupLink.value)
    api.postCard(elementPopupName.value, elementPopupLink.value)
    .then((result) => {
      prependElement(elementPopupName.value, elementPopupLink.value, result._id, [], result.owner._id, userId);
      closePopup(elementPopup);
    })
    .catch((err) => {
      console.error('Ошибка при сохранении профиля.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Создать'
      evt.target.reset();
    });
}

// обработчик формы подтверждения удаления карточки
function handleDeleteElementFormSubmit(evt){
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  //const promiseDeleteCard = deleteCard(deletePopup.dataset.deletedElement)
    api.deleteCard(deletePopup.dataset.deletedElement)
    .then(() => {
      document.getElementById(deletePopup.dataset.deletedElement).remove();
      closePopup(deletePopup);
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Да'
      deletePopup.dataset.deletedElement = '';
    });
}

// обработчик формы изменения аватара
function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  //const promisePatchUserAvatar = patchUserAvatar(avatarPopupLink.value)
    api.patchUserAvatar(avatarPopupLink.value)
    .then((result) => {
      profileAvatar.src = result.avatar;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error('Ошибка при загрузке нового аватара.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить'
      evt.target.reset();
    });
}

// открытие окна изменения аватара
avatarOpenBtn.addEventListener('click', ()=>{
  openPopup(avatarPopup);
});

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

// события отправки форм
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
elementFormElement.addEventListener('submit', handleElementFormSubmit);
deleteFormElement.addEventListener('submit', handleDeleteElementFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_state_error',
  errorClass: 'form__error-message_visible'
})
