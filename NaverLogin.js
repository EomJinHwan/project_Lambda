// 환경 변수 불러오기 구성(Configuration)->환경변수(Environment variables)
const client_id = process.env.client_id;
const state = process.env.state;
const redirectURI = encodeURI(process.env.redirectURI);
const api_url ="";

exports.handler = async (event) => {
    const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            api_url: api_url
        })
    };
};
