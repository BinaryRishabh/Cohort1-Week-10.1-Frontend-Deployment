const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const connect = require("./Database/Connect/connect");
const adminRouter = require("./Routes/admin");
const courseRouter = require("./Routes/course");
const userRouter = require("./Routes/user");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();

app.use("/admin", adminRouter);
app.use("/course", courseRouter);
app.use("/user", userRouter);

app.use(express.static("public"));
app.use("/hello", (req, res) => {
    res.sendFile(path.join(__dirname, "public/"));
})

app.listen(3000);