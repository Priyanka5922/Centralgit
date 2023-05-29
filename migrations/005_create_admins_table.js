exports.up = function(knex) {
  return knex.schema.createTable('Admins', function(table) {
    table.integer('AdminID').primary();
    table.foreign('AdminID').references('Users.UserID');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Admins');
};
