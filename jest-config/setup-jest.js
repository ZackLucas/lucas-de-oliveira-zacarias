// const matchers = require('jest-extended')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
mongoose.promise = global.Promise

let mongo = null

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri('test')

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

afterAll(async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongo.stop()
  }
})

beforeEach(async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
      await collection.deleteMany()
    }
  }
  jest.clearAllMocks()
})
