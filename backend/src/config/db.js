"use strict";

const mysql = require("mysql2/promise");
const config = require("./env");

/**
 * Creates a reusable MySQL connection pool.
 * Uses TLS for secure connections to TiDB Cloud.
 */

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,

  // Enable TLS for TiDB Cloud connections
  ssl: {
    minVersion: "TLSv1.2",
  },

  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = pool;
