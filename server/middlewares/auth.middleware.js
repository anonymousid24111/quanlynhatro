const jwt = require("jsonwebtoken");

let isAuth = async (req, res, next) => {
    console.log("req.headers", req.headers);
    const breaerToken =
        req.body?.token ||
        req.query?.token ||
        req.headers["x-access-token"] ||
        req.headers.authorization;
    const tokenFromClient = breaerToken.split(" ")[1];
    try {
        if (!tokenFromClient) {
            res.json({
                error: "Token is null",
            });
            return;
        }
        const decoded = await jwt.verify(tokenFromClient, "secret");
        console.log("decoded", decoded);
        req.decoded = decoded;
        next();
    } catch (error) {
        console.log("errr");
        res.json(error?.message);
    }
};

module.exports = {
    isAuth,
};
