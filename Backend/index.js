const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.get('/name', (req, res) => {
    res.send(`<h1>Anil Kumar Srivastava</h1>
        <h2>Shalini Srivastava</h2>
        <h3>Akasnsha Srivastava</h3>
        <h4>Prashasti Srivastava</h4>
        <h5>Rishabh Srivastava!</h5>`);
})

app.listen(3000);