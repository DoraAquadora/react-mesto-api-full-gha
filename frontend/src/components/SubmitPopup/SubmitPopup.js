import PopupWithForm from "../PopupWithForm/PopupWithForm"
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function SubmitPopup({ isOpen, onClose, onDeleteCard, isBtnLoading, card, onOverlay}) {
  const { isValid } =
  useFormAndValidation()

  function handleDeleteCard(e) {
    e.preventDefault()
    onDeleteCard(card)
  }

  return (
    <PopupWithForm
      id="popup-delete-form"
      title="Вы уверены?"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      type="form_delete"
      onSubmit={handleDeleteCard}
      isBtnLoading={isBtnLoading}
      submitBtn="Сохранение..." //по нажатию на Enter отправка именно этой формы не работает, только по клику на кнопку
      isValid={isValid}
      onOverlay={onOverlay}
      ></PopupWithForm>
  )
}

export default SubmitPopup
