const express = require("express");
const app = express();

app.use(express.json());

app.post("/auth/create", async (req, res) => {
  if (await getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    res.send({
      id: user._id,
    });
  }
});

app.post("/auth/login", async (req, res) => {
  res.send({ id: "user@id.com" });
});

const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
