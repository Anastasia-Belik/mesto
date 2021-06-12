import { initialCards } from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './Validate.js';
import Section from './Section.js';
import PopupWithImg from './PopupWithImg.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const selectors = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};


export const editButton = document.querySelector('.profile__edit-button');
export const addNewCardButton = document.querySelector('.profile__add-button');

const popupWithImg = new PopupWithImg('.popup_type_img');
popupWithImg.setEventListeners();

const cards = new Section({
  items: initialCards,
  renderer: (elem) => {
    const card = new Card(elem, '#card-template', popupWithImg.open.bind(popupWithImg));
    const cardElement = card.createCard();

    cards.addItem(cardElement);
  }
}
  , '.cards')
cards.renderItems();

const popupNewCard = new PopupWithForm(
  (data) => {
    const card = new Section({
      items: [data],
      renderer: (elem) => {
        const newCard = new Card(elem, '#card-template', popupWithImg.open.bind(popupWithImg));
        const cardElement = newCard.createCard();

        card.addItem(cardElement);
      }
    }
      , '.cards')
    card.renderItems();

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
  document.querySelector('.popup__field_input_name').value = data.userName;
  document.querySelector('.popup__field_input_job').value = data.userJob;
});


// валидация форм
const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement)
  formValidator.enableValidation();
})


