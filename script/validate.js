//Выбрать все формы, установить на них слушатели

// const enableValidation = ({ formSelector, ...restConfig }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, restConfig);
//   })
// };

// //Объявить функцию установки слушателей
// const setEventListeners = (formElement, config) => {

//   formElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//   });

//   const { inputSelector, submitButtonSelector, ...restConfig } = config;
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);

//   // editButton.addEventListener('click', () => { toggleButtonState(buttonElement, inputList, config); })
//   // addNewCardButton.addEventListener('click', () => { toggleButtonState(buttonElement, inputList, config); })

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, restConfig);
//       toggleButtonState(buttonElement, inputList, config);
//     });
//   })
// }

// //Проверить валидность каждого поля
// const checkInputValidity = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// }

// //Проверить валидность обоих полей
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid
//   });
// }

// //Сделать кнопку неактивной, если поля невалидны
// const toggleButtonState = (buttonElement, inputList, config) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//   }
// }

// //Показать или скрыть ошибку

// const showInputError = (formElement, inputElement, config) => {
//   const { inputErrorClass, errorClass } = config;
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   errorElement.classList.add(errorClass);
// }

// const hideInputError = (formElement, inputElement, config) => {
//   const { inputErrorClass, errorClass } = config;
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// }


class FormValidator {
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

    // editButton.addEventListener('click', () => { toggleButtonState(buttonElement, inputList, config); })
    // addNewCardButton.addEventListener('click', () => { toggleButtonState(buttonElement, inputList, config); })

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
  _hasInvalidInput (_inputList) {
    return _inputList.some((_inputElement) => {
      return !_inputElement.validity.valid
    });
  }

  //Сделать кнопку неактивной, если поля невалидны
  _toggleButtonState (_buttonElement, _inputList) {
    if (this._hasInvalidInput(_inputList)) {
      _buttonElement.classList.add(this._selectors.inactiveButtonClass);
    } else {
      _buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    }
  }

  //Показать или скрыть ошибку

  _showInputError (_inputElement) {
    const _errorElement = this._form.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.add(this._selectors.inputErrorClass);
    _errorElement.textContent = _inputElement.validationMessage;
    _errorElement.classList.add(this._selectors.errorClass);
  }

  _hideInputError (_inputElement) {
    const _errorElement = this._form.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.remove(this._selectors.inputErrorClass);
    _errorElement.classList.remove(this._selectors.errorClass);
    _errorElement.textContent = '';
  }
}
