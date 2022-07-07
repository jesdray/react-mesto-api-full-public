function PopupWithForm(props) {
  if (props.isOpen) {
    return (
        <div
          className={`popup popup_type_${props.name} ${
            props.isOpen && "popup_opened"
          }`}
        >
          <div className="popup__overlay" onClick={props.onClose}></div>
          <form
            name={props.name}
            method="get"
            className="popup__container popup__form"
            onSubmit={props.onSubmit}
            noValidate
          >
            <button
              type="button"
              className="popup__close"
              onClick={props.onClose}
            ></button>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
          </form>
        </div>
    );
  }
  return (
    <>
      <div className="popup"></div>
    </>
  );
}

export default PopupWithForm;
