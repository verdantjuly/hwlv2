const express = require('express');
const connect = require('./schemas');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

const app = express();
const port = 3000;

connect();

app.use(express.json())
app.use("/api", [userRouter,postRouter,commentRouter])

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!")
})
