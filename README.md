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

## 2. jwt access token / refresh token을 통한 인증(v2)

<details>
<summary>Description</summary>
<div markdown="1">
- 서버에서 access token, refresh token을 생성하고, 저장
- client 또한 이 두 가지 token을 모두 저장

### 과정

0. 클라이언트는 권한 인증 요청 시마다 access token을 header에 넣어 보냄
1. 서버는 헤더 토큰 검증, payload 디코딩해서 권한 확인
   1-1. 토큰 만료 시 만료 응답 반환
2. 만료된 토큰 재발급 위해 access, refresh(내용X) token 둘 다 header에 실어 새로운 토큰 발급 요청
3. 서버는 refresh 토큰이 검증되면 새로 발급한 access token과 기존 refresh 토큰을 다시 반환.

### 고민사항

- refresh token을 유저에게도 반환하고, 받아야 하는 이유,,?
  => access token이 만료됐을 때 재발급 받기 위해서! 따라서 만료 됐을 때만 보내주면 된다.
- refresh token을 왜 DB에 저장해야할까?
  - Access Toekn 과 달리 매 요청마다 주고 받지 않기 때문에 탈취 당할 위험이 적으며, 요청 주기가 길기 때문에 별도의 저장소에 보관(정책마다 다르게 사용)
  - 탈취당했을 때 저장소에서 Refresh Token 정보를 삭제하면 Access Token 만료 후에 재발급이 안되게 강제 로그아웃 처리 가능
  - 일반적으로 **refresh token 속에는 Payload 없음 !!**
    - 따라서 "DB에 유저정보와 함께 조회"
- 만약 refresh token안에 payload를 넣는다면,,?
  => 이미 jwt는 암호화 처리가 되기 때문에, secret과 salt를 이용한다면 위변조 가능성이 없다.
  => 추가로, jwt 안에는 의미가 있는 payload값이 들어가기때문에 내용 판단 가능.
  => 하지만 1차적으로 존재하는 refresh token이냐는 것을 판단하는 용도!(성능상)
- access token은 따로 저장해주지 않아도 되는 것인가,,?
  - => env 파일에서 미리 정의 된 secret key를 통해 유효성 검증하면 된다.

</div>
</details>
