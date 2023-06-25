const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/userprofile.model");

const createUser = async (req, res) => {
    const { username, phone, password } = req.body;
    // Hash and salt password

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // validate data
        if (!username || !phone || !password) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }
        if (username.length > 50) {
            res.json({
                error: "Username is too long",
            });
            return;
        }
        if (password.length > 20) {
            res.json({
                error: "password is too long",
            });
            return;
        }
        if (password.length < 6) {
            res.json({
                error: "password is too short",
            });
            return;
        }
        if (!phone.match(/^\d{10}$/)) {
            res.json({
                error: "Phone number is not in the correct format",
            });
            return;
        }

        // const hasExistUser = await pool.query("SELECT * FROM userprofile WHERE userprofile.phone=$1", [phone]);
        const hasExistUser = await UserProfile.findAll({
            where: {
                phone,
            },
        });
        if (hasExistUser.length > 0) {
            res.json({
                code: 1001,
                error: "This phone number already exists",
            });
            return;
        }

        // const result = await pool.query("INSERT INTO userprofile (username, phone, password, role) VALUES ($1, $2, $3, $4) RETURNING id", [
        //     username,
        //     phone,
        //     hashedPassword,
        //     0,
        // ]);
        const result = await UserProfile.create({
            username,
            phone,
            password: hashedPassword,
            role: 0,
        });
        const userId = result.id;

        // Generate jwt token
        const token = jwt.sign({ userId }, "secret");

        res.json({
            data: {
                token,
                username,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};
const login = async (req, res) => {
    const { phone, password } = req.body;
    if (!phone.match(/^\d{10}$/)) {
        res.json({
            error: "Phone number is not in the correct format",
        });
        return;
    }
    // const result = await pool.query("SELECT * FROM userprofile WHERE userprofile.phone = $1", [phone]);
    const result = await UserProfile.findOne({
        where: {
            phone,
        },
    });
    const user = result;

    if (!user) {
        return res.json({
            error: "Invalid phone",
        });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({
            error: "Invalid password",
        });
    }

    // Generate jwt token
    const token = jwt.sign({ userId: user.id }, "secret");

    res.json({ data: { token, username: user.username, id: user.id } });
};
const getUserById = async (req, res) => {
    console.log("req.decoded", req.decoded);
    const { id } = req.params;
    if (!id) {
        res.json({
            error: "Missing id",
        });
        return;
    }
    // const result = await pool.query("SELECT * FROM userprofile WHERE userprofile.id = $1", [id]);
    const user = await UserProfile.findOne({
        where: {
            id,
        },
    });
    // const user = result.rows[0];

    if (!user) {
        return res.json({
            error: "Current user not found",
        });
    }

    res.json({
        data: {
            user: {
                ...user,
                password: undefined,
            },
        },
    });
};
const getMe = async (req, res) => {
    try {
        const { userId } = req.decoded;
        if (!userId) {
            res.json({
                error: "Missing id",
            });
            return;
        }
        // const result = await pool.query("SELECT * FROM userprofile WHERE userprofile.id = $1", [userId]);
        // const user = result.rows[0];
        const user = await UserProfile.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            return res.json({
                error: "Current user not found",
            });
        }

        res.json({
            data: {
                user: {
                    ...user,
                    password: undefined,
                },
            },
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
};

module.exports = {
    createUser,
    login,
    getUserById,
    getMe,
};
