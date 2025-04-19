const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const Entry = require('./models/Entry');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/api/entry', async (req, res) => {
    const latest = await Entry.findOne().sort({ createdAt: -1 });
    res.json(latest);
});
app.get('/api/entries',async (req,res)=>{
    const entries = await Entry.find().sort({createdAt:-1});
    res.json(entries);
})

app.post('/api/entry',async (req,res)=>{
    const newEntry = new Entry({text: req.body.text});
    const saved = await newEntry.save();
    res.json(saved);
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});