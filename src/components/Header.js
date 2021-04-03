import headerLogo from '../images/header__logo.svg';

function Header() {
	return (
		<header className="header page__header">
			<img
				className="header__logo"
				src={headerLogo}
				alt="Место Россия"
			/>
		</header>
	);
}

export default Header;