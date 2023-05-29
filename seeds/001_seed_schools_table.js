exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Schools').del()
    .then(function() {
      // Inserts seed entries
      return knex('Schools').insert([
        { SchoolID: 1, Name: 'School 1' },
        { SchoolID: 2, Name: 'School 2' },
        // Add more schools as needed
      ]);
    });
};
