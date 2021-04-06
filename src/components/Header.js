import { Link } from 'react-router-dom';
import headerLogo from '../images/header__logo.svg';

function Header() {
	return (
		<header className="header page__header">
			<img
				className="header__logo"
				src={headerLogo}
				alt="Место Россия"
			/>
			<Link to='/sing-in' className="header__link">Войти</Link>
		</header>
	);
}

export default Header;