const express = require("express");
const app = express();

// The service port. In production, the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static("public"));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

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
let currentPlayerUsername = "DefaultPlayer";
let scores = {};
let lastEmojiClicked = "";

// Endpoint for user login
apiRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).send({ message: "Login successful" });
});

// Endpoint for user signup
apiRouter.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  res.status(200).send({ message: "Signup successful" });
});

// Endpoint to get lyrics data
apiRouter.get("/lyrics", (req, res) => {
  res.json(lyricsData);
});

// Endpoint to get current player username
apiRouter.get("/username", (req, res) => {
  res.send(currentPlayerUsername);
});

// Endpoint to get and set the last emoji clicked
apiRouter
  .route("/emoji")
  .get((req, res) => res.send(lastEmojiClicked))
  .post((req, res) => {
    lastEmojiClicked = req.body.emoji;
    res.status(200).send({ message: "Emoji updated" });
  });

// Endpoint to get and update scores
apiRouter
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
apiRouter.post("/reset", (req, res) => {
  const { username } = req.body;
  if (scores[username]) {
    scores[username].score = 0;
    scores[username].date = new Date().toLocaleString();
    res.status(200).send({ message: "Score reset to zero successfully." });
  } else {
    res.status(404).send({ message: "Username not found." });
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("login.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
