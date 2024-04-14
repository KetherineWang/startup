const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const userCollection = db.collection("user");
const scoreCollection = db.collection("score");

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });

  console.log(`Successfully connected to the database with ${url}`);
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);

  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };

  await userCollection.insertOne(user);

  return user;
}

async function updateScore(username, score) {
  try {
    const existingUser = await scoreCollection.findOne({ username: username });

    const scoreToSet = existingUser ? score : 1;

    const updatedScore = await scoreCollection.updateOne(
      { username: username },
      { $set: { score: scoreToSet, date: new Date().toLocaleString() } },
      { upsert: true }
    );

    if (updatedScore.upsertedCount > 0) {
      console.log("User did not exist, so a new score entry was created.");
    } else if (updatedScore.modifiedCount > 0) {
      console.log("User existed and their score was updated.");
    } else {
      console.log("No changes were made to the database.");
    }
  } catch (error) {
    console.error("Error updating score:", error);
  }
}

async function getCurrentUserScore(username) {
  try {
    const userScore = await scoreCollection.findOne({ username: username });
    if (userScore) {
      console.log("User score found:", userScore);

      return userScore;
    } else {
      console.log("User score not found for username:", username);

      return null;
    }
  } catch (error) {
    console.error("Error fetching user score:", error);

    throw error;
  }
}

function getHighestScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };

  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateScore,
  getCurrentUserScore,
  getHighestScores,
};
