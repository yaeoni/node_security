# API security - node

## 1. jwt token 을 통한 인증(v1)

- 로그인과 같은 1차 인증을 거친 후 라고 가정
- 이후 매 API 마다 token이 만료되지 않았는지(세션에 토큰이 존재하는지)를 확인하며 권한을 부여

#### 주의사항

- postman 으로 테스트 시 받은 토큰값을 header 속 key : Authorization 의 value값으로 넣어 보내야한다.
