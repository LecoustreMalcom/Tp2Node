const watchlist = require('./watchlist');

module.exports = {
  title: "User",
  description: "Un utilisateur du site",
  type: "object",
  properties: {
    username: { type: "string" },
    email: { type: "string", format: "email" },
    watchlist: { 
      type: "array",
      items: {watchlist}
     },
  },
  required: ["username", "email"],
  additionalProperties: false,
};
