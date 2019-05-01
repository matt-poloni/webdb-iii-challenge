const db = require('../dbConfig');

module.exports = {
  getCohortStudents: function (id) {
    return db('students as s')
      .join('cohorts as c', 'c.id', 's.cohort_id')
      .select('s.id', 's.name')
      .where('s.cohort_id', id);
  }
}