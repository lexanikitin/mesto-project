export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector)
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
    this._handleOverlay = (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    }
    this._handleClsButton = () => {
      this.close();
    }
  }

  // метод открытия модального окна
  open() {
    this._popupElement.classList.add('popup_opened');
    this.setEventListeners();
  }

  // метод закрытия модального окна
  close() {
    this.removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._handleOverlay);
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.querySelector('.popup__close').addEventListener('click', this._handleClsButton);
  }

  removeEventListeners() {
    this._popupElement.removeEventListener('mousedown', this._handleOverlay);
    this._popupElement.querySelector('.popup__close').removeEventListener('click', this._handleClsButton);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
