import { User } from "../Models/userModels";
import { DBConnect } from "../Utils/DBConnect";

export class userRepository {

    private dbConnect: DBConnect

  constructor() { 
    this.dbConnect = DBConnect.getInstance();
  }

  async save(user: User) {
    let conn;
    try {
      let query = `INSERT INTO user(username, password) VALUES (?, ?);`;

      conn = await this.dbConnect.pool.getConnection();
      const res = await conn
        .query(query, [user.userName, user.password])
        .then(() => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      throw error;
    } finally {
      if (conn) return conn.end;
    }
  }
}
