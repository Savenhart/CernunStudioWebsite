import { User } from "../models/userModels";
import fs from "fs";

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
      this.getAll()
        .then((obj: any) => {
          let res: object = {};
          for (const o of obj.users) {
            if (o.userName == userName) {
              res = o;
              break;
            } else {
              res = { Error: "Ce nom d'utilisateur n'existe pas !" };
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

  async create(user: User) {
    return new Promise((resolve) => {
      console.log("Adding user:::::", user);
      this.getAll()
        .then((obj: any) => {
          let i = 1;
          let isIDUsed = true;
          for (const o of obj.users) {
            if (o.id == i && isIDUsed) {
              user.id = i + 1;
            } else {
              user.id = i;
              isIDUsed = false;
            }
            i++;
          }
          obj.users.push(user);

          let data = JSON.stringify(obj);

          fs.writeFile("./db.json", data, (err: any) => {
            if (err) resolve(err);
            else {
              resolve("File written successfully");
              console.log("User Added");
            }
          });
        })
        .catch((err: Error) => {
          console.log("Got an error = ", err);
          resolve("Got an error");
        });
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
