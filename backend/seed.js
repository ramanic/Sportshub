/* mySeedScript.js */

// require the necessary libraries
const { faker } = require('@faker-js/faker');
// or, if using CommonJS
// const { faker } = require('@faker-js/faker');

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

const MongoClient = require('mongodb').MongoClient;

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  let venueId = '';
  let ownerId = '';
  // Connection URL
  const uri =
    'mongodb+srv://rootUser:8u2BL4$fX.g6sDD@mongodb.gdzeu.mongodb.net/?retryWrites=true&w=major';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('test').collection('venuebookings');

    // collection.drop();

    // make a bunch of time series data
    let bookingdata = [];

    for (let i = 0; i < 5000; i++) {
      let newDay = {
        buyer: ownerId,
        venue: venueId,

        date: faker.date.between(
          '2020-01-01T00:00:00.000Z',
          '2022-07-01T00:00:00.000Z'
        ),
        startTime: '10:00',
        endTime: '6:00',
        name: 'Bill Gates',
        email: 'bill',
        totalCost: '160',
      };

      bookingdata.push(newDay);
    }
    collection.insertMany(bookingdata);

    console.log('Database seeded! :)');
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
