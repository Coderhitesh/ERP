import React from 'react';
import Header from '../components/Headers/Header';
import './home.css'
import { Routes, Route } from 'react-router-dom';
import Dashboardhome from '../components/Dashboard-home/Dashboard-home';
import Addclient from '../pages/Add-Client/Addclient';
import AddVendor from '../pages/Add-vendor/AddVendor';
import CreateSalesOrder from '../pages/Sales/CreateSalesOrder';
import AllSales from '../pages/Sales/AllSales';
import Quations from '../pages/Invoices/Quations/Quations';
import Performa from '../pages/Invoices/Performa/Performa';
import Raw from '../pages/Stocks/Raw/Raw';
import AddRaw from '../pages/Stocks/Raw/AddRaw';
import OrderRaw from '../pages/Stocks/Raw/OrderRaw';
import OrderForm from '../pages/Stocks/Raw/OrderForm';
import PurchaseOrder from '../pages/Invoices/Purchase order/PurchaseOrder';
import ManufactureOrder from '../pages/Invoices/Manufacture/ManufactureOrder';
import CreateBills from '../pages/Invoices/Bills/CreateBills';
import AllBills from '../pages/Invoices/Bills/AllBills';
import Login from '../pages/auth/Login';
import CreateChallan from '../pages/Invoices/Challan/CreateChallan';
import DailyReport from '../pages/Reports/DailyReport';
import AllPurchaseOrder from '../pages/Invoices/Purchase order/AllPurchaseOrder';
import AllManufactOrder from '../pages/Invoices/Manufacture/AllManufactOrder';
import BillPreview from '../pages/Invoices/Bills/BillPreview';
import AddClient from '../pages/Add-Client/Addclient';
import AllClients from '../pages/Add-Client/AllClients';
import EditClients from '../pages/Add-Client/EditClient';
import Profile from '../pages/auth/Profile';
import AllQuotations from '../pages/Quotations/AllQuotations';
import PerformaCreate from '../pages/Quotations/PerformaCreate';
import AllPerforma from '../pages/Quotations/AllPerforma';
import AllVendors from '../pages/Add-vendor/AllVendors';
import EditRow from '../pages/Stocks/Raw/EditRow';
import Semifinished from '../pages/Stocks/SemiFinished/Semifinished';
import AddSemiFinished from '../pages/Stocks/SemiFinished/AddSemiFinished';
import EditSeminFinished from '../pages/Stocks/SemiFinished/EditSeminFinished';
import AllFinished from '../pages/Finished/AllFinished';
import AddFinished from '../pages/Finished/AddFinished';
import EditFinished from '../pages/Finished/EditFinished';
import EditPurchaseOrder from '../pages/Invoices/Purchase order/EditPurchaseOrder';
const Home = () => {
  return (
    <div className="conatiner">
      <div className="row">

        <div className="col-4 sideNavHead   border-black col-md-2">
          <Header />
        </div>

        <div className="col-8 relative sideContentNav  col-md-10">
          <Routes>
            <Route path='/' element={<Dashboardhome />} />

            <Route path='/sales-order/create-order' element={<CreateSalesOrder />} />
            <Route path='/sales-order/All-order' element={<AllSales />} />
            <Route path='/sales-order/Quatation' element={<Quations />} />
            <Route path='/sales-order/All-Quotations' element={<AllQuotations />} />
            <Route path='/Create-Performa/:id' element={<PerformaCreate />} />
            <Route path='/All-Proforma' element={<AllPerforma />} />



            <Route path='/sales-order/Performa' element={<Performa />} />
            <Route path='/sales-order/Purchase-Order' element={<PurchaseOrder />} />

            {/* ---------------------Clients And Vendor ---------------------- */}

            <Route path='/Clients-Vendor/Add-Clients' element={<AddClient />} />
            <Route path='/Clients-Vendor/Add-Vendors' element={<AddVendor />} />
            <Route path='/Clients-Vendor/Clients' element={<AllClients />} />
            <Route path='/Clients-Vendor/Clients/edit/:id' element={<EditClients />} />

            <Route path='/Clients-Vendor/Vendors' element={<AllVendors />} />

            <Route path='/bills/bill-preview' element={<BillPreview />} />

            <Route path='/order/all-purchase-order' element={<AllPurchaseOrder />} />
            {/* <Route path='/order/edit-purchase-order/:id' element={<EditPurchaseOrder />} /> */}
            <Route path='/order/create-purchase-order' element={<PurchaseOrder />} />
            <Route path='/order/all-manufacturing-order' element={<AllManufactOrder />} />
            <Route path='/order/create-manufacturing-order' element={<ManufactureOrder />} />


            {/* <Route path='/sales-order/Manufacturing-Order' element={<ManufactureOrder />} /> */}
            <Route path='/Stock-Manage/Raw' element={<Raw />} />
            <Route path='/Stock-Manage/AddRaw' element={<AddRaw />} />
            <Route path='/Stock-Manage/edit-raw/:id' element={<EditRow />} />
            <Route path='/Stock-Manage/Order-Raw' element={<OrderRaw />} />
            <Route path='/Stock-Manage/Make-Raw-Order' element={<OrderForm />} />

            <Route path='/Stock-Manage/Semi-Finshied' element={<Semifinished />} />
            <Route path='/Stock-Manage/create-semi-finished' element={<AddSemiFinished />} />
            <Route path='/Stock-Manage/edit-semi-finished/:id' element={<EditSeminFinished />} />

            {/* ---------------------Bills And Challan ---------------------- */}
            <Route path='/Bills/Create-Bills' element={<CreateBills />} />
            <Route path='/Bills/All-Bills' element={<AllBills />} />
            <Route path='/challan/create-challan' element={<CreateChallan />} />
            {/* <Route path='/challan/All-Challan' element={<AllBills />} /> */}


            {/* ---------------------Authentication ---------------------- */}
            <Route path='/Login' element={<Login />} />
            <Route path='/Profile' element={<Profile />} />


            {/* -------------------- Reports ---------------------- */}
            <Route path='/reports/daily-reports' element={<DailyReport />} />

            {/* -------------------- finished ---------------------- */}
            {/* <Route path='/Stock-Manage/Finshied' element={<DailyReport />} /> */}
            <Route path='/Stock-Manage/Finshied' element={<AllFinished />} />
            <Route path='/Stock-Manage/Add-Finshied' element={<AddFinished />} />
            <Route path='/Stock-Manage/edit-Finshied/:id' element={<EditFinished />} />







          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
