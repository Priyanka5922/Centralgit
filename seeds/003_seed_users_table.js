exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function() {
      // Inserts seed entries
      return knex('Users').insert([
        { UserID: 1, Name: 'Admin', Email: 'admin@example.com', Password: 'adminpass' },
        // Add more users as needed
      ]);
    });
};
