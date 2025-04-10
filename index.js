require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const PORT = process.env.PORT || 3000;

// Twilio credentials (keep secret)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

app.post("/send-sms", async (req, res) => {
    const { message, to } = req.body;

    try {
        const response = await client.messages.create({
            body: message,
            from: "+17015437805", // must be your Twilio number
            to: to
        });

        return res.status(200).json({ success: true, sid: response.sid });
    } catch (error) {
        console.error("Twilio Error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
