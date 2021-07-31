import { User } from "../Models/userModels";
import fs from "fs";
import { userService } from "../Services/userService";

export class userController {
  private userService: userService;

  constructor() {
    this.userService = new userService();
    //const test = new userService();
  }

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
      this.getAll()
        .then((obj: any) => {
          let res: object = {};
          for (const o of obj.users) {
            if (o.id == id) {
              res = o;
              break;
            } else {
              res = { Error: "404" };
            }
          }
          resolve(res);
        })
        .catch((err: Error) => {
          console.log("Got an error = ", err);
          resolve("Got an error");
        });
    });
  }

  async getByUserName(userName: string) {
    return new Promise((resolve) => {
         this.userService
        .findByName(userName)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          resolve(err);
        });
    }).catch((err) => {
      console.log(err);
    });
  }

  async create(user: User) {
    return new Promise((resolve) => {
      console.log(user);
      resolve(this.userService.create(user));
    }).catch((err) => {
      console.log(err);
    });
  }

  async updateById(id: number, user: User) {
    return new Promise((resolve) => {
      this.getById(id).then((obj: any) => {});
    });
  }

  async deleteById(id: number) {
    return new Promise((resolve) => {
      this.getAll().then((obj: any) => {
        let data: any[] = [];
        for (const o of obj.users) {
          if (o.id != id) {
            data.push(o);
          }
        }
        obj.users = data;

        let res = JSON.stringify(obj);

        fs.writeFile("./db.json", res, (err: any) => {
          if (err) resolve(err);
          else {
            resolve("File written successfully");
            console.log("User removed");
          }
        });
      });
    });
  }
}
