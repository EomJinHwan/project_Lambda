const bcrypt = require('bcryptjs');
const pool = require('/opt/nodejs/db');
const requestIp = require('request-ip');

exports.handler = async (event) => {
    const { userId, userPw } = JSON.parse(event.body);
    // IP 주소 가져오기
    const ip_address = requestIp.getClientIp(event);

    try {
        // 사용자 정보 조회 (비밀번호는 해시로 저장됨)
        const query = 'SELECT userPw, userName FROM member WHERE userId = ?'
        const values = [userId]
        const [result] = await pool.promise().query(query, values);

        // 아이디 없음
        if (result.length === 0) {
            return {
                statusCode: 401,
                body: JSON.stringify({ success: false, message: "조건에 맞는 아이디가 없습니다" }),
            };
        } else { // 아아디 있음
            const user = result[0];
            const isMatch = await bcrypt.compare(userPw, user.userPw);
            console.log('isMatch: ', isMatch)

            if (isMatch) {
                const query = "INSERT INTO login_history (userId, ip_address, history) VALUES (?, ?, CURRENT_TIMESTAMP)";
                const values = [userId, ip_address];
                await pool.promise().query(query, values);
                
                return {
                    statusCode: 200,
                    body: JSON.stringify({ success: true, message: "로그인 성공", name: user.userName, id: userId }),
                }

            } else {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ success: false, message: "비밀번호가 일치하지 않습니다" }),
                };
            }
        };
    } catch (error) {
        console.error("로그인 실행중 오류 발생:", error); // 서버 로그에 에러 기록
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "서버 오류가 발생했습니다" }),
        };
    }
};
