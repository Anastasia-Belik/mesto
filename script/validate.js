//Выбрать все формы, установить на них слушатели

const enableValidation = ({ formSelector, ...restConfig }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  })
};

//Объявить функцию установки слушателей
const setEventListeners = (formElement, config) => {

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const { inputSelector, submitButtonSelector, ...restConfig } = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  editButton.addEventListener('click', () => { toggleButtonState(buttonElement, inputList, config); })
  addNewCardButton.addEventListener('click', () => { toggleButtonState(buttonElement, inputList, config); })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList, config);
    });
  })
}

//Проверить валидность каждого поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

//Проверить валидность обоих полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
}

//Сделать кнопку неактивной, если поля невалидны
const toggleButtonState = (buttonElement, inputList, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

//Показать или скрыть ошибку

const showInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}


