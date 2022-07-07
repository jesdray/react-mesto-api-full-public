import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick({ name: props.card.name, link: props.card.link });
  }

  function handleLikeClick() {
    props.onCardLike({ id: props.card._id, likes: props.card.likes });
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  
  const isOwn = props.card.owner === currentUser._id;

  const buttonTrash = `element__trash ${isOwn && "element__trash_active"}`;

  const buttonLike = `element__button-like ${isLiked && "element__button-like_active"}`;

  return (
    <article className="element">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
        onClick={handleClick}
      />
      <button
        type="button"
        className={buttonTrash}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__content">
        <h2 className="element__image-name">{props.card.name}</h2>
        <div className="element__like-box">
          <button
            type="button"
            className={buttonLike}
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__number-like">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
