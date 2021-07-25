const express = require("express");
const path = require("path");
const app = express(),
  bodyparser = require("body-parser");
const port = 3080;
const fs = require("fs");

const users: string[] = [];

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "../cernunstudio/build")));

app.get("/Api/users", (req: any, res: { json: (arg0: any) => void }) => {
  fs.readFile("./db.json", (err: any, json: string) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

app.post(
  "/Api/users",
  (req: { body: { user: any } }, res: { json: (arg0: string) => void }) => {
    const user = req.body.user;
    console.log("Adding user:::::", user);
    let data = user;
    fs.readFile("./db.json", (err: any, json: string) => {
      if (err) {
        console.log(err);
      } else {
        let obj = {
          users: [] as any
        }
      obj = JSON.parse(json);
      obj.users.push(data)

      data = JSON.stringify(obj);

        fs.writeFile("./db.json", data, (err: any) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully\n");
            users.push(user);
            res.json("user added");
          }
        });
      }
    });
  }
);

app.get("/", (req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.join(__dirname, "../cernunstudio/public/index.html"));
});

app.listen(port, () => {
  console.log(`Server listen on the port::${port}`);
});
