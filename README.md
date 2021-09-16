# API security - node

## 1. jwt access token만을 통한 인증(v1)

<details>
<summary>Description</summary>
<div markdown="1">

- 로그인과 같은 1차 인증을 거친 후 라고 가정
- 이후 매 API 마다 token이 만료되지 않았는지(세션에 토큰이 존재하는지)를 확인하며 권한을 부여

### 과정

0. (if) token이 client 저장소에 없다면 서버에 getToken 요청 보냄
1. client -> server 요청 시마다 token을가지고 verify token middleware 거침
2. token이 만료됐다면 재발급 받기

#### 주의사항

- postman 으로 테스트 시 받은 토큰값을 header 속 key : Authorization 의 value값으로 넣어 보내야한다.

##### 결과

### /v1/getToken

![image](https://user-images.githubusercontent.com/63635886/133563400-dadd722f-66bd-48a3-b620-5f803268aa49.png)

### /v1/verifyToken

![image](https://user-images.githubusercontent.com/63635886/133563533-0ac42045-35d6-4f6c-bd16-9dfce18c9761.png)

</div>
</details>
