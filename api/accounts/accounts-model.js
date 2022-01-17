const db = require('../../data/db-config')

 const getAll = async () => {
  return db('accounts').select('id', 'name', 'budget')
}

const getById = async id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  const [newAccountId] = await db('accounts').insert(account)
  return getById(newAccountId)
}

const updateById = async (id, changes) => {
  await db('accounts').where('id', id).update(changes)
  return getById(id)
}

const deleteById = async id => {
  const toBeDeleted = await getById(id)
  await db('accounts').where('id', id).del()
  return toBeDeleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
