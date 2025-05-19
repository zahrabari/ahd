"use client"

import { useState, useRef } from "react"
import { Info, ChevronDown, Menu, Settings, Minus, Plus } from "lucide-react"
import logo from "../../../assets/logo.png"
import { Link } from "react-router-dom"

// Custom Switch Component
function Switch({ checked, onCheckedChange, className }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-gray-200"
      } ${className || ""}`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
          checked ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  )
}

// CounterInput Component
function CounterInput({ value, onChange, min = 0, unit = "Days", className = "" }) {
  const decrease = () => {
    if (value > min) onChange(value - 1)
  }

  const increase = () => {
    onChange(value + 1)
  }

  return (
    <div className={`flex items-center ${className}`}>
      <button
        className="h-8 w-8 rounded-l border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        onClick={decrease}
        disabled={value <= min}
      >
        <Minus className={`h-4 w-4 ${value <= min ? "text-gray-300" : "text-gray-500"}`} />
      </button>
      <input
        type="text"
        className="h-8 w-14 border-t border-b border-gray-300 text-center focus:outline-none"
        value={value}
        onChange={(e) => {
          const val = Number.parseInt(e.target.value) || 0
          if (val >= min) onChange(val)
        }}
      />
      <button
        className="h-8 w-8 rounded-r border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        onClick={increase}
      >
        <Plus className="h-4 w-4 text-gray-500" />
      </button>
      {unit && (
        <select className="h-8 ml-2 border border-gray-300 rounded px-2 text-sm">
          <option>{unit}</option>
        </select>
      )}
    </div>
  )
}

// Custom Select Component
function CustomSelect({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        className="w-full appearance-none border border-gray-300 shadow-sm rounded-lg p-3 pr-10 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}

const navItems = [
  { name: "Overview", path: "/Overview" },
  { name: "Requests", path: "/Requests" },
  { name: "Reviews", path: "/Reviews" },
  { name: "Widgets", path: "/Widgets" },
  { name: "Listings", path: "/Listings" },
  { name: "Settings", path: "/Settings" }
];

  const sidebarItems = [
    { name: "Reviews AI", path: "/Settings" },
    { name: "Review Link", path: "/Reviewlink" },
    { name: "SMS Review Requests", path: "/Smss" },
    { name: "Email Review Requests", path: "/EmailRev" },
    { name: "WhatsApp Review Requests", path: "/WhatsApp" },
    { name: "Reviews QR", path: "/Review" },
    { name: "Spam Reviews", path: "/spam" },
    { name: "Integrations", path: "/Integrations" },
  ]
// Image Upload Component
function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndSetImage(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetImage(e.dataTransfer.files[0])
    }
  }

  const validateAndSetImage = (file) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file (SVG, PNG or JPG)")
      return
    }

    // Create a FileReader to read the image dimensions
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // Check dimensions
        if (img.width > 16 || img.height > 16) {
          alert("Image dimensions must be 16x16px or smaller")
          return
        }

        // If all validations pass, set the image
        setSelectedImage(img.src)
      }
      img.src = e.target?.result
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`border border-dashed ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"} 
        rounded-lg p-4 mb-6 flex items-center justify-center flex-col h-40 
        cursor-pointer transition-colors`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedImage ? (
        <div className="flex flex-col items-center">
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Selected"
            className="mb-2 border border-gray-200"
            style={{ width: "32px", height: "32px" }} // Enlarged for visibility
          />
          <p className="text-blue-500 font-medium">Click to Change</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-full p-2 mb-2 shadow-sm">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <p className="text-blue-500 font-medium mb-1">Click to Change</p>
          <p className="text-gray-500 text-sm">or drag and drop</p>
          <p className="text-gray-500 text-sm">SVG, PNG or JPG (max. 16x16px)</p>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".svg,.png,.jpg,.jpeg"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default function SMSReviewSettings() {
  const [activeNavItem, setActiveNavItem] = useState("Settings")
  const [activeSidebarItem, setActiveSidebarItem] = useState("SMS Review Requests")
  const [smsReviewsEnabled, setSmsReviewsEnabled] = useState(true)
  const [daysValue, setDaysValue] = useState(0)
  const [hoursValue, setHoursValue] = useState(1)
  const [repeatOption, setRepeatOption] = useState("Don't Repeat")
  const [maxRetries, setMaxRetries] = useState(1)
  const [smsMessage, setSmsMessage] = useState(
    "Hi {{contact.first_name}}! 👋 We hope you're enjoying the benefits of your new solar system! Your feedback helps us improve and grow. If you could spare a moment, we'd love to hear your thoughts! Please leave us a quick review here: {{review_link}}. Thanks so much! 🙏",
  )
  const [timingOption, setTimingOption] = useState("Immediately")

  // Available options for select components
  const timingOptions = ["Immediately", "After 1 hour", "After 1 day", "Custom timing"]
  const repeatOptions = ["Don't Repeat", "Daily", "Weekly", "Custom"]

  // Function to handle navigation
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`)
    window.location.href = path
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center h-16">
            <h1 className="text-xl font-semibold mr-8">Reputation</h1>
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`py-4 px-1 ${
                    item.name === activeNavItem
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveNavItem(item.name)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 flex">
        {/* Sidebar */}
        <aside className="w-64 pt-8 pr-8">
          <nav className="space-y-6">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 ${
                  item.name === activeSidebarItem
                    ? "text-blue-500 border-l-4 border-blue-500 pl-4 -ml-4"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveSidebarItem(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Settings Area */}
        <div className="flex-1 px-6 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-800">SMS Review Requests</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{smsReviewsEnabled ? "Enabled" : "Disabled"}</span>
                <Switch checked={smsReviewsEnabled} onCheckedChange={setSmsReviewsEnabled} />
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <div className="grid gap-6">
                {/* Image Upload Area */}
                <ImageUpload />

                {/* SMS Message Area */}
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700">SMS sent to User</label>
                  <textarea
                    className="w-full border border-gray-300 shadow-sm rounded-lg p-4 h-32 resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                  />
                </div>

                {/* Review Request Behavior */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <span className="font-medium text-gray-700">Review Request Behavior</span>
                    <div className="group relative ml-2">
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      <div className="absolute left-full top-0 w-64 bg-white p-2 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity z-10 ml-2">
                        Configure when and how often SMS review requests are sent to your customers.
                      </div>
                    </div>
                  </div>

                  <div className="mb-2 text-gray-700">When to send SMS after check-in?</div>
                  <CustomSelect
                    value={timingOption}
                    onChange={setTimingOption}
                    options={timingOptions}
                    className="mb-4"
                  />

                  {/* Days Counter */}
                  <div className="mb-4">
                    <CounterInput value={daysValue} onChange={setDaysValue} unit="Days" className="mb-4" />
                  </div>

                  {/* Until clicked, repeat this every */}
                  <div className="mb-2 text-gray-700">Until clicked, repeat this every</div>
                  <CustomSelect
                    value={repeatOption}
                    onChange={setRepeatOption}
                    options={repeatOptions}
                    className="mb-4"
                  />

                  {/* Hours Counter */}
                  <div className="mb-4">
                    <CounterInput value={hoursValue} onChange={setHoursValue} min={1} unit="Hours" className="mb-4" />
                  </div>

                  {/* Maximum retries */}
                  <div className="mb-2 text-gray-700">Maximum retries</div>
                  <div className="mb-4">
                    <CounterInput value={maxRetries} onChange={setMaxRetries} min={1} />
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-6 flex justify-end">
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg mr-2 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save</button>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Preview */}
        <div className="w-72 p-6">
          <div className="w-64 h-[540px] bg-black rounded-[36px] p-3 pt-0 relative shadow-xl">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-10"></div>

            <div className="bg-white h-full w-full rounded-[32px] overflow-hidden relative">
              {/* Phone Status Bar */}
              <div className="h-8 flex justify-between items-center px-6 bg-gray-100">
                <span className="text-xs font-medium">9:41</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-3 bg-black rounded-sm"></div>
                </div>
              </div>

              {/* Phone Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Menu className="h-5 w-5 text-gray-800" />
                  <Settings className="h-5 w-5 text-gray-800" />
                </div>

                <div className="flex justify-center mb-8">
                  {/* Logo */}
                  {smsReviewsEnabled && (
                    <div className="text-center">
                      <img src={logo || "/placeholder.svg"} width={50} alt="Company logo" className="mx-auto" />
                      <p className="font-bold text-lg mt-1">
                        <span className="text-gray-600">ah</span>
                        <span className="text-yellow-500">d</span>
                        <span className="text-pink-500">i</span>
                        <span className="text-blue-500">g</span>
                        <span className="text-gray-600">i</span>
                        <span className="text-yellow-500">t</span>
                        <span className="text-pink-500">a</span>
                        <span className="text-blue-500">l</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-blue-900">{smsMessage}</p>
                </div>

                <div className="mt-4">
                  <div className="h-10 bg-gray-100 rounded-md flex items-center px-3 text-xs text-gray-500">
                    Enter a message
                  </div>
                  <div className="h-10 w-20 bg-green-500 rounded-md text-white flex items-center justify-center text-xs mt-2 ml-auto hover:bg-green-600 transition-colors">
                    Send
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
