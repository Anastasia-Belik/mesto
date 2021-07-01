export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDelCardBtnClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelCardBtnClick = handleDelCardBtnClick;
  }

  _getCardTemplate() {

    const _cardElem = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return _cardElem
  }

  createCard() {
    this._card = this._getCardTemplate();
    this._setEventListeners();

    const _cardPhoto = this._card.querySelector('.card__photo');
    _cardPhoto.src = this._link;
    _cardPhoto.alt = this._name;
    this._card.querySelector('.card__place-name').textContent = this._name;

    const likeCounter = this._card.querySelector('.card__counter');
    likeCounter.textContent = this._likes.length;

    return this._card
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleTrashClick() {
    this._card.remove();
    this._card = null;
    this._handleDelCardBtnClick(this._cardId);
  }

  _handleImgClick(evt) {
    this._handleCardClick(evt);
  }

  _setEventListeners() {

    this._card.querySelector('.card__like').addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._card.querySelector('.card__del-btn').addEventListener('click', (evt) => {
      this._handleTrashClick(evt);
    });

    this._card.querySelector('.card__photo').addEventListener('click', (evt) => {
      this._handleImgClick(evt)
    });
  }

}
