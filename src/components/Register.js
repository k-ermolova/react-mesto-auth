const { Link } = require("react-router-dom");

function Register() {
  return (
    <form className="form content__auth">
      <p className="form__title">Регистрация</p>
      <fieldset className="form__field">
        <input
          type="email"
          className="input-text input-text_type_auth"
          placeholder="Email"
          name="e-mail"
          required
          value={''}
        />
        <input
          type="password"
          className="input-text input-text_type_auth"
          placeholder="Пароль"
          name="password"
          required
          value={''}
        />
      </fieldset>
      <button className="form__button" type="submit">Зарегистрироваться</button>
      <p className="form__question">Уже зарегистрированы?&nbsp;
        <Link to="/sing-in" className="form__link">Войти</Link>
      </p>
    </form>
  );
}

export default Register;