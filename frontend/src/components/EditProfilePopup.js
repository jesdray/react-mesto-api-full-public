import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (currentUser !== undefined) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function setNewName(e) {
    setName(e.target.value);
  }

  function setNewDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  const markupPopupEditProfile = (
    <>
      <input
        type="text"
        id="name-edit"
        name="name"
        placeholder="Имя Фамилия"
        className="popup__input popup__input_script_name"
        value={name}
        minLength="2"
        maxLength="40"
        onChange={setNewName}
        required
      />
      <span id="name-edit-error" className="error"></span>
      <input
        type="text"
        id="job-edit"
        name="about"
        placeholder="Работа"
        className="popup__input popup__input_script_job"
        value={description}
        minLength="2"
        maxLength="200"
        onChange={setNewDescription}
        required
      />
      <span id="job-edit-error" className="error"></span>
      <button type="submit" className="popup__button">
        Сохранить
      </button>
    </>
  );

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="profile"
      title="Редактировать профиль"
      children={markupPopupEditProfile}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default EditProfilePopup;
