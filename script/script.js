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


function addCard(link, linkName) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__photo').src = link;
  card.querySelector('.card__photo').alt = linkName;
  card.querySelector('.card__place-name').textContent = linkName;
  document.querySelector('.cards').prepend(card);

  card.querySelector('.card__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
  });
}

initialCards.forEach(function (elem, index) {
  let link = initialCards[index].link;
  let linkName = initialCards[index].name;
  addCard(link, linkName);
})

//универсальные функции
function toggleModal(popup) {
  popup.classList.toggle('popup_opened');
}

function closePopup(evt) {
  curentPopup = evt.target.closest('.popup');
  toggleModal(curentPopup);
}

//редактировать профайл

let editButton = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup_type_edit');
let nameInput = document.querySelector('.popup__field_input_name');
let jobInput = document.querySelector('.popup__field_input_job');
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__about');
let closeEditButton = document.querySelector('.popup_type_edit').querySelector('.popup__close-icon');
let editFormElement = document.querySelector('.popup_type_edit').querySelector('.popup__form');

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
////////////////

//добавление новой карточки

let popupNewCard = document.querySelector('.popup_type_new-card');
let addNewCardButton = document.querySelector('.profile__add-button');
let placeName = document.querySelector('.popup_type_new-card').querySelector('.popup__field_input_place-name');
let placeLink = document.querySelector('.popup_type_new-card').querySelector('.popup__field_input_place-link');
let newCardFormElement = document.querySelector('.popup_type_new-card').querySelector('.popup__form');
let closeNewCardButton = document.querySelector('.popup_type_new-card').querySelector('.popup__close-icon');

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  let link = placeLink.value;
  let linkName = placeName.value;

  addCard(link, linkName);
  closePopup(evt);
}

addNewCardButton.addEventListener('click', function () {
  openEditPopup(popupNewCard)
});

closeNewCardButton.addEventListener('click', closePopup);


newCardFormElement.addEventListener('submit', newCardFormSubmitHandler);
