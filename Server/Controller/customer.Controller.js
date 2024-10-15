const Customer = require('../models/Customer.Model'); // Adjust the path to your Customer model

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const {
            customerName,
            email,
            contactDetails,
            businessInfo,
            additionalAddress,
            clientStatus,
            Roles,
            followUpDate,
            followUp,
            comments
        } = req.body;

        const emptyFields = [];
        if (!customerName) emptyFields.push('customerName');
        if (!email) emptyFields.push('email');
        if (!contactDetails) emptyFields.push('contactDetails');
        if (!businessInfo) emptyFields.push('businessInfo');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new customer instance
        const newCustomer = new Customer({
            customerName,
            email,
            contactDetails,
            businessInfo,
            additionalAddress,
            clientStatus,
            Roles,
            followUpDate,
            followUp,
            comments
        });

        // Save the customer to the database
        await newCustomer.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            data: newCustomer
        });
    } catch (error) {
        // Handle errors, e.g., duplicate email
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Customer with this email already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find(); // You can populate fields if needed
        return res.status(200).json({
            success: true,
            count: customers.length,
            data:customers
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single customer by ID
exports.getSingleCustomer = async (req, res) => {
    try {
        const id = req.params._id; // Extract the customer ID from the URL

        const customer = await Customer.findById(id); // You can populate fields if needed
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:customer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
    try {
        const id = req.params._id; // Extract the customer ID from the URL

        // Find the customer and update it with the provided data
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            data: updatedCustomer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const id = req.params._id; // Extract the customer ID from the URL

        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
