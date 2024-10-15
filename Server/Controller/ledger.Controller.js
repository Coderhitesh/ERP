const Ledger = require('../models/Ledger.model'); // Adjust the path to your Ledger model

// Create a new ledger entry
exports.createLedgerEntry = async (req, res) => {
    try {
        const {
            transactionId,
            date,
            description,
            amount,
            type,
            client,
            supplier,
            Roles
        } = req.body;

        const emptyFields = [];
        if (!transactionId) emptyFields.push('transactionId');
        if (!description) emptyFields.push('description');
        if (amount === undefined) emptyFields.push('amount'); // Allow 0 as valid amount
        if (!type) emptyFields.push('type');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please provide the following fields: ${emptyFields.join(", ")}`
            });
        }

        // Create a new ledger entry instance
        const newLedgerEntry = new Ledger({
            transactionId,
            date,
            description,
            amount,
            type,
            client,
            supplier,
            Roles
        });

        // Save the ledger entry to the database
        await newLedgerEntry.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Ledger entry created successfully',
            data: newLedgerEntry
        });
    } catch (error) {
        // Handle errors, e.g., duplicate transactionId
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Ledger entry with this transaction ID already exists' });
        }

        // General server error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all ledger entries
exports.getAllLedgerEntries = async (req, res) => {
    try {
        const ledgerEntries = await Ledger.find().populate('client supplier'); // Populate client and supplier references
        return res.status(200).json({
            success: true,
            count: ledgerEntries.length,
            data:ledgerEntries
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get a single ledger entry by ID
exports.getSingleLedgerEntry = async (req, res) => {
    try {
        const id = req.params._id; // Extract the ledger entry ID from the URL

        const ledgerEntry = await Ledger.findById(id).populate('client supplier'); // Populate client and supplier references
        if (!ledgerEntry) {
            return res.status(404).json({
                success: false,
                message: 'Ledger entry not found'
            });
        }

        return res.status(200).json({
            success: true,
            data:ledgerEntry
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update a ledger entry by ID
exports.updateLedgerEntry = async (req, res) => {
    try {
        const id = req.params._id; // Extract the ledger entry ID from the URL

        // Find the ledger entry and update it with the provided data
        const updatedLedgerEntry = await Ledger.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the update
        });

        if (!updatedLedgerEntry) {
            return res.status(404).json({
                success: false,
                message: 'Ledger entry not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Ledger entry updated successfully',
            data: updatedLedgerEntry
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete a ledger entry by ID
exports.deleteLedgerEntry = async (req, res) => {
    try {
        const id = req.params._id; // Extract the ledger entry ID from the URL

        const deletedLedgerEntry = await Ledger.findByIdAndDelete(id);
        if (!deletedLedgerEntry) {
            return res.status(404).json({
                success: false,
                message: 'Ledger entry not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Ledger entry deleted successfully',
            data:deletedLedgerEntry
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
