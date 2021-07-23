const express = require("express");
const path = require("path");
const app = express(),
  bodyparser = require("body-parser");
const port = 3080;

const users: string[] = [];

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "../cernunstudio/build")));

app.get("/Api/users", (req: any, res: { json: (arg0: string[]) => void }) => {
  console.log("api/users called!");
  res.json(users);
});

app.post(
  "/Api/user",
  (req: { body: { user: any } }, res: { json: (arg0: string) => void }) => {
    const user = req.body.user;
    console.log("Adding user:::::", user);
    users.push(user);
    res.json("user added");
  }
);

app.get("/", (req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.join(__dirname, "../cernunstudio/public/index.html"));
});

app.listen(port, () => {
  console.log(`Server listen on the port::${port}`);
});
