const SemiFinished = require('../models/SemiFinished');

exports.createSemiFinished = async (req, res) => {
    try {
        const { productName, quantity, unitPrice, rawMaterials, productionDate, expirationDate, Roles } = req.body;
        const emptyField = [];
        if (!productName) emptyField.push('productName');
        if (!quantity) emptyField.push('quantity');
        if (!unitPrice) emptyField.push('unitPrice');
        if (!rawMaterials) emptyField.push('rawMaterials');
        if (!productionDate) emptyField.push('productionDate');
        if (!Roles) emptyField.push('Roles');
        
        if (emptyField.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please fill in the following fields: ${emptyField.join(', ')}`,
            });
        }

        const newSemiFinished = new SemiFinished({
            productName,
            quantity,
            unitPrice,
            rawMaterials,
            productionDate,
            expirationDate,
            Roles,
        });

        await newSemiFinished.save();
        res.status(201).json({
            success: true,
            message: 'Semi Finished product created successfully',
            data: newSemiFinished,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create SemiFinished',
            error: error.message,
        });
    }
};


exports.getSemiFinished = async (req, res) => {
    try {
        const allSemiFinished = await SemiFinished.find().populate(rawMaterials);
        if (!allSemiFinished) {
            return res.status(404).json({
                success: false,
                message: 'No Semi Finished products found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Semi Finished products retrieved successfully',
            data: allSemiFinished
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to get SemiFinished',
            error: error.message
        })
    }
}

exports.getSingleSeminFinished = async (req, res) => {
    try {
        const id = req.params._id;
        const singleSemiFinished = await SemiFinished.findById(id).populate(rawMaterials);
        if (!singleSemiFinished) {
            return res.status(404).json({
                success: false,
                message: 'Semi Finished product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Semi Finished product retrieved successfully',
            data: singleSemiFinished
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to get Single SemiFinished',
            error: error.message
        })
    }
}

exports.deleteSemiFinshied = async (req, res) => {
    try {
        const id = req.params._id;
        const deletedSemiFinished = await SemiFinished.findByIdAndDelete(id);
        if (!deletedSemiFinished) {
            return res.status(404).json({
                success: false,
                message: 'Semi Finished product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Semi Finished product deleted successfully',
            data: deletedSemiFinished
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to delete Semi Finished',
            error: error.message
        })
    }
}

exports.updateSemiFinished = async (req, res) => {
    try {
        const { id } = req.params;  // Get the ID from the route parameters
        const { productName, quantity, unitPrice, rawMaterials, productionDate, expirationDate, Roles } = req.body;

        // Find the semi-finished product by ID
        let semiFinishedGood = await SemiFinished.findById(id);

        if (!semiFinishedGood) {
            return res.status(404).json({
                success: false,
                message: 'Semi Finished product not found'
            });
        }

        // Update the fields with new data
        semiFinishedGood.productName = productName || semiFinishedGood.productName;
        semiFinishedGood.quantity = quantity || semiFinishedGood.quantity;
        semiFinishedGood.unitPrice = unitPrice || semiFinishedGood.unitPrice;
        semiFinishedGood.rawMaterials = rawMaterials || semiFinishedGood.rawMaterials;
        semiFinishedGood.productionDate = productionDate || semiFinishedGood.productionDate;
        semiFinishedGood.expirationDate = expirationDate || semiFinishedGood.expirationDate;
        semiFinishedGood.Roles = Roles || semiFinishedGood.Roles;

        // Save the updated semi-finished product
        await semiFinishedGood.save();

        res.status(200).json({
            success: true,
            message: 'Semi Finished product updated successfully',
            data: semiFinishedGood
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update Semi Finished product',
            error: error.message
        });
    }
};
