const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
})

module.exports = User;