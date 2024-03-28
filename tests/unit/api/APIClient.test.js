const APIClient = require("../../../api/APIClient");
const axios = require("axios");
jest.mock("axios");

describe("APIClient", () => {
  let apiClient;

  beforeEach(() => {
    apiClient = new APIClient();
  });

  describe("getEndpoint", () => {
    it('should return "polyanets" for null or "POLYANET" values', () => {
      expect(apiClient.getEndpoint(null)).toBe("polyanets");
      expect(apiClient.getEndpoint("POLYANET")).toBe("polyanets");
    });

    it('should return "comeths" for "COMETH" values', () => {
      expect(apiClient.getEndpoint("COMETH_VALUE")).toBe("comeths");
    });

    it('should return "soloons" for "SOLOON" values', () => {
      expect(apiClient.getEndpoint("SOLOON_VALUE")).toBe("soloons");
    });

    it("should return null for unknown values", () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const result = apiClient.getEndpoint("UNKNOWN");

      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe("parseData", () => {
    it('should parse the direction for "COMETH" values', () => {
      const data = {};
      apiClient.parseData("COMETH_VALUE", data);
      expect(data).toEqual({ direction: "cometh" });
    });

    it('should parse the color for "SOLOON" values', () => {
      const data = {};
      apiClient.parseData("SOLOON_VALUE", data);
      expect(data).toEqual({ color: "soloon" });
    });

    it("should not modify the data for other values", () => {
      const data = {};
      apiClient.parseData("POLYANET", data);
      expect(data).toEqual({});
    });
  });

  describe("drawElement", () => {
    it("should make a successful API call", async () => {
      const axiosPostMock = jest
        .spyOn(axios, "post")
        .mockResolvedValue({ data: "success" });
      await apiClient.drawElement(1, 2, "POLYANET");
      expect(axiosPostMock).toHaveBeenCalledWith(
        "https://example.com/polyanets",
        {
          candidateId: "test-candidate-id",
          row: 1,
          column: 2,
        }
      );
      axiosPostMock.mockRestore();
    });
  });
});
