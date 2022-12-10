'use strict';
module.exports = (sequelize, DataTypes) => {
    const reply = sequelize.define(
      "reply",
      {
        idx: {
          type: DataTypes.INTEGER,
        allowNull : false,
        },
        writer: {
          type: DataTypes.STRING(255),
          comment: "제목",
        },
        text: {
          type: DataTypes.STRING(255),
          comment: "내용",
        },
      },
      {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "tbl_reply", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: false, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      }
    );
    reply.associate = function(models){
        reply.belongsTo(models.Board,{
            foreignKey: "idx"
        })
    };
    return reply;
  }
  