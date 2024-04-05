import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { factory, oneOf, manyOf, primaryKey } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { parseISO } from "date-fns";

const ARTIFICIAL_DELAY_MS = 2000;
const NUM_USERS = 10;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  return faker.number.int({ min, max });
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

export const db = factory({
  users: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
  },
});

const createUserData = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    username: faker.internet.userName(),
  };
};

for (let i = 0; i < NUM_USERS; i++) {
  db.users.create(createUserData());
}

export const handlers = [
  http.get("fakeApi/users", async function () {
    const users = db.users.getAll();
    await delay(ARTIFICIAL_DELAY_MS);

    return HttpResponse.json(users);
  }),
];

export const worker = setupWorker(...handlers);
