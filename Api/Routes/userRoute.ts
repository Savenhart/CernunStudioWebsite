import express, { Router } from "express";
import { userController } from "../Controllers/userController";
import { User } from "../Models/userModels";
export class userRoute{
  router: Router;
  private userC: userController;
  
  constructor() {
    this.userC = new userController();
    this.router = express.Router();
    this.router.get("/", async (req, res, next) => {
      try {
        res.send(await this.userC.getAll());
      } catch (err: any) {
        console.error(`Error`, err.message);
        next(err);
      }
    });
    
    this.router.get(`/:id`, async (req, res, next) => {
      try {
        res.send(await this.userC.getById(parseInt(req.params.id)));
      } catch (error: any) {
        console.error(`Error`, error.message);
        next(error);
      }
    });
    
    this.router.get(`/userName/:userName`, async (req, res, next) => {
      try {
        res.send(await this.userC.getByUserName(req.params.userName));
      } catch (error: any) {
        console.error(`Error`, error.message);
        next(error);
      }
    });
    
    this.router.post("/", async(req, res, next) => {
      try {
        let user = new User(req.body)
        res.json(await this.userC.create(user))
      } catch (error: any) {
        console.error(`Error`, error.message);
        next(error);
      }
    });
    
    this.router.put('/:id', async (req, res, next) => {
      try {
        res.send(await this.userC.updateById(parseInt(req.params.id), req.body))
      } catch (error: any) {
        console.error(`Error`, error.message);
        next(error);
      }
    })
    
    this.router.delete(`/:id`), async(req: { params: { id: string; }; }, res: { send: (arg0: unknown) => void; }, next: (arg0: any) => void) => {
      try {
        res.send(await this.userC.deleteById(parseInt(req.params.id)))
      } catch (error: any) {
        console.error(`Error`, error.message);
        next(error);
      }
    }
  }
}

//module.exports = userRoute;
