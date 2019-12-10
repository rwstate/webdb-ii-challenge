
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.integer('VIN').unique().notNullable()
    tbl.text('make').unique().notNullable()
    tbl.text('model').notNullable()
    tbl.integer('mileage').notNullable()
    tbl.text('transmission')
    tbl.text('title_status')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cars');
};

