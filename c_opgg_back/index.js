// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

const userRouter = require('./routes/user');

app.use(cors());

// JSON 파싱 미들웨어
app.use(express.json());

// 라우터 적용
app.use('/user', userRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`REST API 서버가 http://localhost:${port} 에서 실행 중`);
});