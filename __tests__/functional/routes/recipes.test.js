const request = require("supertest");
const app = require("../../../src/app");

const baseUrl = "/recipes";

describe("[ROUTE] recipes", () => {
  describe("[GET] /recipes", () => {
    it("should return status 200", async () => {
      const response = await request(app).get(baseUrl);
      expect(response.status).toBe(200);
    });
  });

  describe("[GET] /recipes/{id}", () => {
    const requestUrl = `${baseUrl}/1`;

    it("should return status 200", async () => {
      const response = await request(app).get(requestUrl);
      expect(response.status).toBe(200);
    });

    it("should return status 404 if no record is found", async () => {
      const response = await request(app).get(`${baseUrl}/0`);
      expect(response.status).toBe(404);
    });

    it("should return response object with the right keys and types", async () => {
      const response = await request(app).get(requestUrl);
      expect(typeof response.data).toBe("object");
      expect(typeof response.body.id).toBe("number");
      expect(typeof response.body.title).toBe("string");
      expect(Array.isArray(response.body.ingredients)).toBeTruthy();
      expect(Array.isArray(response.body.instructions)).toBeTruthy();
    });
  });

  describe("[POST] /recipes", () => {
    const requestData = {
      title: "Arroz com Feijão",
      ingredients: [0, 4, 6],
      instructions: ["Cozinhe o arroz.", "Cozinhe o feijão.", "Misture os dois."]
    };

    it("should return status 201 when valid data is passed", async () => {
      const response = await request(app).post(baseUrl, requestData);
      expect(response.status).toBe(201);
    });

    it("should return status 400 when invalid data is passed", async () => {
      const response = await request(app).post(baseUrl, {
        foo: "bar"
      });

      expect(response.status).toBe(400);
    });
  });
});
