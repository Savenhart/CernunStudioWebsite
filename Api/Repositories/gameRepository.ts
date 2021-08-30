import { Game } from "../Models/gameModel";
import { DBConnect } from "../Utils/DBConnect";

export class GameRepository {
  private dbConnect: DBConnect;

  constructor() {
    this.dbConnect = DBConnect.getInstance();
  }

  async save(game: Game) {
    let conn;
    try {
      let query = `INSERT INTO game(name, date, content) VALUES (?, ?, ?);`;

      conn = await this.dbConnect.pool.getConnection();
      const res = await conn
        .query(query, [game.name, game.date, game.content])
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

  async findAll() {
    let conn;
    try {
      let queryGame = `SELECT * FROM game;`;
      conn = await this.dbConnect.pool.getConnection();

      const res = await conn
        .query(queryGame)
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
      let query = `SELECT * From Game WHERE id = ?;`;

      conn = await this.dbConnect.pool.getConnection();

      const res = await conn
        .query(query, [id])
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      return res[0];
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async findByGameId(gameId: number) {
    throw new Error("Method not implemented.");
  }

  async updateById(id: number, game: Game) {
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
      let query = `DELETE FROM post WHERE id = ?;`;

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
