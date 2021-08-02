import { Post } from "../Models/postModel";
import { postService } from "../Services/postService";

export class postController {
    postService: postService;

    constructor() {
        this.postService = new postService()
    }

    async getAll() {
        return new Promise((resolve) => {
            resolve(this.postService.findAll())
        }).catch((err) => {
            console.log(err);
        })
    }
    async getById(id: number) {
        return new Promise((resolve) => {
            resolve(this.postService.findById(id))
        }).catch((err) => {
            console.log(err);
        });
    }
    async getAllByUser(userName: string) {
        throw new Error("Method not implemented.");
    }
    async create(post: Post) {
        return new Promise((resolve) => {
            resolve(this.postService.create(post));
          }).catch((err) => {
            console.log(err);
          });
    }
    async updateById(arg0: number, body: any) {
        throw new Error("Method not implemented.");
    }
    async deleteById(arg0: number) {
        throw new Error("Method not implemented.");
    }
}