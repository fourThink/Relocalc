
exports.up = function(knex, Promise) {
  return Promise.all([ 
  	knex.schema.createTable('crimes', function (table){
      	table.string('id').primary();
      	table.string('type');
        table.string('street');
      	table.string('city_state');
        table.string('latitude');
        table.string('longitude');
      	table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('crimes')
  ])
};
