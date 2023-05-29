exports.up = function(knex) {
  return knex.schema.createTable('Students', function(table) {
    table.integer('StudentID').primary();
    table.string('Address');
    table.string('ProfilePicture');
    table.integer('CurrentSchoolID').unsigned();
    table.integer('PreviousSchoolID').unsigned();
    table.string('ParentsDetails');
    table.integer('AssignedTeacherID').unsigned();
    table.boolean('ProfileApproved');
    table.foreign('StudentID').references('Users.UserID');
    table.foreign('CurrentSchoolID').references('Schools.SchoolID');
    table.foreign('PreviousSchoolID').references('Schools.SchoolID');
    table.foreign('AssignedTeacherID').references('Teachers.TeacherID');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Students');
};
