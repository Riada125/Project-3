const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thekitchen'


const secret = 'Santa\'s is real. Jaffa cakes are the best in the world'
module.exports = {
  port,
  dbURI,
  secret
}

