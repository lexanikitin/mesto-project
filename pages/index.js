const profileCloseBtn = document.querySelector('.popup__close');
const profileOpenBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup-profile');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileOpenBtn.addEventListener('click', ()=>{
  openPopup(profilePopup);
});
profileCloseBtn.addEventListener('click', ()=>{
  closePopup(profilePopup);
});
