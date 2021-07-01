import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/Validate.js';
import Section from '../components/Section.js';
import PopupWithImg from '../components/PopupWithImg.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '0a237495-100c-43b6-98f8-6f5b330a108a',
    'Content-Type': 'application/json'
  }
});

const selectors = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};

const editButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__field_input_name');
const inputJob = document.querySelector('.popup__field_input_job');
const editProfileForm = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const newCardForm = document.querySelector('.popup_type_new-card').querySelector('.popup__form');



const popupWithImg = new PopupWithImg('.popup_type_img');
popupWithImg.setEventListeners();

const createNewCard = (data) => {
  const card = new Card(data, '#card-template', popupWithImg.open.bind(popupWithImg), api.deletCard.bind(api));
  return card.createCard();
}

const cards = new Section({
  renderer: (elem) => {
    cards.addItem(createNewCard(elem));
  }
}
  , '.cards')

api.getInitialCards()
  .then(data => {
    console.log(data);
    cards.renderItems(data)
  });


const popupNewCard = new PopupWithForm(
  (inputValues) => {
    api.postNewCard(inputValues)
      .then(data => {
        cards.addItem(createNewCard(data));
        popupNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  , '.popup_type_new-card'
)
popupNewCard.setEventListeners();
addNewCardButton.addEventListener('click', popupNewCard.open.bind(popupNewCard));

const userInfo = new UserInfo({
  userNameSelector: '.profile__user-name',
  userJobSelector: '.profile__about',
})

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

const popupEditProfile = new PopupWithForm(
  (inputValues) => {
    api.updateUserInfo(inputValues)
      .then(data => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      });
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

// const popupDeletCard = new PopupWithForm({

//   }
//   , '.popup_type_del-card'
// )
// popupDeletCard.setEventListeners();



// валидация форм
const editFormValidator = new FormValidator(selectors, editProfileForm, editButton);
editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(selectors, newCardForm, addNewCardButton);
newCardFormValidator.enableValidation();




// fetch(`https://mesto.nomoreparties.co/v1/cohort-25/cards/60dd41233899cd03023797a1`, {
//       method: 'DELETE',
//       headers: {authorization: '0a237495-100c-43b6-98f8-6f5b330a108a'},
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }

//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .then(res => {
//         console.log(res)
//       })
