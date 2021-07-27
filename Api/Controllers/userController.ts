import { User } from "../models/userModels";
import express from "express";
const router = express.Router();
import fs from "fs";
import route from "../routes.json";

export class userController {
  async getAll() {
    return new Promise((resolve) => {
      fs.readFile("./db.json", (_err, json) => {
        let obj = JSON.parse(json.toString());
        resolve(obj);
      });
    });
  }

  async getById(id: number) {
    return new Promise((resolve) => {
      fs.readFile("./db.json", (_err, json) => {
        let obj = JSON.parse(json.toString());
        for (const o of obj.users) {
          if (o.id == id) {
            resolve(o);
            console.log(o);
          } else {
            resolve({ Error: "404" });
          }
        }
      });
    });
  }

  async create() {
    router.post(
      route.users,
      (
        req: { body: { user: User } },
        res: { json: (arg0: string) => void }
      ) => {
        const user = req.body.user;
        console.log("Adding user:::::", user);
        fs.readFile("./db.json", (err, json) => {
          if (err) {
            console.log(err);
          } else {
            let obj = {
              users: [] as any,
            };
            obj = JSON.parse(json.toString());
            obj.users.push(user);

            let data = JSON.stringify(obj);

            fs.writeFile("./db.json", data, (err: any) => {
              if (err) console.log(err);
              else {
                console.log("File written successfully\n");
                res.json("user added");
              }
            });
          }
        });
      }
    );
  }
}
