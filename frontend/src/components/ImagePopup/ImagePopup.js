function ImagePopup(props) {
  const { card, onClose } = props
  return (
    <div className={`popup popup_opacity_dark ${card ? "popup_opened" : ""} `} id="popup-figure">
      <figure className="popup__figure">
        <button
          type="button"
          aria-label="Кнопка закрытия карточки"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup__description">{card?.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup
