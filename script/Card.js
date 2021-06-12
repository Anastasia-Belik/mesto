export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    return this._card
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleTrashClick(evt) {
    evt.target.closest('.card').remove();
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
