const validationConfig = {
	formSelector: ".popup__container",
	inputSelector: ".input-text",
	submitButtonSelector: ".popup__save-button",
	inactiveButtonClass: "popup__save-button_disabled",
	inputErrorClass: "input-text_state_invalid",
};

const formEdit = document.forms["popup_edit"];

const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const nameInput = formEdit.querySelector(".input-text_type_name");
const jobInput = formEdit.querySelector(".input-text_type_job");

const formAdd = document.forms["popup_add"];

const addButton = document.querySelector(".profile__add-button");

const placesContainer = document.querySelector(".places__list");

const formUpdate = document.forms["popup_update"];

const avatarButton = document.querySelector(".profile__avatar-area");
const profileAvatar = document.querySelector(".profile__avatar");

const esc = "Escape";

export {
	validationConfig,
	formEdit,
	editButton,
	profileTitle,
	profileSubtitle,
	nameInput,
	jobInput,
	formAdd,
	addButton,
	placesContainer,
	formUpdate,
	avatarButton,
	profileAvatar,
	esc,
};
