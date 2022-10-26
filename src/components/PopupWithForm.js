import Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('form');
  }

  _getInputValues(){

  };

  setEventListeners(){
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitHandler )

  }
  close(){
    super.close();
    this._formElement.removeEventListener('submit', this._submitHandler )
    this._formElement.reset();
  }
}
