import { Image } from "../Models/imageModel";
import { DBConnect } from "../Utils/DBConnect";

export class ImageGameRepository {
  private dbConnect: DBConnect;

  constructor() {
    this.dbConnect = DBConnect.getInstance();
  }

  async save(image: Image) {
    // let conn;
    // try {
    //   let query = `INSERT INTO game(name, date, content) VALUES (?, ?, ?);`;

    //   conn = await this.dbConnect.pool.getConnection();
    //   const res = await conn
    //     .query(query, [game.name, game.date, game.content])
    //     .then((data) => {
    //       return data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   return res;
    // } catch (error) {
    //   throw error;
    // } finally {
    //   if (conn) conn.end();
    // }
  }

  async findAll() {
    let conn;
    try {
      let queryImage = `SELECT * FROM game_image;`;
      conn = await this.dbConnect.pool.getConnection();

      const res = await conn
        .query(queryImage)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async findById(id: number) {
    let conn;
    try {
      let query = `SELECT * From game_image WHERE id = ?;`;

      conn = await this.dbConnect.pool.getConnection();

      const res = await conn
        .query(query, [id])
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async findByGameId(gameId: number) {
    let conn;
    try {
      let query = `SELECT * From game_image WHERE game_id = ?;`;

      conn = await this.dbConnect.pool.getConnection();

      const res = await conn
        .query(query, [gameId])
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async updateById(id: number, image: Image) {
    //   let conn;
    //   try {
    //     let query;
    //     let values = [];
    //     console.log(post);
    //     if (post.title === "") {
    //       query = "UPDATE post SET content = ? WHERE id = ?;";
    //       values = [post.content, id];
    //     } else if (post.content == "") {
    //       query = "UPDATE post SET title = ? WHERE id = ?;";
    //       values = [post.title, id];
    //     } else {
    //       query = "UPDATE post SET title = ?, content = ? WHERE id = ?;";
    //       values = [post.title, post.content, id];
    //     }
    //     conn = await this.dbConnect.pool.getConnection();
    //     const res = await conn
    //       .query(query, values)
    //       .then((data) => {
    //         return data;
    //       })
    //       .catch((err) => {
    //         return err;
    //       });
    //     return res;
    //   } catch (error) {
    //     throw error;
    //   } finally {
    //     if (conn) conn.end();
    //   }
  }

  async deleteById(id: number) {
    let conn;
    try {
      let query = `DELETE FROM game_image WHERE id = ?;`;

      conn = await this.dbConnect.pool.getConnection();

      const res = await conn
        .query(query, [id])
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }
}
