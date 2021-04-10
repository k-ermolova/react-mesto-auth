import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "./Auth.js";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [isImagePopupOpen, setImagePopupOpen] = useState(false);

	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	const [loggedIn, setLoggedIn] = useState(false);
	const history = useHistory();
	const [isError, setIsError] = useState(false);
	const [isOk, setIsOk] = useState(false);
	const [email, setEmail] = useState([]);

	function tokenCheck() {
		if (localStorage.getItem("jwt")) {
			let jwt = localStorage.getItem("jwt");
			auth.getContent(jwt).then(() => {
				setLoggedIn(true);
			});
		}
	}

	useEffect(() => {
		tokenCheck();
	}, []);

	useEffect(() => {
		if (loggedIn) {
			history.push("/");
		}
	}, [loggedIn, history]);

	function handleLogin({ email, password }) {
		return auth
			.authorize(email, password)
			.then((data) => {
				if (data.token) {
					setLoggedIn(true);
					localStorage.setItem("jwt", data.token);
					history.push("/");
					return;
				}
			})
			.then(() => {
				history.push("/");
				setEmail(email);
			});
	}

	function handleRegister({ password, email }) {
		return auth
			.register({ password, email })
			.then((res) => {
				return res;
			})
			.catch();
	}

	function handleSignOut() {
		localStorage.removeItem("jwt");
		history.push("/sign-in");
	}

	function handleError() {
		setIsError(false);
	}

	function handleSuccess() {
		setIsOk(false);
		history.push("/sign-in");
	}

	useEffect(() => {
		api
			.getUserInfo()
			.then((userData) => {
				setCurrentUser(userData);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		api
			.getInitialCards()
			.then((cards) => setCards(cards))
			.catch((err) => console.log(err));
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
			.catch((err) => console.log(err));
	}

	function handleUpdateAvatar(user) {
		api
			.updateAvatar(user)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);
		if (!isLiked) {
			api
				.putLike(card._id, !isLiked)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
				})
				.catch((err) => console.log(err));
		} else {
			api
				.deleteLike(card._id, !isLiked)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
				})
				.catch((err) => console.log(err));
		}
	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(setCards(() => cards.filter((c) => c._id !== card._id)))
			.catch((err) => console.log(err));
	}

	function handleAddPlaceSubmit(card) {
		api
			.addNewCard(card)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setImagePopupOpen(false);
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
			<Switch>
				<Route path="/sign-up">
					<Register
						onRegister={handleRegister}
						onError={setIsError}
						onSuccess={setIsOk}
					/>
				</Route>

				<Route path="/sign-in">
					<Login onLogin={handleLogin} onError={setIsError} />
				</Route>

				<ProtectedRoute
					exact
					path="/"
					loggedIn={loggedIn}
					component={Main}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>

				<Route>
					{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
				</Route>
			</Switch>

			<InfoTooltip
				ok={false}
				isOpen={isError}
				onClose={handleError}
				message="Что-то пошло не так! Попробуйте ещё раз."
			/>
			<InfoTooltip
				ok={true}
				isOpen={isOk}
				onClose={handleSuccess}
				message="Вы успешно зарегистрировались!"
			/>

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

			<ImagePopup
				card={selectedCard || false}
				isOpen={isImagePopupOpen}
				onClose={closeAllPopups}
			/>

			<Footer />
		</CurrentUserContext.Provider>
	);
}

export default App;
