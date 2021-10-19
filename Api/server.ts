import express from "express";
import path from "path";
import route from "./routes.json";
import { userRoute } from "../Api/Routes/userRoute";
import { DBConnect } from "./Utils/DBConnect";
import { postRoute } from "./Routes/postRoute";
import { gameRoute } from "./Routes/gameRoute";
import { picturesRoute } from "./Routes/pictureRoute";

const app = express();
const port = 3080;

const dbConnect = DBConnect.getInstance();
const userRouter = new userRoute();
const postRouter = new postRoute();
const gameRouter = new gameRoute();
const pictureRouter = new picturesRoute();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://89.89.222.132:4200');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
  });

app.use(express.static(path.join(__dirname, "../cernunstudio/build")));
app.use(express.static(path.join(__dirname, "/Assets/")))

app.use(route.users, userRouter.router);
app.use(route.posts, postRouter.router);
app.use(route.games, gameRouter.router);
app.use(route.picture, pictureRouter.router);

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
