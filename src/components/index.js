import '../pages/index.css';
import Card from "./Card";
import Section from "./Section";
import Api from "./Api";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "./FormValidator";
import UserInfo from "./UserInfo";
import PopupDelete from "./PopupDelete";
import {
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
  config,
} from './variables';

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

const profilePopupWithFormInstance = new PopupWithForm('.popup-profile', (evt, inputValues) => {
  userInfoInstance.setUserInfo(inputValues.name, inputValues.subtitle);
  evt.submitter.textContent = 'Сохранить'
  profilePopupWithFormInstance.close();
});

const avatarPopupWithFormInstance = new PopupWithForm('.popup-avatar', (evt, inputValues) => {
  api.patchUserAvatar(inputValues['avatar-link'])
    .then((result) => {
      userInfoInstance.setNewUserAvatar(result.avatar);
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

const newElementPopupInstance = new PopupWithForm('.popup-element', (evt, inputValues) => {
  api.postCard(inputValues['element-name'], inputValues['element-link'])
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
