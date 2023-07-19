import { useContext, useEffect } from 'react'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import PopupWithForm from '../PopupWithForm/PopupWithForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isBtnLoading, onOverlay}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setValues,
    resetForm,
  } = useFormAndValidation()

  const currentUser = useContext(CurrentUserContext)

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      setIsValid(true)
      setValues(currentUser)
    }
    if (!isOpen) {
      resetForm()
    }
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
    })
  }

  return (
    <PopupWithForm
      id="popup-edit-form"
      title="Редактировать профиль"
      type="form_name"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isBtnLoading={isBtnLoading}
      submitBtn="Сохранение..."
      isValid={isValid}
      onOverlay={onOverlay}
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_field_title"
        id="name-input"
        value={values.name || ''}
        onChange={handleChange}
      />
      <div className="popup__field">
        <span
          className={`name-input-error popup__error popup__error-field ${
            isValid ? '' : 'popup__error_visible'
          }`}
        >
          {errors.name}
        </span>
      </div>
      <input
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_field_text"
        id="about-input"
        value={values.about || ''}
        onChange={handleChange}
      />
      <div className="popup__field">
        <span
          className={`about-input-error popup__error popup__error-field ${
            isValid ? '' : 'popup__error_visible'
          }`}
        >
          {errors.about}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
