/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('sampledb');
db.getCollection('users').insertOne({
  'name': "prabil", 'age': 26, 'place': "palakkad"
})
db.getCollection('users').insertMany([
  { 'name': 'jins', 'age': 28, 'place': 'kannur'},
  { 'name': 'praveena', 'age': 24, 'place': 'idukki'},
  { 'name': 'fuad', 'age': 25, 'place': 'palakakd'},
  { 'name': 'sangeeth', 'age': 22, 'place': 'patanamthitta'},
  { 'name': 'leelu', 'age': 23, 'place': 'ernakulam'}
])
db.getCollection('users').find({
  // '_id':ObjectId("64e45aa8eed3fb47f60d7752")
},
{
  'name': 1, 'age': 1, '_id': 0
})
// $gte,$gt,$lte,$lt,$eq,$ne
db.getCollection('users').find({
  'age':{$ne:24}
})
db.getCollection('users').find({
  $and:[
    {'age':{$gt:24}},
    {'age':{$lt:30}}
  ]
})
db.getCollection('users').find({
  $or:[
    {'age':{$eq:24}},
    {'age':{$eq:26}}
  ]
}).limit(2)

db.getCollection('users').find().limit(5)
db.getCollection('users').find().sort({'age':-1}).limit(1)

db.getCollection('users').find().sort({'age':-1}).skip(3).limit(2)
db.getCollection('users').updateOne({
  _id: ObjectId('64e45d65caac2445b3073f6e')
},
{$set:{'place': 'malappuram'}}
)
db.getCollection('users').updateMany({
  'place': 'palakkad'
},
{$set:{'place': 'kozhikode'}}
)
db.getCollection('users').updateMany({
  'age': {$gte:18}
},
{$set:{'status': 'adult'}}
)

db.getCollection('users').updateOne({
  'name': 'aiswarya'
},
{$set:{'age':22, 'place': 'thrissur'}},
{upsert:true}
)
db.getCollection('users').updateMany({

},
{$push:{'intrests': 'books'}}
)
db.getCollection('users').updateMany({
  'age': 23
},
{$push:{'intrests': 'games'}}
)

db.getCollection('users').find({
  'intrests': {$in:['games','books']}
})
db.getCollection('users').deleteOne({
  _id:ObjectId('64e45aa8eed3fb47f60d7752')
})
db.getCollection('users').deleteMany({
  'age': 23, 'place': 'idukki'
})
db.getCollection('users').find()

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
