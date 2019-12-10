
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 91829, make: 'Toyota', model: 'Corolla', mileage: 200000},
      ]);
    });
};
