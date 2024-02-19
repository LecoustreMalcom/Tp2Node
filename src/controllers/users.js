const { insertOne, findOne, updateOne } = require("../services/db/crud");
const userSchema = require("../repositories/user");
const watchlistSchema = require("../repositories/watchlist");
const _ = require("jsonschema").validate;

const collection = "users";
const itemCollection = "item";

async function validate(body, schema) {
  const validation = _(body, schema);
  if (validation.errors.length > 0) {
    throw new Error(validation.errors);
  }
}

async function userExist(req, next){
  try {
    const userId = req.query.email;
    const user = await findOne(collection, { email: userId });
    if (!user) {
      return next(new Error("Utilisateur non trouvé"));
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function itemExistInWatchlist(req, next){
  try {
    const userId = req.query.email;
    const item = await findOne(collection, { email: userId, "watchlist.title": req.body.title });
    if (!item) {
      return next(new Error("Item non trouvé"));
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function itemExistInItem(req, next){
  try {
    const item = await findOne(itemCollection, { title: req.body.title })
    if (!item) {
      return next(new Error("Item non trouvé"));
    }
  } catch(e) {
    console.log(e);
    return next(e);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await findOne(collection, req.body);
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
    await validate(req.body, userSchema);
    const result = await insertOne(collection, req.body);
    console.log(`Nouvel utilisateur créé. Id : ${result.insertedId}`);
    return res.status(201).send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function addItem(req, res, next) {
  try {
    await userExist(req, next)
    await itemExistInItem(req, next)
    await validate(req.body, watchlistSchema)
    const result = await updateOne(
        collection,
        { email: req.query.email },
        { $push: { watchlist: req.body } }
    );
    return res.status(201).send(result)
  } catch(e) {
    console.log(e);
    if (e.message === "Utilisateur non trouvé") {
      return res.status(404).send(e.message);
    }
    return next(e);
  }
}

async function updateState(req, res, next) {
  try {
    await userExist(req, next)
    await itemExistInWatchlist(req, next)
    await validate(req.body, watchlistSchema)
    const result = await updateOne(
      collection,
      { email: req.query.email, "watchlist.title": req.body.title },
      { $set: { "watchlist.$.state": req.body.state } }
    );
    return res.status(201).send(result);
  } catch(e) {
    console.log(e);
    if (e.message === "Utilisateur non trouvé" || e.message === "Item non trouvé") {
      return res.status(404).send(e.message);
    }
    return next(e);
  }
}

async function viewWatchlist(req, res, next) {
  try {
    await userExist(req, next)
    const user = await findOne(collection, { email: req.query.email });

    if (req.query.state) {
      user.watchlist = user.watchlist.filter(item => item.state.toLowerCase() === req.query.state.toLowerCase());
    }

    return res.status(200).send(user.watchlist);
  }
  catch(e) {
    console.log(e);
    if (e.message === "Utilisateur non trouvé") {
      return res.status(404).send(e.message);
    }
    return next(e);
  }
}

module.exports = {
  createUser,
  getUser,
  addItem,
  updateState,
  viewWatchlist
}