const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    id: String,
    title: String,
    description: String,
    imageLink: String,
    price: Number,
    published: Boolean
})

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;