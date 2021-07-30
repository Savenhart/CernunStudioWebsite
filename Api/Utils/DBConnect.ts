import mariadb from "mariadb";
const dbconfig = require("../Configs/dbConfig.json");

export class DBConnect {
  private static instance: DBConnect;

  pool: mariadb.Pool;

  constructor() {
    this.pool = mariadb.createPool({
      host: dbconfig.adress,
      user: dbconfig.user,
      password: dbconfig.password,
      database: dbconfig.database,
      connectionLimit: 5,
    });
  }

  public static getInstance(): DBConnect {
    if (!DBConnect.instance) {
      DBConnect.instance = new DBConnect();
    }
    return DBConnect.instance;
  }

  async test() {
    let conn;
    try {
      conn = await this.pool.getConnection();
      
      //const rows = await conn.query("USE CernunWebsite;");
      //console.log("rows", rows);
      const res = await conn
        .query(
          "CREATE TABLE IF NOT EXISTS user(ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, userName VARCHAR(10) NOT NULL UNIQUE, password VARCHAR(64) NOT NULL)ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;"
        )
        .then(() => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }
}
