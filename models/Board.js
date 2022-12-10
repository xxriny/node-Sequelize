const { post } = require("../api")

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "PK",
      },
      title: {
        type: DataTypes.STRING(255),
        comment: "제목",
      },
      text: {
        type: DataTypes.STRING(255),
        comment: "내용",
      },
    },
    {
      charset: "utf8", 
      collate: "utf8_general_ci", 
      tableName: "tbl_board", 
      timestamps: true, 
      paranoid: false, 
    }
  )

  Board.associate = (models) => {
    Board.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
    })
    Board.hasMany(models.reply);
  }
  return Board;
}
