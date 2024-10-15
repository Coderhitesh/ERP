const Quotation = require('../models/Quatation.model'); // Adjust the path to your Quotation model

// Create a new quotation
exports.createQuotation = async (req, res) => {
    try {
        const {
            BusinessOwnerDetails,
            quotationNumber,
            customerId,
            items,
            totalAmount,
            status,
            validityPeriod,
            Roles
        } = req.body;

        const emptyFields = [];
        if (!BusinessOwnerDetails) emptyFields.push('BusinessOwnerDetails');
        if (!quotationNumber) emptyFields.push('quotationNumber');
        if (!customerId) emptyFields.push('customerId');
        if (!items || items.length === 0) emptyFields.push('items');
        if (!totalAmount) emptyFields.push('totalAmount');
        if (!validityPeriod) emptyFields.push('validityPeriod');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new quotation instance
        const newQuotation = new Quotation({
            BusinessOwnerDetails,
            quotationNumber,
            customerId,
            items,
            totalAmount,
            status,
            validityPeriod,
            Roles
        });

        // Save the quotation to the database
        await newQuotation.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Quotation created successfully',
            data: newQuotation
        });
    } catch (error) {
        // Handle errors, e.g., duplicate quotationNumber
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Quotation with this quotation number already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all quotations
exports.getAllQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find().populate('BusinessOwnerDetails customerId'); // Populate references
        return res.status(200).json({
            success: true,
            count: quotations.length,
            data:quotations
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single quotation by ID
exports.getSingleQuotation = async (req, res) => {
    try {
        const id = req.params._id; // Extract the quotation ID from the URL

        const quotation = await Quotation.findById(id).populate('BusinessOwnerDetails customerId'); // Populate references
        if (!quotation) {
            return res.status(404).json({
                success: false,
                message: 'Quotation not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:quotation
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a quotation by ID
exports.updateQuotation = async (req, res) => {
    try {
        const id = req.params._id; // Extract the quotation ID from the URL

        // Find the quotation and update it with the provided data
        const updatedQuotation = await Quotation.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedQuotation) {
            return res.status(404).json({
                success: false,
                message: 'Quotation not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Quotation updated successfully',
            data: updatedQuotation
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a quotation by ID
exports.deleteQuotation = async (req, res) => {
    try {
        const id = req.params._id; // Extract the quotation ID from the URL

        const deletedQuotation = await Quotation.findByIdAndDelete(id);
        if (!deletedQuotation) {
            return res.status(404).json({
                success: false,
                message: 'Quotation not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:deletedQuotation,
            message: 'Quotation deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
