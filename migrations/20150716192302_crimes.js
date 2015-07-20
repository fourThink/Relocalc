
exports.up = function(knex, Promise) {
  return Promise.all([ 
  	knex.schema.createTable('crimes', function (table){
      	table.increments();
      	table.string('name');
      	table.string('location');
      	table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('crimes')
  ])
};
