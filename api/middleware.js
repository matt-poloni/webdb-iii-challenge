const db = require('../data/dbConfig');

module.exports = function(tbl) {
  return {
    has: function(prop) {
      return function(req, res, next) {
        !req.body[prop]
          ? res.status(400).json({ error: `Please provide a ${prop} for the entry you're creating.` })
          : next();
      }
    },
    paramExists: function(param = 'id', table = tbl) {
      return async function(req, res, next) {
        const result = await db(table).where({ [param]: req.params[param] });
        !result.length
          ? res.status(404).json({ error: `The specified ${param} does not exist in the ${table} database.` })
          : next();
      }
    }
  }
}

// db(tbl).where({id}).first()