import Popup from './Popup.js';

export default class PopupVerification extends Popup {
  constructor(formSubmitHandler, popupSelector){
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.querySelector('.popup__submit-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._card, this._cardId);
    });
  }

}
