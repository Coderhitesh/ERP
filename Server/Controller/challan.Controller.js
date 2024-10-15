const Challan = require('../models/Challan.model'); // Adjust the path to your Challan model

// Create a new challan
exports.createChallan = async (req, res) => {
    try {
        const {
            challanNumber,
            date,
            client,
            items,
            totalAmount,
            Roles
        } = req.body;

        const emptyFields = [];
        if (!challanNumber) emptyFields.push('challanNumber');
        if (!client) emptyFields.push('client');
        if (!items || items.length === 0) emptyFields.push('items');
        if (!totalAmount) emptyFields.push('totalAmount');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new challan instance
        const newChallan = new Challan({
            challanNumber,
            date,
            client,
            items,
            totalAmount,
            Roles
        });

        // Save the challan to the database
        await newChallan.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Challan created successfully',
            data: newChallan
        });
    } catch (error) {
        // Handle errors, e.g., duplicate challan number
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Challan with this number already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all challans
exports.getAllChallans = async (req, res) => {
    try {
        const challans = await Challan.find().populate('client'); // Populate client details if needed
        return res.status(200).json({
            success: true,
            count: challans.length,
            data:challans
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single challan by ID
exports.getSingleChallan = async (req, res) => {
    try {
        const id = req.params._id; // Extract the challan ID from the URL

        const challan = await Challan.findById(id).populate('client'); // Populate client details if needed
        if (!challan) {
            return res.status(404).json({
                success: false,
                message: 'Challan not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:challan
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a challan by ID
exports.updateChallan = async (req, res) => {
    try {
        const id = req.params._id; // Extract the challan ID from the URL

        // Find the challan and update it with the provided data
        const updatedChallan = await Challan.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedChallan) {
            return res.status(404).json({
                success: false,
                message: 'Challan not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Challan updated successfully',
            data: updatedChallan
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a challan by ID
exports.deleteChallan = async (req, res) => {
    try {
        const id = req.params._id; // Extract the challan ID from the URL

        const deletedChallan = await Challan.findByIdAndDelete(id);
        if (!deletedChallan) {
            return res.status(404).json({
                success: false,
                message: 'Challan not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Challan deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
