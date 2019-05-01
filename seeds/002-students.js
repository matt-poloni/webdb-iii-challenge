exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        {name: 'Matt Poloni', cohort_id: 2},
        {name: 'Adetunji Shennaike', cohort_id: 2}
      ]);
    });
};
