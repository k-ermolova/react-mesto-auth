import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js'
import { useEffect, useState } from 'react';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [isImagePopupOpen, setImagePopupOpen] = useState(false);

	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	useEffect(() => {
		api
			.getUserInfo()
			.then((userData) => {
				setCurrentUser(userData);
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		api
			.getInitialCards()
			.then(cards => setCards(cards))
			.catch(err => console.log(err));
	}, []);

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleCardClick(card) {
		setImagePopupOpen(true);
		setSelectedCard(card);
	}

	function handleUpdateUser(user) {
		api
			.updateUserInfo(user)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch(err => console.log(err));
	}

	function handleUpdateAvatar(user) {
		api
			.updateAvatar(user)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch(err => console.log(err));
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		if (!isLiked) {
			api
				.putLike(card._id, !isLiked)
				.then((newCard) => {
					setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
				})
				.catch(err => console.log(err));
		} else {
			api
				.deleteLike(card._id, !isLiked)
				.then((newCard) => {
					setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
				})
				.catch(err => console.log(err));
		}

	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(
				setCards(() => cards.filter(c => c._id !== card._id)))
			.catch(err => console.log(err));
	}

	function handleAddPlaceSubmit(card) {
		api
			.addNewCard(card)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch(err => console.log(err));
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setImagePopupOpen(false);
	}

	return (
		<div className="App">
			<CurrentUserContext.Provider value={currentUser}>
				<Header />
				<Main
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>
				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>

				<ConfirmationPopup />

				<ImagePopup card={selectedCard || false} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
