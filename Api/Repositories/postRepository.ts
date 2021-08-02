import { Post } from "../Models/postModel";
import { DBConnect } from "../Utils/DBConnect";

export class postRepository {

    private dbConnect: DBConnect;

    constructor() {
      this.dbConnect = DBConnect.getInstance();
    }
    
    async save(post: Post) {
        let conn;
        try {
          let query = `INSERT INTO post(user_id, title, post_date, content) VALUES (?, ?, ?, ?);`;
          
          conn = await this.dbConnect.pool.getConnection();
          const res = await conn
            .query(query, [post.user.ID, post.title, post.date, post.content])
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
        let query = `SELECT post.*, user.username FROM post INNER JOIN user ON post.user_id = user.id;`;

        conn = await this.dbConnect.pool.getConnection();

        const res = await conn.query(query).then((data) => {
          return data;
        }).catch((err) => {
          console.log(err);
          
        })
        return res;
      } catch (error) {
        throw error;
      } finally{
        if (conn) conn.end();
      }
  }

   async findById(id: number) {
      let conn;
      try {
        let query = `SELECT post.*, user.username FROM post INNER JOIN user ON post.user_id = user.id WHERE post.id = ?;`;

        conn = await this.dbConnect.pool.getConnection();

        const res = await conn.query(query, [id]).then((data) => {
          return data;
        }).catch((err) => {
          console.log(err);
          
        })
        return res;
      } catch (error) {
        throw error;
      } finally{
        if (conn) conn.end();
      }
  }
}