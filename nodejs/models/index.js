'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production'; // '' 부분 수정해서 사용 가능
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  // 환경변수로 db 연결
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // 혹은 config.json으로 직접 연결
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// models 디렉토리 내 모든 모델(테이블) 불러오기(index제와)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // 모델을 sequelize와 DataTypes와 함께 초기화하여 db 객체에 저장
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
// 관계 정의를 한 경우에만 associate 사용
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
