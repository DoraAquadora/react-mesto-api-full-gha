import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/api'
import { auth } from '../utils/auth'

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import ImagePopup from './ImagePopup/ImagePopup'
import EditProfilePopup from './EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup/AddPlacePopup'
import SubmitPopup from './SubmitPopup/SubmitPopup'
import Register from './Register/Register'
import Login from './Login/Login'
import InfoTooltip from './InfoTooltip/InfoTooltip'
import ProtectedRouteElement from './ProtectedRoute/ProtectedRoute'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardDel, setCardDel] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [cards, setCards] = useState([])
  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isBtnLoading, setIsBtnLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    handleTokenCheck()
  }, [])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            navigate('/', { replace: true })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return
    }
    auth
      .signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          setEmail(email)
          navigate('/', { replace: true })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleRegister = (email, password) => {
    auth
      .signUp(email, password)
      .then((res) => {
        setError(false)
        setIsTooltipPopupOpen(true)
        navigate('/sign-in', { replace: true })
      })
      .catch((error) => {
        setError(true)
        setIsTooltipPopupOpen(true)
        console.log(error)
      })
  }

  const handleSignOut = () => {
    setLoggedIn(false)
    setEmail(null)
    localStorage.removeItem('jwt')
    navigate('/sign-in')
  }

  useEffect(() => {
    loggedIn &&
      api
        .proceedFromServer()
        .then((res) => {
          const [initialCard, userData] = res
          setCurrentUser(userData)
          setCards(initialCard)
          setIsLoaded(true)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setIsBtnLoading(false)
        })
  }, [loggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true)
    setCardDel(card)
  }

  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleCardDelete(card) {
    setIsBtnLoading(true)
    // Отправляем запрос в API и удаляем карточку
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c))
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function handleUpdateUser(data) {
    setIsBtnLoading(true)
    api
      .changeUserObj(data)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function handleUpdateAvatar(data) {
    setIsBtnLoading(true)
    api
      .changeAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsBtnLoading(true)
    api
      .createCard(data)
      .then((card) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsBtnLoading(false)
      })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsTooltipPopupOpen(false)
    setSelectedCard(null)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__wrap">
          <div className="page__content">
            <Header
              email={email}
              handleSignOut={handleSignOut}
              loggedIn={loggedIn}
            />
            <Routes>
              <Route
                path="/sign-up"
                element={<Register onRegister={handleRegister} />}
              />
              <Route
                path="/sign-in"
                element={<Login onLogin={handleLogin} />}
              />
              <Route
                path="/"
                element={
                  <ProtectedRouteElement
                    element={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCardClick}
                    cards={cards}
                    isLoaded={isLoaded}
                  />
                }
              />
              <Route
                path="*"
                element={
                  loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
                }
              />
            </Routes>

            <Footer />
          </div>
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isBtnLoading={isBtnLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isBtnLoading={isBtnLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isBtnLoading={isBtnLoading}
        />
        <SubmitPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isBtnLoading={isBtnLoading}
          card={cardDel}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          error={error}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
