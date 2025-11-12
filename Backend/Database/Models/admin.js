const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    email: String,
    password: String,
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId,  ref: "Course" }]
})

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;