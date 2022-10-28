import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector, name, link) {
    super(selector);
    this._name = name;
    this._src = link;
    this.imagePopupImg = this._popupElement.querySelector('.popup__image');
    this.imagePopupName = this._popupElement.querySelector('.popup__image-name');
  }

  open() {
    this.imagePopupImg.src = this._src;
    this.imagePopupImg.alt = this._name;
    this.imagePopupName.textContent = this._name;
    super.open();
  }
}
