const Supplier = require('../models/SupplierSchema'); // Adjust the path to your Supplier model

// Create a new supplier
exports.createSupplier = async (req, res) => {
    try {
        // Extract supplier data from the request body
        const {
            supplierName,
            contactPerson,
            email,
            contactNumber,
            gstNumber,
            panNumber,
            address,
            paymentTerms,
            Roles
        } = req.body;

        const emptyField = [];
        if (!supplierName) emptyField.push('supplierName');
        if (!contactPerson) emptyField.push('contactperson');
        if (!email) emptyField.push('email');
        if (!contactNumber) emptyField.push('contactNumber');
        if (!gstNumber) emptyField.push('gstNumber');
        if (!panNumber) emptyField.push('panNumber');
        if (!address) emptyField.push('address');
        if (!paymentTerms) emptyField.push('paymentTerms');
        if (!Roles) emptyField.push('Roles');
        if (emptyField.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${empty.join(", ")}`
            })
        }

        // Create a new supplier instance
        const newSupplier = new Supplier({
            supplierName,
            contactPerson,
            email,
            contactNumber,
            gstNumber,
            panNumber,
            address,
            paymentTerms,
            Roles
        });

        // Save the supplier to the database
        await newSupplier.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Supplier created successfully',
            data: newSupplier
        });
    } catch (error) {
        // Handle errors, e.g., duplicate email or supplierName
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Supplier with this email or name already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get supplier by ID or fetch all suppliers
// exports.getSupplier = async (req, res) => {
//     try {
//         const id = req.params._id; // Get supplier ID from request parameters

//         if (id) {
//             // Fetch a specific supplier by ID
//             const supplier = await Supplier.findById(id);

//             // If the supplier is not found
//             if (!supplier) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Supplier not found'
//                 });
//             }

//             // Return the supplier data
//             return res.status(200).json({
//                 success: true,
//                 supplier
//             });
//         } else {
//             // Fetch all suppliers if no ID is provided
//             const suppliers = await Supplier.find();

//             // If no suppliers found
//             if (!suppliers.length) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'No suppliers found'
//                 });
//             }

//             // Return all suppliers data
//             return res.status(200).json({
//                 success: true,
//                 suppliers
//             });
//         }
//     } catch (error) {
//         // Handle server errors
//         return res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

exports.getAllSuppliers = async (req, res) => {
    try {
        // Fetch all suppliers from the database
        const suppliers = await Supplier.find();

        // If no suppliers are found
        if (suppliers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No suppliers found'
            });
        }

        // Return the list of suppliers
        return res.status(200).json({
            success: true,
            message: 'Suppliers fetched successfully',
            data:suppliers
        });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.getSingleSupplier = async (req, res) => {
    try {
        const id = req.params._id; // Get supplier ID from request parameters

        // Find the supplier by ID
        const supplier = await Supplier.findById(id);

        // If the supplier is not found
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }

        // Return the supplier data
        return res.status(200).json({
            success: true,
            message: 'Supplier fetched successfully',
            data:supplier
        });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const id = req.params._id; // Get supplier ID from request parameters

        // Find the supplier by ID and delete
        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        // If no supplier is found
        if (!deletedSupplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Supplier deleted successfully',
            data: deletedSupplier
        });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const id = req.params._id; // Get supplier ID from request parameters

        // Find the supplier by ID
        const supplier = await Supplier.findById(id);

        // If the supplier is not found
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }

        // Update each field manually if provided in the request body
        const {
            supplierName,
            contactPerson,
            email,
            contactNumber,
            gstNumber,
            panNumber,
            address,
            paymentTerms,
            Roles
        } = req.body;

        if (supplierName) supplier.supplierName = supplierName;
        if (contactPerson) supplier.contactPerson = contactPerson;
        if (email) supplier.email = email;
        if (contactNumber) supplier.contactNumber = contactNumber;
        if (gstNumber) supplier.gstNumber = gstNumber;
        if (panNumber) supplier.panNumber = panNumber;
        if (address) supplier.address = address;
        if (paymentTerms) supplier.paymentTerms = paymentTerms;
        if (Roles) supplier.Roles = Roles;

        // Save the updated supplier back to the database
        const updatedSupplier = await supplier.save();

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Supplier updated successfully',
            data: updatedSupplier
        });
    } catch (error) {
        // Handle server errors or validation errors
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
