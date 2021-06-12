import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(formSubmitHandler, popupSelector){
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues(){

      this._inputList = this._popup.querySelectorAll('.popup__field');

      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);

      return this._formValues;
    }

  setEventListeners(){
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  close(){
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

}
