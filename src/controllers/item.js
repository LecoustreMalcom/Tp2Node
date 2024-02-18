const { insertOne, find } = require("../services/db/crud");
const itemSchema = require("../repositories/item");
const _ = require("jsonschema").validate;

const collection = "item";

async function validate(body, schema) {
  const validation = _(body, schema);
  if (validation.errors.length > 0) {
    throw new Error(validation.errors);
  }
}

async function createItem(req, res, next) {
  try {
    await validate(req.body, itemSchema);
    const result = await insertOne(collection, req.body);
    console.log(`Nouvel item créé. Id : ${result.insertedId}`);
    return res.status(201).send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function viewItems(req, res, next) {
  try {
    const items = await find(collection, req.body);
    if (!items) {
      return res.status(404).send("Aucun item trouvé");
    }
    return res.status(200).send(items);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

module.exports = {
  createItem,
  viewItems,
};
