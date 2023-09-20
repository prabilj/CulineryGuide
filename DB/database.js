const mongoose =require ("mongoose")

const mongoDbUri = "mongodb+srv://prabil:Prabil9154@cluster0.waqg6jm.mongodb.net/receipeapp"

mongoose.connect(mongoDbUri, {
    useNewUrlParser: true,
    useunifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDb connection error:'))
db.once('open', () => {
    console.log('Connected to MangoDB')
})