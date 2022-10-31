import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = (evt) => {
      evt.preventDefault();
      evt.submitter.textContent = 'Сохранение...'
      this._getInputValues();
      submitHandler(evt, this.inputValues);
    }
    this._formElement = this._popupElement.querySelector('form');
    this.inputValues = {
      name: '',
      subtitle: '',
      'element-name': '',
      'element-link': '',
      'avatar-link': ''
    }
  }

  _getInputValues() {
    Array.from(this._formElement.querySelectorAll('input')).map(element => this.inputValues[element.name] = element.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitHandler)
  }

  close() {
    super.close();
    this._formElement.removeEventListener('submit', this._submitHandler)
    this._formElement.reset();
  }
}
