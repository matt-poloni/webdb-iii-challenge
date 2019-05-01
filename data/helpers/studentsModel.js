const db = require('../dbConfig');

module.exports = {
  getByID: function (id) {
    return db('students as s')
      .join('cohorts as c', 'c.id', 's.cohort_id')
      .select('s.id', 's.name', 'c.name as cohort')
      .where('s.id', id)
      .first();
  }
}