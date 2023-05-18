
// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Blogs', [
//       {
//         title: 'First blog post',
//         content: 'This is the first blog post.',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         title: 'Second blog post',
//         content: 'This is the second blog post.',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Blogs', null, {});
//   }
// };
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Blogs', [
      {
        title: 'First blog post',
        content: 'This is the first blog post.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Second blog post',
        content: 'This is the second blog post.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Blogs', null, {});
  }
};
