const express = require("express");
const {v4} = require("uuid");
const Admin = require("../Database/Models/admin");
const Course = require("../Database/Models/course");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();


// Add a new course.
router.post("/addCourse", authenticate, async (req, res) => {
    
    const { email } = req.user;
    // console.log(req.body);

    if(email) {
        const { title, description, imageLink, price } = req.body;
        // console.log(title +" "+ description +" "+ imageLink +" "+ price);
        
        const courseWithId = {
            title,
            description,
            imageLink: (imageLink) ? imageLink : "https://blog.ipleaders.in/wp-content/uploads/2021/05/online-course-blog-header.jpg",
            price,
            id: v4()
        }
        // console.log(courseWithId);
        
        const course = await new Course(courseWithId).save();
        // console.log(course.id);
        
        await Admin.findOneAndUpdate(
            { email }, {
              $push: { createdCourses: course._id }
            }, {
            $new: true
        })
    }

    return res.status(201).json({
        message: "Course created successfully."
    });
});


// fecth all courses of the admin.
router.get('/allCourses', authenticate, async (req, res) => {
    const { email } = req.user;

    const user = await Admin.findOne({ email }).populate("createdCourses");
    // console.log(user.createdCourses);
    
    if(user) {
        return res.status(200).json({
            message: "Fetched all courses of user: " + email,
            courses: user.createdCourses
        });
    }
    else {
        return res.status(401).json({
            message: "Can't get a user with the desired email."
        })
    }
});

// fetch a particular course.
router.get('/:courseId', authenticate, async (req, res) => {
    const { courseId } = req.params;
    
    const course = await Course.findOne({ id: courseId });
    
    if(course) {
        res.status(200).json({ 
            message: "We have found the course successfully",
            course: course
        })
    }
    else {
        res.status(403).json({
            message: "Cousre not found with such id."
        })
    }
})

// update a course.
router.put("/courseUpdate/:courseId", (req, res) => {
    // console.log(req.body);
    
    res.status(200).json({
        message: "Course updated successfully"
    })
})


module.exports = router;