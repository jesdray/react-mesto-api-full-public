import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar,
    });
  }

  function setNewAvatar(e) {
    setAvatar(e.target.value);
  }

  const markupPopupEditAvatar = (
    <>
      <input
        type="url"
        id="edit-avatar"
        name="about"
        placeholder="Ссылка на новый аватар"
        className="popup__input popup__input_script_edit-avatar"
        value={avatar}
        onChange={setNewAvatar}
        required
      />
      <span id="edit-avatar-error" className="error"></span>
      <button type="submit" className="popup__button">
        Сохранить
      </button>
    </>
  );

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="avatar"
      title="Обновить аватар"
      children={markupPopupEditAvatar}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;
