const { SELECT } = require('/opt/nodejs/query');

exports.handler = async (event) => {
  try {
    const userId = event.pathParameters?.userId;
    console.log(`userId: ${userId}`);

    // 아이디 중복 여부 확인
    const result = await SELECT.FindUser(userId);

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
