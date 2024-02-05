const { getCollection } = require("./connection");

async function findOne(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    return await collection.findOne(query, options);
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

async function find(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    return await collection.find(query, options).toArray();
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction find avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

async function insertOne(collectionName, document) {
  try {
    const collection = getCollection(collectionName);
    return await collection.insertOne(document);
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction insertOne avec les parametres suivants: ${document}`
    );
    console.log(e);
    throw e;
  }
}

async function insertMany(collectionName, documents) {
  try {
    const collection = getCollection(collectionName);
    return await collection.insertMany(documents);
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction insertMany avec les parametres suivants: ${documents}`
    );
    console.log(e);
    throw e;
  }
}

async function updateOne(collectionName, query, update, options = {}) {
  try {
    const collection = getCollection(collectionName);
    return await collection.updateOne(query, update, options);
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction updateOne avec les parametres suivants: ${query}, ${update}`
    );
    console.log(e);
    throw e;
  }
}

async function updateMany(collectionName, query, update, options = {}) {
  try {
    const collection = getCollection(collectionName);
    return await collection.updateMany(query, update, options);
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction updateMany avec les parametres suivants: ${query}, ${update}`
    );
    console.log(e);
    throw e;
  }
}

async function deleteOne(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    return await collection.deleteOne(query, options);
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction deleteOne avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

async function deleteMany(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    return await collection.deleteMany(query, options);
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction deleteMany avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

module.exports = {
  findOne,
  find,
  insertOne,
  insertMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
};
