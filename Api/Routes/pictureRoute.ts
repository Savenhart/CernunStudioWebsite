import express, { Router } from "express";
import { picturesController } from "../Controllers/picturesController";
import { Image } from "../Models/imageModel";
import fs from "fs";
import multer from "multer";
import path from "path";
import route from "../routes.json";

export class picturesRoute {
  router: Router;
  private picturesC: picturesController;
  DIR = "./Assets/Pictures";

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, this.DIR);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now + path.extname(file.originalname)
      );
    },
  });

  upload = multer({ storage: this.storage });

  constructor() {
    this.picturesC = new picturesController();
    this.router = express.Router();
    this.router.get("/", async (req, res, next) => {
      try {
        res.send(await this.picturesC.getAll());
      } catch (err: any) {
        console.error(`Error`, err.message);
        next(err);
      }
    });

    this.router.get(`/:id`, async (req, res, next) => {
      try {
        res.send(await this.picturesC.getById(parseInt(req.params.id)));
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

    this.router.post(
      "/",
      this.upload.single("image"),
      async (req, res, next) => {
        try {
          let test = req.body["fileSource"][0];
          let dir = "Assets/Pictures/" + req.body["file"].split("C:\\fakepath\\").pop();
          let picturelink =
             route["serverAddress"] + "Pictures/" + req.body["file"].split("C:\\fakepath\\").pop();
          let image = new Image({ name: req.body['name'], link: picturelink, gameId: req.body['gameID']});
          let base64Image = test.split(";base64").pop();
          console.log(image.gameId);
          
          fs.writeFile(
            dir,
            base64Image,
            { encoding: "base64" },
            async (err) => {
              console.log("FileCreated");
              res.json(await this.picturesC.create(image));
            }
          );
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      }
    );

    this.router.patch("/:id", async (req, res, next) => {
      try {
        //res.send(await this.picturesC.updateById(parseInt(req.params.id), req.body))
      } catch (error: any) {
        console.error(`Error`, error.message);
        next(error);
      }
    });

    this.router.delete(
      `/:id`,
      async (
        req: { params: { id: string } },
        res: { send: (arg0: unknown) => void },
        next: (arg0: any) => void
      ) => {
        try {
          //res.send(await this.picturesC.deleteById(parseInt(req.params.id)))
        } catch (error: any) {
          console.error(`Error`, error.message);
          next(error);
        }
      }
    );
  }
}
