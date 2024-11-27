기존 코드들 Lambda로 변환

db 연결은 mysql2 모듈을 layer 사용

암호화 모듈 layer로 사용 

의존성 문제로 인해 bcrypt 대신 bcryptjs 사용

db를 레이어로 사용 하여 /opt/nodejs/db 경로가 됌

/opt는 Lambda 기본 경로
람다에서 Node.js 런타임 인식을 하려면 폴더명이 nodejs

기존 코드와 다른점

요청 본문 처리방식 - 기존: req.body  / 람다: JSON.parse(event.body)

응답 형식 방식 - 기존: res.status().json() / 람다: return { statusCode, body }
