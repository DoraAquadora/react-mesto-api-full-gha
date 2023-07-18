import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some((i) => i._id === currentUser._id)
  const cardLikeButtonClassName = `elements__button ${
    isLiked && 'elements__button_active'
  }`

  function handleClick() {
    onCardClick(card)
  }
  
  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="elements__item">
      {isOwn && (
        <button
          type="button"
          aria-label="Кнопка удаления карточки"
          className='elements__delete-button'
          onClick={handleDeleteClick}
        ></button>
      )}
      <button className="elements__image-button" onClick={handleClick}>
        <img className="elements__image" src={card.link} alt={card.name} />
      </button>
      <div className="elements__description">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__button-container">
          <button
            type="button"
            aria-label="Кнопка лайк карточки"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="elements__count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card
