export default class Card {
  constructor({data}, selectorTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._likes = data.likes;
    this._ownerId = data.ownerId;
    this._userId = data._userId;
    this._selector = selectorTemplate;
  }
}
