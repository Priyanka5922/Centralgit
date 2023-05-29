exports.up = function(knex) {
  return knex.schema.createTable('Admin', function(table) {
    table.increments('UserID').primary();
    table.string('Name').notNullable();
    table.string('Email').notNullable();
    table.string('Password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Users');
};
