const mongoose = require("mongoose")

const userScheama = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true

    },
    password: {
        type: String,


    },
    confirm: {
        type: String,


    }

},
    {
        versionKey: false,
    }
)


module.exports = mongoose.model("users", userScheama)