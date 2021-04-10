import { Link, Route, Switch } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";

function Header(props) {
	function setPageView() {
		return (
		<Switch>
			<Route exact path="/">
				<div className="header__navbar">
					<span className="header__email">{props.email}</span>
					<Link
						to="/sign-in"
						className="header__link"
						onClick={props.onSignOut}
					>
						Выйти
					</Link>
				</div>
			</Route>
			<Route path="/sign-up">
				<Link to="/sign-in" className="header__link">
					Войти
				</Link>
			</Route>
			<Route path="/sign-in">
				<Link to="/sign-up" className="header__link">
					Регистрация
				</Link>
			</Route>
		</Switch>
		);
	}

	return (
		<header className="header page__header">
			<img className="header__logo" src={headerLogo} alt="Место Россия" />
			{setPageView()}
		</header>
	);
}

export default Header;
