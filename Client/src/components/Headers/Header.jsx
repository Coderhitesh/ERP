import React, { useState } from 'react';
import { Link } from 'react-router-dom'
const Header = () => {
  // For Orders
  const [sales, setSales] = useState(false)
  const [Order, setOrder] = useState(false)
  const handleToggleOrder = () => {
    setOrder(!Order)
    setStock(false)
    setBills(false)
    setReports(false)

    setVendor(false)
  }
  const handleToggleSales = () => {
    setSales(!sales)
  }
  //For Stock
  const [stock, setStock] = useState(false)
  const handleToggleStock = () => {
    setOrder(false)
    setBills(false)
    setReports(false)

    setVendor(false)

    setStock(!stock)
  }
  //For Bills && Challan
  const [Bills, setBills] = useState(false)
  const [InBills, setInBills] = useState(false)

  const handleToggleBills = () => {
    setOrder(false)
    setStock(false)
    setAccounts(false)
    setVendor(false)
    setReports(false)

    setBills(!Bills)
  }
  const handleToggleInBills = () => {
    setOrder(false)
    setStock(false)
    setReports(false)

    setInBills(!InBills)
  }
  //For Accounts && Make Payemnts
  const [Accounts, setAccounts] = useState(false)
  const [InAccounts, setInAccounts] = useState(false)

  const handleToggleAccounts = () => {
    setOrder(false)
    setStock(false)
    setReports(false)

    setVendor(false)
    setBills(false)
    setAccounts(!Accounts)
  }
  const handleToggleInAccounts = () => {
    setOrder(false)
    setStock(false)
    setReports(false)

    setInAccounts(!InAccounts)
  }
  //For Vendours && Make Clients
  const [Vendor, setVendor] = useState(false)
  const handleToggleVendor = () => {
    setOrder(false)
    setAccounts(false)
    setStock(false)
    setBills(false)
    setReports(false)
    setVendor(!Vendor)

  }
  //For Reports
  const [Reports, setReports] = useState(false)
  const handleToggleReports = () => {
    setOrder(false)
    setAccounts(false)
    setStock(false)
    setBills(false)
    setReports(!Reports)
  }
  return (
    <ul className="navbar-nav  w-full bg sidebar sidebar-dark accordion" id="accordionSidebar">
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to={'/'}>
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">ERP</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to={'/'}>
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">
        Interface
      </div>
      {/* Orders */}
      <li className="nav-item p-1">
        <Link onClick={handleToggleOrder} className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog"></i>
          <span>Orders</span>
        </Link>
        <div className={`collapse ${Order ? '' : 'd-none'}`} aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white  collapse-inner rounded">

            <Link className="collapse-item" onClick={handleToggleSales} >Sales-Order</Link>

            <div className={`collapse py-0 ${sales ? '' : 'd-none'}`} aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
              <div className="bg-white collapse-inner rounded">
                {/* <h6 className="collapse-header">Sales Team:</h6> */}

                <Link className="collapse-item" to="/sales-order/All-order"><i className="fa-solid fa-money-bills mr-2"></i>AllOrders</Link>

                <Link className="collapse-item" to="/sales-order/create-order"><i className="fa-solid fa-money-bills mr-2"></i>Create-Order</Link>

                {/* <Link className="collapse-item" to="/sales-order/Quatation"><i className="fa-solid fa-money-bills mr-2"></i>Quatation</Link> */}
                {/* <Link className="collapse-item" to="/Performa"><i className="fa-solid fa-file-invoice mr-2"></i>Performa</Link> */}
              </div>
            </div>

            <Link className="collapse-item" to="/sales-order/All-Quotations">Quotations</Link>
            <Link className="collapse-item" to="/All-Proforma">Proforma</Link>


            <Link to={'/order/all-purchase-order'} className="collapse-item" >Purchase-Order</Link>
            <Link to={'/order/all-manufacturing-order'} className="collapse-item capitalize" >Manufacturing
              Order</Link>
          </div>
        </div>
      </li>
      {/* Stock */}
      <li className="nav-item p-1 ">
        <Link onClick={handleToggleStock} className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Stock</span>
        </Link>
        <div className={`collapse ${stock ? '' : 'd-none'} `} aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header"><i className="fa-solid fa-plus mr-2"></i>Add Stock:</h6>
            <Link to={'/Stock-Manage/Raw'} className="collapse-item">All-Raw</Link>
            {/* <Link to={'/Stock-Manage/AddRaw'} className="collapse-item">Add Raw Products</Link> */}
            <Link to={'/Stock-Manage/Order-Raw'} className="collapse-item">Order-Raw</Link>


            <Link to={'/Stock-Manage/Semi-Finshied'} className="collapse-item" >Semi Finshied</Link>
            <Link className="collapse-item" to="/Stock-Manage/Finshied">Finish</Link>
          </div>
        </div>
      </li>

      {/* Bills */}
      <li className="nav-item p-1">
        <Link onClick={handleToggleBills} className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fa-solid fa-receipt"></i>
          <span>Bills / Challan</span>
        </Link>
        <div id="collapsePages" className={`collapse ${Bills ? '' : 'd-none'}`} aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white  collapse-inner rounded">


            <div className={`collapse py-0 `} aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
              <div className="bg-white collapse-inner rounded">

                <Link to={'/Bills/Create-Bills'} className="collapse-item"><i className="fa-solid fa-plus mr-2"></i>Create-Bills </Link>
                <Link to={'/Bills/All-Bills'} className="collapse-item"><i className="fa-solid fa-users mr-2"></i>All Bills</Link>
                <Link to={'/challan/create-challan'} className="collapse-item"><i className="fa-solid fa-plus mr-2"></i>Create-Challan </Link>
                <Link to={'/challan/All-Challan'} className="collapse-item"><i className="fa-solid fa-users mr-2"></i>All Challan</Link>
              </div>
            </div>

          </div>
        </div>
      </li>

      {/* Clients /Vendour  */}
      <li className="nav-item p-1">
        <Link onClick={handleToggleVendor} className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fa-solid fa-receipt"></i>
          <span>Clients / Vendor </span>
        </Link>
        <div id="collapsePages" className={`collapse ${Vendor ? '' : 'd-none'}`} aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white  collapse-inner rounded">

            <Link to={'/Clients-Vendor/Clients'} onClick={handleToggleInAccounts} className="collapse-item"><i class="fa-solid fa-plus mr-2"></i>Clients</Link>
            <Link to={'/Clients-Vendor/Vendors'} className="collapse-item"><i class="fa-solid fa-plus mr-2"></i> Vendors </Link>


          </div>
        </div>
      </li>
      {/* Accounts   */}
      <li className="nav-item p-1">
        <Link onClick={handleToggleAccounts} className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fa-solid fa-receipt"></i>
          <span>Accounts </span>
        </Link>
        <div id="collapsePages" className={`collapse ${Accounts ? '' : 'd-none'}`} aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white  collapse-inner rounded">

            <Link to={'/Accounts/All-Ledger'} className="collapse-item"><i class="fa-solid fa-check mr-2"></i>All Ledger</Link>
            <Link to={'/Make-a-Bills'} className="collapse-item"><i class="fa-solid fa-receipt mr-2"></i>Make a Bills </Link>

            {/* <div className={`collapse py-0 ${InAccounts ? '' : 'd-none'}`} aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
              <div className="bg-white collapse-inner rounded">
              
                <Link to={'/All-Ledger'} className="collapse-item"><i class="fa-solid fa-inbox mr-2"></i>All Ledger</Link>
              </div>
            </div> */}

          </div>
        </div>
      </li>
      {/* Reports   */}
      <li className="nav-item p-1">
        <Link onClick={handleToggleReports} className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i class="fa-solid fa-bookmark"></i>
          <span>Reports </span>
        </Link>
        <div id="collapsePages" className={`collapse ${Reports ? '' : 'd-none'}`} aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white  collapse-inner rounded">

            <Link to={'/reports/daily-reports'} className="collapse-item"><i class="fa-solid fa-clock mr-2"></i>Daily</Link>
            <Link to={'/reports/Weekly-reports'} className="collapse-item"><i class="fa-solid fa-calendar mr-2"></i>Weekly </Link>
            <Link to={'/reports/Monthly-reports'} className="collapse-item"><i class="fa-solid fa-calendar-days mr-2"></i>Monthly </Link>


          </div>
        </div>
      </li>
      <hr className="sidebar-divider my-0" />

      <li className="nav-item p-1">

        <div id="collapsePages" className={`collapse `} aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white  collapse-inner rounded">

            <Link to={'/Login'} className="collapse-item"><i class="fa-solid fa-check mr-2"></i>Login</Link>
            <Link to={'/Profile'} className="collapse-item"><i class="fa-solid fa-calendar mr-2"></i>Profile </Link>

            <Link to={'/Logout'} className="collapse-item"><i class="fa-solid fa-receipt mr-2"></i>Logout </Link>




          </div>
        </div>
      </li>
    </ul>
  );
}

export default Header;
