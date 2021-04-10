import okMark from "../images/ok.svg";
import errorMark from "../images/error.svg"

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <form className="popup__container popup__container_auth" name="tip" noValidate>
        <button
          className="popup__close-button popup__close-button_position_diagonally"
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        ></button>
        <img className="popup__mark" src={props.ok ? (okMark) : (errorMark)} alt={props.message} />
        <p className="popup__message">
          {props.message}
        </p>
      </form>
    </div>
  );
}

export default InfoTooltip;