import React from "react";
import { Link } from 'react-router-dom';


function Register(props) {
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

        props.onRegister(password, email);
    }

    return (
        <form className='register'
            onSubmit={handleSubmit}>
            <h2 className='register__title' >Регистрация</h2>
            <input
                type='text'
                id='register-email'
                name='email'
                placeholder='Email'
                className='register__input'
                onChange={setNewEmail}
                value={email}
                required
            />
            <input
                type='password'
                id='register-password'
                name='password'
                placeholder='Пароль'
                className='register__input'
                onChange={setNewPassword}
                value={password}
                required
            />
            <button type='submit' className='register__button'>
                Зарегистрироваться
        </button>
            <Link className='register__link' to='/sign-in' onClick={props.switchLink}>
                Уже зарегистрированы? Войти
        </Link>
        </form>
    )
}

export default Register