import successPic from '../../images/success.svg'
import failPic from '../../images/fail.svg'

function InfoTooltip({ isOpen, onClose, error, onOverlay }) {
  return (
    <div className={`popup popup_opacity_medium ${isOpen && 'popup_opened'} `} onMouseDown={onOverlay}>
      <div className="popup__figure">
        <button
          type="button"
          aria-label="Кнопка закрытия карточки"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <div className="popup__container">
          <img
            className="popup__pic"
            src={error ? failPic : successPic}
            alt="Статус регистрации"
          />
          <p className="popup__state">
            {error
              ? 'Что-то пошло не так! Попробуйте ещё раз.'
              : 'Вы успешно зарегистрировались!'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip
