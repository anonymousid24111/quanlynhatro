const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const userRoute = require("./routers/user.route");
const apartmentRoute = require("./routers/apartment.route");
const roomRoute = require("./routers/room.route");
const { sequelize } = require("./db");
try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use((req, res, next) => {
    if (req.user) {
        req.user.userId = parseInt(req.user.userId);
    }
    next();
});
app.use("/api/user", userRoute);
app.use("/api/apartment", apartmentRoute);
app.use("/api/room", roomRoute);
// Start server
app.listen(3000, () => console.log("Server started on port 3000"));
