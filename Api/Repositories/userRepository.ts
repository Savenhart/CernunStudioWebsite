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
        .then((data) => {
          console.log("data", data);
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
        return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end;
    }
  }

  async findByName(userName: string) {
    let conn;  
    try {

      let query ='SELECT * FROM user where username = ?;';

      conn = await this.dbConnect.pool.getConnection();
      const res = await conn.query(query, [userName]).then((data) => {
        return new User(data[0]);
      }).catch((err) => {
        console.log(err);
        return err;
      });
      return res;
    } catch (error) {
        throw error;
    }finally{
      if(conn) conn.end;
    }
  }
}
