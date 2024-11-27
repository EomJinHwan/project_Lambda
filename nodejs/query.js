// ./query.js
const pool = require("./db");
const bcrypt = require('bcryptjs');

// 비밀번호 암호화
async function hashPassword(userPw) {
    try {
        // 비밀번호 암호화를 위한 salt 생성
        const salt = await bcrypt.genSalt(10);
        // 생성된 salt를 사용하여 비밀번호를 해시화
        const hashPw = await bcrypt.hash(userPw, salt);
        return hashPw; // 해시화된 비밀번호 반환
    } catch (error) {
        console.error("오류", error);
        // 암호화 오류를 상위 호출자에게 전달
        throw error;
    }
};

const INSERT = {
    //회원 가입 - RegisterRequest.js
    InsertUser: async (userId, userPw, userName, userPhone, userBirthDate) => {
        const query = "INSERT INTO member(userId, userPw, userName, userPhone, userBirthDate, created_at) VALUES(?,?,?,?,?,CURRENT_TIMESTAMP)";
        const values = [userId, userPw, userName, userPhone, userBirthDate];

        try {
            await pool.promise().query(query, values);
        } catch (error) {
            console.log("회원가입 쿼리문 실행 중 오류 발생")
            throw error;
        }
    },

    // 로그인 기록 - LoginRequest.js
    InsertLoginHistory: async (userId, ip_address) => {
        const query = "INSERT INTO login_history (userId, ip_address, history) VALUES (?, ?, CURRENT_TIMESTAMP)";
        const values = [userId, ip_address];

        try {
            await pool.promise().query(query, values);
        } catch (error) {
            console.log("로그 기록 쿼리문 실행 중 오류 발생")
            throw error;
        }
    },
};

const SELECT = {
    // 유저 찾기 쿼리
    FindUser: async (userId = null, userPhone = null, userBirthDate = null) => {
        let query;
        let values;

        if (userId && userPhone) { // 아이디와 폰번호로 맞는 아이디 찾기 - FindPassword.js
            query = "SELECT userId FROM member WHERE userId=? AND userPhone=?";
            values = [userId, userPhone];

        } else if (userBirthDate && userPhone) { // 생일과 폰번호로 아이디 찾기 - FindUserId.js
            query = "SELECT userId FROM member WHERE userBirthDate=? AND userPhone=?";
            values = [userBirthDate, userPhone];

        } else if (userId) { // 아이디 중복 여부 확인 - CheckUserIdDuplicate.js
            query = "SELECT userId FROM member WHERE userId = ?";
            values = [userId]

        }
        try {
            const [result] = await pool.promise().query(query, values);
            return result;
        } catch (error) {
            console.log("유저 찾는 쿼리중 오류 발생");
            throw error;
        }
    },

    // 기존 비밀번호 조회 - ChangePassword.js
    FindPassword: async (userId) => {
        const query = "SELECT userPw FROM member WHERE userId = ?";
        const values = [userId];
        try {
            const [result] = await pool.promise().query(query, values);
            return result[0].userPw;
        } catch (error) {
            console.log("기존 비밀번호 조회 쿼리중 오류 발생");
            throw error;
        }
    },

    // 각 사용자별 정보 불러오기 - LoginHistory_Admin.js
    GetUserInfo: async (userId) => {
        const query = "SELECT userId, ip_address, history FROM login_history WHERE userId = ?"
        const values = [userId];
        try {
            const [result] = await pool.promise().query(query, values);
            return result;
        } catch (error) {
            console.log("각 사용자별 정보 불러오는 쿼리중 오류 발생");
            throw error;
        }
    },

    // 사용자 정보 조회 - LoginRequest.js
    GetUser: async (userId) => {
        const query = 'SELECT userPw, userName FROM member WHERE userId = ?';
        const values = [userId];
        try {
            const [result] = await pool.promise().query(query, values);
            return result;
        } catch (error) {
            console.log("사용자 정보 조회 쿼리중 오류 발생");
            throw error;
        }
    },
};

const UPDATE = {
    // 새 비밀번호 업데이트 - ChangePassword.js
    UpdatePw: async (hashPw, userId) => {
        const updateQuery = "UPDATE member SET userPw = ? WHERE userId = ?";
        const updateValues = [hashPw, userId];
        try {
            await pool.promise().query(updateQuery, updateValues);
        } catch (error) {
            console.log("사용자 정보 조회 쿼리중 오류 발생");
            throw error;
        }
    },
};

module.exports = {
    hashPassword,
    INSERT,
    SELECT,
    UPDATE,
}