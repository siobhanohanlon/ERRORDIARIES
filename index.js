const express = require('express');
const sequelize = require('./config/database');
const Patient = require('./models/Patient');

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Dental Practice Management API'));

// Create a new patient
app.post('/patients', async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all patients
app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a patient by ID
app.get('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a patient
app.put('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        await patient.update(req.body);
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a patient
app.delete('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        await patient.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(3306, () => {
        console.log('Server is running on http://localhost:3306');
    });
});
