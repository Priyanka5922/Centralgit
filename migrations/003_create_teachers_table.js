exports.up = function(knex) {
  return knex.schema.createTable('Teachers', function(table) {
    table.integer('TeacherID').primary();
    table.string('Address');
    table.string('ProfilePicture');
    table.integer('CurrentSchoolID').unsigned();
    table.integer('PreviousSchoolID').unsigned();
    table.string('Experience');
    table.string('ExpertiseInSubjects');
    table.foreign('TeacherID').references('Users.UserID');
    table.foreign('CurrentSchoolID').references('Schools.SchoolID');
    table.foreign('PreviousSchoolID').references('Schools.SchoolID');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Teachers');
};

