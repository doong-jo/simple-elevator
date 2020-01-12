# simple-elevator

## 기능

1. 엘리베이터
   - 호출한 층수와 가장 가까운 엘리베이터 호출
   - 모두 이동 중일 시엔 호출 불가
2. 이동 내역 저장(DB)
3. 슬랙 알림
   - 20층 이상 이동한 경우 슬랙으로 점검 필요 알림

## 데모

### Preview

![preview](https://kr.object.ncloudstorage.com/etc/simple-elevator-preview.gif)

### Full Video: [Google Drive 업로드](https://drive.google.com/file/d/1chARVnLeATj-zD_TyY8HWomdiKJAdgU-/view?usp=sharing)

## 기술 스택

- Vanilla JS
- Node.js, Express
- MongoDB

## 실행 방법

1. [MongoDB 설치](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)

   1. Database 생성 (name: hogang)
   2. Collection 생성 (name: move)

2. 프로젝트 설치 및 실행

```sh
# install
cd server
yarn

# execute
yarn start
```

3. [https://localhost:3000](https://localhost:3000) 접속
