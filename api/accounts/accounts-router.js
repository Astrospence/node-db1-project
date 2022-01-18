const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.status(200).json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    res.status(200).json(account)
  } catch(err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const trimmed = {...req.body, name: req.body.name.trim()}
    const newPost = await Accounts.create(trimmed)
    res.status(201).json(newPost)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
   try {
    const trimmed = {...req.body, name: req.body.name.trim()}
    const updatedAccount = await Accounts.updateById(req.params.id, trimmed)
    res.status(200).json(updatedAccount)
   } catch(err) {
     next(err)
   }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deleted = await Accounts.deleteById(req.params.id)
    res.status(200).json(deleted)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
