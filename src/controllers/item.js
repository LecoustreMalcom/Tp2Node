const { insertOne } = require("../services/db/crud");

const collection = "item";

async function createItem(req, res, next) {
  try {
    const result = await insertOne(collection, req.body);
    console.log("Nouvel item créé. Id : ${result.insertedId}");
    return res.status(201).send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

module.exports = {
  createItem,
};
