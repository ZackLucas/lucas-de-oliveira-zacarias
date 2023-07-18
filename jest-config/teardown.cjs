const mongoose = require('mongoose')

module.exports = async function () {
  await globalThis.__MONGOD__.stop()
  await mongoose.connection.close()
}
