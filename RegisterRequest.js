const pool = require('/opt/nodejs/db');
const bcrypt = require('bcryptjs');

exports.handler = async (event) => {
    const { userId, userPw, userName, userPhone, userBirthDate } = JSON.parse(event.body);

    try {
        if (!userId | !userPw | !userName | !userPhone | !userBirthDate) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: "빈칸이 없게 작성해 주세요" })
            };
        }

        // userBirthDate를 Date 객체로 변환한 후, ISO 형식의 날짜 문자열(YYYY-MM-DD)로 변환
        const birthDate = new Date(userBirthDate).toISOString().split('T')[0];

        // 비밀번호 암호화
        const salt = await bcrypt.genSalt(10);
        const hashPw = await bcrypt.hash(userPw, salt);

        // 데이터베이스에 정보 등록
        const query = "INSERT INTO member(userId, userPw, userName, userPhone, userBirthDate, created_at) VALUES(?,?,?,?,?,CURRENT_TIMESTAMP)";
        const values = [userId, hashPw, userName, userPhone, birthDate];
        await pool.promise().query(query, values);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "회원가입에 성공했습니다" })
        };

    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: '서버 오류가 발생했습니다.' }),
        };
    }
};
