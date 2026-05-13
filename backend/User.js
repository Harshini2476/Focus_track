const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {

        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        categories: {
            type: Object,
            default: {
                github: "Productive",
                leetcode: "Productive",
                stackoverflow: "Productive",
                youtube: "Unproductive",
                instagram: "Unproductive",
                facebook: "Unproductive",
            },
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
