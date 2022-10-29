import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.imagePopupImg = this._popupElement.querySelector('.popup__image');
    this.imagePopupName = this._popupElement.querySelector('.popup__image-name');
  }

  open(name, link) {
    this.imagePopupImg.src = link;
    this.imagePopupImg.alt = name;
    this.imagePopupName.textContent = name;
    super.open();
  }
}
