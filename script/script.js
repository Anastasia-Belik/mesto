import { initialCards } from './initial-cards.js'
import Card from './Card.js';
import FormValidator from './Validate.js'

const selectors = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};

//редактирование профиля
export const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__field_input_name');
const jobInput = document.querySelector('.popup__field_input_job');
const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__about');
const closeEditButton = popupEdit.querySelector('.popup__close-icon');
const editFormElement = popupEdit.querySelector('.popup__form');


//добавление новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
export const addNewCardButton = document.querySelector('.profile__add-button');
const placeName = popupNewCard.querySelector('.popup__field_input_place-name');
const placeLink = popupNewCard.querySelector('.popup__field_input_place-link');
const newCardFormElement = popupNewCard.querySelector('.popup__form');
const closeNewCardButton = popupNewCard.querySelector('.popup__close-icon');

//просмотр полного изображения
const popupImg = document.querySelector('.popup_type_img');
const fullImg = popupImg.querySelector('.popup__img');
const popupImgHeading = popupImg.querySelector('.popup__heading');
const closeImgButton = popupImg.querySelector('.popup__close-icon');

const popupList = Array.from(document.querySelectorAll('.popup'));

//////////////////////////////////////////

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const curentPopup = document.querySelector('.popup_opened');
    closePopup(curentPopup);
  }
}

function addCard(card) {
  document.querySelector('.cards').prepend(card);
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const formData = {
    link: placeLink.value,
    name: placeName.value,
  }
  const card = new Card(formData, '#card-template');
  const cardElement = card.createCard();

  addCard(cardElement);
  closePopup(popupNewCard);
}


//редактирование профиля

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

//просмотр изображения

export function openImgPopup(cardImg) {
  openPopup(popupImg);
  fullImg.src = cardImg.src;
  fullImg.alt = cardImg.alt;
  popupImgHeading.textContent = cardImg.alt;
}

/////////////////////////////////////

//рендеринг карточек

initialCards.forEach((elem) => {
  const card = new Card(elem, '#card-template');
  const cardElement = card.createCard();
  addCard(cardElement);
});

//редактирование профиля

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  // toggleButtonState(editFormElement, false);
  // clearError(editFormElement);
});

editFormElement.addEventListener('submit', editProfileFormSubmitHandler);

closeEditButton.addEventListener('click', () => closePopup(popupEdit));

//добавление новой карточки

addNewCardButton.addEventListener('click', function () {
  newCardFormElement.reset();
  openPopup(popupNewCard);
  // toggleButtonState(newCardFormElement, true);
  // clearError(newCardFormElement);
});

closeNewCardButton.addEventListener('click', () => closePopup(popupNewCard));

newCardFormElement.addEventListener('submit', newCardFormSubmitHandler);

//закрытие попапа с полным изображением

closeImgButton.addEventListener('click', () => closePopup(popupImg));

//закрытие по оверлэю и нажатию на esc

popupList.forEach((popup) => {

  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  });
});

// валидация форм
const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement)
  formValidator.enableValidation();
})


