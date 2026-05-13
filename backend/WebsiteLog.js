const mongoose = require("mongoose");

const WebsiteLogSchema = new mongoose.Schema(
    {

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        website: {
            type: String,
            required: true,
        },

        domain: {
            type: String,
            required: true,
        },

        timeSpent: {
            type: Number,
            required: true,
            default: 0,
        },

        category: {
            type: String,
            enum: ["Productive", "Neutral", "Unproductive"],
            default: "Neutral",
        },

        visitDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("WebsiteLog", WebsiteLogSchema);