import { Game } from "../Models/gameModel";
import { gameService } from "../Services/gameService";

export class gameController {
    gameService: gameService;

    constructor() {
        this.gameService = new gameService()
    }

    async getAll() {
        return new Promise((resolve) => {
            resolve(this.gameService.findAll())
        }).catch((err) => {
            console.log(err);
        })
    }
    async getById(id: number) {
        return new Promise((resolve) => {
            resolve(this.gameService.findById(id))
        }).catch((err) => {
            console.log(err);
        });
    }
    async getImageById(id: number) {
        return new Promise((resolve) => {
            resolve(this.gameService.findImageById(id))
        }).catch((err) => {
            console.log(err);
        });
    }
    async getImagesByGameId(id: number) {
        return new Promise((resolve) => {
            resolve(this.gameService.findImageByGameId(id))
        }).catch((err) => {
            console.log(err);
        });
    }
    async getAllImages(gameId : number) {
        return new Promise((resolve) => {
            resolve(this.gameService.findAllImage(gameId))
        }).catch((err) => {
            console.log(err);
        })
    }
    async create(game: Game) {
        return new Promise((resolve) => {
            resolve(this.gameService.create(game));
          }).catch((err) => {
            console.log(err);
          });
    }
    async updateById(id: number, body: any) {
        return new Promise((resolve) => {
            resolve(this.gameService.updateById(id, body))
        }).catch((err) => {
            console.log(err);
        });
    }
    async deleteById(id: number) {
        return new Promise((resolve) => {
            resolve(this.gameService.deleteById(id))
        }).catch((err) => {
            console.log(err);
        });
    }
}