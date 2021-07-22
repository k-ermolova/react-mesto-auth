import { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    const { password, email } = userData;
    e.preventDefault();
    props.onLogin({ password, email });
  }

  return (
    <form className="form content__auth" onSubmit={handleSubmit}>
      <p className="form__title">Вход</p>
      <fieldset className="form__field">
        <input
          type="email"
          className="input-text input-text_type_auth"
          placeholder="Email"
          name="email"
          required
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="input-text input-text_type_auth"
          placeholder="Пароль"
          name="password"
          required
          value={userData.password}
          onChange={handleChange}
        />
      </fieldset>
      <button className="form__button" type="submit">Войти</button>
      <p className="form__question">Первый раз здесь?&nbsp;
        <Link to="/sign-up" className="form__link">Зарегистрироваться</Link>
      </p>
    </form>
  );
}

export default Login;