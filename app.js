"use strict";

const Megaverse = require("./api/Megaverse");
const logger = require("./utils/logger");

// Create an instance of the Megaverse class
const megaverse = new Megaverse();

// Get command line arguments
const args = process.argv.slice(2); // Remove 'node' and script name

// Extract parameters for drawX
const x1 = parseInt(args[0]) || 2; // Default to 2 if not provided
const x2 = parseInt(args[1]) || 8; // Default to 8 if not provided

// Use the instance to draw X shape
megaverse
  .drawX(x1, x2, 10)
  .then(() => logger.info("X shape drawn successfully"))
  .catch((error) => logger.error("Error drawing X:", error));

// Draw the logo
megaverse
  .drawLogo()
  .then(() => logger.info("Logo drawn successfully"))
  .catch((error) => logger.error("Error drawing logo:", error));
