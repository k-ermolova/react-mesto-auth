import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  function handleTitleAdd(e) {
    setTitle(e.target.value);
  }

  function handleImageAdd(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link: image
    });

    setTitle('');
    setImage('');
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="popup_add"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <input
          type="text"
          className="input-text input-text_type_heading popup__name"
          placeholder="Название"
          name="place-name"
          required
          minLength="1"
          maxLength="30"
          value={title}
          onChange={handleTitleAdd}
        />
        <span id="place-name-error" className="popup__error"></span>
        <input
          type="url"
          className="input-text input-text_type_link popup__link"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={image}
          onChange={handleImageAdd}
        />
        <span id="link-error" className="popup__error"></span>
      </fieldset>
      <button className="popup__save-button" type="submit">Создать</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;