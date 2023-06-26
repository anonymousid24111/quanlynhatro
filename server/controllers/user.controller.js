const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/userprofile.model");
const { USER_ROLE } = require("../consts/user.const");
const { Op } = require("sequelize");

const createUser = async (req, res) => {
    // Hash and salt password

    try {
        const { username, phone, password, role: newRole } = req.body;
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
            role: newRole || USER_ROLE.Tenant,
        });
        const { id, role, username: resultUsername } = result;

        // Generate jwt token
        const token = jwt.sign(
            { id, role, username: resultUsername },
            "secret"
        );

        res.json({
            data: {
                token,
                username: resultUsername,
                role,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};
const updateUser = async (req, res) => {
    // Hash and salt password

    try {
        const { id } = req.params;
        const { username, phone, password, role: newRole } = req.body;
        // validate data
        if (!username || !phone) {
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
        // if (password.length > 20) {
        //     res.json({
        //         error: "password is too long",
        //     });
        //     return;
        // }
        // if (password.length < 6) {
        //     res.json({
        //         error: "password is too short",
        //     });
        //     return;
        // }
        if (!phone.match(/^\d{10}$/)) {
            res.json({
                error: "Phone number is not in the correct format",
            });
            return;
        }

        const hasExistUser = await UserProfile.findAll({
            where: {
                phone,
                id: {
                    [Op.ne]: id,
                },
            },
        });
        if (hasExistUser.length > 0) {
            res.json({
                code: 1001,
                error: "This phone number already exists",
            });
            return;
        }

        // const hasExistUser = await pool.query("SELECT * FROM userprofile WHERE userprofile.phone=$1", [phone]);
        const currentUser = await UserProfile.update(
            {
                phone,
                username,
                role: newRole,
            },
            {
                where: {
                    id,
                },
            }
        );
        if (!currentUser) {
            res.json({
                code: 1001,
                error: "Current user is not exist",
            });
            return;
        }
        console.log("currentUser", currentUser);

        // const result = await pool.query("INSERT INTO userprofile (username, phone, password, role) VALUES ($1, $2, $3, $4) RETURNING id", [
        //     username,
        //     phone,
        //     hashedPassword,
        //     0,
        // ]);
        // const result = await UserProfile.fi({
        //     username,
        //     phone,
        //     password: hashedPassword,
        //     role: newRole || USER_ROLE.Tenant,
        // });
        // const { id, role, username: resultUsername } = result;

        // // Generate jwt token
        // const token = jwt.sign(
        //     { id, role, username: resultUsername },
        //     "secret"
        // );

        res.json({
            data: currentUser,
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
    const user = await UserProfile.findOne({
        where: {
            phone,
        },
    });

    const { id, role, username } = user || {};

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
    const token = jwt.sign({ id, role, username }, "secret");

    res.json({ data: { token, id, role, username, phone } });
};
const getUserById = async (req, res) => {
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
    user.password = undefined;
    // const user = result.rows[0];

    if (!user) {
        return res.json({
            error: "Current user not found",
        });
    }

    res.json({
        data: {
            id: user.id,
            username: user.username,
            phone: user.phone,
            role: user.role,
        },
    });
};
const getTenants = async (req, res) => {
    const { id, role } = req.decoded;
    if (role !== USER_ROLE.Admin) {
        res.json({
            error: "Don't have permission",
        });
        return;
    }
    if (!id) {
        res.json({
            error: "Missing id",
        });
        return;
    }
    // const result = await pool.query("SELECT * FROM userprofile WHERE userprofile.id = $1", [id]);
    const users = await UserProfile.findAll({
        attributes: ["id", "username", "phone", "role"],
    });

    // const user = result.rows[0];

    if (!users) {
        return res.json({
            error: "Current user not found",
        });
    }

    res.json({
        items: users,
    });
};

const getMe = async (req, res) => {
    try {
        const { id } = req.decoded;
        if (!id) {
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
                id: user.id,
                username: user.username,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
};
const deleteTenant = async (req, res) => {
    try {
        const { id: currentId } = req.decoded;
        const { id } = req.params;
        if (!id) {
            res.json({
                error: "Missing id",
            });
            return;
        }
        // const result = await pool.query("SELECT * FROM userprofile WHERE userprofile.id = $1", [userId]);
        // const user = result.rows[0];
        const user = await UserProfile.destroy({
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
                user,
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
    deleteTenant,
    login,
    getUserById,
    getMe,
    getTenants,
    updateUser,
};
