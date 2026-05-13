const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./User");
const WebsiteLog = require("./WebsiteLog");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Access Denied",
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = verified.id;

        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid Token",
        });
    }
};

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check empty fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "User Registered Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.post("/log", verifyToken, async (req, res) => {
    try {
        const {
            website,
            domain,
            timeSpent,
            category,
        } = req.body;

        const newLog = new WebsiteLog({
            userId: req.userId,
            website,
            domain,
            timeSpent,
            category,
        });

        await newLog.save();

        res.status(201).json({
            message: "Website Log Saved",
            data: newLog,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/logs", verifyToken, async (req, res) => {
    try {
        const logs = await WebsiteLog.find({
            userId: req.userId,
        }).sort({ createdAt: -1 });

        res.json(logs);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/analytics", verifyToken, async (req, res) => {
    try {
        const logs = await WebsiteLog.find({
            userId: req.userId,
        });

        let productiveTime = 0;
        let unproductiveTime = 0;
        let neutralTime = 0;

        logs.forEach((log) => {
            if (log.category === "Productive") {
                productiveTime += log.timeSpent;
            } else if (log.category === "Unproductive") {
                unproductiveTime += log.timeSpent;
            } else {
                neutralTime += log.timeSpent;
            }
        });

        res.json({
            totalLogs: logs.length,
            productiveTime,
            unproductiveTime,
            neutralTime,
            logs,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.put("/categories", verifyToken, async (req, res) => {
    try {
        const categories = req.body;

        const user = await User.findById(req.userId);

        user.categories = {
            ...user.categories,
            ...categories,
        };

        await user.save();

        res.json({
            message: "Categories Updated",
            categories: user.categories,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/categories", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        res.json(user.categories);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});

module.exports = router;