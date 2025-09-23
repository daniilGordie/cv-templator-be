import sql, { ConnectionPool } from "mssql";

const config: sql.config = {
  server: "localhost",
  database: "CvTemplatorDB",
  user: 'nodeuser',
  password: 'Alfred1331',
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

export const poolPromise: Promise<ConnectionPool> = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
