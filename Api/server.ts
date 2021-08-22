import express from "express";
import path from "path";
const app = express();
const port = 3080;
import route from "./routes.json";
import { userRoute } from "../Api/Routes/userRoute";
import { DBConnect } from "./Utils/DBConnect";
import { postRoute } from "./Routes/postRoute";

const dbConnect = DBConnect.getInstance();
const userRouter = new userRoute();
const postRouter = new postRoute();

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../cernunstudio/build")));

app.use(route.users, userRouter.router);
app.use(route.posts, postRouter.router);

dbConnect.initTable().catch((err) => {
  console.log(err);
});

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
