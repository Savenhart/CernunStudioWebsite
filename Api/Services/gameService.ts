import { Game } from "../Models/gameModel";
import { Image } from "../Models/imageModel";

import { GameRepository } from "../Repositories/gameRepository";
import { pictureRepository } from "../Repositories/pictureRepository";

export class gameService {
  private gameRepository: GameRepository;
  private pictureRepository: pictureRepository;

  constructor() {
    this.gameRepository = new GameRepository();
    this.pictureRepository = new pictureRepository();
  }

  async findAll() {
    return this.gameRepository
      .findAll()
      .then(async (datas) => {
        let gameImage = await this.pictureRepository
          .findAll()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return err;
          });
        let games: Game[] = [];
        for (const data of datas) {
          let imgGame: Image[] = [];
          for (const img of gameImage) {
            if (img.game_id === data.ID) {
              imgGame.push(img);
            }
          }
          let game = new Game({
            id: data.ID,
            name: data.name,
            date: data.date,
            content: data.content,
            image: imgGame || [],
          });
          games.push(game);
        }
        return games;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async create(game: Game) {
    this.gameRepository.save(game);
  }

  async findById(id: number) {
    return this.gameRepository
      .findById(id)
      .then(async (data) => {
        let gameImage = await this.pictureRepository
        .findByGameId(id)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err;
        });
        let game = new Game({
          id: data.ID,
          name: data.name,
          date: data.date,
          content: data.content,
          image: gameImage || [],
        });
        
        return game;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findAllImage(gameId: number) {}
  findImageByGameId(gameId: number) {
    return this.gameRepository
      .findByGameId(gameId)
      .then((data: any) => {
        let game = new Game({
          ID: data.id,
          name: data.name,
          date: data.date,
          content: data.content,
          image: data.image,
        });
        return game;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  findImageById(id: number) {}

  async updateById(id: number, game: any) {
    return this.gameRepository.updateById(id, game);
  }

  async deleteById(id: number) {
    return this.gameRepository
      .deleteById(id)
      .then((data) => {
        console.log("game deleted");
        return {};
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
