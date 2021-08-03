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
      let query =
        "CREATE TABLE IF NOT EXISTS user(ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, userName VARCHAR(10) NOT NULL UNIQUE, password VARCHAR(64) NOT NULL)ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;";
      let query2 =
        "CREATE TABLE IF NOT EXISTS post(ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, " +
         "user_id INT NOT NULL, "+
         "title VARCHAR(50) NOT NULL, " + 
         "CONSTRAINT `fk_post_user` FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE RESTRICT, "+
         "post_date DATETIME NOT NULL, "+
         "content TEXT(65532) NOT NULL)ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;";
      await conn.query(query);
      await conn.query(query2);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
}
