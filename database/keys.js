import { Pool } from "pg";
const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "Danna1120",
  database: "apiback_clonn",
});
// console.log(pool);
module.exports = pool;
