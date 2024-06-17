const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');
const Land = require('./models/Land')

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Enable CORS for all routes
app.use(cors());

mongoose.connect("mongodb+srv://mayankkumar8122:wCjEkrWL8CsE0JRX@alldata.nuxjesw.mongodb.net/userData?retryWrites=true&w=majority&appName=AllData", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/land/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const land = await Land.findById(id);
        if (land) {
            res.json(land);
        } else {
            res.status(404).json({ message: "Land not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/userLands", async (req, res) => {
    const { landIds } = req.body;

    try {
        const lands = await Land.find({ _id: { $in: landIds } });
        res.json(lands);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/getUserByAadhar/:aadhar", async (req, res) => {
    const { aadhar } = req.params;

    try {
        const user = await UserModel.findOne({ aadhar });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});




app.post("/addUser", async (req, res) => {
    const { aadhar, phone, email, password } = req.body;

    const newUser = new UserModel({
        aadhar,
        phone,
        email,
        password
    });

    try {
        const savedUser = await newUser.save();
        console.log('User added successfully:', savedUser);
        res.json(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get("/checkAadhar/:aadhar", async (req, res) => {
    const { aadhar } = req.params;

    try {
        const existingUser = await UserModel.findOne({ aadhar });
        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

app.post("/login", async (req, res) => {
    const { aadhar, password } = req.body;

    try {
        const user = await UserModel.findOne({ aadhar, password });
        if (user) {
            // User found, authentication successful
            res.json({ authenticated: true, user }); // Send user data along with authentication status
        } else {
            // User not found or invalid credentials
            res.json({ authenticated: false });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


app.get('/searchLands', async (req, res) => {
    const { state, city } = req.query;

    // Create a base query with the state
    let query = { 'location.state': state };

    // If city is provided, add it to the query
    if (city) {
        query['location.city'] = city;
    }

    try {
        const lands = await Land.find(query);
        res.json(lands);
        console.log(lands);
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(3001, () => {
    console.log("Server runs on port 3001");
});
