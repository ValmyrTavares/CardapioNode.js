const Sequelize = require('sequelize')

const connection = new Sequelize('bancogourmet',' valmyrlima','Amanda230406',{
    host:'mysql743.umbler.com',
    dialect:'mysql'
});

module.exports = connection