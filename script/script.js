//редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__field_input_name');
const jobInput = document.querySelector('.popup__field_input_job');
const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__about');
const closeEditButton = popupEdit.querySelector('.popup__close-icon');
const editFormElement = popupEdit.querySelector('.popup__form');


//добавление новой карточки
const cardTemplate = document.querySelector('#card-template').content;
const popupNewCard = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
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

//универсальные функции

function toggleModal(popup) {
  popup.classList.toggle('popup_opened');
}

function closePopup(evt) {
  curentPopup = evt.target.closest('.popup');
  toggleModal(curentPopup);
}

function getFocusPopop(popup) {
  popup.focus();
}


//создание и добавление карточек

function createCard(link, linkName) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = card.querySelector('.card__photo');
  cardPhoto.src = link;
  cardPhoto.alt = linkName;
  card.querySelector('.card__place-name').textContent = linkName;
  setLikeCardListener(card);
  setDeleteCardListener(card);
  setOpenImgPopupListener(card);
  return card;
}

function setLikeCardListener(curentCard) {
  curentCard.querySelector('.card__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
  });
}

function setDeleteCardListener(curentCard) {
  curentCard.querySelector('.card__del-btn').addEventListener('click', function (evt) {
    const eventTarget = evt.target.closest('.card');
    eventTarget.remove();
  });
}

function setOpenImgPopupListener(curentCard) {
  curentCard.querySelector('.card__photo').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    openImgPopup(eventTarget);
    getFocusPopop(popupImg);
  })
}

function addCard(card) {
  document.querySelector('.cards').prepend(card);
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const link = placeLink.value;
  const name = placeName.value;
  addCard(createCard(link, name));
  closePopup(evt);
}


//редактирование профиля

function openEditProfilePopup(popup) {
  toggleModal(popup);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(evt);
}

//просмотр изображения

function openImgPopup(cardImg) {
  toggleModal(popupImg);
  fullImg.src = cardImg.src;
  fullImg.alt = cardImg.alt;
  popupImgHeading.textContent = cardImg.alt;
}

/////////////////////////////////////

//рендеринг карточек

initialCards.forEach(function (elem, index) {
  const link = initialCards[index].link;
  const linkName = initialCards[index].name;

  addCard(createCard(link, linkName));
});


//редактирование профиля

editButton.addEventListener('click', function () {
  openEditProfilePopup(popupEdit);
  getFocusPopop(popupEdit);
});

editFormElement.addEventListener('submit', editProfileFormSubmitHandler);

closeEditButton.addEventListener('click', closePopup);

//добавление новой карточки

addNewCardButton.addEventListener('click', function () {
  newCardFormElement.reset();
  openEditProfilePopup(popupNewCard);
  getFocusPopop(popupNewCard);
});

closeNewCardButton.addEventListener('click', closePopup);

newCardFormElement.addEventListener('submit', newCardFormSubmitHandler);

//закрытие попапа с полным изображением

closeImgButton.addEventListener('click', closePopup);


//Валидация форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
});

//закрытие по оверлэю и esc

popupList.forEach((popup) => {

  popup.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(evt);
    }
  });

  popup.addEventListener('click', closePopup);
  popup.querySelector('.popup__container').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

});


