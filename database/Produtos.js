const Sequelize = require("sequelize")
const connection = require("./database")

const Produtos = connection.define('produtos',{
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  briefDescription:{
      type: Sequelize.TEXT,
      allowNull:false
  },  
  largeDescription:{
    type: Sequelize.TEXT,
    allowNull:false
}, 
  price:{
      type: Sequelize.INTEGER,
      allowNull:false
  },  
  category:{
    type: Sequelize.STRING,
    allowNull:false
  },
  img:{
    type: Sequelize.STRING,
    allowNull:false
  }, 
  view:{
    type: Sequelize.BOOLEAN,    
    defaultValue: false,
    allowNull:false
  } 
});
Produtos.sync({force:false}).then(()=>{})

module.exports = Produtos
