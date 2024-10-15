const Business = require('../models/BussinesSetting.model'); // Adjust the path to your Business model

// Create a new business
exports.createBusiness = async (req, res) => {
    try {
        const {
            businessLogo,
            businessName,
            ownerName,
            email,
            contactNumber,
            gstNumber,
            panNumber,
            address,
            discountRules,
            AllRoles,
            paymentTerms
        } = req.body;

        const emptyFields = [];
        if (!businessLogo) emptyFields.push('businessLogo');
        if (!businessName) emptyFields.push('businessName');
        if (!ownerName) emptyFields.push('ownerName');
        if (!email) emptyFields.push('email');
        if (!contactNumber) emptyFields.push('contactNumber');
        if (!gstNumber) emptyFields.push('gstNumber');
        if (!panNumber) emptyFields.push('panNumber');
        if (!address) emptyFields.push('address');
        if (!paymentTerms) emptyFields.push('paymentTerms');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new business instance
        const newBusiness = new Business({
            businessLogo,
            businessName,
            ownerName,
            email,
            contactNumber,
            gstNumber,
            panNumber,
            address,
            discountRules,
            AllRoles,
            paymentTerms
        });

        // Save the business to the database
        await newBusiness.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Business created successfully',
            data: newBusiness
        });
    } catch (error) {
        // Handle errors, e.g., duplicate email or businessName
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Business with this email or name already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        return res.status(200).json({
            success: true,
            count: businesses.length,
            data:businesses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single business by ID
exports.getSingleBusiness = async (req, res) => {
    try {
        const id = req.params._id; // Extract the business ID from the URL

        const business = await Business.findById(id);
        if (!business) {
            return res.status(404).json({
                success: false,
                message: 'Business not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:business
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a business by ID
exports.updateBusiness = async (req, res) => {
    try {
        const id = req.params._id; // Extract the business ID from the URL

        // Find the business and update it with the provided data
        const updatedBusiness = await Business.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedBusiness) {
            return res.status(404).json({
                success: false,
                message: 'Business not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Business updated successfully',
            data: updatedBusiness
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a business by ID
exports.deleteBusiness = async (req, res) => {
    try {
        const id = req.params._id; // Extract the business ID from the URL

        const deletedBusiness = await Business.findByIdAndDelete(id);
        if (!deletedBusiness) {
            return res.status(404).json({
                success: false,
                message: 'Business not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Business deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
