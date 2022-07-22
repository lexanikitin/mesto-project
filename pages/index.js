const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileOpenBtn = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup-profile');
const profilePopupName = document.querySelector('#name');
const profilePopupSubtitle = document.querySelector('#subtitle');
const profileCloseBtn = document.querySelector('.popup__close');
const profileFormElement = profilePopup.querySelector('.form');


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

profileOpenBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupName.value = profileName.textContent;
  profilePopupSubtitle.value = profileSubtitle.textContent;
});
profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

profileFormElement.addEventListener('submit', formProfileSubmitHandler);
