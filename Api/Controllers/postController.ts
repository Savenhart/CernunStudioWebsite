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
        return new Promise((resolve) => {
            resolve(this.postService.findAllByUser(userName))
        }).catch((err) => {
            console.log(err);
        });
    }
    async create(post: Post) {
        return new Promise((resolve) => {
            resolve(this.postService.create(post));
          }).catch((err) => {
            console.log(err);
          });
    }
    async updateById(id: number, body: any) {
        return new Promise((resolve) => {
            resolve(this.postService.updateById(id, body))
        }).catch((err) => {
            console.log(err);
        });
    }
    async deleteById(id: number) {
        return new Promise((resolve) => {
            resolve(this.postService.deleteById(id))
        }).catch((err) => {
            console.log(err);
        });
    }
}