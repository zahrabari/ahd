
import { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Send, X, ChevronUp, ChevronDown } from 'lucide-react';
export default function ReputationDashboard() {
  const [timeframe, setTimeframe] = useState('Last 6 Months');
  const [isOpen, setIsOpen] = useState(false);
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
  const options = [
    'This Week',
    'This Month',
    'This Year',
    'Last Week',
    'Last 6 Months'
  ];
  const metricsData = {
    invitesGoal: {
      current: 0,
      total: 20,
      percentChange: 0
    },
    reviewsReceived: {
      count: 0,
      percentChange: 0
    },
    sentiment: {
      positive: 0,
      negative: 0,
      positiveChange: 0,
      negativeChange: 0
    }
  };
  
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const selectOption = (option) => {
    setTimeframe(option);
    setIsOpen(false);
  };
//////22222222222222222222222222222222222222222////////////////////////////////////
const [ratingCount, setRatingCount] = useState(0);
  
// Star rating data
const starRatings = [
  { stars: 5, count: 0, color: 'bg-blue-600' },
  { stars: 4, count: 0, color: 'bg-blue-500' },
  { stars: 3, count: 0, color: 'bg-blue-400' },
  { stars: 2, count: 0, color: 'bg-blue-300' },
  { stars: 1, count: 0, color: 'bg-blue-200' }
];
/////////3333333333333333333333333333333333///////////////////////////
const monthlyData = [
  { month: 'Nov, 24', invites: 0, reviews: 0 },
  { month: 'Dec, 24', invites: 0, reviews: 0 },
  { month: 'Jan, 25', invites: 0, reviews: 0 },
  { month: 'Feb, 25', invites: 0, reviews: 0 },
  { month: 'Mar, 25', invites: 0, reviews: 0 },
  { month: 'Apr, 25', invites: 0, reviews: 0 },
];
//////////////////44444444444444

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Fixed Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
          <h1 className="text-xl font-semibold py-4 mr-8">Reputation</h1>

<nav className="flex space-x-4">
  <div className="border-b-2 border-blue-500">
    <Link to="/Ov" className="block py-4 px-3 text-blue-500 font-medium">
      Overview
    </Link>
  </div>

  <Link to="/re" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Requests
  </Link>

  <Link to="/rev" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Reviews
  </Link>

  <Link to="/w" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Widgets
  </Link>

  <Link to="/listings" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Listings
  </Link>

  <Link to="/s" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
    Settings
  </Link>
</nav>

          </div>
        </div>
      </div>
    
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Overview</h2>
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
        
        {/* Time Filter */}
        <div className="p-6">
          {/* Timeframe Dropdown */}
          <div className="mb-6">
            <div className="relative inline-block">
              <button 
                className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2"
                onClick={toggleDropdown}
              >
                <span>{timeframe}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
              
              {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {options.map((option, index) => (
                    <div 
                      key={index}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${timeframe === option ? 'bg-blue-100 text-blue-600' : ''}`}
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Invites Goal Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-6">Invites Goal</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#f1f1f1" 
                  strokeWidth="10" 
                />
                <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold">
                  {metricsData.invitesGoal.current}
                </text>
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{metricsData.invitesGoal.percentChange}%</span>
            </div>
            <span className="text-gray-500">out of {metricsData.invitesGoal.total}</span>
          </div>
        </div>

        {/* Reviews Received Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-6">Reviews Received</h3>
          <div className="flex justify-center mb-4">
            <span className="text-5xl font-bold">{metricsData.reviewsReceived.count}</span>
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{metricsData.reviewsReceived.percentChange}%</span>
            </div>
            <span className="text-gray-500">vs Previous {timeframe}</span>
          </div>
        </div>

        {/* Sentiment Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-6">Sentiment</h3>
          <div className="flex justify-center items-center space-x-10 mb-4">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </div>
              <span className="text-3xl font-bold">{metricsData.sentiment.positive}</span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{metricsData.sentiment.positiveChange}%</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 rounded-full p-3 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
              </div>
              <span className="text-3xl font-bold">{metricsData.sentiment.negative}</span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{metricsData.sentiment.negativeChange}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Average Rating Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-6">Average Rating</h3>
      
      <div className="flex items-start">
        {/* Left side - rating number and star */}
        <div className="flex items-center mr-8">
          <div className="relative">
            <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-5xl font-bold">0</div>
            <div className="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Right side - star breakdown */}
        <div className="flex-1">
          {starRatings.map((rating) => (
            <div key={rating.stars} className="flex items-center mb-3">
              <div className="flex items-center w-20">
                <div className={`h-3 w-3 rounded-full ${rating.stars === 5 ? 'bg-blue-600' : 
                                                     rating.stars === 4 ? 'bg-blue-500' : 
                                                     rating.stars === 3 ? 'bg-blue-400' : 
                                                     rating.stars === 2 ? 'bg-blue-300' : 'bg-blue-200'}`}></div>
                <span className="ml-2 text-gray-700">{rating.stars} Stars</span>
              </div>
              <div className="flex-1 mx-3">
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className={`h-full ${rating.color} w-0`}></div>
                </div>
              </div>
              <span className="w-6 text-right text-gray-600">{rating.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  {/*3333333////////////////////////////*/}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Invite Trends Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-6">Invite Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dy={10}
              />
              <YAxis hide={true} />
              <Line 
                type="monotone" 
                dataKey="invites" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Review Trends Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-6">Review Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dy={10}
              />
              <YAxis hide={true} />
              <Line 
                type="monotone" 
                dataKey="reviews" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
          {/*444444444444444444444444444444444444*/}

    <div className="flex bg-white flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Review Requests Panel */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Latest Review Requests</h2>
        </div>
        
        <div className="bg-gray-50 p-3 border-b border-gray-100 grid grid-cols-3 text-sm text-gray-500 font-medium">
          <div>Invite Sent To</div>
          <div>Email / Phone Number</div>
          <div>Sent By</div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="rounded-full bg-blue-50 p-8 mb-6 w-64 h-64 flex items-center justify-center">
            <div className="relative">
              <div className="w-65 h-65 mx-auto ">
              <img src="https://storage.googleapis.com/revex-reputation-production/assets/no-data-img.svg" alt="no-review-requests" />

              </div>
            </div>
          </div>
          <h3 className="text-2xl font-medium text-gray-500 mb-2">Oops!</h3>
          <p className="text-lg text-gray-500 mb-3">You have not sent any review request yet</p>
          <p className="text-gray-500 mb-4">No reviews found. Start by setting up your reviews: <a href="#" className="text-blue-500">Link</a></p>
        </div>
      </div>
      {/* Latest Reviews Panel */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Latest Reviews</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="rounded-full bg-blue-50 p-8 mb-6 w-64 h-64 flex items-center justify-center">
            <div className="relative">
              <div className="w-65 h-65 mx-auto">
              <img src="https://storage.googleapis.com/revex-reputation-production/assets/no-data-img.svg" alt="no-review-requests" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-medium text-gray-500 mb-2">Oops!</h3>
          <p className="text-lg text-gray-500 mb-3">You have no reviews yet</p>
          <p className="text-gray-500 mb-4">No reviews found. Start by setting up your reviews: <a href="#" className="text-blue-500">Link</a></p>
        </div>
      </div>
      
      {/* Optional: Add a floating action button for creating new reviews */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </div>
  
  );
}