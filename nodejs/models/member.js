// ./models/member.js
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define(
      'Member', // 모델 이름
      {
        id: {
          type: DataTypes.INTEGER, // 컬럼 데이터 타입
          allowNull: false,        // Not Null 설정
          autoIncrement: true,     // 자동으로 값 증가 AI
          primaryKey: true,        // 기본키 설정
        },
        userId: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true, 
        },
        userPw: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userPhone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        userBirthDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
      },
      { // 테이블 옵션 설정
        tableName: 'member', // 테이블 명 선언
        freezeTableName: true, // 모델명 수정 x
        timestamps: false, // `created_at`이 존재하므로 `createdAt`, `updatedAt`은 사용하지 않음
      }
    );
    return Member;
  };
  