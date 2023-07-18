import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid, setIsValid } =
    useFormAndValidation()

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(values.email, values.password)
  }

  useEffect(() => {
    setIsValid(false)
  }, [])

  return (
    <div className="auth">
      <p className="auth__welcome">Регистрация</p>
      <form
        onSubmit={handleSubmit}
        className="auth__form"
        noValidate
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="60"
          className="auth__input auth__input_type_email"
          id="email-input"
          value={values.email || ''}
          onChange={handleChange}
        />
        <div className="popup__field">
          <span
            className={`email-input-error popup__error popup__error-field ${
              isValid ? '' : 'popup__error_visible'
            }`}
          >
            {errors.email}
          </span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="5"
          maxLength="40"
          className="auth__input auth__input_type_password"
          id="password-input"
          value={values.password || ''}
          onChange={handleChange}
        />
        <div className="popup__field">
          <span
            className={`password-input-error popup__error popup__error-field ${
              isValid ? '' : 'popup__error_visible'
            }`}
          >
            {errors.password}
          </span>
        </div>
        <div className="auth__button-container">
          <button type="submit" className={`auth__link-button ${
              !isValid ? 'auth__link-button_disabled' : ''
            }`}
            disabled={!isValid}>
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="auth__signin">
        <p>
          Уже зарегистрированы?{' '}
          <Link to="sign-in" className="auth__login-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
