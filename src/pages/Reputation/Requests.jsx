import React from "react";
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Mail, MessageSquare, Send, X, ChevronUp, ChevronDown } from 'lucide-react';
export default function RequestPageWithFixedHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Email');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [selectedModes, setSelectedModes] = useState({
      Email: false,
      SMS: false,
      WhatsApp: false
    });
    const modalContentRef = useRef(null);
    
    const disabledModes = {
      SMS: true,
      WhatsApp: false,
      Email: false
    };
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const scrollUp = () => {
      if (modalContentRef.current) {
        modalContentRef.current.scrollBy({ top: -100, behavior: 'smooth' });
      }
    };
  
    const scrollDown = () => {
      if (modalContentRef.current) {
        modalContentRef.current.scrollBy({ top: 100, behavior: 'smooth' });
      }
    };
  
    const handleModeChange = (mode) => {
      if (disabledModes[mode]) return;
      setSelectedModes({
        ...selectedModes,
        [mode]: !selectedModes[mode]
      });
    };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Fixed navigation header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
          <h1 className="text-xl font-semibold py-4 mr-8">Reputation</h1>

<nav className="flex space-x-4">
 
    <Link to="/Overview" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
      Overview
    </Link>
 
    <div className="border-b-2 border-blue-500">
  <Link to="/Requests" className="block py-4 px-3 text-blue-500 font-medium">
    Requests
  </Link>
</div>
  <Link to="/Reviews" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Reviews
  </Link>

  <Link to="/Widgets" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Widgets
  </Link>

  <Link to="/Listings" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Listings
  </Link>

  <Link to="/Settings" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Settings
  </Link>
</nav>

          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Requests</h2>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
          onClick={openModal}
        >
          Send Review Request
        </button>
      </div>
      
      {/* Modal Overlay */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
    
    {/* Modal Content */}
    <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto z-10 relative flex flex-col h-4/5">
      {/* Modal Header */}
      <div className="flex items-start p-6 border-gray-200">
        <div className="bg-gray-100 p-2 rounded-lg mr-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <Mail className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">Send Review Request</h2>
          <p className="text-gray-500">Invite Your Customers to Leave a Review</p>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Content Area - With Custom Styled Scrollbar */}
      <div 
        ref={modalContentRef} 
        className="flex-1 overflow-y-auto p-6 custom-scrollbar"
        style={{ 
          maxHeight: "calc(100% - 80px)",
        }}
      >
        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          /* For Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
        `}</style>

        <form className="space-y-6">
          {/* Contact Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Contact Name</label>
            <div className="relative">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact name"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Contact Phone</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Choose Modes */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Choose Modes</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedModes.Email}
                  onChange={() => handleModeChange('Email')}
                  className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
                />
                <span className="ml-2">Email</span>
              </label>
              <label className="flex items-center relative">
                <input
                  type="checkbox"
                  checked={selectedModes.SMS}
                  onChange={() => handleModeChange('SMS')}
                  className={`w-5 h-5 border-gray-300 rounded focus:ring-blue-500 ${
                    disabledModes.SMS ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'
                  }`}
                  disabled={disabledModes.SMS}
                />
                <span className={`ml-2 ${disabledModes.SMS ? 'text-gray-400' : ''}`}>SMS</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedModes.WhatsApp}
                  onChange={() => handleModeChange('WhatsApp')}
                  className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
                />
                <span className="ml-2">WhatsApp</span>
              </label>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                type="button"
                className={`py-3 px-6 ${activeTab === 'Email' ? 'border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('Email')}
              >
                Email
              </button>
              <button
                type="button"
                className={`py-3 px-6 ${activeTab === 'SMS' ? 'border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('SMS')}
              >
                SMS
              </button>
              <button
                type="button"
                className={`py-3 px-6 ${activeTab === 'WhatsApp' ? 'border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('WhatsApp')}
              >
                WhatsApp
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-blue-50 p-6 rounded-lg">
            {activeTab === 'Email' && (
              <div>
                <h3 className="text-lg font-medium mb-2">Reach out to your customers through Email for more reviews!</h3>
                <p className="text-gray-700 mb-6">
                  Enable Email Review Requests to seamlessly collect customer feedback and boost your online reputation.
                </p>
                <button
                  type="button"
                  className="flex items-center bg-white border border-blue-600 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Enable Email Request
                </button>
              </div>
            )}
            {activeTab === 'SMS' && (
              <div>
                <h3 className="text-lg font-medium mb-2">SMS functionality is currently unavailable</h3>
                <p className="text-gray-700 mb-6">
                  This feature has been disabled or is not available for your account.
                </p>
                <button
                  type="button"
                  className="flex items-center bg-white border border-gray-300 text-gray-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                  disabled
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Enable SMS Request
                </button>
              </div>
            )}
            {activeTab === 'WhatsApp' && (
              <div>
                <h3 className="text-lg font-medium mb-2">Use WhatsApp for review requests!</h3>
                <p className="text-gray-700 mb-6">
                  Leverage WhatsApp's popularity to gather customer feedback and build your reputation.
                </p>
                <button
                  type="button"
                  className="flex items-center bg-white border border-blue-600 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enable WhatsApp Request
                </button>
              </div>
            )}
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
          >
            Send Review Request
          </button>
        </form>
      </div>
      
      {/* Scroll Controls */}
      <div className="flex justify-end p-2 border-t border-gray-200">
        <div className="flex space-x-2">
          {/* You could add scroll control buttons here if needed */}
        </div>
      </div>
    </div>
  </div>
)}
    
        
        <div className=" rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-7 bg-gray-50  text-sm text-gray-600">
            <div className="p-4">Invite Sent To</div>
            <div className="p-4">Email / Phone Number</div>
            <div className="p-4">Sent By</div>
            <div className="p-4">Sent Via</div>
            <div className="p-4">Date Sent</div>
            <div className="p-4">Status</div>
            <div className="p-4">Actions</div>
          </div>
          
          {/* Empty state with Oops message */}
          <div className="py-12 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-gray-500 font-medium mb-6">Oops!</h2>
            <div className="w-64 h-64">
            <div className="w-70 h-70 mx-auto ">
              <img src="https://storage.googleapis.com/revex-reputation-production/assets/no-data-img.svg" alt="no-review-requests" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}