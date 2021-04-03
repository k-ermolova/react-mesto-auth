import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main(props) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile content__profile">
				<div className="profile__container">
					<div className="profile__avatar-area" onClick={props.onEditAvatar}>
						<img
							className="profile__avatar"
							src={currentUser.avatar}
							alt="Фотография профиля."
						/>
					</div>
					<div className="profile__info">
						<h1 className="profile__title">{currentUser.name}</h1>
						<p className="profile__subtitle">{currentUser.about}</p>
						<button
							className="profile__edit-button"
							type="button"
							aria-label="Редактировать профиль"
							onClick={props.onEditProfile}
						></button>
					</div>
				</div>
				<button
					type="button"
					className="profile__add-button"
					aria-label="Добавить публикацию"
					onClick={props.onAddPlace}
				></button>
			</section>
			<section className="places content__places">
				<ul className="places__list">
					{props.cards.map(card => (<Card
						key={card._id}
						card={card}
						onCardClick={props.onCardClick}
						onCardLike={props.onCardLike}
						onCardDelete={props.onCardDelete} />)
					)}
				</ul>
			</section>
		</main>
	);
}

export default Main;