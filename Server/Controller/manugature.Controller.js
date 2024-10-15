const ManufactureOrder = require('../models/Manufacture.model'); // Adjust the path to your ManufactureOrder model

// Create a new manufacture order
exports.createManufactureOrder = async (req, res) => {
    try {
        const {
            orderNumber,
            supplier,
            products,
            orderDate,
            status,
            expectedCompletionDate,
            actualCompletionDate,
            Roles
        } = req.body;

        const emptyFields = [];
        if (!orderNumber) emptyFields.push('orderNumber');
        if (!supplier) emptyFields.push('supplier');
        if (!products || products.length === 0) emptyFields.push('products');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new manufacture order instance
        const newManufactureOrder = new ManufactureOrder({
            orderNumber,
            supplier,
            products,
            orderDate,
            status,
            expectedCompletionDate,
            actualCompletionDate,
            Roles
        });

        // Save the manufacture order to the database
        await newManufactureOrder.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Manufacture order created successfully',
            data: newManufactureOrder
        });
    } catch (error) {
        // Handle errors, e.g., duplicate orderNumber
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Manufacture order with this order number already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all manufacture orders
exports.getAllManufactureOrders = async (req, res) => {
    try {
        const manufactureOrders = await ManufactureOrder.find().populate('supplier'); // Populate supplier reference
        return res.status(200).json({
            success: true,
            count: manufactureOrders.length,
            data:manufactureOrders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single manufacture order by ID
exports.getSingleManufactureOrder = async (req, res) => {
    try {
        const id = req.params._id; // Extract the manufacture order ID from the URL

        const manufactureOrder = await ManufactureOrder.findById(id).populate('supplier'); // Populate supplier reference
        if (!manufactureOrder) {
            return res.status(404).json({
                success: false,
                message: 'Manufacture order not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:manufactureOrder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a manufacture order by ID
exports.updateManufactureOrder = async (req, res) => {
    try {
        const id = req.params._id; // Extract the manufacture order ID from the URL

        // Find the manufacture order and update it with the provided data
        const updatedManufactureOrder = await ManufactureOrder.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedManufactureOrder) {
            return res.status(404).json({
                success: false,
                message: 'Manufacture order not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Manufacture order updated successfully',
            data: updatedManufactureOrder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a manufacture order by ID
exports.deleteManufactureOrder = async (req, res) => {
    try {
        const id = req.params._id; // Extract the manufacture order ID from the URL

        const deletedManufactureOrder = await ManufactureOrder.findByIdAndDelete(id);
        if (!deletedManufactureOrder) {
            return res.status(404).json({
                success: false,
                message: 'Manufacture order not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:deletedManufactureOrder,
            message: 'Manufacture order deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
