exports.up = function(knex) {
  return knex.schema.createTable('Schools', function(table) {
    table.integer('SchoolID').primary();
    table.string('Name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Schools');
};
