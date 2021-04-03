import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <input
          type="text"
          className="input-text input-text_type_name popup__name"
          placeholder="Имя"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span id="name-error" className="popup__error"></span>
        <input
          type="text"
          className="input-text input-text_type_job popup__job"
          placeholder="О себе"
          name="about"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span id="about-error" className="popup__error"></span>
      </fieldset>
      <button className="popup__save-button" type="submit">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
