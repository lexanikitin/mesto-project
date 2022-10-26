export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector)
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
    this._popupElement.addEventListener('mousedown', this._handleOverlay.bind(this));
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popupElement.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
  }

  removeEventListeners() {
    this._popupElement.removeEventListener('mousedown', this._handleOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }
}
