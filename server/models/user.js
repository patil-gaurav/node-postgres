'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // notNull: true,
        len: {
          args: [4, 10],
          msg: 'Password length between 4 to 10 characters'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female'],
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCreate: (user, next) => {
        console.log('hooks');
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        // bcrypt.hash(user.password, 10, function(err, hash){
        //   user.password = hash;
        // });
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  // User.beforeCreate((user, next) => {
  //   user.password = bcrypt.hash(user.password, 10);
  // })
  return User;
};

var hashPassword = function(password){
  let passwordHash;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt);
  });
  console.log('-------4------------', passwordHash);
  return passwordHash;
}