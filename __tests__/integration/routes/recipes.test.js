const request = require("supertest");
const app = require("../../../src/app");
const truncate = require("../../utils/truncate");
const { Recipe } = require("../../../src/app/models");

const baseUrl = "/recipes";

const validRecipe = {
  title: "Arroz com Feijão",
  ingredients: [0, 4, 6],
  instructions: ["Cozinhe o arroz.", "Cozinhe o feijão.", "Misture os dois."]
};

const invalidRecipe = [
  { title: [4, 2, 0], ingredients: [1, 2, 3], instructions: ["A", "B", "C"] },
  { ingredients: "foo", title: "Paçoca moída", instructions: ["A", "B", "C"] },
  { instructions: { foo: "bar" }, title: "Paçoca moída", ingredients: [1, 2, 3] }
];

describe("[ROUTE] recipes", () => {
  beforeAll(async () => await Recipe.create(validRecipe));
  afterAll(async () => await truncate());

  describe("GET", () => {
    it("should return status 200", async () => {
      const response = await request(app).get(baseUrl);
      expect(response.status).toBe(200);
    });
  });

  describe("GET (with :id)", () => {
    const requestUrl = `${baseUrl}/1`;

    describe("when record is found", () => {
      it("should return status 200", async () => {
        const response = await request(app).get(requestUrl);
        expect(response.status).toBe(200);
      });

      it("should return response object with the right keys and types", async () => {
        const response = await request(app).get(requestUrl);
        expect(typeof response.body).toBe("object");
        expect(typeof response.body.id).toBe("number");
        expect(typeof response.body.title).toBe("string");
        expect(Array.isArray(response.body.ingredients)).toBeTruthy();
        expect(Array.isArray(response.body.instructions)).toBeTruthy();
      });
    });

    describe("when no record is found", () => {
      it("should return status 404", async () => {
        const response = await request(app).get(`${baseUrl}/0`);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("POST", () => {
    describe("when valid data is passed", () => {
      it("should return status 201", async () => {
        const response = await request(app)
          .post(baseUrl)
          .send(validRecipe)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json");
        expect(response.status).toBe(201);
      });
    });

    describe("when invalid data is passed", () => {
      invalidRecipe.map(data => {
        const key = Object.keys(data)[0];
        const value = data[key];

        describe(`when ${typeof value} is passed as ${key}`, () => {
          it("should return status 400", async () => {
            const response = await request(app)
              .post(baseUrl)
              .send(data)
              .set("Content-Type", "application/json")
              .set("Accept", "application/json");
            expect(response.status).toBe(400);
          });

          it("should return an error", async () => {
            const response = await request(app)
              .post(baseUrl)
              .send(data)
              .set("Content-Type", "application/json")
              .set("Accept", "application/json");
            expect(response.body.error).toBeTruthy();
          });
        });
      });
    });
  });
});
