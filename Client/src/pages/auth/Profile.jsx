import React, { useState } from 'react';
import './Profile.css'; // Import custom styles
import Bussiness_Settings from '../Bussiness_Settings/Bussiness_Settings';
import GetBusinessSettings from '../Bussiness_Settings/GetBussinessSettings';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="erp-profile-container">
            <div className="erp-sidebar">
                <h2 className="erp-sidebar-title">Account Settings</h2>
                <ul className="erp-sidebar-menu">
                    <li
                        className={`erp-sidebar-item ${activeTab === 'profile' ? 'erp-active' : ''}`}
                        onClick={() => handleTabChange('profile')}
                    >
                        Profile
                    </li>
                    <li
                        className={`erp-sidebar-item ${activeTab === 'clearCache' ? 'erp-active' : ''}`}
                        onClick={() => handleTabChange('clearCache')}
                    >
                        Clear Cache
                    </li>
                    <li
                        className={`erp-sidebar-item ${activeTab === 'roles' ? 'erp-active' : ''}`}
                        onClick={() => handleTabChange('roles')}
                    >
                        Roles
                    </li>
                    <li
                        className={`erp-sidebar-item ${activeTab === 'settings' ? 'erp-active' : ''}`}
                        onClick={() => handleTabChange('settings')}
                    >
                        Settings
                    </li>
                    <li
                        className={`erp-sidebar-item ${activeTab === 'logout' ? 'erp-active' : ''}`}
                        onClick={() => handleTabChange('logout')}
                    >
                        Logout
                    </li>
                    <li
                        className={`erp-sidebar-item ${activeTab === 'support' ? 'erp-active' : ''}`}
                        onClick={() => handleTabChange('support')}
                    >
                        Support
                    </li>
                </ul>
            </div>
            <div className="erp-content">
                {activeTab === 'profile' && (
                    <div className="erp-tab-content">
                        <h3 className="erp-tab-title">Your Profile</h3>
                        <p className="erp-tab-description">Update your profile information here.</p>
                        {/* Add form fields or profile details */}
                    </div>
                )}
                {activeTab === 'clearCache' && (
                    <div className="erp-tab-content">
                        <h3 className="erp-tab-title">Clear Cache</h3>
                        <p className="erp-tab-description">Click the button below to clear cache.</p>
                        <button className="erp-btn erp-btn-danger">Clear Cache</button>
                    </div>
                )}
                {activeTab === 'roles' && (
                    <div className="erp-tab-content">
                        <h3 className="erp-tab-title">User Roles</h3>
                        <p className="erp-tab-description">Manage user roles and permissions.</p>
                    </div>
                )}
                {activeTab === 'settings' && (
                    <div className="erp-tab-content">
                        <h3 className="erp-tab-title">Settings</h3>
                        <p className="erp-tab-description">Adjust your account settings.</p>
                        {/* <Bussiness_Settings/> */}
                        <GetBusinessSettings/>
                    </div>
                )}
                {activeTab === 'logout' && (
                    <div className="erp-tab-content">
                        <h3 className="erp-tab-title">Logout</h3>
                        <p className="erp-tab-description">Are you sure you want to log out?</p>
                        <button className="erp-btn erp-btn-warning">Logout</button>
                    </div>
                )}
                {activeTab === 'support' && (
                    <div className="erp-tab-content">
                        <h3 className="erp-tab-title">Support</h3>
                        <p className="erp-tab-description">Contact our support team for assistance.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
