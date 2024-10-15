const PurchaseOrder = require('../models/PurchaseModel'); // Adjust the path to your PurchaseOrder model

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
    try {
        const {
            orderNumber,
            supplierId,
            quotationId,
            performaInvoiceId,
            items,
            totalAmount,
            status,
            paymentTerms,
            Roles
        } = req.body;

        const emptyFields = [];
        if (!orderNumber) emptyFields.push('orderNumber');
        if (!supplierId) emptyFields.push('supplierId');
        if (!items || items.length === 0) emptyFields.push('items');
        if (!totalAmount) emptyFields.push('totalAmount');
        if (!paymentTerms) emptyFields.push('paymentTerms');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new purchase order instance
        const newPurchaseOrder = new PurchaseOrder({
            orderNumber,
            supplierId,
            quotationId,
            performaInvoiceId,
            items,
            totalAmount,
            status,
            paymentTerms,
            Roles
        });

        // Save the purchase order to the database
        await newPurchaseOrder.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Purchase order created successfully',
            data: newPurchaseOrder
        });
    } catch (error) {
        // Handle errors, e.g., duplicate orderNumber
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Purchase order with this order number already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find().populate('supplierId quotationId performaInvoiceId'); // Populate references
        return res.status(200).json({
            success: true,
            count: purchaseOrders.length,
            data:purchaseOrders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single purchase order by ID
exports.getSinglePurchaseOrder = async (req, res) => {
    try {
        const id = req.params._id; // Extract the purchase order ID from the URL

        const purchaseOrder = await PurchaseOrder.findById(id).populate('supplierId quotationId performaInvoiceId'); // Populate references
        if (!purchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase order not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:purchaseOrder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a purchase order by ID
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const id = req.params._id; // Extract the purchase order ID from the URL

        // Find the purchase order and update it with the provided data
        const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedPurchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase order not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Purchase order updated successfully',
            data: updatedPurchaseOrder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a purchase order by ID
exports.deletePurchaseOrder = async (req, res) => {
    try {
        const id = req.params._id; // Extract the purchase order ID from the URL

        const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(id);
        if (!deletedPurchaseOrder) {
            return res.status(404).json({
                success: false,
                message: 'Purchase order not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:deletedPurchaseOrder,
            message: 'Purchase order deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
