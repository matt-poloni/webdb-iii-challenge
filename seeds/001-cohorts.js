exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function () {
      return knex('cohorts').insert([
        {name: 'Web 17'},
        {name: 'Web 18'}
      ]);
    });
};
