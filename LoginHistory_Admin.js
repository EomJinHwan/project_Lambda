const Sequelize = require('sequelize');
const config = require('/opt/nodejs/config/config.json');
const db = require('/opt/nodejs/models');

const sequelize = new Sequelize('config.database', 'config.username', 'config.password', {
    host: 'config.host',
    dialect: 'mysql'
});

exports.handler = async (event) => {
    const userId = event.pathParameters?.userId;
    console.log(`userId : ${userId}`);

    try {
        // 각 사용자별 정보 불러오기
        const result = await db.LoginHistory.findAll({
            attributes: ['userId', 'ip_address', 'history'],
            where: { userId: userId }
        });

        if (result.length === 0) {
            console.log(`${userId} 님에 대한 정보가 없습니다`);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: `${userId} 님에 대한 정보가 없습니다`
                })
            }
        } else {
            console.log(`${userId} 님에 대한 정보가 있습니다`);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: `${userId} 회원에 대한 정보`,
                    results: result
                })
            }
        }
    } catch (error) {
        console.log("관리자 페이지에서 회원 정보 로드중 오류 발생", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: "회원정보 로드중 오류 발생"
            })
        }
    }
};
