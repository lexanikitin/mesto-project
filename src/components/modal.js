function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlay);
  document.addEventListener('keydown', handleEscape);
}

// функция закрытия модального окна
export function closePopup(popup) {
  popup.removeEventListener('click', handleOverlay);
  document.removeEventListener('keydown', handleEscape);
  popup.classList.remove('popup_opened');
}
