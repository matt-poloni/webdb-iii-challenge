const db = require('../data/dbConfig');

module.exports = function(tbl) {
  return {
    isString: function(prop) {
      return function(req, res, next) {
        typeof req.body[prop] !== 'string'
          ? res.status(400).json({ error: `The ${prop} value must be a string.`})
          : next();
      }
    },
    has: function(prop) {
      return function(req, res, next) {
        !req.body[prop]
          ? res.status(400).json({ error: `Please provide a ${prop} for the entry you're creating.` })
          : next();
      }
    },
    propExists: function(prop = 'id', field = prop, table = tbl) {
      return async function(req, res, next) {
        const result = await db(table).where({ [field]: req.body[prop] });
        !result.length
          ? res.status(404).json({ error: `The specified ${prop} does not exist in the ${table} database.` })
          : next();
      }
    },
    paramExists: function(param = 'id', field = param, table = tbl) {
      return async function(req, res, next) {
        const result = await db(table).where({ [field]: req.params[param] });
        !result.length
          ? res.status(404).json({ error: `The specified ${param} does not exist in the ${table} database.` })
          : next();
      }
    },
  }
}
