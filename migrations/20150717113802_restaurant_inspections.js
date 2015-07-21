
exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.createTable('restaurant_inspections', function (table){
	  table.increments();
	  table.string('restaurant_id').references('id').inTable('restaurants');
	  table.integer('score');
	  table.dateTime('date');
	  table.timestamps();
		})
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('restaurant_inspections')
  ])
};
