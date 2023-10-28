import usersModel from "./users.dao.mjs";

export const createUser = async (req, res) => {
  const user = {
    username: req.body.username,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    password: req.body.password,
  };
  try {
    await usersModel.create(user);
    res.json({ message: `User ${user.username} created successfully.` });
  } catch (err) {
    res.json({ error: `The user could not be created: ${err}.` });
  }
};

export const getUsers = async (req, res) => {
  try {
    const createdUsers = await usersModel.find({});
    res.status(200).json({ createdUsers });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};
