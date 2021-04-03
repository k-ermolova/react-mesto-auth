import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup() {
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="popup_confirm"
    >
      <button
        className="popup__save-button popup__save-button_confirm"
        type="submit"
      >
        Да
  </button>
    </PopupWithForm>
  )
}

export default ConfirmationPopup;