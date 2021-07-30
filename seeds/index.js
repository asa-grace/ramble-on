const seedUsers = require('./user-seeds');
// const seedPosts = require('./post-seeds');
// const seedContent = require('./content-seeds');


const sequelize = require('../config/connection');

const seedDB = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  
  await seedUsers();
  console.log('--------------');

  // await seedPosts();
  // console.log('--------------');

  // await seedContent();
  // console.log('--------------');

  process.exit(0);
};

seedDB();