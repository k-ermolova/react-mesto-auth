const { Link } = require("react-router-dom");

function Login() {
  return (
    <form className="form content__auth">
      <p className="form__title">Вход</p>
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
      <button className="form__button" type="submit">Войти</button>
    </form>
  );
}

export default Login;