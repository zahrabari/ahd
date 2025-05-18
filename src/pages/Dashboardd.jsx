import React, { useState } from 'react';
import {
  Settings2,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowRight,
  Calendar,
  Globe,
  Check,
  PanelsLeftBottom
} from 'lucide-react';

const Dashboard = () => {
  // State for dropdowns and toggles
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPar, setIsOpenPar] = useState(false);
  const [isOpenPar1, setIsOpenPar1] = useState(false);
  const [isOpenPar2, setIsOpenPar2] = useState(false);
  const [isOpenPar3, setIsOpenPar3] = useState(false);
  
  const [isOpenN, setIsOpenN] = useState(false);
  const [isOpenNN, setIsOpenNN] = useState(false);
  const [isOpenNNN, setIsOpenNNN] = useState(false);
  
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // State for settings dropdowns
  const [selected, setSelected] = useState('Created Date');
  const [selectedN, setSelectedN] = useState('Created Date');
  const [selectedPar, setSelectedPar] = useState('Created Date');
  const [selectedPar1, setSelectedPar1] = useState('Created Date');
  const [selectedPar2, setSelectedPar2] = useState('Created Date');
  const [selectedPar3, setSelectedPar3] = useState('Created Date');
  
  
  
  // Filters state
  const [tasksFilter, setTasksFilter] = useState('All');
  const [dateAddedFilter, setDateAddedFilter] = useState('Date Added (...)');
  const [userFilter, setUserFilter] = useState('ZAHRA ZAHRA');
  const [manualActionsFilter, setManualActionsFilter] = useState('All');
  const [userManualFilter, setUserManualFilter] = useState('All Users');
  
  // Calendar state
  const [dateRange, setDateRange] = useState({
    start: 'Mar 08, 2025',
    end: 'Apr 08, 2025'
  });

  //ffffffffffffffffffffffffffffffffffffff

  const generateChartData = () => {
    const startValue = 100;
    const months = 12;
    const values = [startValue];
    
    for (let i = 1; i < months; i++) {
      // Create an increasing trend with some variation
      if (i === 5) {
        // Significant jump in the middle
        values.push(values[i-1] * 1.5);
      } else {
        // Random variation
        const change = Math.random() * 20 - 5; // -5 to +15
        values.push(Math.max(50, values[i-1] + change));
      }
    }
    
    return values;
  };


  const chartData = generateChartData();
  const maxValue = Math.max(...chartData) * 1.1; // Add 10% for chart margin
  
  // Convert data to SVG path
  const getPath = () => {
    const width = 1000;
    const height = 400;
    const padding = 50;
    
    const xStep = (width - padding * 2) / (chartData.length - 1);
    
    return chartData.map((value, index) => {
      const x = padding + index * xStep;
      const y = height - padding - (value / maxValue) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  };

  // Month labels for x-axis
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const metrics = [
    { title: 'Total views', count: 0 },
    { title: 'Search (Desktop & Mobile)', count: 0 },
    { title: 'Conversations', count: 0 },
    { title: 'Website visits', count: 0 },
    { title: 'Maps (Desktop & Mobile)', count: 0 },
    { title: 'Bookings', count: 0 },
    { title: 'Calls', count: 0 },
  ];
  const facebookAdsData = {
    totalClicks: 0,
    totalSpent: 'MAD0',
    cpc: 'MAD0',
    ctr: '0%'
  };

  const googleAdsData = {
    totalClicks: 0,
    totalSpent: 'MAD0',
    cpc: 'MAD0',
    ctr: '0%'
  };
  //fffffffffffffffffffffffffffffffffffffffffffffffffffffff
  
  // Current months for calendar
  const [currentMonths, setCurrentMonths] = useState([
    { month: 3, year: 2025 },
    { month: 4, year: 2025 }
  ]);
  
  // Options for dropdowns
  const options = [
    { id: 1, label: 'Created Date' },
    { id: 2, label: 'Modified Date' },
    { id: 3, label: 'Closed Date' }
  ];
  
  // Month names and days of week
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Predefined date ranges
  const predefinedRanges = [
    { label: 'Today', action: () => handlePresetDateRange('today') },
    { label: 'Yesterday', action: () => handlePresetDateRange('yesterday') },
    { label: 'Last 7 days', action: () => handlePresetDateRange('last7days') },
    { label: 'Last 30 days', action: () => handlePresetDateRange('last30days') },
    { label: 'This month', action: () => handlePresetDateRange('thisMonth') },
    { label: 'Last month', action: () => handlePresetDateRange('lastMonth') }
  ];
  
  // Toggle functions
  const toggleDropdownA = () => setIsOpen(!isOpen);
  const toggleTimezoneDropdown = () => setShowTimezoneDropdown(!showTimezoneDropdown);
  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);
  
  // Calendar functions
  const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    
    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const remainingDays = 42 - days.length;
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Check if date is selected
  const isDateSelected = (day, month, year) => {
    const dateStr = `${monthNames[month]} ${day}, ${year}`;
    return dateRange.start === dateStr || dateRange.end === dateStr;
  };
  
  // Handle day click in calendar
  const handleDayClick = (day, month, year) => {
    const dateStr = `${monthNames[month]} ${day}, ${year}`;
    
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: dateStr, end: '' });
    } else {
      // Determine which date is earlier
      const startDate = new Date(dateRange.start);
      const clickedDate = new Date(dateStr);
      
      if (clickedDate < startDate) {
        setDateRange({ start: dateStr, end: dateRange.start });
      } else {
        setDateRange({ start: dateRange.start, end: dateStr });
      }
    }
  };
  
  // Handle preset date ranges
  const handlePresetDateRange = (preset) => {
    const today = new Date();
    const formatDate = (date) => {
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };
    
    switch(preset) {
      case 'today':
        const todayStr = formatDate(today);
        setDateRange({ start: todayStr, end: todayStr });
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = formatDate(yesterday);
        setDateRange({ start: yesterdayStr, end: yesterdayStr });
        break;
      case 'last7days':
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);
        setDateRange({ start: formatDate(sevenDaysAgo), end: formatDate(today) });
        break;
      case 'last30days':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 29);
        setDateRange({ start: formatDate(thirtyDaysAgo), end: formatDate(today) });
        break;
      case 'thisMonth':
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setDateRange({ start: formatDate(firstDayOfMonth), end: formatDate(today) });
        break;
      case 'lastMonth':
        const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        setDateRange({ start: formatDate(firstDayOfLastMonth), end: formatDate(lastDayOfLastMonth) });
        break;
      default:
        break;
    }
  };
  
  // Navigate through months
  const goToPreviousMonth = () => {
    setCurrentMonths(prevMonths => {
      const newMonths = [...prevMonths];
      
      newMonths[0] = {
        month: newMonths[0].month === 0 ? 11 : newMonths[0].month - 1,
        year: newMonths[0].month === 0 ? newMonths[0].year - 1 : newMonths[0].year
      };
      
      newMonths[1] = {
        month: newMonths[1].month === 0 ? 11 : newMonths[1].month - 1,
        year: newMonths[1].month === 0 ? newMonths[1].year - 1 : newMonths[1].year
      };
      
      return newMonths;
    });
  };
  
  const goToNextMonth = () => {
    setCurrentMonths(prevMonths => {
      const newMonths = [...prevMonths];
      
      newMonths[0] = {
        month: newMonths[0].month === 11 ? 0 : newMonths[0].month + 1,
        year: newMonths[0].month === 11 ? newMonths[0].year + 1 : newMonths[0].year
      };
      
      newMonths[1] = {
        month: newMonths[1].month === 11 ? 0 : newMonths[1].month + 1,
        year: newMonths[1].month === 11 ? newMonths[1].year + 1 : newMonths[1].year
      };
      
      return newMonths;
    });
  };
  //finnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
   const [selectedUsers, setSelectedUsers] = useState('All Users');
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    const selectOption = (option) => {
      setSelectedUsers(option);
      setDropdownOpen(false);
    };
    const adsData = [
      {
        platform: "Facebook Ads Report",
        clicks: 0,
        spent: "MAD0",
        cpc: "MAD0",
        ctr: "0%",
      },
      {
        platform: "Google Ads Report",
        clicks: 0,
        spent: "MAD0",
        cpc: "MAD0",
        ctr: "0%",
      },
    ];

  return (
    <div className="bg-white dark:bg-[#2A3142] text-[#2A3142] dark:text-white bg-gray-100">
    {/* Dashboard header */}
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={toggleDropdownA}
            className="bg-[#5F9EE9] hover:bg-[#4A8BD6] text-white p-2 rounded-md mr-2 transition-colors duration-200 active:scale-95"
          >
            <div className="flex items-center space-x-1">
              <PanelsLeftBottom size={20} />
              <ChevronDown size={20} />
            </div>
          </button>
          {isOpen && (
            <div className="absolute left-8 w-64 mt-60 bg-white dark:bg-[#2A3142] border border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-50 rounded-lg shadow-xl z-50">
              <div className="p-3">
                <div className="relative w-full mb-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808487]" size={16} />
                  <input
                    type="text"
                    placeholder="Search for a dashboard"
                    className="w-full pl-10 p-2 border border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F9EE9] focus:border-transparent bg-white dark:bg-[#2A3142] text-[#2A3142] dark:text-white"
                  />
                </div>
                <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-[#3A4152] rounded-md text-[#5F9EE9] transition-colors duration-200">
                  + Add Dashboard
                </button>
                <div className="mt-3">
                  <h3 className="text-sm text-[#808487] px-2 mb-1 font-medium">Shared With Me</h3>
                  <div className="border border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-40 rounded-md">
                    <div className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-[#3A4152] transition-colors duration-200">
                      <span className="font-medium">(Default) Dashboard</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" x2="21" y1="14" y2="3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <h1 className="text-3xl font-semibold text-[#2A3142] dark:text-white">Dashboard</h1>
        </div>
         {/*clllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll*/}
        <div className="w-full max-w-md font-sans absolute top-6 right-1 ">
          {/* Date range display */}
          <div
            className="bg-white dark:bg-[#2A3142] rounded-lg border w-fit border-gray-300 dark:border-[#5F9EE9] dark:border-opacity-50 px-4 py-2 flex items-center cursor-pointer hover:border-[#5F9EE9] transition-colors duration-200"
            onClick={toggleCalendar}
          >
            <span className="text-[#2A3142] dark:text-white font-medium">{dateRange.start}</span>
            <ArrowRight size={16} className="mx-2 text-[#808487]" />
            <span className="text-[#2A3142] dark:text-white font-medium">{dateRange.end || dateRange.start}</span>
            <Calendar className="w-5 h-5 text-[#808487] ml-4" />
          </div>
        

            {/* Calendar popup */}
            {isCalendarOpen && (
  <div className="absolute mt-2 bg-white fixed right-4 dark:bg-[#2A3142] shadow-xl rounded-lg border border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-50 overflow-hidden z-50">
    <div className="flex">
      {/* Left calendar */}
      <div className="w-1/2 border-r border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-30">
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-30">
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95" onClick={goToPreviousMonth}>
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95">
            <ChevronLeft size={16} />
          </button>
          <div className="font-medium text-[#2A3142] dark:text-white">{monthNames[currentMonths[0].month]} {currentMonths[0].year}</div>
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95">
            <ChevronRight size={16} />
          </button>
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95" onClick={goToNextMonth}>
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 text-center">
          {daysOfWeek.map(day => (
            <div key={day} className="py-1 text-xs font-medium text-[#808487]">
              {day}
            </div>
          ))}
          
          {generateDays(currentMonths[0].month, currentMonths[0].year).slice(0, 35).map((date, index) => {
            const isSelected = isDateSelected(date.day, date.month, date.year);
            
            return (
              <div 
                key={index}
                className={`py-1 text-sm cursor-pointer ${
                  isSelected ? 'bg-[#5F9EE9] text-white' : 
                  date.isCurrentMonth ? 'text-[#2A3142] dark:text-white' : 'text-[#808487]'
                } ${date.isCurrentMonth ? 'hover:bg-gray-100 dark:hover:bg-[#3A4152]' : ''} transition-colors duration-200`}
                onClick={() => date.isCurrentMonth && handleDayClick(date.day, date.month, date.year)}
              >
                {date.day}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Right calendar */}
      <div className="w-1/2">
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-30">
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95" onClick={goToPreviousMonth}>
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95">
            <ChevronLeft size={16} />
          </button>
          <div className="font-medium text-[#2A3142] dark:text-white">{monthNames[currentMonths[1].month]} {currentMonths[1].year}</div>
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95">
            <ChevronRight size={16} />
          </button>
          <button className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95" onClick={goToNextMonth}>
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 text-center">
          {daysOfWeek.map(day => (
            <div key={day} className="py-1 text-xs font-medium text-[#808487]">
              {day}
            </div>
          ))}
          
          {generateDays(currentMonths[1].month, currentMonths[1].year).slice(0, 35).map((date, index) => {
            const isSelected = isDateSelected(date.day, date.month, date.year);
            
            return (
              <div 
                key={index}
                className={`py-1 text-sm cursor-pointer ${
                  isSelected ? 'bg-[#5F9EE9] text-white' : 
                  date.isCurrentMonth ? 'text-[#2A3142] dark:text-white' : 'text-[#808487]'
                } ${date.isCurrentMonth ? 'hover:bg-gray-100 dark:hover:bg-[#3A4152]' : ''} transition-colors duration-200`}
                onClick={() => date.isCurrentMonth && handleDayClick(date.day, date.month, date.year)}
              >
                {date.day}
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Predefined range buttons and confirm */}
    <div className="p-3 border-t border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-30 flex flex-wrap gap-3">
      {predefinedRanges.map(range => (
        <button 
          key={range.label}
          className="px-3 py-1 text-sm border border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-40 rounded-md hover:bg-gray-100 dark:hover:bg-[#3A4152] text-[#2A3142] dark:text-white transition-colors duration-200 hover:scale-105 active:scale-95"
          onClick={range.action}
        >
          {range.label}
        </button>
      ))}
      <button 
        className="px-3 py-1 text-sm bg-[#5F9EE9] text-white rounded-md hover:bg-[#4A8BD6] ml-auto transition-colors duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsCalendarOpen(false)}
      >
        Confirm
      </button>
    </div>
  </div>
)}
</div>

<div className="flex items-center space-x-2 relative">        
  <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#3A4152] transition-colors duration-200 hover:scale-105 active:scale-95" onClick={toggleTimezoneDropdown}>
    <MoreVertical size={20} className="text-[#808487]" />
  </button>
  
  {showTimezoneDropdown && (
    <div className="absolute right-0 top-12 bg-white dark:bg-[#2A3142] rounded-lg shadow-xl z-10 w-64 border border-gray-200 dark:border-[#5F9EE9] dark:border-opacity-50">
      <div className="p-3 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-[#3A4152] transition-colors duration-200">
        <Globe size={18} className="text-[#808487]" />
        <span className="text-[#2A3142] dark:text-white">Manage Dashboard Timezone</span>
      </div>
    </div>
  )}
</div>
</div>
       {/* Dashboard content */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Opportunity Status Card */}
  <div className="bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-lg border border-gray-200 dark:border-[#5F9EE9]/30 transition-colors duration-200">
    <div className="p-4 border-b border-gray-200 dark:border-[#5F9EE9]/30 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-[#2A3142] dark:text-[#FFFFFF]">Opportunity Status</h2>
      <div className="relative">
        <button
          className="text-[#808487] hover:bg-gray-100 hover:dark:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95"
          onClick={() => setIsOpenN(!isOpenN)}
        >
          <Settings2 size={20} />
        </button>

        {/* Dropdown Menu */}
        {isOpenN && (
          <div className="absolute w-64 p-4 bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-xl mt-2 right-0 border border-gray-200 dark:border-[#5F9EE9]/30 z-50">
            <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-3">
              Date property on which the opportunities should be calculated
            </p>

            <p className="text-sm font-medium text-[#2A3142] dark:text-[#FFFFFF] mb-2">Status change</p>

            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  setSelected(option.label);
                  setIsOpenN(false);
                }}
                className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 transition-colors duration-200 ${
                  selected === option.label ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20" : ""
                }`}
              >
                <span className="text-[#2A3142] dark:text-[#FFFFFF]">{option.label}</span>
                {selected === option.label && (
                  <Check size={16} className="text-[#5F9EE9]" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 bg-[#5F9EE9]/20 dark:bg-[#5F9EE9]/10 rounded-full animate-ping"></div>
        <div className="relative z-10 w-20 h-20 bg-[#5F9EE9]/10 dark:bg-[#2A3142]/50 rounded-full flex items-center justify-center transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#5F9EE9] dark:text-[#5F9EE9]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-[#2A3142] dark:text-[#FFFFFF] mb-1">No Data Found</h2>
    </div>
  </div>

          
        {/* Opportunity Value Card */}
<div className="bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-lg border border-gray-200 dark:border-[#5F9EE9]/30 transition-colors duration-200">
  <div className="p-4 border-b border-gray-200 dark:border-[#5F9EE9]/30 flex justify-between items-center">
    <h2 className="text-lg font-semibold text-[#2A3142] dark:text-[#FFFFFF]">Opportunity Value</h2>
    <div className="relative">
      <button
        className="text-[#808487] hover:bg-gray-100 hover:dark:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsOpenNN(!isOpenNN)}
      >
        <Settings2 size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpenNN && (
        <div className="absolute w-64 p-4 bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-xl mt-2 right-0 border border-gray-200 dark:border-[#5F9EE9]/30 z-50">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-3">
            Date property on which the opportunities should be calculated
          </p>

          <p className="text-sm font-medium text-[#2A3142] dark:text-[#FFFFFF] mb-2">Status change</p>

          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelectedN(option.label);
                setIsOpenNN(false);
              }}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 transition-colors duration-200 ${
                selectedN === option.label ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20" : ""
              }`}
            >
              <span className="text-[#2A3142] dark:text-[#FFFFFF]">{option.label}</span>
              {selectedN === option.label && (
                <Check size={16} className="text-[#5F9EE9]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="relative w-20 h-20 mb-4">
      <div className="absolute inset-0 bg-[#5F9EE9]/20 dark:bg-[#5F9EE9]/10 rounded-full animate-ping"></div>
      <div className="relative z-10 w-20 h-20 bg-[#5F9EE9]/10 dark:bg-[#2A3142]/50 rounded-full flex items-center justify-center transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#5F9EE9] dark:text-[#5F9EE9]"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
    </div>

    <h2 className="text-lg font-semibold text-[#2A3142] dark:text-[#FFFFFF] mb-1">No Data Found</h2>
  </div>
</div>
          
<div className="bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-lg border border-gray-200 dark:border-[#5F9EE9]/30 transition-colors duration-200">
  <div className="p-4 border-b border-gray-200 dark:border-[#5F9EE9]/30 flex justify-between items-center">
    <h2 className="text-lg font-semibold text-[#2A3142] dark:text-[#FFFFFF]">Conversion Rate</h2>
    <div className="relative">
      <button
        className="text-[#808487] hover:bg-gray-100 hover:dark:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsOpenNNN(!isOpenNNN)}
      >
        <Settings2 size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpenNNN && (
        <div className="absolute w-64 p-4 bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-xl mt-2 right-0 border border-gray-200 dark:border-[#5F9EE9]/30 z-50">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-3">
            Date property on which the opportunities should be calculated
          </p>

          <p className="text-sm font-medium text-[#2A3142] dark:text-[#FFFFFF] mb-2">Status change</p>

          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelectedN(option.label);
                setIsOpenNNN(false);
              }}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 transition-colors duration-200 ${
                selectedN === option.label ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20" : ""
              }`}
            >
              <span className="text-[#2A3142] dark:text-[#FFFFFF]">{option.label}</span>
              {selectedN === option.label && (
                <Check size={16} className="text-[#5F9EE9]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  <div className="p-4">
    <div className="mt-2">
      <h3 className="text-5xl font-bold text-[#2A3142] dark:text-[#FFFFFF] text-center">MAD0</h3>
      <div className="flex items-center justify-center mt-2">
        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center">
          <ChevronUp size={16} className="text-green-600 dark:text-green-400 mr-1" />
          <span className="text-green-600 dark:text-green-400">0%</span>
        </div> 
        <span className="ml-2 text-[#808487]">vs Last 31 Days</span>
      </div>
    </div>
    
    <div className="mt-8 relative flex justify-center">
      <div className="w-36 h-36 rounded-full bg-transparent border-8 border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-4 h-4 bg-[#5F9EE9] rounded-full"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-2xl font-semibold text-[#2A3142] dark:text-[#FFFFFF]">0%</span>
      </div>
    </div>
    
    <div className="mt-6 text-center">
      <p className="text-[#808487]">Won revenue</p>
      <p className="text-xl font-semibold text-[#2A3142] dark:text-[#FFFFFF]">MAD0</p>
    </div>
  </div>
</div>
</div>
</div>


<div className="flex flex-col md:flex-row w-full bg-gray-100">
  {/* Left Panel - Funnel */}
  <div className="w-full md:w-1/2 p-6 bg-white dark:bg-[#2A3142] rounded-lg border shadow-lg md:mr-4 mb-4 md:mb-0 md:ml-6 border-gray-200 dark:border-[#5F9EE9]/30">
    <div className="p-2 border-b border-gray-200 dark:border-[#5F9EE9]/30 flex justify-between items-center">
      <h2 className="text-lg font-medium text-[#2A3142] dark:text-white">Funnel</h2>
      <div className="flex items-center">
        <div className="relative mr-2">
          <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-48">
            <option>TEST</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#808487]">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <button
            className="text-[#808487] hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 rounded-md p-2 transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={() => setIsOpenPar(!isOpenPar)}
          >
            <Settings2 size={20} />
          </button>
          {isOpenPar && (
            <div className="absolute w-64 p-4 bg-white dark:bg-[#2A3142] rounded-lg shadow-xl mt-2 right-0 border border-gray-200 dark:border-[#5F9EE9]/30 z-50">
              <p className="text-sm font-medium text-[#808487] mb-3">
                Date property on which the opportunities should be calculated
              </p>
              <p className="text-sm font-medium text-[#2A3142] dark:text-white mb-2">Status change</p>
              {options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    setSelectedPar(option.label);
                    setIsOpenPar(false);
                  }}
                  className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedPar === option.label
                      ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20"
                      : "hover:bg-gray-100 dark:hover:bg-[#2A3142]/50"
                  }`}
                >
                  <span className="text-[#2A3142] dark:text-white">{option.label}</span>
                  {selectedPar === option.label && <Check size={16} className="text-[#5F9EE9]" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="mt-6">
      <h1 className="text-3xl font-bold text-[#2A3142] dark:text-white mb-2">MAD0</h1>
      <div className="flex items-center mb-6">
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center text-sm font-medium">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          0%
        </div>
        <span className="text-sm text-[#808487] ml-2">vs Last 31 Days</span>
      </div>

      <div className="flex justify-between mb-2 text-sm text-[#808487]">
        <div>0</div>
        <div>1</div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
        <div className="col-span-1"></div>
        <div className="col-span-1 text-center font-medium text-[#2A3142] dark:text-white">Cumulative</div>
        <div className="col-span-1 text-center font-medium text-[#2A3142] dark:text-white">Next Step Conversion</div>
      </div>

      {[
        { label: "Talbi", value: "MADO", left: "0.00%", right: "100.00%" },
        { label: "Won", value: "MADO", left: "0.00%", right: "0.00%" },
      ].map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 mb-4">
          <div className="col-span-1 bg-gray-100 dark:bg-[#2A3142] p-4 h-32 flex flex-col justify-center rounded-md border border-gray-200 dark:border-[#5F9EE9]/30">
            <div className="font-medium text-[#2A3142] dark:text-white">{item.label}</div>
            <div className="font-medium text-[#5F9EE9]">{item.value}</div>
          </div>
          <div className="col-span-1 bg-gray-100 dark:bg-[#2A3142] p-4 flex items-center justify-center relative overflow-hidden rounded-md border border-gray-200 dark:border-[#5F9EE9]/30">
            <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 100% 15%, 100% 85%, 0 100%)" }}>
              <div className="h-full w-full flex items-center justify-center text-[#2A3142] dark:text-white font-medium">
                {item.left}
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-gray-100 dark:bg-[#2A3142] p-4 flex items-center justify-center relative overflow-hidden rounded-md border border-gray-200 dark:border-[#5F9EE9]/30">
            <div className="absolute inset-0" style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)" }}>
              <div className="h-full w-full flex items-center justify-center text-[#2A3142] dark:text-white font-medium">
                {item.right}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Right Panel - Stage Distribution */}
  <div className="w-full md:w-1/2 p-6 bg-white dark:bg-[#2A3142] rounded-lg shadow-lg md:mr-6 border border-gray-200 dark:border-[#5F9EE9]/30">
    <div className="flex justify-between p-2 border-b border-gray-200 items-center mb-8">
      <h2 className="text-lg font-medium text-[#2A3142] dark:text-white">Stage Distribution</h2>
      <div className="flex items-center">
        <div className="relative mr-2">
          <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-48">
            <option>TEST</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#808487]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <button
            className="text-[#808487] hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95"
            onClick={() => setIsOpenPar1(!isOpenPar1)}
          >
            <Settings2 size={20} />
          </button>
          {isOpenPar1 && (
            <div className="absolute w-64 p-4 bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-xl mt-2 right-0 border border-gray-200 dark:border-[#5F9EE9]/30 z-50">
              <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-3">
                Date property on which the opportunities should be calculated
              </p>
              <p className="text-sm font-medium text-[#2A3142] dark:text-[#FFFFFF] mb-2">Status change</p>
              {options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    setSelectedPar1(option.label);
                    setIsOpenPar1(false);
                  }}
                  className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 transition-colors duration-200 ${
                    selectedPar1 === option.label ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20" : ""
                  }`}
                >
                  <span className="text-[#2A3142] dark:text-[#FFFFFF]">{option.label}</span>
                  {selectedPar1 === option.label && <Check size={16} className="text-[#5F9EE9]" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
        <div className="relative z-10 w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">No Data Found</h2>
    </div>
  </div>
</div>

             {/*------------------------------------------------------------------------------------------------------*/}
             <div className="flex flex-col p-4 md:flex-row md:p-6 min-h-screen space-y-4 md:space-y-0 md:space-x-6 bg-gray-100">
  {/* Section Tâches */}
  <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
      <h2 className="text-lg font-semibold text-[#2A3142]">Tasks</h2>
    
      <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
        <select 
          value={tasksFilter}
          onChange={(e) => setTasksFilter(e.target.value)}
          className="border border-[#5F9EE9] rounded-md px-3 py-2 text-sm text-[#2A3142] focus:ring-2 focus:ring-[#5F9EE9] transition-all duration-200"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
    
        <select 
          value={dateAddedFilter}
          onChange={(e) => setDateAddedFilter(e.target.value)}
          className="border border-[#5F9EE9] rounded-md px-3 py-2 text-sm text-[#2A3142] focus:ring-2 focus:ring-[#5F9EE9] transition-all duration-200"
        >
          <option>Due date (DESC)</option>
          <option>Due date (ASC)</option>
          <option>Date Added (DESC)</option>
          <option>Date Added (ASC)</option>
        </select>
    
        <select 
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="border border-[#5F9EE9] rounded-md px-3 py-2 text-sm text-[#2A3142] focus:ring-2 focus:ring-[#5F9EE9] transition-all duration-200"
        >
          <option>ZAHRA ZAHRA</option>
          <option>Other User</option>
        </select>
      </div>
    </div>
    
    {/* Section Aucune Donnée */}
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
        <div className="relative z-10 w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-1">No Data Found</h2>
    </div>
  </div>

           
             {/* Section Actions Manuelles */}
             <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Manual Actions</h2>
        <div className="flex gap-3">
          <select
            value={manualActionsFilter}
            onChange={(e) => setManualActionsFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          >
            <option>All</option>
          </select>
          <select
            value={userManualFilter}
            onChange={(e) => setUserManualFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          >
            <option>All Users</option>
          </select>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-15 pt-40 pb-30  ">
        <div className="flex flex-col items-center   justify-center">
          <p className="text-gray-500 text-sm mb-2">Phone</p>
          <p className="text-4xl font-bold text-gray-700">0</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm mb-2">SMS</p>
          <p className="text-4xl font-bold text-gray-700">0</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm mb-2">Total Pending</p>
          <p className="text-4xl font-bold text-gray-700">0</p>
        </div>
      </div>
      
      {/* Manual Actions Button */}
      <div className="text-center p-6">
        <button className="text-blue-500 font-medium flex items-center justify-center mx-auto gap-2 group">
          <span>Go to Manual Actions</span>
          <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    </div>
             {/*-----------------------------------------------------------------------*/}
             <div className="min-h-screen  flex flex-col mr-2 ml-2 bg-gray-100">
                 <div className="flex-grow container mx-auto px-4 py-6">
                   <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                     {/* Header */}
                     <div className="flex justify-between items-center p-4 border-b border-gray-100">
                       <h1 className="text-lg font-semibold text-gray-900">Lead Source Report</h1>
                       <div className='relative'>
      <button
          className="text-[#808487] hover:bg-gray-100 hover:dark:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95"
          onClick={() => setIsOpenPar2(!isOpenPar2)}
        >
          <Settings2 size={20} />
        </button>

        {/* Dropdown Menu */}
        {isOpenPar2 && (
          <div className="absolute w-64 p-4 bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-xl mt-2 right-0 border border-gray-200 dark:border-[#5F9EE9]/30 z-50">
            <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-3">
              Date property on which the opportunities should be calculated
            </p>

            <p className="text-sm font-medium text-[#2A3142] dark:text-[#FFFFFF] mb-2">Status change</p>

            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  setSelectedPar2(option.label);
                  setIsOpenPar2(false);
                }}
                className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 transition-colors duration-200 ${
                  selectedPar2 === option.label ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20" : ""
                }`}
              >
                <span className="text-[#2A3142] dark:text-[#FFFFFF]">{option.label}</span>
                {selectedPar2 === option.label && (
                  <Check size={16} className="text-[#5F9EE9]" />
                )}
              </div>
            ))}
          </div>
        )}

      {/* Dropdown Menu */}
      
      </div>
                     </div>
           
                     {/* No Data Content */}
                     <div className="flex flex-col items-center justify-center py-20 px-4">
                       <div className="relative w-24 h-24 mb-6">
                         <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
                         <div className="relative z-10 w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                           <svg 
                             xmlns="http://www.w3.org/2000/svg" 
                             width="48" 
                             height="48" 
                             viewBox="0 0 24 24" 
                             fill="none" 
                             stroke="currentColor" 
                             strokeWidth="2" 
                             strokeLinecap="round" 
                             strokeLinejoin="round" 
                             className="text-blue-500"
                           >
                             <circle cx="11" cy="11" r="8"/>
                             <path d="m21 21-4.3-4.3"/>
                           </svg>
                         </div>
                       </div>
                       
                       <h2 className="text-xl font-semibold text-gray-800 mb-2">No Data Found</h2>
                      
                     </div>
           
                     {/* Pagination */}
                     <div className="flex justify-center items-center p-4 border-t border-gray-100">
                       <div className="flex items-center space-x-2">
                         <button 
                           className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                           disabled
                         >
                           Previous
                         </button>
                         
                         <div className="flex items-center space-x-1">
                           <button 
                             className="w-8 h-8 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                           >
                             1
                           </button>
                         </div>
                         
                         <button 
                           className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                         >
                           Next
                         </button>
                       </div>
                     </div>
                     
                   </div>
                   
                 </div>
                 <div className="min-h-screen flex flex-col mr-4 ml-4 relative mp-6">
                 <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                   {/* Header */}
                   <div className="p-4 border-b border-gray-100">
                     <div className="flex flex-col">
                       <h1 className="text-base font-semibold text-gray-900">Google Analytics Report</h1>
                       <p className="text-xs text-gray-500">(Last 12 months)</p>
                     </div>
                   </div>
           
                   {/* No Data Content */}
                   <div className="flex flex-col items-center justify-center py-16 px-4">
                     <div className="relative w-20 h-20 mb-4">
                       <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
                       <div className="relative z-10 w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="40"
                           height="40"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           className="text-blue-500"
                         >
                           <circle cx="11" cy="11" r="8" />
                           <path d="m21 21-4.3-4.3" />
                         </svg>
                       </div>
                     </div>
           
                     <h2 className="text-lg font-semibold text-gray-800 mb-1">No Data Found</h2>
                     
                   </div>
                 </div>
                     {/* ----------------------------------------gggggg ----------------------------------------------------------------------------------*/}
                     <div className="bg-gray min-h-screen pt-5 pb-5 mr-100">
      {/* Google Analytics Report */}
      <div className="w-305 mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200 ">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-base font-semibold text-gray-900">Google Analytics Report</h1>
          <p className="text-xs text-gray-500">(Last 12 months)</p>
        </div>
        
        <div className="relative h-96 w-full">
          {/* Y-axis labels */}
          <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-sm text-gray-500 py-6 font-medium">
            <div>1000</div>
            <div>800</div>
            <div>600</div>
            <div>400</div>
            <div>200</div>
            <div>0</div>
          </div>
          
          {/* Chart */}
          <div className="absolute top-0 left-10 w-full h-full">
            {/* Apply blur filter to the SVG */}
            <svg className="w-full h-full overflow-visible" style={{ filter: 'blur(5px)' }}>
              {/* X-axis */}
              <line 
                x1="50" 
                y1="350" 
                x2="950" 
                y2="350" 
                stroke="#e5e7eb" 
                strokeWidth="1"
              />
              
              {/* Y-axis grid lines */}
              {[0, 1, 2, 3, 4, 5].map((val, index) => (
                <line 
                  key={index}
                  x1="50" 
                  y1={350 - index * 60} 
                  x2="950" 
                  y2={350 - index * 60} 
                  stroke="#e5e7eb" 
                  strokeWidth="1"
                  strokeDasharray={index === 0 ? "0" : "4 4"}
                />
              ))}
              
              {/* Chart line */}
              <path 
                d={getPath()} 
                fill="none" 
                stroke="#5F9EE9" 
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              {chartData.map((value, index) => {
                const x = 50 + index * ((950 - 50) / (chartData.length - 1));
                const y = 350 - (value / maxValue) * (350 - 50);
                return (
                  <circle
                    key={`point-${index}`}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="white"
                    stroke="#5F9EE9"
                    strokeWidth="2"
                  />
                );
              })}
              
              {/* Fill area under the line */}
              <path 
                d={`${getPath()} L950,350 L50,350 Z`} 
                fill="url(#blue-gradient)" 
                fillOpacity="0.2"
              />
              
              {/* Define gradient */}
              <defs>
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5F9EE9" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#5F9EE9" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* No Data Found label - non-blurred, on top of the blurred chart */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white text-gray-800 px-6 py-3 rounded-lg shadow-md text-center border border-gray-200 font-medium">
                No Data Found
              </div>
            </div>
          </div>
        </div>
        
        {/* X-axis labels - non-blurred */}
        <div className="relative h-8 ml-10 mt-2">
          <div className="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-500 font-medium">
            {months.map((month, index) => (
              <div key={`month-${index}`} style={{ position: 'absolute', left: `${index * (100 / 11)}%`, transform: 'translateX(-50%)' }}>
                {month}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-12 flex justify-end">
          <div className="flex items-center space-x-2">
            <div className=""></div>
            <span className="text-gray-500 text-sm"></span>
          </div>
        </div>
      </div>
    </div>
    

      {/* Google Business Profile */}
      <div className="w-305 mx-auto bg-white rounded-lg  shadow-lg right-30 mb-8">
        <div className="p-6 flex justify-between items-center border-b border-gray-200 ">
          <div>
            <h1 className="text-base font-semibold text-gray-900">Google Business Profile</h1>
            <p className="text-xs text-gray-500">(Last 30 Days)</p>
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-48">
              <option>Please Select</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-md ${
                  index === 0 ? 'md:col-span-3 lg:col-span-1' : ''
                }`}
              >
                <h2 className="text-gray-500 text-sm mb-2">{metric.title}</h2>
                <p className="text-gray-800 text-4xl font-medium">{metric.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*-------------------------------------- facebook----------*/}
      
</div>


<div className="min-h-screen bg-gray-50	 dark:bg-[#2A3142] p-4  mb-8 bg-gray-100">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Facebook Ads Report Card */}
    <div className="bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-lg border border-gray-200 dark:border-[#5F9EE9] overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-[#5F9EE9]">
        <h2 className="text-xl font-semibold text-[#2A3142] dark:text-[#FFFFFF]">Facebook Ads Report</h2>
      </div>
      
      <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 dark:divide-[#5F9EE9]/30">
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">Total Clicks</p>
          <p className="text-2xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{facebookAdsData.totalClicks}</p>
        </div>
        
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">Total Spent</p>
          <p className="text-3xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{facebookAdsData.totalSpent}</p>
        </div>
        
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">CPC</p>
          <p className="text-3xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{facebookAdsData.cpc}</p>
        </div>
        
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">CTR</p>
          <p className="text-3xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{facebookAdsData.ctr}</p>
        </div>
      </div>
    </div>
    
    {/* Google Ads Report Card */}
    <div className="bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-lg border border-gray-200 dark:border-[#5F9EE9] overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-[#5F9EE9]">
        <h2 className="text-xl font-semibold text-[#2A3142] dark:text-[#FFFFFF]">Google Ads Report</h2>
      </div>
      
      <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 dark:divide-[#5F9EE9]/30">
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">Total Clicks</p>
          <p className="text-3xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{googleAdsData.totalClicks}</p>
        </div>
        
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">Total Spent</p>
          <p className="text-3xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{googleAdsData.totalSpent}</p>
        </div>
        
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">CPC</p>
          <p className="text-3xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{googleAdsData.cpc}</p>
        </div>
        
        <div className="p-4">
          <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">CTR</p>
          <p className="text-3xl font-bold text-[#2A3142] dark:text-[#FFFFFF]">{googleAdsData.ctr}</p>
        </div>
      </div>
    </div>
    {/*finnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
    <div className="min-h-screen bg-gray-100 dark:bg-[#1E2533] py-10 px-4">
  <div className="bg-white dark:bg-[#2A3142] rounded-xl shadow-lg p-6 max-w-4xl mx-auto border border-gray-200 dark:border-[#5F9EE9]/30">
    {/* Header */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-gray-200 dark:border-[#5F9EE9]/30 pb-4">
      <h1 className="text-base font-semibold text-gray-900 dark:text-white">Sales Efficiency</h1>

      <div className="flex items-center gap-2 mt-4 md:mt-0">
        {/* Dropdown Select */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-64 px-4 py-2 text-[#2A3142] dark:text-white bg-white dark:bg-[#2A3142] border border-gray-300 dark:border-[#5F9EE9]/30 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A3142]/60 transition-colors"
          >
            <span>{selectedUsers}</span>
            <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-20 w-64 mt-2 bg-white dark:bg-[#2A3142] border border-gray-300 dark:border-[#5F9EE9]/30 rounded-lg shadow-xl">
              <ul className="divide-y divide-gray-100 dark:divide-[#5F9EE9]/10">
                {["All Users"].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2A3142]/60 cursor-pointer text-[#2A3142] dark:text-white"
                    onClick={() => selectOption(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpenPar3(!isOpenPar3)}
            className="text-[#808487] hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 rounded-md p-2 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Settings2 size={20} />
          </button>

          {isOpenPar3 && (
            <div className="absolute right-0 mt-2 w-64 p-4 z-30 bg-white dark:bg-[#2A3142] border border-gray-200 dark:border-[#5F9EE9]/30 rounded-lg shadow-xl">
              <p className="text-sm font-medium text-[#808487] mb-3">
                Date property on which the opportunities should be calculated
              </p>
              <p className="text-sm font-medium text-[#2A3142] dark:text-white mb-2">Status change</p>
              {options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    setSelectedPar3(option.label);
                    setIsOpenPar3(false);
                  }}
                  className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedPar3 === option.label
                      ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20"
                      : "hover:bg-gray-100 dark:hover:bg-[#2A3142]/50"
                  }`}
                >
                  <span className="text-[#2A3142] dark:text-white">{option.label}</span>
                  {selectedPar3 === option.label && <Check size={16} className="text-[#5F9EE9]" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Average Sales Duration", value: "0s" },
        { title: "Total Sale Value", value: "MAD0" },
        { title: "Sales Velocity", value: "MAD0/M" },
      ].map((card, i) => (
        <div key={i} className="bg-white dark:bg-transparent">
          <h2 className="text-sm font-medium text-[#808487] mb-1">{card.title}</h2>
          <div className="text-4xl font-bold text-[#2A3142] dark:text-white mb-1">{card.value}</div>
          <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            0%
          </div>
        </div>
      ))}
    </div>
  


  </div>
</div>

    </div>     
  </div>
</div>
</div>


              
            
           

            
               
              
             );
           };
           
           export default Dashboard;