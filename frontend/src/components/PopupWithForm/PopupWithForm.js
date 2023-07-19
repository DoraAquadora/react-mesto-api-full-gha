function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_opacity_medium ${
        props.isOpen ? 'popup_opened' : ''
      }`}
      id={props.id}
      onMouseDown={props.onOverlay}
    >
      <div className="popup__figure">
        <button
          type="button"
          aria-label="Кнопка закрытия формы"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form
            id={`form_${props.type}`}
            name={props.type}
            className="popup__form"
            noValidate
            onSubmit={props.onSubmit}
          >
            <fieldset className="popup__field-info">
              <div>{props.children}</div>
            </fieldset>
            <button
              type="submit"
              className={`popup__submit-button ${
                !props.isValid ? 'popup__submit-button_disabled' : ''
              }`}
              disabled={!props.isValid}
            >
              {props.isBtnLoading
                ? props.submitBtn
                : props.button || 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopupWithForm
