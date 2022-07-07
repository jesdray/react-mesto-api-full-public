function ImagePopup(props) {
    if (props.card !== null) {
      return (
        <>
          <div className={`popup popup_type_open-image popup_opened`}>
            <div
              className="popup__overlay popup__overlay_script_open-image"
              onClick={props.onClose}
            ></div>
            <div className="popup__image-container">
              <img
                src={props.card.link}
                alt={props.card.name}
                className="popup__image"
              />
              <button
                type="button"
                className="popup__close popup__image-close popup__close_script_open-image"
                onClick={props.onClose}
              ></button>
              <h2 className="popup__image-name">{props.card.name}</h2>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="popup"></div>
        </>
      );
    }
  }
  
  export default ImagePopup;
  