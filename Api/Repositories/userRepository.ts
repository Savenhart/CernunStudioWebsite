import { User } from "../Models/userModels";
import { DBConnect } from "../Utils/DBConnect";

export class userRepository {
  private dbConnect: DBConnect;

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
      let query = "SELECT * FROM user;";

      conn = await this.dbConnect.pool.getConnection();
      const res = await conn
        .query(query)
        .then((data) => {
          return data.slice(0, data.length);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async findByName(userName: string) {
    let conn;
    try {
      let query = "SELECT * FROM user WHERE username = ?;";

      conn = await this.dbConnect.pool.getConnection();
      const res = await conn
        .query(query, [userName])
        .then((data) => {
          return new User(data[0]);
        })
        .catch((err) => {
          console.log(err);
          return err;
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
      let query = "SELECT * FROM user WHERE id = ?;";

      conn = await this.dbConnect.pool.getConnection();
      const res = await conn
        .query(query, [id])
        .then((data) => {
          return new User(data[0]);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async deleteById(id: number) {
    let conn;
    try {
      let query = "DELETE FROM user WHERE id = ?;";

      conn = await this.dbConnect.pool.getConnection();
      const res = await conn
        .query(query, [id])
        .then((data) => {
          return new User(data[0]);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async updateById(id: number, user: User) {
    let conn;
    try {
      let query;
      let values = [];
      console.log(user);
      if (user.password === "") {
        query = "UPDATE user SET username = ? WHERE id = ?;";
        values = [user.userName, id];
      } else if (user.userName == "") {
        query = "UPDATE user SET password = ? WHERE id = ?;";
        values = [user.password, id];
      } else {
        query = "UPDATE user SET username = ?, password = ? WHERE id = ?;";
        values = [user.userName, user.password, id];
      }
      conn = await this.dbConnect.pool.getConnection();
      const res = await conn
        .query(query, values)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err;
        });
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }
}
