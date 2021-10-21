import express, { Router } from "express";
import { gameController } from "../Controllers/gameController";
import { Game } from "../Models/gameModel";

export class gameRoute {
    router: Router;
    private gameC: gameController;
    
    constructor() {
      this.gameC = new gameController();
      this.router = express.Router();
      this.router.get("/", async (req, res, next) => {
        try {        
          res.send(await this.gameC.getAll());
        } catch (err: any) {
          console.error(`Error`, err.message);
          next(err);
        }
      });
      
      this.router.get(`/:id`, async (req, res, next) => {
        try {
          res.send(await this.gameC.getById(parseInt(req.params.id)));
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      });
      
      // this.router.get(`/userName/:userName`, async (req, res, next) => {
      //   try {
      //     res.send(await this.gameC.getAllByUser(req.params.userName));
      //   } catch (error: any) {
      //     console.error(`Error`, error.message);
      //     next(error);
      //   }
      // });
      
      this.router.post("/", async(req, res, next) => {
        try {
          let game = new Game(req.body)
          res.json(await this.gameC.create(game))
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      });
      
      this.router.patch('/:id', async (req, res, next) => {
        try {
          res.send(await this.gameC.updateById(parseInt(req.params.id), req.body))
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      })
    
      this.router.delete(`/:id`, async(req: { params: { id: string; }; }, res: { send: (arg0: unknown) => void; }, next: (arg0: any) => void) => {
        try {
          res.send(await this.gameC.deleteById(parseInt(req.params.id)))
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      })
    }
}