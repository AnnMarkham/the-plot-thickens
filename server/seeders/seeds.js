const faker = require('faker');

const db = require('../config/connection');
const { Story, User } = require('../models');

db.once('open', async () => {
  await Story.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

 
  // create storiess
  let createdStories = [];
  for (let i = 0; i < 100; i += 1) {
    const storyText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdStory = await Story.create({ storyText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { storiess: createdStory._id } }
    );

    createdStories.push(createdStory);
  }

  // create notes
  for (let i = 0; i < 100; i += 1) {
    const noteBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomStoryIndex = Math.floor(Math.random() * createdStories.length);
    const { _id: storyId } = createdStories[randomStoryIndex];

    await Story.updateOne(
      { _id: storyId },
      { $push: { notes: { noteBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
