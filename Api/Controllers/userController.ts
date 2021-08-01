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
      this.userService.findAll().then((data)=>{
        resolve(data);
      }).catch((err) => {
        console.log(err);
        resolve(err);
      })
    }).catch((err) => {
      console.log(err);
      
    });
  }

  async getById(id: number) {
    return new Promise((resolve) => {
      this.userService.findById(id).then((data) => {
        resolve(data);
      }).catch((err) => {
        console.log(err);
        resolve(err);
      })
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
      this.userService.updateById(id, user).then((data) =>{
        resolve(data);
      }).catch((err) => {
        resolve(err);
      })
    });
  }

  async deleteById(id: number) {

    return new Promise((resolve) => {
      this.userService.deleteById(id).then(() => {
        resolve("User deleted");
      }).catch((err) => {
        resolve(err);
      })
    });
  }
}
