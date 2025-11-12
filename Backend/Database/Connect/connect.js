const mongoose = require("mongoose");

async function connect() {
    await mongoose.connect(process.env.MONGO_URI,
        {dbName: "Week-10-1-Frontend-deployment"}
    );
}

connect()
.then(() => {
    console.log("database connected successfully");
})
.catch(err => {
    console.error(err);
})

module.exports = connect;