import { Link, useHistory, useLocation } from 'react-router-dom';
import headerLogo from '../images/header__logo.svg';

function Header(props) {
	const history = useHistory();
	const location = useLocation();

	function signOut() {
		localStorage.removeItem('jwt');
		history.push('/sign-in');
	}

	function setPageView(location) {
		if (location.pathname === "/") {
			return (
				props.loggedIn && (<div className="header__navbar">
					<span className="header__email">{props.userData}</span>
					<Link to="/sign-in" className="header__link" onClick={signOut}>Выйти</Link>
				</div>)
			)
		} else if (location.pathname === "/sign-in") {
			return (
				<Link to="/sign-up" className="header__link">Регистрация</Link>
			)
		} else if (location.pathname === "/sign-up") {
			return (
				<Link to="/sign-in" className="header__link">Войти</Link>
			)
		}
	}

	return (
		<header className="header page__header">
			<img
				className="header__logo"
				src={headerLogo}
				alt="Место Россия"
			/>
			{setPageView(location)}
		</header>
	);
}

export default Header;