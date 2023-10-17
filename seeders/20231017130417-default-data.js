const bcrypt = require('bcryptjs');
const SEED_USER = {
  name: 'Ken',
  email: 'ken@example.com',
  password: '12345678',
};
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert(
        'Users',
        [
          {
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      )
      .then((userId) =>
        queryInterface.bulkInsert(
          'Notes',
          Array.from({ length: 3 }).map((_, i) => ({
            title: `title-${i}`,
            content: `content-${i}`,
            UserId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
          {}
        )
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {}).then(() => queryInterface.bulkDelete('Users', null, {}));
  },
};
