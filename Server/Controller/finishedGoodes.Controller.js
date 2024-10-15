const FinishedGood = require('../models/FinishedGoods'); // Adjust the path to your FinishedGood model

// Create a new finished good
exports.createFinishedGood = async (req, res) => {
    try {
        const {
            productName,
            quantity,
            unitPrice,
            semiFinishedGoods,
            productionDate,
            expirationDate,
            Roles
        } = req.body;

        const emptyFields = [];
        if (!productName) emptyFields.push('productName');
        if (!quantity) emptyFields.push('quantity');
        if (!unitPrice) emptyFields.push('unitPrice');
        if (!semiFinishedGoods) emptyFields.push('semiFinishedGoods');
        if (!productionDate) emptyFields.push('productionDate');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new finished good instance
        const newFinishedGood = new FinishedGood({
            productName,
            quantity,
            unitPrice,
            semiFinishedGoods,
            productionDate,
            expirationDate,
            Roles
        });

        // Save the finished good to the database
        await newFinishedGood.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Finished good created successfully',
            finishedGood: newFinishedGood
        });
    } catch (error) {
        // Handle errors, e.g., duplicate productName
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Finished good with this name already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all finished goods
exports.getAllFinishedGoods = async (req, res) => {
    try {
        const finishedGoods = await FinishedGood.find().populate('semiFinishedGoods'); // Populate semi-finished goods
        return res.status(200).json({
            success: true,
            count: finishedGoods.length,
            data:finishedGoods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single finished good by ID
exports.getSingleFinishedGood = async (req, res) => {
    try {
        const { id } = req.params; // Extract the finished good ID from the URL

        const finishedGood = await FinishedGood.findById(id).populate('semiFinishedGoods'); // Populate semi-finished goods
        if (!finishedGood) {
            return res.status(404).json({
                success: false,
                message: 'Finished good not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:finishedGood
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a finished good by ID
exports.updateFinishedGood = async (req, res) => {
    try {
        const { id } = req.params; // Extract the finished good ID from the URL

        // Find the finished good and update it with the provided data
        const updatedFinishedGood = await FinishedGood.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedFinishedGood) {
            return res.status(404).json({
                success: false,
                message: 'Finished good not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Finished good updated successfully',
            data: updatedFinishedGood
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a finished good by ID
exports.deleteFinishedGood = async (req, res) => {
    try {
        const { id } = req.params; // Extract the finished good ID from the URL

        const deletedFinishedGood = await FinishedGood.findByIdAndDelete(id);
        if (!deletedFinishedGood) {
            return res.status(404).json({
                success: false,
                message: 'Finished good not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Finished good deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
