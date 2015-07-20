
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('restaurants', function(table){
      table.string('facility_id').primary().unique();
  		table.string('name');
  		table.text('address');
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
