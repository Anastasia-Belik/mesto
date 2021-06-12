import Popup from './Popup.js';

export default class PopupWithImg extends Popup {
  open(evt) {
    super.open();
    const fullImg = this._popup.querySelector('.popup__img');

    fullImg.src = evt.target.src;
    fullImg.alt = evt.target.alt;
    this._popup.querySelector('.popup__heading').textContent = evt.target.alt;

  }
}


