import logoPath from '../../images/logo.svg'
import { Link, Route, Routes } from 'react-router-dom'

function Header({ email, handleSignOut, loggedIn }) {
  return (
    <header className="header">
      <Link className="header__link" to={loggedIn ? '/' : '/sign-in'}>
        <img
          src={logoPath}
          alt="MESTO Russia - социальная сеть Руси"
          className="header__logo"
        />
      </Link>
      <div className="header__container">
        {email && (
          <a className="header__email" href={`mailto:${email && email}`}>
            {email}
          </a>
        )}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__auth" to="/sign-in">
                Войти
              </Link>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <Link className="header__auth" to="/sign-up">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Link
                className="header__auth"
                onClick={handleSignOut}
                to="/sign-in"
              >
                Выйти
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  )
}

export default Header
