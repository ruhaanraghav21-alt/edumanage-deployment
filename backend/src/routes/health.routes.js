"use strict";

const express = require("express");
const { getHealth } = require("../controllers/health.controller");
const { checkDatabaseConnection } = require("../database/dbHealth");

const router = express.Router();

/**
 * GET /
 * API health and database connectivity check.
 * URL: /api/v1/health
 */
router.get("/", getHealth);

/**
 * GET /db
 * Dedicated database connectivity check.
 * URL: /api/v1/health/db
 */
router.get("/db", async (req, res) => {
  try {
    const dbResult = await checkDatabaseConnection();

    if (!dbResult.connected) {
      return res.status(503).json({
        success: false,
        message: "Database connection unavailable",
        data: {
          database: "disconnected",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Database connection successful",
      data: {
        database: "connected",
        databaseName: dbResult.database,
      },
    });
  } catch (error) {
    console.error("[Database Health Check Error]:", error.message);

    return res.status(503).json({
      success: false,
      message: "Database connection unavailable",
      data: null,
    });
  }
});

module.exports = router;
