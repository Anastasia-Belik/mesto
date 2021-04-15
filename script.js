//открытие формы

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.name-input');
let jobInput = document.querySelector('.job-input');
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__about');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

editButton.addEventListener('click', openPopup);

//закрытие формы без сохранения

let closeButton = document.querySelector('.popup__close-icon');

function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

//отправка формы

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
