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

app.use(cors({

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

app.use(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);