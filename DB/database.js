const mongoose =require ("mongoose")
const dotenv= require('dotenv') 
dotenv.config();
const username=process.env.db_userName
const password=process.env.db_Password

const mongoDbUri = `mongodb+srv://${username}:${password}@cluster0.waqg6jm.mongodb.net/receipeapp`

mongoose.connect(mongoDbUri, {
    useNewUrlParser: true,
    useunifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDb connection error:'))
db.once('open', () => {
    console.log('Connected to MangoDB')
})