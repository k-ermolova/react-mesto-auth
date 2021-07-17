import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `place__delete-button ${isOwn ? 'place__delete-button_visible' : 'place__delete-button_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `place__like-button ${isLiked ? 'place__like-button_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={handleCardDelete}
      ></button>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="place__image"
        onClick={handleClick}
      />
      <div className="place__description">
        <h3 className="place__title">{props.card.name}</h3>
        <div className="place__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Понравилось"
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;