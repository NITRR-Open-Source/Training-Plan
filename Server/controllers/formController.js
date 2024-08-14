const Form = require('../models/Form');

// Create a new form
exports.createForm = async (req, res) => {
    try {
        const { title, description, questions, createdBy } = req.body;
        const newForm = new Form({ title, description, createdBy, questions });
        const form = await newForm.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all forms
exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        if (!forms.length) return res.status(404).json({ msg: 'No forms found' });
        res.json(forms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a form by ID
exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ msg: 'Form not found' });
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a form
exports.updateForm = async (req, res) => {
    try {
        const { title, description, questions, isPublished } = req.body;
        const form = await Form.findByIdAndUpdate(
            req.params.id,
            { title, description, questions, isPublished, updatedAt: Date.now() },
            { new: true }
        );
        if (!form) return res.status(404).json({ msg: 'Form not found' });
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a form
exports.deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) return res.status(404).json({ msg: 'Form not found' });
        res.json({ msg: 'Form deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
