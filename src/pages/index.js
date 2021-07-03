import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/Validate.js';
import Section from '../components/Section.js';
import PopupWithImg from '../components/PopupWithImg.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupVerification from '../components/PopupVerification.js';
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
const editAvatarButton = document.querySelector('.profile__avatar-edit-btn');
const inputName = document.querySelector('.popup__field_input_name');
const inputJob = document.querySelector('.popup__field_input_job');
const editProfileForm = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const newCardForm = document.querySelector('.popup_type_new-card').querySelector('.popup__form');
const editAvatarForm = document.querySelector('.popup_type_edit-avatar').querySelector('.popup__form');
const avatar = document.querySelector('.profile__avatar');

function renderLoading(isLoading, popup, buttonText = "Сохранить") {
  if (isLoading) {
    popup.querySelector('.popup__submit-button').textContent = 'Сохранение...'
  } else {
    popup.querySelector('.popup__submit-button').textContent = buttonText
  }
}

api.getUserInfo()  //получение данных о юзере
  .then(data => {
    userInfo.setUserInfo(data);
    return data._id
  })
  .then((userId) => {
    api.getInitialCards()  //инициализация карточек
      .then(data => {
        cards.renderItems(data, userId)
      });
    //попап добавления новой карточки
    const popupNewCard = new PopupWithForm(
      (inputValues) => {
        renderLoading(true, newCardForm);
        api.postNewCard(inputValues)
          .then(data => {
            cards.addItem(createNewCard(data, userId));
            popupNewCard.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderLoading(false, newCardForm, 'Создать');
          });
      }
      , '.popup_type_new-card'
    )
    popupNewCard.setEventListeners();
    addNewCardButton.addEventListener('click', popupNewCard.open.bind(popupNewCard));

  })
  .catch((err) => {
    console.log(err);
  });

//заполнение профиля
const userInfo = new UserInfo({
  userNameSelector: '.profile__user-name',
  userJobSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
})

//попап редактирования профиля
const popupEditProfile = new PopupWithForm(
  (inputValues) => {
    renderLoading(true, editProfileForm);
    api.updateUserInfo(inputValues)
      .then(data => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, editProfileForm);
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

//попап для редактирования аватара
const popupEditAvatar = new PopupWithForm(
  (avatarLink) => {
    renderLoading(true, editAvatarForm);
    api.updateAvatar(avatarLink)
      .then(res => {
        avatar.src = res.avatar;
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, editAvatarForm);
      });
  }
  , '.popup_type_edit-avatar'
)
popupEditAvatar.setEventListeners();
editAvatarButton.addEventListener('click', function () {
  popupEditAvatar.open();
});

//создание карточки
const createNewCard = (data, userId) => {
  const card = new Card(
    data,
    '#card-template',
    popupWithImg.open.bind(popupWithImg),
    popupDeletCard.open.bind(popupDeletCard),
    (evt, cardId) => {
      if (evt.target.classList.contains('card__like_active')) {
        api.deleteLike(cardId)
          .then(res => {
            evt.target.classList.remove('card__like_active');
            evt.target.closest('.card').querySelector('.card__counter').textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.putLike(cardId)
          .then(res => {
            evt.target.classList.add('card__like_active');
            evt.target.closest('.card').querySelector('.card__counter').textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.createCard(userId);
}

//рендеринг карточек
const cards = new Section({
  renderer: (elem, userId) => {
    cards.addItem(createNewCard(elem, userId));
  }
}
  , '.cards')

//попап c полным изображением
const popupWithImg = new PopupWithImg('.popup_type_img');
popupWithImg.setEventListeners();

//попап с подтверждением удаления карточки
const popupDeletCard = new PopupVerification(
  (card, cardId) => {
    card.remove();
    api.deletCard(cardId);
    popupDeletCard.close()
  }
  , '.popup_type_del-card'
)
popupDeletCard.setEventListeners();

// валидация форм
const editFormValidator = new FormValidator(selectors, editProfileForm, editButton);
editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(selectors, newCardForm, addNewCardButton);
newCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(selectors, editAvatarForm, editAvatarButton)
editAvatarFormValidator.enableValidation();




