import Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
  }

  _getInputValues(){};

  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._submitHandler )

  }
  close(){
    super.close();
    this._popupElement.querySelector('form').reset();
  }
}
