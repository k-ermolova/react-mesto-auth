import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_update"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <input
          type="url"
          className="input-text input-text_type_link popup__link"
          placeholder="Ссылка на картинку"
          name="avatar-link"
          required
          ref={avatarRef}
        />
        <span id="avatar-link-error" className="popup__error"></span>
      </fieldset>
      <button
        className="popup__save-button popup__save-button_update"
        type="submit"
      >
        Сохранить
  </button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;