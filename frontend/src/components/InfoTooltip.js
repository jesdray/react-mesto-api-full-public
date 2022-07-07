import React from "react";
import successImage from '../images/success.svg'
import failImage from '../images/fail.svg'

function InfoTooltip(props) {

  return (
    <div
      className={`popup popup__success ${props.isOpen && 'popup_opened'}`}
    >
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div
        className="popup__container popup__success"
      >
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <img src={props.success ? successImage : failImage} className='popup__success-image' alt='Картинка ответа'></img>
        <h2 className='popup__success-title'>{props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;