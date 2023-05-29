exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Admins').del()
    .then(function() {
      // Inserts seed entries
      return knex('Admins').insert([
        { AdminID: 1 },
        // Add more admins as needed
      ]);
    });
};
