function ImagePopup(props) {
	return (
		<div className={`popup figure-popup ${props.isOpen && 'popup_opened'}`}>
			<figure className="popup__figure">
				<button
					className="popup__close-button popup__close-button_position_diagonally"
					type="button"
					aria-label="Закрыть форму"
					onClick={props.onClose}
				></button>
				<img
					src={props.card.link}
					alt={props.card.name}
					className="popup__image"
				/>
				<figcaption className="popup__description">{props.card.name}</figcaption>
			</figure>
		</div>
	)
}

export default ImagePopup;