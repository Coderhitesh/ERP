const UserRole = require('../models/Roles.creation.model'); 
const bcrypt = require('bcrypt');

// Create a new user with a role
exports.createRole = async (req, res) => {
    try {
      // Extract user role data from the request body
      const {
        name,
        username,
        email,
        password,
        role,
        isActive
      } = req.body;
  
      // Validate required fields
      const emptyFields = [];
      if (!name) emptyFields.push('name');
      if (!username) emptyFields.push('username');
      if (!email) emptyFields.push('email');
      if (!password) emptyFields.push('password');
      if (!role) emptyFields.push('role');
  
      if (emptyFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Please provide the following fields: ${emptyFields.join(", ")}`
        });
      }
  
      // Create a new user role instance
      const newUserRole = new UserRole({
        name,
        username,
        email,
        password,
        role,
        isActive: isActive !== undefined ? isActive : true, // Default isActive to true
      });
  
      // Save the user role to the database
      await newUserRole.save();
  
      // Respond with success
      return res.status(201).json({
        success: true,
        message: 'User role created successfully',
        data: newUserRole
      });
    } catch (error) {
      // Handle duplicate key errors for unique fields
      if (error.code === 11000) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username or email already exists' 
        });
      }
  
      // Handle general server errors
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };

exports.getAllRoles = async (req, res) => {
    try {
      // Fetch all user roles from the database
      const roles = await UserRole.find();
  
      // If no users with roles are found
      if (roles.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No user roles found'
        });
      }
  
      // Return the list of user roles
      return res.status(200).json({
        success: true,
        message: 'User roles fetched successfully',
        data:roles
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

  exports.getSingleRole = async (req, res) => {
    try {
      const id = req.params._id; // Get user ID from request parameters
  
      // Find the user by ID or username
      const userRole = await UserRole.findById(id).orFail();
  
      // If the user is found, return the user role data
      return res.status(200).json({
        success: true,
        message: 'User role fetched successfully',
        data:userRole
      });
    } catch (error) {
      // If the user is not found or another error occurs
      if (error.name === 'DocumentNotFoundError') {
        return res.status(404).json({
          success: false,
          message: 'User role not found'
        });
      }
  
      // General server error
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };

  exports.deleteRole = async (req, res) => {
    try {
      const id = req.params._id; // Get user ID from request parameters
  
      // Find and delete the user role
      const deletedUserRole = await UserRole.findByIdAndDelete(id);
  
      // If no user role was found with the given ID
      if (!deletedUserRole) {
        return res.status(404).json({
          success: false,
          message: 'User role not found'
        });
      }
  
      // Return success response
      return res.status(200).json({
        success: true,
        message: 'User role deleted successfully',
        data: deletedUserRole
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


  exports.updateRole = async (req, res) => {
    try {
      const id = req.params._id; // Get user ID from request parameters
      const { name, username, email, password, role, isActive } = req.body; // Extract data from request body
  
      // Find and update the user role
      const updatedUserRole = await UserRole.findByIdAndUpdate(
        id,
        {
          name,
          username,
          email,
          role,
          isActive,
          ...(password && { password }) // Only update password if provided
        },
        { new: true, runValidators: true } // Return the updated document and validate
      );
  
      // If no user role was found with the given ID
      if (!updatedUserRole) {
        return res.status(404).json({
          success: false,
          message: 'User role not found'
        });
      }
  
      // Return success response
      return res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: updatedUserRole
      });
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          error: error.message
        });
      }
  
      // Handle server errors
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  