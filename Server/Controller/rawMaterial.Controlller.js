const RawMaterial = require('../models/RawMaterial.model');

exports.createRawMaterial = async (req, res) => {
    try {
        const { materialName, quantity, unitPrice, supplier, unitOfMeasurement, storageLocation, Roles } = req.body;
        
        // Collect missing fields for validation
        const emptyField = [];
        if (!materialName) emptyField.push('materialName');
        if (!quantity) emptyField.push('quantity');
        if (!unitPrice) emptyField.push('unitPrice');
        if (!supplier) emptyField.push('supplier');
        if (!unitOfMeasurement) emptyField.push('unitOfMeasurement');
        if (!Roles) emptyField.push('Roles');
        
        // Check if there are any missing required fields
        if (emptyField.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please fill in the following fields: ${emptyField.join(', ')}`,
            });
        }

        // Create new Raw Material instance
        const newRawMaterial = new RawMaterial({
            materialName,
            quantity,
            unitPrice,
            supplier,
            unitOfMeasurement,
            storageLocation,  // Optional, will be null if not provided
            Roles
        });

        // Save the new Raw Material to the database
        await newRawMaterial.save();

        res.status(201).json({
            success: true,
            message: 'Raw Material created successfully',
            data: newRawMaterial,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating raw material',
            error: error.message,
        });
    }
};


exports.getRawMaterial = async (req, res) => {
    try {
        const allRawMaterial = await RawMaterial.find().populate(supplier);
        if (!allRawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'No raw material found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Raw material found',
            data: allRawMaterial
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error fetching raw material',
            error: error.message
        })
    }
}

exports.getSingleRawMaterial = async (req, res) => {
    try {
        const id = req.params._id;
        const singleRawMaterial = await RawMaterial.findById(id).populate(supplier);
        if (!singleRawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'Raw material not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Raw material found',
            data: singleRawMaterial
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error fetching raw material',
            error: error.message
        })
    }
}

exports.deleteRawMaterial = async (req, res) => {
    try {
        const id = req.params._id
        const deletedRawMaterial = await RawMaterial.findByIdAndDelete(id);
        if (!deletedRawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'Raw material not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Raw material deleted',
            data: deletedRawMaterial
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error deleting raw material',
            error: error.message
        })
    }
}

exports.updateRawMaterial = async (req, res) => {
    try {
        const id = req.params._id; // Get the raw material ID from the route parameter
        const { materialName, quantity, unitPrice, supplier, unitOfMeasurement, storageLocation, Roles } = req.body;

        // Find the raw material by ID
        let rawMaterial = await RawMaterial.findById(id);

        if (!rawMaterial) {
            return res.status(404).json({
                success: false,
                message: 'Raw Material not found'
            });
        }

        // Update fields if provided in request body, otherwise keep current values
        rawMaterial.materialName = materialName || rawMaterial.materialName;
        rawMaterial.quantity = quantity || rawMaterial.quantity;
        rawMaterial.unitPrice = unitPrice || rawMaterial.unitPrice;
        rawMaterial.supplier = supplier || rawMaterial.supplier;
        rawMaterial.unitOfMeasurement = unitOfMeasurement || rawMaterial.unitOfMeasurement;
        rawMaterial.storageLocation = storageLocation || rawMaterial.storageLocation;
        rawMaterial.Roles = Roles || rawMaterial.Roles;

        // Save the updated raw material
        await rawMaterial.save();

        res.status(200).json({
            success: true,
            message: 'Raw Material updated successfully',
            data: rawMaterial
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error updating raw material',
            error: error.message
        });
    }
};
