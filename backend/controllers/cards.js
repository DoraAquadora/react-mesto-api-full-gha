/* экспортируем модель со схемой в контроллер */
const Card = require('../models/card');
const myError = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id, // используем req.user
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new myError.BadRequestError(myError.BadRequestMsg));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => new myError.NotFoundError(myError.NotFoundMsg))
    .then((card) => {
      const owner = card.owner.toString();
      if (req.user._id === owner) {
        Card.deleteOne(card)
          .then(() => {
            res.status(200).send(card);
          })
          .catch(next);
      } else {
        next(new myError.NotFoundError(myError.NotFoundMsg));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new myError.BadRequestError(myError.BadRequestMsg));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: _id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => new myError.NotFoundError(myError.NotFoundMsg))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: _id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => new myError.NotFoundError(myError.NotFoundMsg))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
