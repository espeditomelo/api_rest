const bcryptjs = require('bcryptjs');

//'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface) {

     await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'John Limão',
          email: 'limao@gmail.com',
          password_hash: await bcryptjs.hash('1234567', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Paul Macaco',
          email: 'mac@gmail.com',
          password_hash: await bcryptjs.hash('1234567', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Jorge Réra',
          email: 'rera@gmail.com',
          password_hash: await bcryptjs.hash('1234567', 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
      );

  },

  async down () {}
};
