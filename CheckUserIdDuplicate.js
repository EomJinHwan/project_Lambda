const pool = require('/opt/nodejs/db');

exports.handler = async (event) => {
  try {
    const userId = event.pathParameters?.userId;
    console.log(`userId: ${userId}`);

    const query = "SELECT userId FROM member WHERE userId = ?";
    const values = [userId]
    const [result] = await pool.promise().query(query, values);

    if (result.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: '사용 가능한 아이디입니다' }),
      };
    } else {   
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, message: '사용 불가능한 아이디입니다' }),
      };
    }
  } catch (error) {
    console.error('중복 체크 중 오류 발생:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: '아이디 찾기 중 오류 발생' }),
    };
  }
};
