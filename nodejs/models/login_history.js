// ./models/login_history.js
module.exports = (sequelize, DataTypes) => {
    const LoginHistory = sequelize.define(
      'LoginHistory', // 모델 이름
      {
        history_number: {
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
        ip_address: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        history: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      { // 테이블 옵션 설정
        tableName: 'login_history', // 테이블 명 선언
        freezeTableName: true, // 모델명 수정 x
        timestamps: false, // `history` 컬럼이 타임스태프 역할을 하므로 `createdAt`, `updatedAt`은 사용하지 않음
      }
    );
    return LoginHistory;
  };
  