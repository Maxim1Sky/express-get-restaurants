const request = require("supertest");
const app = require("./src/app");
const Restaurant = require("./models/Restaurant");
const syncSeed = require("./seed");

let restQuantity;
beforeAll(async () => {
  await syncSeed();
  const allRestaurants = await Restaurant.findAll();
  restQuantity = allRestaurants.length;
});

// not sure if you need this
// afterAll(async () => {
//   await syncSeed();
// });

test("Should return 200 status", async () => {
  const response = await request(app).get("/restaurants");
  expect(response.statusCode).toEqual(200);
});

test("Should return an array of restaurants, of the right length with cuisine,", async () => {
  const response = await request(app).get("/restaurants");
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body[0]).toHaveProperty("cuisine");
  expect(response.body.length).toEqual(restQuantity);
});

test("Should return the correct restaurant data", async () => {
  const response = await request(app).get("/restaurants");

  const theObj = {
    id: 1,
    name: "AppleBees",
    location: "Texas",
    cuisine: "FastFood",
  };

  expect(response.body).toContainEqual(expect.objectContaining(theObj));
});

test("Should return the correct restaurant by ID", async () => {
  const response = await request(app).get("/restaurants/1");

  const theObj = {
    id: 1,
    name: "AppleBees",
    location: "Texas",
    cuisine: "FastFood",
  };

  expect(response.body).toEqual(expect.objectContaining(theObj));
});

test("Should add a record to the database +1", async () => {
  const response = await request(app)
    .post("/restaurants")
    .send({ name: "RandomName", location: "Who knows", cuisine: "Weird one" });

  expect(response.body.length).toEqual(restQuantity + 1);
});

// Comment these last 2 test and run npx test to get the databse back to normal
test("Should update a restaurant", async () => {
  await request(app).put("/restaurants/4").send({
    name: "Updated Name",
    location: "Updated Locaiton",
    cuisine: "Still weird cuisine",
  });
  const theRest = await Restaurant.findByPk(4);
  expect(theRest.name).toEqual("Updated Name");
});

test("Should detele entry by ID", async () => {
  await request(app).delete("/restaurants/2");
  const allRest = await Restaurant.findAll();

  expect(allRest.length).toEqual(restQuantity);
  expect(allRest[1].id).not.toEqual(2);
});
