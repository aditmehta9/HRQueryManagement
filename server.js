const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5002;

// Create a write stream for logging
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup morgan to log requests to access.log
app.use(morgan('combined', { stream: logStream }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27018/resourceDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Counter Schema and Model
const counterSchema = new mongoose.Schema({
    sequenceValue: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

// Define Resource Schema and Model
const resourceSchema = new mongoose.Schema({
    description: { type: String, required: true },
    sequentialId: { type: Number, required: true, unique: true } // Add sequentialId field
});
const Resource = mongoose.model('Resource', resourceSchema);

app.use(cors());
app.use(bodyParser.json());

// Initialize the counter in the database
async function initializeCounter() {
    const count = await Counter.findOne();
    if (!count) {
        const counter = new Counter();
        await counter.save();
    }
}

// Get the next sequential ID
async function getNextSequence() {
    const updatedCounter = await Counter.findOneAndUpdate(
        {},
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
    );
    return updatedCounter.sequenceValue;
}

// Get all resources
app.get('/api/resources', async (req, res) => {
    const resources = await Resource.find();
    res.json(resources);
});

// Create a new resource
app.post('/api/resources', async (req, res) => {
    const sequentialId = await getNextSequence(); // Get next sequential ID
    const newResource = new Resource({
        description: req.body.description,
        sequentialId: sequentialId // Assign the sequential ID
    });
    await newResource.save();
    
    // Return the new resource with the _id and sequentialId
    res.status(201).json({ id: newResource._id, sequentialId: newResource.sequentialId, description: newResource.description });
});

// Define HR metrics endpoint
app.get('/api/hr-metrics', async (req, res) => {
    const hrMetrics = {
        hrQueries: {
            solved: 10,
            pending: 5,
            escalated: 2
        },
        complianceMetrics: {
            completedTasks: 7,
            pendingTasks: 3
        }
    };
    res.json(hrMetrics);
});



// Update a resource
app.put('/api/resources/:id', async (req, res) => {
    const id = req.params.id;
    const updatedResource = await Resource.findByIdAndUpdate(
        id,
        { description: req.body.description },
        { new: true } // This option ensures that the updated document is returned
    );
    if (updatedResource) {
        res.json({ id: updatedResource._id, description: updatedResource.description }); // Ensure to return the _id and description
    } else {
        res.status(404).send('Resource not found');
    }
});

// Delete a resource
app.delete('/api/resources/:id', async (req, res) => {
    const id = req.params.id; // This is the MongoDB _id
    const result = await Resource.findByIdAndDelete(id);
    
    if (result) {
        res.sendStatus(204); // No content, successfully deleted
    } else {
        res.status(404).send('Resource not found'); // Handle the case where the resource does not exist
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Initialize the counter when the server starts
initializeCounter();
