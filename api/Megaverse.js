"use strict";

const APIClient = require("./APIClient");

class Megaverse extends APIClient {
  // x1 is the starting x coordinate
  // x2 is the ending x coordinate
  // n is the size of the matrix
  async drawX(x1, x2, n) {
    if (x2 > n) throw new Error(`x2 should be less than or equal ${n}`);
    if (x1 > x2) throw new Error(`x1 should be less than or equal x2`);

    for (let i = x1; i <= x2; i++) {
      // Draw the first diagonal
      await this.drawElement(i, i);

      // Draw the second diagonal
      await this.drawElement(i, n - i);
    }
  }

  // logo is a 2D array
  async drawLogo() {
    const logo = await this.fetchMatrix();
    let x = 0;
    for (const row of logo) {
      let y = 0;
      for (const value of row) {
        if (value !== "SPACE") await this.drawElement(x, y, value, 10);
        y++;
      }
      x++;
    }
  }
}

module.exports = Megaverse;
