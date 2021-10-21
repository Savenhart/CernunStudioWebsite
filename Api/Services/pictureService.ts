import { Image } from "../Models/imageModel";
import { pictureRepository } from "../Repositories/pictureRepository";

export class pictureService {
  private pictureRepository: pictureRepository;

  constructor() {
    this.pictureRepository = new pictureRepository();
  }

  async findAll() {
        return await this.pictureRepository
          .findAll()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return err;
          });
  }

  async create(image: Image) {
    this.pictureRepository.save(image);
    
  }

  async findById(id: number) {
    return this.pictureRepository
      .findById(id)
      .then(async (data) => {
        let image = new Image(data[0])
        return image;
      })
      .catch((err) => {
        console.log(err);
      });
  }

//   findAllImage(gameId: number) {}
//   findImageByGameId(gameId: number) {
//     return this.gameRepository
//       .findByGameId(gameId)
//       .then((data: any) => {
//         let game = new Game({
//           ID: data.id,
//           name: data.name,
//           date: data.date,
//           content: data.content,
//           image: data.image,
//         });
//         return game;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   findImageById(id: number) {}

//   async updateById(id: number, game: any) {
//     return this.gameRepository.updateById(id, game);
//   }

//   async deleteById(id: number) {
//     return this.gameRepository
//       .deleteById(id)
//       .then((data) => {
//         console.log("game deleted");
//         return {};
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
}
