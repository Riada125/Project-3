// const port = 4000
// const dbURIPrefix = 'mongodb://localhost/'
// const dbName = 'just-eat'
// const dbURI = `${dbURIPrefix}${dbName}`
const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thekitchen'


// our secret used for encoing our JWT tokens, used in '/controllers/user' and '/lib/secureRoute'
const secret = 'Santa\'s is real. Jaffa cakes are the best in the world'
module.exports = {
  port,
  dbURI,
  secret
}

