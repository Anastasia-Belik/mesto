import './index.css';
import { initialCards } from '../script/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/Validate.js';
import Section from '../components/Section.js';
import PopupWithImg from '../components/PopupWithImg.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components//UserInfo.js';

const selectors = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};

export const esc = 'Escape';
const editButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__field_input_name');
const inputJob = document.querySelector('.popup__field_input_job');
const editProfileForm = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const newCardForm = document.querySelector('.popup_type_new-card').querySelector('.popup__form');


const popupWithImg = new PopupWithImg('.popup_type_img');
popupWithImg.setEventListeners();

const createNewCard = (data) => {
  const card = new Card(data, '#card-template', popupWithImg.open.bind(popupWithImg));
  return card.createCard();
}

const cards = new Section({
  items: initialCards,
  renderer: (elem) => {
    cards.addItem(createNewCard(elem));
  }
}
  , '.cards')
cards.renderItems();

const popupNewCard = new PopupWithForm(
  (data) => {
    cards.addItem(createNewCard(data));
    popupNewCard.close();
  }
  , '.popup_type_new-card'
)
popupNewCard.setEventListeners();
addNewCardButton.addEventListener('click', popupNewCard.open.bind(popupNewCard));

const userInfo = new UserInfo({
  userNameSelector: '.profile__user-name',
  userJobSelector: '.profile__about',
})


const popupEditProfile = new PopupWithForm(
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEditProfile.close();
  }
  , '.popup_type_edit'
)
popupEditProfile.setEventListeners();

editButton.addEventListener('click', function () {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  inputName.value = data.userName;
  inputJob.value = data.userJob;
});


// валидация форм
const editFormValidator = new FormValidator(selectors, editProfileForm, editButton);
editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(selectors, newCardForm, addNewCardButton);
newCardFormValidator.enableValidation();

