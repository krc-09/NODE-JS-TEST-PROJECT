const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Shop = sequelize.define('shop',

  {
    id:{

      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    
   price:{
      type:Sequelize.INTEGER,
      allowNull:false
     
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
       
      },
   item:{
      type:Sequelize.STRING,
      allowNull:false
    },
  description:{
      type:Sequelize.STRING,
      
  }

  });
module.exports = Shop;