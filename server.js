require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// STRICT CORS POLICY: Only allow your GitHub Pages URL to access this server
const allowedOrigins = ['https://koelmallicklovers.github.io'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.post('/get-licence', (req, res) => {
    // The ClearKey standard expects a specific JSON format in response
    const clearKeyResponse = {
        keys: [
            {
                kty: "oct", // Key Type: Octet Sequence
                k: process.env.MY_SECRET_KEY, 
                kid: process.env.MY_SECRET_KID 
            }
        ],
        type: "temporary"
    };

    res.status(200).json(clearKeyResponse);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`License Server is running on port ${PORT}`);
});
