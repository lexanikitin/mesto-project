export default class Card {
  constructor({data}, userId, handleCardClick, handleDeleteCard,
                handlePutLike, handleDeleteLike, selectorTemplate)   {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this.likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._selector = selectorTemplate;
  }

  _getElement() {
    const element = document.querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return element;
  }

  _toggleLike(evt) {
    if(evt.target.classList.contains('element__like-btn_active')) {
      this._handleDeleteLike(evt.target.closest('.element').id);

    } else {
      this._handlePutLike(evt.target.closest('.element').id);
    }
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    if (this._ownerId === this._userId) {
      this._elementDelete.addEventListener('click', (evt) => {
        this._handleDeleteCard(evt);
      });
    } else {
      this._elementDelete.remove();
    }
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  generate() {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__heading');
    this._elementLike = this._element.querySelector('.element__like-btn');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');

    this._element.id = this._id;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikeCounter.textContent = this.likes.length;
    if (this.likes.some((like) => {
      return like._id === this._userId;
    })) {
      this._elementLike.classList.add('element__like-btn_active');
    }
    this._setEventListeners();
    return this._element;
  }
  redrawLikeCounter(cardId, likeCounter) {
    document.getElementById(cardId).querySelector('.element__like-counter').textContent = likeCounter;
  }
}
