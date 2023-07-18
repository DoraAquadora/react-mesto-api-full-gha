import { useEffect } from 'react'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isBtnLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault()
    if (isValid) {
      onUpdateAvatar({
        avatar: values.avatar,
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
      id="popup-avatar-form"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isBtnLoading={isBtnLoading}
      type="form_avatar"
      submitBtn="Сохранение..."
      isValid={isValid}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        className="popup__input popup__input_field_description"
        id="avatar-input"
        onChange={handleChange}
        value={values.avatar || ''}
      />
      <div className="popup__field">
        <span
          className={`avatar-input-error popup__error popup__error-field ${
            isValid ? '' : 'popup__error_visible'
          }`}
        >
          {errors.avatar}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
