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
import * as auth from "../utils/auth.js";

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

	useEffect(() => {
		if (loggedIn) {
			Promise.all([api.getUserInfo(), api.getInitialCards()])
				.then(([userData, cards]) => {
					setCurrentUser(userData);
					setCards(cards);
				})
				.catch(err => console.log(err));
		}
	}, [loggedIn]);

	function tokenCheck() {
		if (localStorage.getItem("jwt")) {
			const jwt = localStorage.getItem("jwt");
			auth
				.getContent(jwt)
				.then((res) => {
					setLoggedIn(true);
					setEmail(res.email);
				})
				.catch((err) => console.log(err));
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
					setEmail(email);
					return;
				}
			})
			.catch(
				() => setIsError(true)
			);
	}

	function handleRegister({ password, email }) {
		return auth
			.register({ password, email })
			.then(
				() => {
					setIsOk(true);
					history.push("/sign-in")
					return;
				}
			)
			.catch(
				() => setIsError(true)
			);
	}

	function handleSignOut() {
		localStorage.removeItem("jwt");
		history.push("/sign-in");
		setLoggedIn(false);
		setEmail('');
	}

	function handleError() {
		setIsError(false);
	}

	function handleSuccess() {
		setIsOk(false);
		history.push("/sign-in");
	}

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
		const isLiked = card.likes.some((i) => i === currentUser._id);
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
					/>
				</Route>

				<Route path="/sign-in">
					<Login onLogin={handleLogin} />
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
