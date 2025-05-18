import React, { useState } from 'react';
import { Settings2, MoreVertical, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, ArrowRight, Calendar, Globe, Check, PanelsLeftBottom } from 'lucide-react';

const Dashboard = () => {
  // State management
  const [states, setStates] = useState({
    dropdowns: {
      isOpen: false, isOpenPar: false, isOpenPar1: false, isOpenPar2: false, isOpenPar3: false,
      isOpenN: false, isOpenNN: false, isOpenNNN: false, showTimezone: false, calendarOpen: false,
      dropdownOpen: false
    },
    selected: {
      main: 'Created Date', N: 'Created Date', Par: 'Created Date', 
      Par1: 'Created Date', Par2: 'Created Date', Par3: 'Created Date'
    },
    filters: {
      tasks: 'All', dateAdded: 'Date Added (...)', user: 'ZAHRA ZAHRA',
      manualActions: 'All', userManual: 'All Users', selectedUsers: 'All Users'
    },
    dateRange: { start: 'Mar 08, 2025', end: 'Apr 08, 2025' },
    currentMonths: [{ month: 3, year: 2025 }, { month: 4, year: 2025 }]
  });

  const toggleState = (key, subKey) => setStates(prev => ({
    ...prev,
    [key]: { ...prev[key], [subKey]: !prev[key][subKey] }
  }));

  const setSelected = (type, value) => setStates(prev => ({
    ...prev,
    selected: { ...prev.selected, [type]: value }
  }));

  // Data generation
  const generateChartData = () => {
    const data = [100];
    for (let i = 1; i < 12; i++) {
      data.push(i === 5 ? data[i-1] * 1.5 : Math.max(50, data[i-1] + (Math.random() * 20 - 5)));
    }
    return data;
  };

  const chartData = generateChartData();
  const maxValue = Math.max(...chartData) * 1.1;

  const getPath = () => {
    return chartData.map((val, i) => 
      `${i === 0 ? 'M' : 'L'}${50 + i * 80},${350 - (val / maxValue) * 300}`
    ).join(' ');
  };

  // Constants
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const options = [{ id: 1, label: 'Created Date' }, { id: 2, label: 'Modified Date' }, { id: 3, label: 'Closed Date' }];
  const metrics = ['Total views', 'Search (Desktop & Mobile)', 'Conversations', 'Website visits', 'Maps (Desktop & Mobile)', 'Bookings', 'Calls'].map(t => ({ title: t, count: 0 }));
  const adsData = ['Facebook Ads Report', 'Google Ads Report'].map(p => ({ platform: p, clicks: 0, spent: 'MAD0', cpc: 'MAD0', ctr: '0%' }));

  // Calendar functions
  const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];
    
    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) days.push({ day: daysInPrevMonth - i, month: prevMonth, year: prevYear, isCurrentMonth: false });
    for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, month, year, isCurrentMonth: true });
    
    // Next month days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let i = 1; i <= 42 - days.length; i++) days.push({ day: i, month: nextMonth, year: nextYear, isCurrentMonth: false });
    
    return days;
  };

  const isDateSelected = (day, month, year) => {
    const dateStr = `${monthNames[month]} ${day}, ${year}`;
    return states.dateRange.start === dateStr || states.dateRange.end === dateStr;
  };

  const handleDayClick = (day, month, year) => {
    const dateStr = `${monthNames[month]} ${day}, ${year}`;
    if (!states.dateRange.start || (states.dateRange.start && states.dateRange.end)) {
      setStates(prev => ({ ...prev, dateRange: { start: dateStr, end: '' } }));
    } else {
      const clickedDate = new Date(dateStr);
      const startDate = new Date(states.dateRange.start);
      setStates(prev => ({
        ...prev,
        dateRange: clickedDate < startDate 
          ? { start: dateStr, end: prev.dateRange.start } 
          : { start: prev.dateRange.start, end: dateStr }
      }));
    }
  };

  const predefinedRanges = [
    { label: 'Today', action: () => setDateRange('today') },
    { label: 'Yesterday', action: () => setDateRange('yesterday') },
    { label: 'Last 7 days', action: () => setDateRange('last7days') },
    { label: 'Last 30 days', action: () => setDateRange('last30days') },
    { label: 'This month', action: () => setDateRange('thisMonth') },
    { label: 'Last month', action: () => setDateRange('lastMonth') }
  ];

  const setDateRange = (preset) => {
    const today = new Date();
    const format = date => `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    
    const ranges = {
      today: () => ({ start: format(today), end: format(today) }),
      yesterday: () => { const y = new Date(today); y.setDate(today.getDate() - 1); return { start: format(y), end: format(y) } },
      last7days: () => { const d = new Date(today); d.setDate(today.getDate() - 6); return { start: format(d), end: format(today) } },
      last30days: () => { const d = new Date(today); d.setDate(today.getDate() - 29); return { start: format(d), end: format(today) } },
      thisMonth: () => ({ start: format(new Date(today.getFullYear(), today.getMonth(), 1)), end: format(today) }),
      lastMonth: () => ({ 
        start: format(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
        end: format(new Date(today.getFullYear(), today.getMonth(), 0))
      })
    };
    
    setStates(prev => ({ ...prev, dateRange: ranges[preset]() }));
  };

  const navigateMonth = (direction) => {
    setStates(prev => ({
      ...prev,
      currentMonths: prev.currentMonths.map(m => ({
        month: direction === 'prev' 
          ? m.month === 0 ? 11 : m.month - 1
          : m.month === 11 ? 0 : m.month + 1,
        year: direction === 'prev'
          ? m.month === 0 ? m.year - 1 : m.year
          : m.month === 11 ? m.year + 1 : m.year
      }))
    }));
  };

  // Components
  const DropdownMenu = ({ isOpen, options, selected, onSelect, onClose }) => (
    isOpen && <div className="absolute w-64 p-4 bg-white dark:bg-[#2A3142] rounded-lg shadow-xl mt-2 right-0 border border-gray-200 dark:border-[#5F9EE9]/30 z-50">
      <p className="text-sm font-medium text-[#808487] mb-3">Date property for opportunity calculation</p>
      <p className="text-sm font-medium text-[#2A3142] dark:text-white mb-2">Status change</p>
      {options.map(opt => (
        <div key={opt.id} onClick={() => { onSelect(opt.label); onClose(); }} 
          className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3A4152] ${selected === opt.label ? "bg-[#5F9EE9]/10 dark:bg-[#5F9EE9]/20" : ""}`}>
          <span className="text-[#2A3142] dark:text-white">{opt.label}</span>
          {selected === opt.label && <Check size={16} className="text-[#5F9EE9]" />}
        </div>
      ))}
    </div>
  );

  const NoDataCard = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 bg-[#5F9EE9]/20 dark:bg-[#5F9EE9]/10 rounded-full animate-ping"></div>
        <div className="relative z-10 w-20 h-20 bg-[#5F9EE9]/10 dark:bg-[#2A3142]/50 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5F9EE9]">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-[#2A3142] dark:text-white mb-1">No Data Found</h2>
    </div>
  );

  const CalendarMonth = ({ month, year }) => (
    <div className="w-1/2 border-r border-gray-200 dark:border-[#5F9EE9]/30">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-[#5F9EE9]/30">
        <button onClick={() => navigateMonth('prev')} className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95">
          <ChevronLeft size={16} />
        </button>
        <div className="font-medium text-[#2A3142] dark:text-white">{monthNames[month]} {year}</div>
        <button onClick={() => navigateMonth('next')} className="p-1 text-[#808487] hover:text-[#2A3142] dark:hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {daysOfWeek.map(day => <div key={day} className="py-1 text-xs font-medium text-[#808487]">{day}</div>)}
        {generateDays(month, year).slice(0, 35).map((date, i) => (
          <div key={i} onClick={() => date.isCurrentMonth && handleDayClick(date.day, date.month, date.year)}
            className={`py-1 text-sm cursor-pointer ${isDateSelected(date.day, date.month, date.year) ? 'bg-[#5F9EE9] text-white' : date.isCurrentMonth ? 'text-[#2A3142] dark:text-white' : 'text-[#808487]'} ${date.isCurrentMonth ? 'hover:bg-gray-100 dark:hover:bg-[#3A4152]' : ''} transition-colors duration-200`}>
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#2A3142] text-[#2A3142] dark:text-white bg-gray-100">
      {/* Dashboard header */}
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center relative">
            <button onClick={() => toggleState('dropdowns', 'isOpen')} className="bg-[#5F9EE9] hover:bg-[#4A8BD6] text-white p-2 rounded-md mr-2 transition-colors duration-200 active:scale-95">
              <div className="flex items-center space-x-1"><PanelsLeftBottom size={20} /><ChevronDown size={20} /></div>
            </button>
            {states.dropdowns.isOpen && (
              <div className="absolute ml-2 top-14 w-64 bg-white dark:bg-[#2A3142] border border-gray-200 dark:border-[#5F9EE9] rounded-lg shadow-xl z-50">
                <div className="p-3">
                  <div className="relative w-full mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808487]" size={16} />
                    <input type="text" placeholder="Search for a dashboard" className="w-full pl-10 p-2 border border-gray-200 dark:border-[#5F9EE9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F9EE9] bg-white dark:bg-[#2A3142] text-[#2A3142] dark:text-white" />
                  </div>
                  <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-[#3A4152] rounded-md text-[#5F9EE9] transition-colors duration-200">+ Add Dashboard</button>
                  <div className="mt-3">
                    <h3 className="text-sm text-[#808487] px-2 mb-1 font-medium">Shared With Me</h3>
                    <div className="border border-gray-200 dark:border-[#5F9EE9] rounded-md">
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
          
          <div className="w-full max-w-md font-sans relative bottom-1,5 left-50">
            <div onClick={() => toggleState('dropdowns', 'calendarOpen')} className="bg-white dark:bg-[#2A3142] rounded-lg border w-fit border-gray-300 dark:border-[#5F9EE9] px-4 py-2 flex items-center cursor-pointer hover:border-[#5F9EE9] transition-colors duration-200 relative">
              <span className="text-[#2A3142] dark:text-white font-medium">{states.dateRange.start}</span>
              <ArrowRight size={16} className="mx-2 text-[#808487]" />
              <span className="text-[#2A3142] dark:text-white font-medium">{states.dateRange.end || states.dateRange.start}</span>
              <Calendar className="w-5 h-5 text-[#808487] ml-4" />
            </div>

            {states.dropdowns.calendarOpen && (
              <div className="absolute mt-2 bg-white dark:bg-[#2A3142] shadow-xl rounded-lg border border-gray-200 dark:border-[#5F9EE9] overflow-hidden z-50">
                <div className="flex">
                  <CalendarMonth month={states.currentMonths[0].month} year={states.currentMonths[0].year} />
                  <CalendarMonth month={states.currentMonths[1].month} year={states.currentMonths[1].year} />
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-[#5F9EE9] flex flex-wrap gap-3">
                  {predefinedRanges.map(range => (
                    <button key={range.label} onClick={range.action} className="px-3 py-1 text-sm border border-gray-200 dark:border-[#5F9EE9] rounded-md hover:bg-gray-100 dark:hover:bg-[#3A4152] text-[#2A3142] dark:text-white transition-colors duration-200 hover:scale-105 active:scale-95">
                      {range.label}
                    </button>
                  ))}
                  <button onClick={() => toggleState('dropdowns', 'calendarOpen')} className="px-3 py-1 text-sm bg-[#5F9EE9] text-white rounded-md hover:bg-[#4A8BD6] ml-auto transition-colors duration-200 hover:scale-105 active:scale-95">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 relative">        
            <button onClick={() => toggleState('dropdowns', 'showTimezone')} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#3A4152] transition-colors duration-200 hover:scale-105 active:scale-95">
              <MoreVertical size={20} className="text-[#808487]" />
            </button>
            {states.dropdowns.showTimezone && (
              <div className="absolute right-0 top-12 bg-white dark:bg-[#2A3142] rounded-lg shadow-xl z-10 w-64 border border-gray-200 dark:border-[#5F9EE9]">
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
          {['Opportunity Status', 'Opportunity Value', 'Conversion Rate'].map((title, i) => (
            <div key={i} className="bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-lg border border-gray-200 dark:border-[#5F9EE9]/30 transition-colors duration-200">
              <div className="p-4 border-b border-gray-200 dark:border-[#5F9EE9]/30 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#2A3142] dark:text-white">{title}</h2>
                <div className="relative">
                  <button onClick={() => toggleState('dropdowns', i === 0 ? 'isOpenN' : i === 1 ? 'isOpenNN' : 'isOpenNNN')} className="text-[#808487] hover:bg-gray-100 hover:dark:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95">
                    <Settings2 size={20} />
                  </button>
                  <DropdownMenu 
                    isOpen={i === 0 ? states.dropdowns.isOpenN : i === 1 ? states.dropdowns.isOpenNN : states.dropdowns.isOpenNNN} 
                    options={options} 
                    selected={i === 0 ? states.selected.main : i === 1 ? states.selected.N : states.selected.N} 
                    onSelect={(val) => setSelected(i === 0 ? 'main' : i === 1 ? 'N' : 'N', val)} 
                    onClose={() => toggleState('dropdowns', i === 0 ? 'isOpenN' : i === 1 ? 'isOpenNN' : 'isOpenNNN')} 
                  />
                </div>
              </div>
              {i === 2 ? (
                <div className="p-4">
                  <h3 className="text-5xl font-bold text-[#2A3142] dark:text-white text-center">MAD0</h3>
                  <div className="flex items-center justify-center mt-2">
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center">
                      <ChevronUp size={16} className="text-green-600 dark:text-green-400 mr-1" />
                      <span className="text-green-600 dark:text-green-400">0%</span>
                    </div> 
                    <span className="ml-2 text-[#808487]">vs Last 31 Days</span>
                  </div>
                  <div className="mt-8 relative flex justify-center">
                    <div className="w-36 h-36 rounded-full bg-transparent border-8 border-gray-200 dark:border-gray-700">
                      <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-4 h-4 bg-[#5F9EE9] rounded-full"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-2xl font-semibold text-[#2A3142] dark:text-white">0%</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-[#808487]">Won revenue</p>
                    <p className="text-xl font-semibold text-[#2A3142] dark:text-white">MAD0</p>
                  </div>
                </div>
              ) : <NoDataCard />}
            </div>
          ))}
        </div>
      </div>

      {/* Funnel and Stage Distribution */}
      <div className="flex flex-col md:flex-row w-full bg-gray-100">
        {['Funnel', 'Stage Distribution'].map((title, i) => (
          <div key={i} className={`w-full md:w-1/2 p-6 bg-white dark:bg-[#2A3142] rounded-lg border shadow-lg ${i === 0 ? 'md:mr-4 mb-4 md:mb-0 md:ml-6' : 'md:mr-6'} border-gray-200 dark:border-[#5F9EE9]/30`}>
            <div className="p-2 border-b border-gray-200 dark:border-[#5F9EE9]/30 flex justify-between items-center">
              <h2 className="text-lg font-medium text-[#2A3142] dark:text-white">{title}</h2>
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
                  <button onClick={() => toggleState('dropdowns', i === 0 ? 'isOpenPar' : 'isOpenPar1')} className="text-[#808487] hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95">
                    <Settings2 size={20} />
                  </button>
                  <DropdownMenu 
                    isOpen={i === 0 ? states.dropdowns.isOpenPar : states.dropdowns.isOpenPar1} 
                    options={options} 
                    selected={i === 0 ? states.selected.Par : states.selected.Par1} 
                    onSelect={(val) => setSelected(i === 0 ? 'Par' : 'Par1', val)} 
                    onClose={() => toggleState('dropdowns', i === 0 ? 'isOpenPar' : 'isOpenPar1')} 
                  />
                </div>
              </div>
            </div>
            {i === 0 ? (
              <div className="mt-6">
                <h1 className="text-3xl font-bold text-[#2A3142] dark:text-white mb-2">MAD0</h1>
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center text-sm font-medium">
                    <ChevronUp size={16} className="mr-1" />0%
                  </div>
                  <span className="text-sm text-[#808487] ml-2">vs Last 31 Days</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-[#808487]">
                  <div>0</div><div>1</div>
                </div>
                <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 text-center font-medium text-[#2A3142] dark:text-white">Cumulative</div>
                  <div className="col-span-1 text-center font-medium text-[#2A3142] dark:text-white">Next Step Conversion</div>
                </div>
                {['Talbi', 'Won'].map((label, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 mb-4">
                    <div className="col-span-1 bg-gray-100 dark:bg-[#2A3142] p-4 h-32 flex flex-col justify-center rounded-md border border-gray-200 dark:border-[#5F9EE9]/30">
                      <div className="font-medium text-[#2A3142] dark:text-white">{label}</div>
                      <div className="font-medium text-[#5F9EE9]">MADO</div>
                    </div>
                    <div className="col-span-1 bg-gray-100 dark:bg-[#2A3142] p-4 flex items-center justify-center relative overflow-hidden rounded-md border border-gray-200 dark:border-[#5F9EE9]/30">
                      <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 100% 15%, 100% 85%, 0 100%)" }}>
                        <div className="h-full w-full flex items-center justify-center text-[#2A3142] dark:text-white font-medium">
                          {idx === 0 ? "0.00%" : "0.00%"}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 bg-gray-100 dark:bg-[#2A3142] p-4 flex items-center justify-center relative overflow-hidden rounded-md border border-gray-200 dark:border-[#5F9EE9]/30">
                      <div className="absolute inset-0" style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)" }}>
                        <div className="h-full w-full flex items-center justify-center text-[#2A3142] dark:text-white font-medium">
                          {idx === 0 ? "100.00%" : "0.00%"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <NoDataCard />}
          </div>
        ))}
      </div>

      {/* Tasks and Manual Actions */}
      <div className="flex flex-col p-4 md:flex-row md:p-6 min-h-screen space-y-4 md:space-y-0 md:space-x-6 bg-gray-100">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <h2 className="text-lg font-semibold text-[#2A3142]">Tasks</h2>
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
              {['tasks', 'dateAdded', 'user'].map((filter, i) => (
                <select key={i} value={states.filters[filter]} onChange={(e) => setStates(prev => ({ ...prev, filters: { ...prev.filters, [filter]: e.target.value } }))} 
                  className="border border-[#5F9EE9] rounded-md px-3 py-2 text-sm text-[#2A3142] focus:ring-2 focus:ring-[#5F9EE9] transition-all duration-200">
                  {filter === 'tasks' ? ['All', 'Pending', 'Completed'].map(opt => <option key={opt}>{opt}</option>) :
                   filter === 'dateAdded' ? ['Due date (DESC)', 'Due date (ASC)', 'Date Added (DESC)', 'Date Added (ASC)'].map(opt => <option key={opt}>{opt}</option>) :
                   ['ZAHRA ZAHRA', 'Other User'].map(opt => <option key={opt}>{opt}</option>)}
                </select>
              ))}
            </div>
          </div>
          <NoDataCard />
        </div>
        
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Manual Actions</h2>
            <div className="flex gap-3">
              {['manualActions', 'userManual'].map((filter, i) => (
                <select key={i} value={states.filters[filter]} onChange={(e) => setStates(prev => ({ ...prev, filters: { ...prev.filters, [filter]: e.target.value } }))} 
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200">
                  <option>{filter === 'manualActions' ? 'All' : 'All Users'}</option>
                </select>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-15 pt-40 pb-30">
            {['Phone', 'SMS', 'Total Pending'].map((label, i) => (
              <div key={i} className="flex flex-col items-center justify-center">
                <p className="text-gray-500 text-sm mb-2">{label}</p>
                <p className="text-4xl font-bold text-gray-700">0</p>
              </div>
            ))}
          </div>
          <div className="text-center p-6">
            <button className="text-blue-500 font-medium flex items-center justify-center mx-auto gap-2 group">
              <span>Go to Manual Actions</span>
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="min-h-screen flex flex-col mr-2 ml-2 bg-gray-100 mb-30">
        {['Lead Source Report', 'Google Analytics Report'].map((title, i) => (
          <div key={i} className="flex-grow container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                {i === 0 && (
                  <div className='relative'>
                    <button onClick={() => toggleState('dropdowns', 'isOpenPar2')} className="text-[#808487] hover:bg-gray-100 hover:dark:bg-[#2A3142]/50 rounded-md p-2 transition-colors duration-200 hover:scale-105 active:scale-95">
                      <Settings2 size={20} />
                    </button>
                    <DropdownMenu 
                      isOpen={states.dropdowns.isOpenPar2} 
                      options={options} 
                      selected={states.selected.Par2} 
                      onSelect={(val) => setSelected('Par2', val)} 
                      onClose={() => toggleState('dropdowns', 'isOpenPar2')} 
                    />
                  </div>
                )}
              </div>
              <NoDataCard />
              {i === 0 && (
                <div className="flex justify-center items-center p-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                      Previous
                    </button>
                    <button className="w-8 h-8 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                      1
                    </button>
                    <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Google Analytics Chart */}
        <div className="bg-gray-50 min-h-screen py-2 px-2 sm:px-6 lg:px-1 overflow-x-hidden bg-gray-100 relative">
  <div className="w-305 mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8 border border-gray-200 mb-8">
    <div className="mb-8 border-b border-gray-200 pb-4">
      <h1 className="text-base font-semibold text-gray-900">Google Analytics Report</h1>
      <p className="text-xs text-gray-500">(Last 12 months)</p>
    </div>
    <div className="relative h-96 w-full overflow-hidden">
      <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 py-6 font-medium z-10 pl-2">
        {[1000, 800, 600, 400, 200, 0].map((val, i) => <div key={i}>{val}</div>)}
      </div>
      <div className="ml-10 h-full relative">
        <svg className="w-full h-full overflow-visible" style={{ filter: 'blur(5px)' }}>
          <line x1="50" y1="350" x2="950" y2="350" stroke="#e5e7eb" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5].map((val, i) => (
            <line key={i} x1="50" y1={350 - i * 60} x2="950" y2={350 - i * 60} stroke="#e5e7eb" strokeWidth="1" strokeDasharray={i === 0 ? "0" : "4 4"} />
          ))}
          <path d={getPath()} fill="none" stroke="#5F9EE9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {chartData.map((val, i) => (
            <circle key={i} cx={50 + i * 80} cy={350 - (val / maxValue) * 300} r="5" fill="white" stroke="#5F9EE9" strokeWidth="2" />
          ))}
          <path d={`${getPath()} L950,350 L50,350 Z`} fill="url(#blue-gradient)" fillOpacity="0.2" />
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5F9EE9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#5F9EE9" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white text-gray-800 px-6 py-3 rounded-lg shadow-md text-center border border-gray-200 font-medium">
            No Data Found
          </div>
        </div>
      </div>
    </div>
    <div className="relative h-8 ml-10 mt-2 overflow-hidden">
      <div className="flex flex-wrap justify-between w-full text-sm text-gray-500 font-medium">
        {months.map((month, i) => <div key={i} className="text-center flex-1 min-w-[60px]">{month}</div>)}
      </div>
    </div>
  </div>
</div>

        {/* Google Business Profile */}
        <div className="w-240 mx-auto bg-white rounded-lg shadow-lg py-4 px-4 sm:px-6 lg:px-8">
  {/* Header Section */}
  <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 gap-4">
    <div>
      <h1 className="text-base font-semibold text-gray-900">Google Business Profile</h1>
      <p className="text-xs text-gray-500">(Last 30 Days)</p>
    </div>

    {/* Select Dropdown */}
    <div className="relative w-full sm:w-60">
      <select className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
        <option>Please Select</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>

  {/* Metrics Section */}
  <div className="p-4 sm:p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <div key={i} className={`p-4 rounded-md bg-gray-50 shadow-sm ${i === 0 ? 'md:col-span-3 lg:col-span-1' : ''}`}>
          <h2 className="text-gray-500 text-sm mb-1">{metric.title}</h2>
          <p className="text-gray-800 text-3xl sm:text-4xl font-medium">{metric.count}</p>
        </div>
      ))}
    </div>
  </div>
</div>


        {/* Ads Reports */}
        <div className="min-h-screen bg-gray-50 dark:bg-[#2A3142] p-4 mb-8 bg-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {adsData.map((ad, i) => (
              <div key={i} className="bg-[#FFFFFF] dark:bg-[#2A3142] rounded-lg shadow-lg border border-gray-200 dark:border-[#5F9EE9] overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-[#5F9EE9]">
                  <h2 className="text-xl font-semibold text-[#2A3142] dark:text-white">{ad.platform}</h2>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 dark:divide-[#5F9EE9]/30">
                  {['Total Clicks', 'Total Spent', 'CPC', 'CTR'].map((label, j) => (
                    <div key={j} className="p-4">
                      <p className="text-sm font-medium text-[#808487] dark:text-[#808487] mb-2">{label}</p>
                      <p className="text-3xl font-bold text-[#2A3142] dark:text-white">
                        {j === 0 ? ad.clicks : j === 1 ? ad.spent : j === 2 ? ad.cpc : ad.ctr}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Efficiency */}
        <div className="  dark:bg-[#1E2533] py-8 relative w-120 py-10 px-2 mr-160 bottom-90">
  <div className="bg-white dark:bg-[#2A3142] rounded-xl  p-6 max-w-4xl  mx-auto border border-gray-200 dark:border-[#5F9EE9]/30">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-gray-200 dark:border-[#5F9EE9]/30 pb-4">
      <h1 className="text-base font-semibold text-gray-900 dark:text-white">Sales Efficiency</h1>
      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <div className="relative">
          <button onClick={() => toggleState('dropdowns', 'dropdownOpen')} className="flex items-center justify-between w-64 px-4 py-2 text-[#2A3142] dark:text-white bg-white dark:bg-[#2A3142] border border-gray-300 dark:border-[#5F9EE9]/30 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A3142]/60 transition-colors">
            <span>{states.filters.selectedUsers}</span>
            <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {states.dropdowns.dropdownOpen && (
            <div className="absolute right-0 z-20 w-64 mt-2 bg-white dark:bg-[#2A3142] border border-gray-300 dark:border-[#5F9EE9]/30 rounded-lg shadow-xl">
              <ul className="divide-y divide-gray-100 dark:divide-[#5F9EE9]/10">
                {["All Users"].map(option => (
                  <li 
                    key={option} 
                    onClick={() => setStates(prev => ({ 
                      ...prev, 
                      filters: { ...prev.filters, selectedUsers: option },
                      dropdowns: { ...prev.dropdowns, dropdownOpen: false }
                    }))} 
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2A3142]/60 cursor-pointer text-[#2A3142] dark:text-white"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
    
                <div className="relative">
                  <button onClick={() => toggleState('dropdowns', 'isOpenPar3')} className="text-[#808487] hover:bg-gray-100 dark:hover:bg-[#2A3142]/50 rounded-md p-2 transition-transform duration-200 hover:scale-105 active:scale-95">
                    <Settings2 size={20} />
                  </button>
                  <DropdownMenu 
                    isOpen={states.dropdowns.isOpenPar3} 
                    options={options} 
                    selected={states.selected.Par3} 
                    onSelect={(val) => setSelected('Par3', val)} 
                    onClose={() => toggleState('dropdowns', 'isOpenPar3')} 
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Average Sales Duration", value: "0s" },
                { title: "Total Sale Value", value: "MAD0" },
                { title: "Sales Velocity", value: "MAD0/M" },
              ].map((card, i) => (
                <div key={i} className="bg-white dark:bg-transparent">
                  <h2 className="text-sm font-medium text-[#808487] mb-1">{card.title}</h2>
                  <div className="text-3xl font-bold text-[#2A3142] dark:text-white mb-1">{card.value}</div>
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <ChevronUp size={16} className="mr-1" />0%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

