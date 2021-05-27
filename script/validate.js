export default class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const _inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
    const _buttonElement = this._form.querySelector(this._selectors.submitButtonSelector);

    _inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => {
        this._checkInputValidity(_inputElement);
        this._toggleButtonState(_buttonElement, _inputList);
      });
    })
  }

  _checkInputValidity(_inputElement) {
    if (!_inputElement.validity.valid) {
      this._showInputError(_inputElement);
    } else {
      this._hideInputError(_inputElement);
    }
  }

  //Проверить валидность обоих полей
  _hasInvalidInput(_inputList) {
    return _inputList.some((_inputElement) => {
      return !_inputElement.validity.valid
    });
  }

  //Сделать кнопку неактивной, если поля невалидны
  _toggleButtonState(_buttonElement, _inputList) {
    if (this._hasInvalidInput(_inputList)) {
      _buttonElement.classList.add(this._selectors.inactiveButtonClass);
    } else {
      _buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    }
  }

  //Показать или скрыть ошибку

  _showInputError(_inputElement) {
    const _errorElement = this._form.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.add(this._selectors.inputErrorClass);
    _errorElement.textContent = _inputElement.validationMessage;
    _errorElement.classList.add(this._selectors.errorClass);
  }

  _hideInputError(_inputElement) {
    const _errorElement = this._form.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.remove(this._selectors.inputErrorClass);
    _errorElement.classList.remove(this._selectors.errorClass);
    _errorElement.textContent = '';
  }
}
