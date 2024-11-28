sequelize를 사용하여 ORM 객체 관계 매핑

naver, sms 제외

findAll - 결과값이 무조건 배열로 옴

result.legnth로 비교해야함, 값이 없으면 빈배열 []이 오기때문

result[0].@로 값 꺼내올 수 있음

findOne - 결과값이 단일 값으로 옴

result 로 비교가능, 값이 없으면 null 반환

result.@로 값 꺼내올 수 있음
