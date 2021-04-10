import { Link } from 'react-router-dom';
import { useState } from "react";

function Register(props) {
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
    props.onRegister({ password, email });
  }


  return (
    <form className="form content__auth" onSubmit={handleSubmit}>
      <p className="form__title">Регистрация</p>
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
      <button className="form__button" type="submit">Зарегистрироваться</button>
      <p className="form__question">Уже зарегистрированы?&nbsp;
        <Link to="/sing-in" className="form__link">Войти</Link>
      </p>
    </form>
  );
}

export default Register;