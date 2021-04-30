//рендеринг карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (elem, index) {
  let link = initialCards[index].link;
  let linkName = initialCards[index].name;
  addCard(link, linkName);
});

function addCard(link, linkName) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__photo').src = link;
  card.querySelector('.card__photo').alt = linkName;
  card.querySelector('.card__place-name').textContent = linkName;
  document.querySelector('.cards').prepend(card);

  likeCard(card);
  deletCard(card);
  openImg(card);
}

function likeCard(curentCard) {
  curentCard.querySelector('.card__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
  });
}

function deletCard(curentCard) {
  curentCard.querySelector('.card__del-btn').addEventListener('click', function (evt) {
    const eventTarget = evt.target.closest('.card');
    eventTarget.remove();
  });
}

function openImg(curentCard) {
  curentCard.querySelector('.card__photo').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    openImgPopup(eventTarget);
  })
}


//редактировать профайл

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__field_input_name');
const jobInput = document.querySelector('.popup__field_input_job');
const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__about');
const closeEditButton = document.querySelector('.popup_type_edit').querySelector('.popup__close-icon');
const editFormElement = document.querySelector('.popup_type_edit').querySelector('.popup__form');

function openEditPopup(popup) {
  toggleModal(popup);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(evt);
}

editButton.addEventListener('click', function () {
  openEditPopup(popupEdit)
});

editFormElement.addEventListener('submit', editFormSubmitHandler);

closeEditButton.addEventListener('click', closePopup);


//добавление новой карточки

const popupNewCard = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const placeName = document.querySelector('.popup_type_new-card').querySelector('.popup__field_input_place-name');
const placeLink = document.querySelector('.popup_type_new-card').querySelector('.popup__field_input_place-link');
const newCardFormElement = document.querySelector('.popup_type_new-card').querySelector('.popup__form');
const closeNewCardButton = document.querySelector('.popup_type_new-card').querySelector('.popup__close-icon');

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const link = placeLink.value;
  const linkName = placeName.value;

  addCard(link, linkName);
  closePopup(evt);
}

addNewCardButton.addEventListener('click', function () {
  newCardFormElement.reset();
  openEditPopup(popupNewCard);
});

closeNewCardButton.addEventListener('click', closePopup);

newCardFormElement.addEventListener('submit', newCardFormSubmitHandler);


//просмотр изображения

const popupImg = document.querySelector('.popup_type_img');
const closeImgButton = document.querySelector('.popup_type_img').querySelector('.popup__close-icon');

function openImgPopup(cardImg) {
  toggleModal(popupImg);
  popupImg.querySelector('.popup__img').src = cardImg.src;
  popupImg.querySelector('.popup__img').alt = cardImg.alt;
  popupImg.querySelector('.popup__heading').textContent = cardImg.alt;
}

closeImgButton.addEventListener('click', closePopup);


//универсальные функции

function toggleModal(popup) {
  popup.classList.toggle('popup_opened');
}

function closePopup(evt) {
  curentPopup = evt.target.closest('.popup');
  toggleModal(curentPopup);
}

