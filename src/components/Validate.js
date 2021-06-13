export default class FormValidator {
  constructor(selectors, form, openPopupBtn) {
    this._selectors = selectors;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
    this._buttonElement = this._form.querySelector(this._selectors.submitButtonSelector);
    this._openPopupBtn = openPopupBtn;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => {
        this._checkInputValidity(_inputElement);
        this._toggleButtonState(this._buttonElement, this._inputList);
      });
    })

    this._openPopupBtn.addEventListener('click', () => {
      this._clearError(this._inputList)
      this._toggleButtonState(this._buttonElement, this._inputList);
    });
  }

  _clearError(_inputList) {
    this._inputList.forEach((evt) => {
      evt.classList.remove(this._selectors.inputErrorClass);
    });

    const _errorList = Array.from(this._form.querySelectorAll('.popup__error'));
    _errorList.forEach((evt) => {
      evt.classList.remove(this._selectors.errorClass);
    });
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
