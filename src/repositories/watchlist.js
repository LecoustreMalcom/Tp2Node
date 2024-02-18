const stateSchema = require('./state');

module.exports = {
    type: "object",
    properties: {
        title: { type: "string"},
        state: stateSchema,
    },
    required: ["title", "state"],
    additionalProperties: false,
  };