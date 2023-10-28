import * as users from "./users.controller.mjs";

export const router = (router) => {
  router.post("/add", users.createUser);
  router.get("/users", users.getUsers);
};
