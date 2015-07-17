
exports.up = function(knex, Promise) {
  return knex.schema.createTable('crimes', function (table){
  	table.increments();
  	table.string('name');
  	table.string('location');
  	table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  
};
