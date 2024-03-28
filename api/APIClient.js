const config = require("config");
const axios = require("axios");

const logger = require("../utils/logger");

class APIClient {
  constructor() {
    this.baseUri = config.get("MEGAVERSE_API_BASE_URI");
    this.candidateId = config.get("CANDIDATE_ID");
  }

  getEndpoint(value) {
    if (!value || value.includes("POLYANET")) return "polyanets";
    if (value.includes("COMETH")) return "comeths";
    if (value.includes("SOLOON")) return "soloons";
    logger.error(`No endpoint defined for value: ${value}`);
    return null;
  }

  parseData(value, data) {
    const propValue = value.split("_")[0].toLowerCase();
    if (value.includes("COMETH")) data.direction = propValue;
    if (value.includes("SOLOON")) data.color = propValue;
  }

  async drawElement(row, column, value, retryCount = 5) {
    const endpoint = this.getEndpoint(value);
    try {
      const data = {
        candidateId: this.candidateId,
        row,
        column,
      };

      if (value && !value.includes("POLYANET")) this.parseData(value, data);

      await axios.post(`${this.baseUri}/${endpoint}`, data);
      logger.info(`Element drawn at (${row}, ${column}): ${value}`);
    } catch (error) {
      const { response } = error;
      if (response && response.status === 429 && retryCount > 0) {
        logger.info(`Too Many Requests. Retrying for (${row}, ${column})...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await this.drawElement(row, column, value, retryCount - 1);
      } else {
        logger.error(`Error drawing element at (${row}, ${column}):`, error);
      }
    }
  }

  async fetchMatrix() {
    try {
      // if Api is available then use below code
      // const { data } = await axios.get(
      //   `${this.baseUri}/map/${this.candidateId}/goal`
      // );
      // return data.goal;

      const { data } = require("../utils/map.json");
      return data;
    } catch (error) {
      logger.error("Error fetching map:", error.message);
      return null;
    }
  }
}

module.exports = APIClient;
