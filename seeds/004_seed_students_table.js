exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Students').del()
    .then(function() {
      // Inserts seed entries
      return knex('Students').insert([
        { StudentID: 1, Address: 'Student 1 Address', ProfilePicture: 'student1.jpg', CurrentSchoolID: 1, PreviousSchoolID: 2, ParentsDetails: 'Parent 1 Details', AssignedTeacherID: 1, ProfileApproved: true },
        // Add more students as needed
      ]);
    });
};
