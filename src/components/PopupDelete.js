import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('form');
  }

  open(cardId, cardInstance) {
    super.open();
    this._cardId = cardId;
    this._cardInstance = cardInstance;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => {
      this._submitHandler(event, this._cardId, this._cardInstance)
    })
  }

  close() {
    super.close();
    this._formElement.removeEventListener('submit', this._submitHandler)
  }
}
