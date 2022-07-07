import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function setNewEmail(e) {
    setEmail(e.target.value)
  }

  function setNewPassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin(password, email);
  }

  return (
    <form className='login'
      onSubmit={handleSubmit}>
      <h2 className='login__title' >Вход</h2>
      <input
        type='text'
        id='login-email'
        name='email'
        placeholder='Email'
        className='login__input'
        onChange={setNewEmail}
        value={email}
        required
      />
      <input
        type='password'
        id='login-password'
        name='password'
        placeholder='Пароль'
        className='login__input'
        onChange={setNewPassword}
        value={password}
        required
      />
      <button type='submit' className='login__button'>
        Войти
        </button>
    </form>
  )
}

export default Login