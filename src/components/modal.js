function escapePopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function overlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target.closest('.popup'));
  }
}

// функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', overlayClick);
  document.addEventListener('keydown', escapePopup);
}

// функция закрытия модального окна
export function closePopup(popup) {
  document.removeEventListener('keydown', escapePopup);
  popup.classList.remove('popup_opened');
  if (popup.querySelector('form')) {
    popup.querySelector('form').reset();
  }
}
