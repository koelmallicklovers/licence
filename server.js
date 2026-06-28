require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// ALLOW ALL CONNECTIONS (Fixes CORS block)
app.use(cors());

app.post('/get-license', (req, res) => {
    const clearKeyResponse = {
        keys: [
            {
                kty: "oct",
                k: process.env.MY_SECRET_KEY, 
                kid: process.env.MY_SECRET_KID 
            }
        ],
        type: "temporary"
    };
    res.status(200).json(clearKeyResponse);
});

// A simple test route to check if server is awake
app.get('/test', (req, res) => {
    res.send("Server is awake and working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`License Server is running on port ${PORT}`);
});
