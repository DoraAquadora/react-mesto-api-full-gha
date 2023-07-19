import { useEffect } from 'react'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isBtnLoading, onOverlay }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  function handleAddPlace(e) {
    e.preventDefault()
    if (isValid) {
      onAddPlace({
        name: values.name,
        link: values.link,
      })
    }
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  return (
    <PopupWithForm
      id="popup-add-form"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlace}
      type="form_card"
      isBtnLoading={isBtnLoading}
      submitBtn="Сохранение..."
      isValid={isValid}
      onOverlay={onOverlay}
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_field_description"
        id="card-input"
        onChange={handleChange}
        value={values.name || ""}
      />
      <div className="popup__field">
      <span className={`url-input-error popup__error popup__error-field ${isValid ? "" : "popup__error_visible"}`}>{errors.name}</span>
      </div>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        className="popup__input popup__input_field_image"
        id="url-input"
        onChange={handleChange}
        value={values.link || ""}
      />
      <div className="popup__field">
        <span className={`url-input-error popup__error popup__error-field ${isValid ? "" : "popup__error_visible"}`}>{errors.link}</span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
