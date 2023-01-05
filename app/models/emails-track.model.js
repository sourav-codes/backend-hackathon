const mongoose = require('mongoose');
const emailSchema = new mongoose.Schema({
    mailInboxId: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    senderEmailId: {
        type: String,
        required: [true, 'Please enter an email'],
    },
    senderName: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["SPOOF", "VERIFIED", "PENDING", "BLOCKED"],
        default: "PENDING"
    },
    receiverName: {
        type: String,
    },
    receiverMailId: {
        type: String,
    },
    body: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: 'Must have createdAt date - default value is the created date'
    },
    blockReason: {
        type: String,
    },
    blockedBy: {
        type: String,
    },
    emailContent: {
        type: String,
    },
    metaInfo: {
        type: Object,
    },
    domain: {
        type: String,
    },
    spoofCount: {
        type: Number,
        default: 0
    },
    spoofBy: {
        type: Array
    },

}, { timestamps: true });




const EmailsTrack = mongoose.model('emails-track', emailSchema);

module.exports = EmailsTrack;