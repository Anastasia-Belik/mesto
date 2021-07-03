export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDelCardBtnClick, handleLikeBtnClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImgClick = handleCardClick;
    this._handleDelCardBtnClick = handleDelCardBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick
  }

  _getCardTemplate() {

    const _cardElem = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return _cardElem
  }

  createCard(userId) {
    this._card = this._getCardTemplate();

    if (userId === this._data.owner._id) {
      this._card.insertAdjacentHTML('beforeend'
        , '<button class="card__del-btn" type="button" aria-label="Удалить карточку"></button>');
    }

    this._data.likes.forEach(elem => {
      if (elem._id === userId) {
        this._card.querySelector('.card__like').classList.add('card__like_active');
      }
    });

    this._setEventListeners(userId);

    const _cardPhoto = this._card.querySelector('.card__photo');
    _cardPhoto.src = this._data.link;
    _cardPhoto.alt = this._data.name;
    this._card.querySelector('.card__place-name').textContent = this._data.name;
    this._card.querySelector('.card__counter').textContent = this._data.likes.length;

    return this._card
  }

  _handleLikeClick(evt) {
    this._handleLikeBtnClick(evt, this._data._id);
  }

  _handleTrashClick(evt) {
    this._handleDelCardBtnClick(evt, this._data._id)
  }

  _setEventListeners(userId) {

    this._card.querySelector('.card__like').addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._card.querySelector('.card__photo').addEventListener('click', (evt) => {
      this._handleImgClick(evt)
    });

    if (userId === this._data.owner._id) {
      this._card.querySelector('.card__del-btn').addEventListener('click', (evt) => {
        this._handleTrashClick(evt.target.closest('.card'));
      });
    }
  }

}
