import express from "express";
import path from "path";
const app = express();
const port = 3080;
import fs from "fs";
import route from "./routes.json";
const userRouter = require('../Api/Routes/userRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../cernunstudio/build")));
app.use(route.users, userRouter);

// app.get(route.users, (req: any, res: { json: (arg0: any) => void }) => {
//   fs.readFile("./db.json", (_err, json) => {
//     let obj = JSON.parse(json.toString());
//     res.json(obj);
//   });
// });

// app.post(
//   "/Api/users",
//   (req: { body: { user: any } }, res: { json: (arg0: string) => void }) => {
//     const user = req.body.user;
//     console.log("Adding user:::::", user);
//     let data = user;
//     fs.readFile("./db.json", (err: any, json: string) => {
//       if (err) {
//         console.log(err);
//       } else {
//         let obj = {
//           users: [] as any
//         }
//       obj = JSON.parse(json);
//       obj.users.push(data)

//       data = JSON.stringify(obj);

//         fs.writeFile("./db.json", data, (err: any) => {
//           if (err) console.log(err);
//           else {
//             console.log("File written successfully\n");
//             users.push(user);
//             res.json("user added");
//           }
//         });
//       }
//     });
//   }
// );

app.use((err: any, req: any, res: any, next: any) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});


app.get("/", (req: any, res) => {
  res.json({'message': 'ok'});
});

app.listen(port, () => {
  console.log(`Server listen on the port::${port}`);
});
