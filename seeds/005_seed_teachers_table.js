exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Teachers').del()
    .then(function() {
      // Inserts seed entries
      return knex('Teachers').insert([
        { TeacherID: 1, Address: 'Teacher 1 Address', ProfilePicture: 'teacher1.jpg', CurrentSchoolID: 1, PreviousSchoolID: 2, Experience: '5 years', ExpertiseInSubjects: 'Math, Science' },
        // Add more teachers as needed
      ]);
    });
};
