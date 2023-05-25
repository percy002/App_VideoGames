const { DataTypes } = require('sequelize');

module.exports =  (sequelize) => {
    sequelize.define('Genre', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps : false
    });
}