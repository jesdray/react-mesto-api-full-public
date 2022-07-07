import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [nameCard, setNameCard] = React.useState("");
  const [urlCard, setUrlCard] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({ name: nameCard, link: urlCard });
    setNameCard("");
    setUrlCard("");
  }

  function setNewNameCard(e) {
    setNameCard(e.target.value);
  }

  function setNewUrlCard(e) {
    setUrlCard(e.target.value);
  }

  const markupPopupAddCard = (
    <>
      <input
        type="text"
        id="name-image"
        name="imageName"
        placeholder="Название"
        className="popup__input popup__input_script_image-name"
        value={nameCard}
        minLength="2"
        maxLength="30"
        onChange={setNewNameCard}
        required
      />
      <span id="name-image-error" className="error"></span>
      <input
        type="url"
        id="url-image"
        name="imageUrl"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_script_image-url"
        value={urlCard}
        onChange={setNewUrlCard}
        required
      />
      <span id="url-image-error" className="error"></span>
      <button type="submit" className="popup__button">
        Создать
      </button>
    </>
  );

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="new-card"
      title="Новое место"
      children={markupPopupAddCard}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default AddPlacePopup;
