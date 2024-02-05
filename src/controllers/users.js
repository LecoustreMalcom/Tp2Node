const { insertOne, findOne } = require("../services/db/crud");

const collection = "users";

async function getUser(req, res, next) {
  try {
    const user = await findOne(collection, { email: req.query.nom });
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function createUser(req, res, next) {
  try {
    const result = await insertOne(collection, req.body);
    console.log("Nouvel utilisateur créé. Id : ${result.insertedId}");
    return res.status(201).send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

module.exports = {
  createUser,
  getUser,
};
