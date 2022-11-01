import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = (evt) => {
      evt.preventDefault();
      evt.submitter.textContent = 'Сохранение...'
      submitHandler(evt, this._getInputValues());
    }
    this._formElement = this._popupElement.querySelector('form');
    this._inputFields = [
      'name',
      'subtitle',
      'element-name',
      'element-link',
      'avatar-link'
    ]
  }

  _getInputValues() {
    const inputValues = {};
    Array.from(this._formElement.querySelectorAll('input')).map((element) => {
        this._inputFields.forEach((field) => {
            if (element.name === field) {
              inputValues[element.name] = element.value;
            }
          }
        )
      })
    return inputValues;
  }


setEventListeners()
{
  super.setEventListeners();
  this._formElement.addEventListener('submit', this._submitHandler)
}

close()
{
  super.close();
  this._formElement.removeEventListener('submit', this._submitHandler)
  this._formElement.reset();
}
}
