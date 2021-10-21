import { Image } from "../Models/imageModel";
import { pictureService } from "../Services/pictureService";

export class picturesController {
    pictureService: pictureService;

    constructor() {
        this.pictureService = new pictureService()
    }

    async getAll() {
        return new Promise((resolve) => {
            resolve(this.pictureService.findAll())
        }).catch((err) => {
            console.log(err);
        })
    }
    async getById(id: number) {
        return new Promise((resolve) => {
            resolve(this.pictureService.findById(id))
        }).catch((err) => {
            console.log(err);
        });
    }
    // async getImageById(id: number) {
    //     return new Promise((resolve) => {
    //         resolve(this.pictureGameService.findImageById(id))
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
    // async getImagesByGameId(id: number) {
    //     return new Promise((resolve) => {
    //         resolve(this.pictureGameService.findImageByGameId(id))
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
    // async getAllImages(gameId : number) {
    //     return new Promise((resolve) => {
    //         resolve(this.pictureGameService.findAllImage(gameId))
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    async create(image: Image) {
        return new Promise((resolve) => {
            resolve(this.pictureService.create(image));
          }).catch((err) => {
            console.log(err);
          });
    }
    // async updateById(id: number, body: any) {
    //     return new Promise((resolve) => {
    //         resolve(this.pictureGameService.updateById(id, body))
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
    // async deleteById(id: number) {
    //     return new Promise((resolve) => {
    //         resolve(this.pictureGameService.deleteById(id))
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
}