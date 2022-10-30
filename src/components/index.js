import '../pages/index.css';
import Card from "./Card";
import Section from "./Section";
import Api from "./Api";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "./FormValidator";
import UserInfo from "./UserInfo";
import PopupDelete from "./PopupDelete";

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

const elementPopup = document.querySelector('.popup-element');
const elementFormElement = elementPopup.querySelector('.form');
const elementPopupName = document.querySelector('#element-name');
const elementPopupLink = document.querySelector('#element-link');

const newElementBtn = document.querySelector('.profile__add-button');

// храним ID пользователя (позже стоит убрать в куки?)
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '8cf18d1a-5438-4fe9-84de-67a8b7385fb6',
    'Content-Type': 'application/json'
  }
}
let cardsList;

const api = new Api(config);


// функция генерации экземпляра класса Card
function getCardInstance(data, selector) {
  const card = new Card(
    {data: data},
    localStorage.getItem('userId'),
    (name, link) => {
      imagePopup.open(name, link);
    },
    (cardId, cardInstance) => {
      confirmPopup.open(cardId, cardInstance);
    },
    (cardId) => {
      api.putLike(cardId)
        .then((result) => {
          card.redrawLikeCounter(cardId, result.likes.length)
        })
        .catch((err) => {
          console.error('Ошибка при сохранении лайка на сервере.', err);
        })
    },
    (cardId) => {
      api.deleteLike(cardId)
        .then((result) => {
          card.redrawLikeCounter(cardId, result.likes.length)
        })
        .catch((err) => {
          console.error('Ошибка при удалении лайка на сервере.', err);
        })
    },
    selector);
  return card.generate();
}

/*
создание экземпляров класса PopupWith...
*/
const imagePopup = new PopupWithImage('.popup-image');

const confirmPopup = new PopupDelete('.popup-delete', (evt, cardId, cardInstance) => {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  api.deleteCard(cardId)
    .then((res) => {
      cardInstance.removeCardElement(cardId);
      confirmPopup.close();
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Да'
      deletePopup.dataset.deletedElement = '';
    });
});

const profilePopupWithFormInstance = new PopupWithForm('.popup-profile', (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  const profileData = profilePopupWithFormInstance.getInputValues();
  //TODO проверить getInputValues. Почему он приватный? Корректно использую?
  userInfoInstance.setUserInfo(profileData[0], profileData[1]);
  evt.submitter.textContent = 'Сохранить'
  profilePopupWithFormInstance.close();
});

const avatarPopupWithFormInstance = new PopupWithForm('.popup-avatar', (evt) => {
  const avatarData = avatarPopupWithFormInstance.getInputValues();
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  api.patchUserAvatar(avatarData[0])
    .then((result) => {
      profileAvatar.src = result.avatar;
      avatarPopupWithFormInstance.close();
      evt.target.reset();
    })
    .catch((err) => {
      console.error('Ошибка при загрузке нового аватара.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить'
    });
});

const newElementPopupInstance = new PopupWithForm('.popup-element', (evt) => {
  const newCardData = newElementPopupInstance.getInputValues();
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  api.postCard(newCardData[0], newCardData[1])
    .then((result) => {
      cardsList.addNewItem(getCardInstance(result, '.element-template'));
      newElementPopupInstance.close();
      evt.target.reset();
    })
    .catch((err) => {
      console.error('Ошибка при сохранении профиля.', err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Создать'
    });
})

/*
*/
const userSelectors = {
  name: '.profile__name',
  about: '.profile__subtitle',
  avatar: '.profile__avatar',
  getUserInfoHandler: (nameSelector, aboutSelector, avatarSelector) => {
    api.getUserInfo()
      .then((res) => {
        document.querySelector(nameSelector).textContent = res.name;
        document.querySelector(aboutSelector).textContent = res.about;
        document.querySelector(avatarSelector).src = res.avatar;
        localStorage.setItem('userId', res._id);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке данных с сервера.', err);
      });
  },
  setUserInfoHandler: (evt, name, about, nameSelector, aboutSelector) => {
    api.patchUserInfo(name, about)
      .then((res) => {
        document.querySelector(nameSelector).textContent = res.name;
        document.querySelector(aboutSelector).textContent = res.about;
        evt.target.reset();
      })
      .catch((err) => {
        console.error('Ошибка при сохранении профиля.', err);
      })
      .finally(() => {
      });
  }
}
const userInfoInstance = new UserInfo({data: userSelectors});
userInfoInstance.getUserInfo();

api.getCards()
  .then((result) => {
    const items = result;
    cardsList = new Section({
      items,
      renderer: (item) => {
        cardsList.addItem(getCardInstance(item, '.element-template'));
      },
    }, '.elements');
    // отрисовка карточек
    cardsList.renderItems();

  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных с сервера.', err);
  });

// открытие окна изменения аватара
avatarOpenBtn.addEventListener('click', () => {
  avatarPopupWithFormInstance.open();
});

// открытие окна редактирования профиля
profileOpenBtn.addEventListener('click', () => {
  profilePopupName.value = profileName.textContent;
  profilePopupSubtitle.value = profileSubtitle.textContent;
  profilePopupWithFormInstance.open();
});

// открытие окна нового элемента
newElementBtn.addEventListener('click', () => {
  newElementPopupInstance.open();
});

const validationProps = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_state_error',
  errorClass: 'form__error-message_visible'
};
const validationProfileForm = new FormValidator({data: validationProps}, profileFormElement);
validationProfileForm.enableValidation();
const validationElementForm = new FormValidator({data: validationProps}, elementFormElement);
validationElementForm.enableValidation();
const validationAvatarForm = new FormValidator({data: validationProps}, avatarFormElement);
validationAvatarForm.enableValidation();
