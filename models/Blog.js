const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const User = require('./User');
// const Comment = require('./Comment')


class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'username',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);



// Blog.belongsTo(User, {
//   foreignKey: 'user_id',
// });


module.exports = Blog;
