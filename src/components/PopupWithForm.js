function PopupWithForm(props) {
  return (
    <div className={`popup ${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form className="popup__container" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
        <button
          className="popup__close-button popup__close-button_position_diagonally"
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__heading">
          {props.title}
        </h2>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;