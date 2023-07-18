const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

module.exports = async function (_globalConfig, _projectConfig) {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  const mongod = await MongoMemoryServer.create()
  await mongoose.connect(`${mongod.getUri()}test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Set reference to mongod in order to close the server during teardown.
  globalThis.__MONGOD__ = mongod
}
