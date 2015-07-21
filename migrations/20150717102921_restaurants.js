
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('restaurants', function(table){
      table.string('id').primary();
  		table.string('name');
  		table.string('address');
  		table.string('latitude');
  		table.string('longitude');
  		table.timestamps();
  	})
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('restaurants')
  ])
};
