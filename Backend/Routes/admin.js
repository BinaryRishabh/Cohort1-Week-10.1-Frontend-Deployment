const express = require("express");
const { signup, authenticate } = require("../middleware/authenticate");
const Admin = require("../Database/Models/admin");

const router = express.Router();

router.get("/verify", authenticate, async (req, res) => {
    const { email } =  req.user;
    // console.log(email);
    const admin = await Admin.findOne({ email });
    // console.log(admin);
    
    res.status(200).json({
        admin: (admin) ? "yes" : "false",
        user: req.user.email,
        message: `${req.user.email} is loggedin.`
    })
})

router.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    // console.log(req.body.email);

    if(email && password) {
        const token = signup(req.body);
        const { email } = req.body;
        const user = await Admin.findOne({ email });
        if(user) {
            return res.status(401).json({ message: "User already exists. Please signin." });
        }
        new Admin(req.body).save();
        // console.log(token);
        res.status(201).json({ 
            message: "Admin created successfully", 
            token: token
        });
    }
    else {
        res.status(403).json({ 
            message: "email or password is missing"
        });
    }
});

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    // console.log(email +" "+ password);
    
    const user = await Admin.findOne({ email, password });
    // console.log(user);
    
    if(user) {
        const token = signup(req.body);
        return res.status(200).json({
            message: "User signned in successfully",
            token: token
        });
    }
    return res.status(403).json({ 
        message: "User mail does'nt exists plesae signup first/ please check inputs again."
    });
});

module.exports = router;