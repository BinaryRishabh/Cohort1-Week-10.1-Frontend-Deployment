const mongoose = require("mongoose");

async function connect() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Week7-1-Recoil-React");
}

connect()
.then(() => {
    console.log("database connected successfully");
})
.catch(err => {
    console.error(err);
})

module.exports = connect;