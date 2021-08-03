import express, { Router } from "express";
import { postController } from "../Controllers/postController";
import { Post } from "../Models/postModel";

export class postRoute {
    router: Router;
    private postC: postController;
    
    constructor() {
      this.postC = new postController();
      this.router = express.Router();
      this.router.get("/", async (req, res, next) => {
        try {        
          res.send(await this.postC.getAll());
        } catch (err: any) {
          console.error(`Error`, err.message);
          next(err);
        }
      });
      
      this.router.get(`/:id`, async (req, res, next) => {
        try {
          res.send(await this.postC.getById(parseInt(req.params.id)));
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      });
      
      this.router.get(`/userName/:userName`, async (req, res, next) => {
        try {
          res.send(await this.postC.getAllByUser(req.params.userName));
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      });
      
      this.router.post("/", async(req, res, next) => {
        try {
          let post = new Post(req.body)
          res.json(await this.postC.create(post))
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      });
      
      this.router.patch('/:id', async (req, res, next) => {
        try {
          res.send(await this.postC.updateById(parseInt(req.params.id), req.body))
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      })
    
      this.router.delete(`/:id`, async(req: { params: { id: string; }; }, res: { send: (arg0: unknown) => void; }, next: (arg0: any) => void) => {
        try {
          res.send(await this.postC.deleteById(parseInt(req.params.id)))
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      })
    }
}