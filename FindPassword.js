// index.js
const pool = require('/opt/nodejs/db');

exports.handler = async (event) => {
    const { userId, userPhone } = JSON.parse(event.body);

    try {
        const query = "SELECT userId FROM member WHERE userId=? AND userPhone=?";
        const values = [userId, userPhone];
        const [result] = await pool.promise().query(query, values);

        if (result.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: "조건에 맞는 아이디가 없습니다" })
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: "조건에 맞는 아이디가 있습니다", userId: result[0].userId })
            };
        };
    } catch (error) {
        console.error("비밀번호 찾기 사용자 정보 확인 중 오류 발생:", error); // 서버 로그에 에러 기록
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "서버 오류가 발생했습니다" })
        }
    }
};
