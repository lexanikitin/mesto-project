import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector, name, link) {
    super(selector);
    this._name = name;
    this._src = link;
  }

  open() {
    const imagePopupImg = this._popupElement.querySelector('.popup__image');
    const imagePopupName = this._popupElement.querySelector('.popup__image-name');
    imagePopupImg.src = this._src;
    imagePopupImg.alt = this._name;
    imagePopupName.textContent = this._name;
    super.open();
  }
}
