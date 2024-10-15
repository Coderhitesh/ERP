const express =  require('express')
const { createSemiFinished, getSemiFinished, getSingleSeminFinished, deleteSemiFinshied, updateSemiFinished } = require('../Controller/semiFinished.Controller')
const { createRawMaterial, getRawMaterial, getSingleRawMaterial, deleteRawMaterial, updateRawMaterial } = require('../Controller/rawMaterial.Controlller')
const { createSupplier, getSingleSupplier, deleteSupplier, updateSupplier, getAllSuppliers } = require('../Controller/supplier.Controller')
const { getAllRoles, getSingleRole, deleteRole, updateRole, createRole } = require('../Controller/role.creation.Controller')
const { createBusiness, getAllBusinesses, getSingleBusiness, deleteBusiness, updateBusiness } = require('../Controller/bussinessSetting.Controller')
const { createChallan, getAllChallans, getSingleChallan, deleteChallan, updateChallan } = require('../Controller/challan.Controller')
const { createCustomer, getAllCustomers, getSingleCustomer, deleteCustomer, updateCustomer } = require('../Controller/customer.Controller')
const { createLedgerEntry, getAllLedgerEntries, getSingleLedgerEntry, updateLedgerEntry, deleteLedgerEntry } = require('../Controller/ledger.Controller')
const { createManufactureOrder, getAllManufactureOrders, getSingleManufactureOrder, deleteManufactureOrder, updateManufactureOrder } = require('../Controller/manugature.Controller')
const { createPerformaInvoice, getAllPerformaInvoices, getSinglePerformaInvoice, deletePerformaInvoice, updatePerformaInvoice } = require('../Controller/performaInvoice.Controller')
const { createPurchaseOrder, getAllPurchaseOrders, getSinglePurchaseOrder, deletePurchaseOrder, updatePurchaseOrder } = require('../Controller/purchase.Controller')
const { createQuotation, getAllQuotations, getSingleQuotation, deleteQuotation, updateQuotation } = require('../Controller/quatation.Controller')
const Router = express.Router()

// semi finished router here 

Router.post('/create-semifinished',createSemiFinished)
Router.get('/get-all-semifinished',getSemiFinished)
Router.get('/get-single-semifinished/:_id',getSingleSeminFinished)
Router.delete('/delete-semifinished/:_id',deleteSemiFinshied)
Router.put('/update-semifinished/:_id',updateSemiFinished)

// raw material router here 

Router.post('/create-raw-material',createRawMaterial)
Router.get('/get-all-raw-material',getRawMaterial)
Router.get('/get-single-raw-material/:_id',getSingleRawMaterial)
Router.delete('/delete-raw-material/:_id',deleteRawMaterial)
Router.put('/update-raw-material/:_id',updateRawMaterial)

// supplier router here 

Router.post('/create-supplier',createSupplier)
Router.get('/get-all-supplier',getAllSuppliers)
Router.get('/get-single-supplier/:_id',getSingleSupplier)
Router.delete('/delete-supplier/:_id',deleteSupplier)
Router.put('/update-supplier/:_id',updateSupplier)

// role router here 

Router.post('/create-role',createRole)
Router.get('/get-all-role',getAllRoles)
Router.get('/get-single-role/:_id',getSingleRole)
Router.delete('/delete-role/:_id',deleteRole)
Router.put('/update-role/:_id',updateRole)

// bussiness setting router here 

Router.post('/create-bussiness-settings',createBusiness)
Router.get('/get-all-bussiness-settings',getAllBusinesses)
Router.get('/get-single-bussiness-settings/:_id',getSingleBusiness)
Router.delete('/delete-bussiness-settings/:_id',deleteBusiness)
Router.put('/update-bussiness-settings/:_id',updateBusiness)

// challan router here 

Router.post('/create-challan',createChallan)
Router.get('/get-all-challan',getAllChallans)
Router.get('/get-single-challan/:_id',getSingleChallan)
Router.delete('/delete-challan/:_id',deleteChallan)
Router.put('/update-challan/:_id',updateChallan)

// customer router here 

Router.post('/create-customer',createCustomer)
Router.get('/get-all-customer',getAllCustomers)
Router.get('/get-single-customer/:_id',getSingleCustomer)
Router.delete('/delete-customer/:_id',deleteCustomer)
Router.put('/update-customer/:_id',updateCustomer)

// ledger router here 

Router.post('/create-ledger',createLedgerEntry)
Router.get('/get-all-ledger',getAllLedgerEntries)
Router.get('/get-single-ledger/:_id',getSingleLedgerEntry)
Router.delete('/delete-ledger/:_id',deleteLedgerEntry)
Router.put('/update-ledger/:_id',updateLedgerEntry)

// manufacture router here 

Router.post('/create-manufacture',createManufactureOrder)
Router.get('/get-all-manufacture',getAllManufactureOrders)
Router.get('/get-single-manufacture/:_id',getSingleManufactureOrder)
Router.delete('/delete-manufacture/:_id',deleteManufactureOrder)
Router.put('/update-manufacture/:_id',updateManufactureOrder)

// performa invoice router here 

Router.post('/create-performa-invoice',createPerformaInvoice)
Router.get('/get-all-performa-invoice',getAllPerformaInvoices)
Router.get('/get-single-performa-invoice/:_id',getSinglePerformaInvoice)
Router.delete('/delete-performa-invoice/:_id',deletePerformaInvoice)
Router.put('/update-performa-invoice/:_id',updatePerformaInvoice)

// purchase router here 

Router.post('/create-purchase',createPurchaseOrder)
Router.get('/get-all-purchase',getAllPurchaseOrders)
Router.get('/get-single-purchase/:_id',getSinglePurchaseOrder)
Router.delete('/delete-purchase/:_id',deletePurchaseOrder)
Router.put('/update-purchase/:_id',updatePurchaseOrder)

// quatation router here 

Router.post('/create-quatation',createQuotation)
Router.get('/get-all-quatation',getAllQuotations)
Router.get('/get-single-quatation/:_id',getSingleQuotation)
Router.delete('/delete-quatation/:_id',deleteQuotation)
Router.put('/update-quatation/:_id',updateQuotation)

module.exports = Router