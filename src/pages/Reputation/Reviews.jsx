import React, { useState, useEffect, useRef } from 'react';
import { Search, Mail, MessageSquare, Calendar, Send, Star, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DateRangePicker = ({ themeClasses, startDate, endDate, setStartDate, setEndDate, selectedStartDate, selectedEndDate, setSelectedStartDate, setSelectedEndDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const [viewMonth, setViewMonth] = useState({
    left: new Date(),
    right: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });

  // Date formatting functions
  const formatDateString = (date) => date.toISOString().split("T")[0];
  const formatDisplayDate = (dateStr) => dateStr || 'Select date';

  // Calendar navigation
  const navigateMonth = (direction, side) => {
    setViewMonth(prev => {
      const currentDate = new Date(prev[side]);
      const newMonth = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
      return { ...prev, [side]: newMonth };
    });
  };

  // Date selection handlers
  const handleDateClick = (date) => {
    if (selectedStartDate && selectedEndDate) {
      setSelectedStartDate({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      if (date < new Date(selectedStartDate.year, selectedStartDate.month, selectedStartDate.date)) {
        setSelectedStartDate({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
        setStartDate(formatDateString(new Date(selectedStartDate.year, selectedStartDate.month, selectedStartDate.date)));
        setEndDate(formatDateString(date));
      }
    } else {
      setSelectedStartDate({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate() });
      setStartDate(formatDateString(date));
    }
  };

  const confirmDateSelection = () => {
    if (selectedStartDate && selectedEndDate) {
      setShowDatePicker(false);
    } else if (selectedStartDate) {
      setEndDate(formatDateString(new Date(selectedStartDate.year, selectedStartDate.month, selectedStartDate.date)));
      setSelectedEndDate(selectedStartDate);
      setShowDatePicker(false);
    }
  };

  // Calendar grid generation
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    const firstDay = date.getDay();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDate - i),
        isCurrentMonth: false,
      });
    }

    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  // Date range helpers
  const isInRange = (date) => 
    selectedEndDate && 
    date >= new Date(selectedStartDate.year, selectedStartDate.month, selectedStartDate.date) && 
    date <= new Date(selectedEndDate.year, selectedEndDate.month, selectedEndDate.date);

  const isStartOrEnd = (date) => 
    (selectedStartDate && date.getTime() === new Date(selectedStartDate.year, selectedStartDate.month, selectedStartDate.date).getTime()) || 
    (selectedEndDate && date.getTime() === new Date(selectedEndDate.year, selectedEndDate.month, selectedEndDate.date).getTime());

  // Preset ranges
  const setDateRange = (range) => {
    const today = new Date();
    let start, end;

    switch (range) {
      case "thisWeek":
        start = new Date(today.setDate(today.getDate() - today.getDay()));
        end = new Date(today.setDate(today.getDate() + 6 - today.getDay()));
        break;
      case "lastWeek":
        start = new Date(today.setDate(today.getDate() - today.getDay() - 7));
        end = new Date(today.setDate(today.getDate() - 1));
        break;
      case "last7Days":
        start = new Date(today.setDate(today.getDate() - 6));
        end = new Date();
        break;
      case "thisMonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default: break;
    }

    setSelectedStartDate({ year: start.getFullYear(), month: start.getMonth(), date: start.getDate() });
    setSelectedEndDate({ year: end.getFullYear(), month: end.getMonth(), date: end.getDate() });
    setStartDate(formatDateString(start));
    setEndDate(formatDateString(end));
    setShowDatePicker(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        className="flex items-center bg-white border border-gray-200 rounded-xl px-5 py-2.5 w-72 cursor-pointer hover:border-gray-300 transition-colors shadow-sm"
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          <span className={(startDate || endDate) ? "font-medium text-gray-700" : "text-gray-500"}>
            {startDate && endDate ? `${formatDisplayDate(startDate)} to ${formatDisplayDate(endDate)}` : 
             startDate ? `From ${formatDisplayDate(startDate)}` : 
             endDate ? `Until ${formatDisplayDate(endDate)}` : 
             'Start date — End date'}
          </span>
        </div>
        {(startDate || endDate) ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setStartDate('');
              setEndDate('');
              setSelectedStartDate(null);
              setSelectedEndDate(null);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {showDatePicker && (
        <div
          ref={datePickerRef}
          className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-auto"
          style={{ minWidth: "700px" }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {["left", "right"].map((side) => (
              <div key={side} className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => navigateMonth(-1, side)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-medium">
                    {viewMonth[side].toLocaleDateString("en-US", { 
                      month: "long", 
                      year: "numeric" 
                    })}
                  </h3>
                  <button
                    onClick={() => navigateMonth(1, side)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(
                    viewMonth[side].getFullYear(),
                    viewMonth[side].getMonth()
                  ).map((day, i) => (
                    <button
                      key={i}
                      onClick={() => handleDateClick(day.date)}
                      className={`
                        h-8 w-8 flex items-center justify-center text-sm rounded-full 
                        ${!day.isCurrentMonth ? themeClasses.calendar.otherMonth : ""}
                        ${isStartOrEnd(day.date) ? themeClasses.calendar.selected : ""}
                        ${isInRange(day.date) ? themeClasses.calendar.inRange : ""}
                        ${themeClasses.calendar.dayBtn}
                      `}
                    >
                      {day.date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap justify-between items-center">
            <div className="flex gap-2">
              {["thisWeek", "lastWeek", "last7Days", "thisMonth"].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1 rounded-md text-sm ${themeClasses.button.secondary}`}
                >
                  {range.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>
            <button
              onClick={confirmDateSelection}
              className={`px-4 py-1 rounded-md text-sm ${themeClasses.button.primary}`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewsInterface = () => {
  const [showRatingsDropdown, setShowRatingsDropdown] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('');
  const [selectedRatingLabel, setSelectedRatingLabel] = useState('Ratings');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showClearButton, setShowClearButton] = useState(false);
  const [selectedSources, setSelectedSources] = useState([]);
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
  const ratingsRef = useRef(null);
  const sourceRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ratingsRef.current && !ratingsRef.current.contains(event.target)) {
        setShowRatingsDropdown(false);
      }
      if (sourceRef.current && !sourceRef.current.contains(event.target)) {
        setShowSourceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowClearButton(selectedSources.length > 0 || ratingFilter !== '' || startDate !== '' || endDate !== '');
  }, [selectedSources, ratingFilter, startDate, endDate]);

  const ratingOptions = [
    { label: "Between 4 and 5", value: "4-5" },
    { label: "Between 3 and 4", value: "3-4" },
    { label: "Between 2 and 3", value: "2-3" },
    { label: "Between 1 and 2", value: "1-2" }
  ];

  const GoogleIcon = () => (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          fill="#4285F4"
          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
        />
      </svg>
    </div>
  );

  const FacebookIcon = () => (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <circle cx="12" cy="12" r="11" fill="#4267B2"/>
        <path
          fill="white"
          d="M16.5,12H14v9h-3.8v-9H8v-3.1h2.2V7.2c0-1.8,0.8-3.2,3.2-3.2h2.6v3h-1.6c-1.3,0-1.4,0.5-1.4,1.4v0.5h2.9L16.5,12z"
        />
      </svg>
    </div>
  );

  const AllIcon = () => (
    <div className="flex items-center">
      <GoogleIcon />
      <FacebookIcon />
    </div>
  );

  const sourceOptions = [
    { value: 'all', label: 'All', icon: AllIcon },
    { value: 'google', label: 'All Google pages', icon: GoogleIcon },
    { value: 'facebook', label: 'All Facebook pages', icon: FacebookIcon }
  ];

  const handleRatingSelect = (option) => {
    setRatingFilter(option.value);
    setSelectedRatingLabel(option.label);
    setShowRatingsDropdown(false);
  };

  const handleSourceSelect = (option) => {
    if (option.value === 'all') {
      setSelectedSources(selectedSources.length === 2 ? [] : ['google', 'facebook']);
    } else {
      if (selectedSources.includes(option.value)) {
        setSelectedSources(selectedSources.filter(src => src !== option.value));
      } else {
        setSelectedSources([...selectedSources, option.value]);
      }
    }
  };

  const handleClearFilters = () => {
    setSelectedSources([]);
    setRatingFilter('');
    setSelectedRatingLabel('Ratings');
    setStartDate('');
    setEndDate('');
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const getSelectedSourceDisplay = () => {
    if (selectedSources.length === 0) {
      return { label: 'Sources', icon: null };
    } else if (selectedSources.length === 2) {
      return { label: 'All', icon: AllIcon };
    } else if (selectedSources.includes('google')) {
      return { label: 'All Google pages', icon: GoogleIcon };
    } else if (selectedSources.includes('facebook')) {
      return { label: 'All Facebook pages', icon: FacebookIcon };
    }
    return { label: 'Sources', icon: null };
  };

  const displayInfo = getSelectedSourceDisplay();

  return (
    <div className="font-sans bg-white min-h-screen">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold py-4 mr-8">Reputation</h1>
            <nav className="flex space-x-4">
              <Link to="/Overview" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
                Overview
              </Link>
              <Link to="/Requests" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
                Requests
              </Link>
              <div className="border-b-2 border-blue-500">
                <Link to="/Reviews" className="block py-4 px-3 text-blue-500 font-medium">
                  Reviews
                </Link>
              </div>
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
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Reviews</h2>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
            onClick={openModal}
          >
            Send Review Request
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
            <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto z-10 relative flex flex-col h-4/5">
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
              <div 
                ref={modalContentRef} 
                className="flex-1 overflow-y-auto p-6 custom-scrollbar"
                style={{ maxHeight: "calc(100% - 80px)" }}
              >
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
                  .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #888 #f1f1f1;
                  }
                `}</style>
                <form className="space-y-6">
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
                          className={`w-5 h-5 border-gray-300 rounded focus:ring-blue-500 ${disabledModes.SMS ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'}`}
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
                    {activeTab == 'WhatsApp' && (
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
              <div className="flex justify-end p-2 border-t border-gray-200">
                <div className="flex space-x-2">
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative">
            <div className="relative bottom-4" ref={ratingsRef}>
              <button 
                onClick={() => setShowRatingsDropdown(!showRatingsDropdown)}
                className="flex items-center justify-between bg-white border border-blue-200 rounded-xl px-5 py-2.5 w-48 text-gray-700 hover:border-blue-300 transition-colors shadow-sm"
              >
                <div className="flex items-center">
                  {ratingFilter && <Star className="w-4 h-4 text-yellow-400 mr-2" />}
                  <span className={ratingFilter ? "font-medium" : "text-gray-500"}>
                    {selectedRatingLabel}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showRatingsDropdown && (
                <div className="absolute z-20 mt-1 w-64 bg-white rounded-xl shadow-2xl overflow-hidden">
                  {ratingOptions.map((option) => (
                    <div 
                      key={option.value}
                      onClick={() => handleRatingSelect(option)}
                      className="flex items-center px-5 py-3 hover:bg-blue-50 cursor-pointer last:border-b-0 transition-colors"
                    >
                      <Star className="text-yellow-400 mr-2.5 w-5 h-5" />
                      <span className="text-gray-700">{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {showClearButton && (
              <button
                onClick={handleClearFilters}
                className="relative left-0 bottom-5 mt-2 flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-2.5 w-48 text-gray-700 hover:border-gray-300 transition-colors shadow-sm z-10"
              >
                <X className="w-4 h-4 text-gray-500 mr-2" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <div className="relative bottom-4" ref={sourceRef}>
            <button
              onClick={() => setShowSourceDropdown(!showSourceDropdown)}
              className="flex items-center justify-between bg-white border-gray-200 rounded-xl px-5 py-2.5 w-72 text-gray-700 hover:border-gray-300 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                {displayInfo.icon && React.createElement(displayInfo.icon)}
                <span className={selectedSources.length ? "font-medium" : "text-gray-500"}>
                  {displayInfo.label}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSourceDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showSourceDropdown && (
              <div className="absolute z-20 mt-1 w-72 bg-white rounded-xl shadow-xl overflow-hidden">
                {sourceOptions.map((option) => {
                  const isSelected = (option.value === 'all' && selectedSources.length === 2) ||
                    (option.value !== 'all' && selectedSources.includes(option.value));
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleSourceSelect(option)}
                      className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 cursor-pointer last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        {React.createElement(option.icon)}
                        <span className="font-medium">{option.label}</span>
                      </div>
                      {isSelected && (
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="relative bottom-4">
            <DateRangePicker 
              themeClasses={{
                background: 'bg-white',
                input: 'bg-white border border-gray-200',
                calendar: {
                  dayBtn: 'text-gray-700 hover:bg-gray-100',
                  otherMonth: 'text-gray-400',
                  selected: 'bg-blue-600 text-white font-medium',
                  inRange: 'bg-blue-100 text-blue-600',
                },
                button: {
                  primary: 'bg-blue-600 text-white hover:bg-blue-700',
                  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                },
              }}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              setSelectedStartDate={setSelectedStartDate}
              setSelectedEndDate={setSelectedEndDate}
            />
          </div>
        </div>
        <div className="relative bottom-4">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-6" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-white border-gray-200 rounded-xl justify-between w-48 text-gray-700 border border-gray-200 px-12 py-2.5 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors shadow-sm"
          />
        </div>
        <div className="flex flex-col items-center bottom-20 justify-center py-16 bg-white">
          <div className="text-4xl bottom-20 font-bold text-gray-700 mb-8">Oops!</div>
          <div className="relative w-96 h-96">
            <div className="w-96 h-96 mx-auto">
              <img src="https://storage.googleapis.com/revex-reputation-production/assets/no-data-img.svg" alt="no-review-requests" />
            </div>
          </div>
          <p className="text-gray-500 text-lg max-w-md text-center mt-4">
            No reviews found. Try adjusting your filters or send a request to get new reviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsInterface;