const express = require("express")
const router = express.Router()
const users = require("../schemas/users")
const JWT = require("jsonwebtoken")

// cookieParser
const cookieParser = require('cookie-parser')
router.use(cookieParser())

// ID PW 조건 정규식
const idcheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const passwordcheck = /^[A-Za-z\d]{4,}$/

router.post('/signup', async (req, res) => {
    const { nickname, password, confirm } = req.body
    const targetnick = await users.findOne(nickname).nickname
    if (targetnick == nickname) {
        return res.status(400).json({ message: "중복된 닉네임이 존재합니다." });
    } else if (!idcheck.test(nickname)) {
        return res.status(400).json({ message: "닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해 주세요." });
    } else if (!passwordcheck.test(password) && !password.includes(nickname)) {
        return res.status(400).json({ message: "비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함될 수 없습니다." });
    } else if (password !== confirm) {
        return res.status(400).json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });
    } else if (targetnick !== nickname && idcheck.test(nickname) && passwordcheck.test(password) && password === confirm) {
        await users.create({ nickname, password })
        return res.status(201)
            .json({ message: "계정이 생성되었습니다. 당신의 아이디는 " + nickname + "입니다." })
    }
})

router.post('/login', async (req, res) => {
    const { nickname, password } = req.body
    const target = await users.findOne({ nickname })
    if (target.password == password) {
        const token = JWT.sign({ nickname, password}, "dayoung", { expiresIn: 3600 })
        let expires = new Date();
        expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.
        res.cookie('token', token, {
            expires: expires
          });
        return res.status(200).json({ message: "로그인에 성공하였습니다." , token}).end()
    } else {
        return res.status(400).json({ message: "로그인에 실패하였습니다." })
    }
})


module.exports = router