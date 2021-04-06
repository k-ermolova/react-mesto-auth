import okMark from "../images/ok.svg";
import errorMark from "../images/error.svg"

function InfoToolTip(props) {
  return (
    <div className={`popup ${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form className="popup__container popup__container_auth" name={`${props.name}`} noValidate>
        <button
          className="popup__close-button popup__close-button_position_diagonally"
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <img className="popup__mark" src={errorMark} />
        <p className="popup__message">
          Что-то пошло не так! Попробуйте ещё раз.
        </p>
      </form>
    </div>
  );
}

export default InfoToolTip;