//открытие формы

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__field_input_name');
let jobInput = document.querySelector('.popup__field_input_job');
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__about');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__user-info');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

//закрытие формы без сохранения

function closePopup() {
  popup.classList.remove('popup_opened');
}

//отправка формы

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup);
