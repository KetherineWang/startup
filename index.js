const DB = require("./database.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const authCookieName = "token";

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static("public"));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set("trust proxy", true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post("/auth/login", async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth token if stored in cookie
apiRouter.delete("/auth/logout", (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get("/user/:email", async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: "Unknown" });
});

// GetUser returns information about a user
apiRouter.get("/user/:email", async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: "Unknown" });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

const lyricsData = [
  {
    isAnswered: false,
    lyric:
      "You never had a clue\nAll the days that I spent loving you\nWho am I supposed to give 'em to?",
    options: ["ANGEL", "GABRIEL", "LIMBO", "UNDERSTAND"],
    answer: "ANGEL",
    soundCloud:
      '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234379731&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
  },
  {
    isAnswered: false,
    lyric:
      "'Cause you never know until you do\nIf I had to guess, I think it's you\nSo if I fake it\nWould it be true?",
    options: ["bandaids", "drunk", "blue", "us"],
    answer: "us",
    soundCloud:
      '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/911450407&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
  },
  {
    isAnswered: false,
    lyric:
      "Impatient, just say it\nStill waitin', for another round\nNew faces, I'm racin'\nI'm fine but I'll never make it home",
    options: ["beside you", "drunk", "blue", "talk"],
    answer: "blue",
    soundCloud:
      '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/725573965&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
  },
  {
    isAnswered: false,
    lyric:
      "Never thought that I'd find\nThat the one in my life would be so near\nAnd now you're here",
    options: ["right here", "UNDERSTAND", "always", "us"],
    answer: "UNDERSTAND",
    soundCloud:
      '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234378480&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
  },
  {
    isAnswered: false,
    lyric:
      "I think some words are overdue\nCould we just do it over?\nCan we just talk it out like friends\nBecause I need your shoulder",
    options: ["right here", "beside you", "B.Y.S.", "talk"],
    answer: "right here",
    soundCloud:
      '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/682184639&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
  },
];

let currentPlayerUsername = "Default Player";
let scores = {};
let lastEmojiClicked = "";

// Endpoint to get lyrics data
secureApiRouter.get("/lyrics", (req, res) => {
  res.json(lyricsData);
});

// Endpoint to get and set the last emoji clicked
secureApiRouter
  .route("/emoji")
  .get((req, res) => res.send(lastEmojiClicked))
  .post((req, res) => {
    lastEmojiClicked = req.body.emoji;
    res.status(200).send({ message: "Emoji updated" });
  });

// Endpoint to get and update scores
secureApiRouter
  .route("/scores")
  .get((req, res) => res.json(scores))
  .post((req, res) => {
    const { username, score } = req.body;
    if (!scores[username]) {
      scores[username] = { score: 0, date: new Date().toLocaleString() };
    }
    if (score) {
      scores[username].score += score;
      scores[username].date = new Date().toLocaleString();
    }
    res.status(200).send({ message: "Score updated" });
  });

// Endpoint to rest scores to zero
secureApiRouter.post("/reset", (req, res) => {
  const { username } = req.body;
  if (scores[username]) {
    scores[username].score = 0;
    scores[username].date = new Date().toLocaleString();
    res.status(200).send({ message: "Score reset to zero successfully." });
  } else {
    res.status(404).send({ message: "Username not found." });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("login.html", { root: "public" });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
