import React from "react";
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { loggedInContext } from '../contexts/loggedInContext'

function Header(props) {
    const loggedIn = React.useContext(loggedInContext);

    if (loggedIn) {
        return (
            <header className="header">
                <img src={logo} alt="Место.Россия" className="header__logo" />
                <div className='header__box'>
                    <p className='header__email'>{props.userEmail}</p>
                    <Link className='header__link' to='/sign-in' onClick={props.onSignOut}>Выйти</Link>
                </div>
            </header>
        )
    } else {
        if (props.login) {
            return (
                <header className="header">
                    <img src={logo} alt="Место.Россия" className="header__logo" />
                    <Link className='header__link' to='/sign-up' onClick={props.switchLink}>Регистрация</Link>
                </header>
            )
        }
        return (
            <header className="header">
                <img src={logo} alt="Место.Россия" className="header__logo" />
                <Link className='header__link' to='/sign-in' onClick={props.switchLink}>Войти</Link>
            </header>
        )
    }
}

export default Header