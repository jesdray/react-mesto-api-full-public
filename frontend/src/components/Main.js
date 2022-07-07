import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  if (currentUser !== undefined) {
    return (
        <main className="main">
          <section className="profile">
            <div className="profile__avatar-box">
              <div
                className="profile__avatar-overlay"
                onClick={props.onEditAvatar}
              >
                <button
                  type="button"
                  className="profile__avatar-button"
                ></button>
              </div>
              <img
                src={currentUser.avatar}
                alt="Ваш аватар"
                className="profile__avatar"
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
              <button
                type="button"
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <button
              type="button"
              className="profile__add-button"
              aria-label="Добавить изображение"
              onClick={props.onAddPlace}
            ></button>
          </section>
          <section className="elements">
            {props.cards !== undefined &&
              props.cards.map((item) => (
                <Card
                  key={item._id}
                  card = {item}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              ))}
          </section>
        </main>
    );
  } else {
    return (
      <>
        <div></div>
      </>
    );
  }
}

export default Main;
