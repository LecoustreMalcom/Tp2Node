module.exports = {
  title: "item",
  description: "Un item de la base de données",
  type: "object",
  properties: {
    title: { type: "string" },
  },
  required: ["title"],
  additionalProperties: false,
};
