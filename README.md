이전 람다 함수에서

쿼리문 모듈화를 위한 query-layer추가

본문코드에서 쿼리문 삭제

layer query.js 파일에서 쿼리문 import 해서 사용

FindUser 사용시 변수순서 주의 userId, userPhone, userBirthDate 고정
사용 안하는건 null로 표시해줘야 정상 작동
ex) userId 사용 안하면 (null, userPhone, userBirthDate)

naver, sms 제외
