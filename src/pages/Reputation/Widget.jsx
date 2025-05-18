"use client"

import { useState, useRef, useEffect } from "react"
import { Star, Plus, ChevronDown, Smartphone, Code, Info, Check } from "lucide-react"
import { Link } from "react-router-dom"

export default function ReputationDashboard() {
  const [activeTab, setActiveTab] = useState("Widgets")
  const [activeRightTab, setActiveRightTab] = useState("Saved Widgets")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [configTab, setConfigTab] = useState("Layout")
  const [selectedWidgetType, setSelectedWidgetType] = useState("Carousel")
  const [selectedWidget, setSelectedWidget] = useState("default")
  const [currentContent, setCurrentContent] = useState("testimonials")
  const [maxReviews, setMaxReviews] = useState(20)
  const [poweredBy, setPoweredBy] = useState(true)
  const [showRatingsDropdown, setShowRatingsDropdown] = useState(false)
  const [selectedRating, setSelectedRating] = useState("Any Rating")
  const [showSourcesDropdown, setShowSourcesDropdown] = useState(false)
  const [selectedSource, setSelectedSource] = useState("")
  const [headerEnabled, setHeaderEnabled] = useState(true)
  const [showRating, setShowRating] = useState(true)
  const [showReviewCount, setShowReviewCount] = useState(true)
  const [showWriteReviewButton, setShowWriteReviewButton] = useState(true)
  const [widgetTitleEnabled, setWidgetTitleEnabled] = useState(true)
  const [widgetHeading, setWidgetHeading] = useState("")
  const [widgetDescription, setWidgetDescription] = useState("")
  const [reviewsText, setReviewsText] = useState("")
  const [theme, setTheme] = useState("Light")
  const fontOptions = ["Roboto", "Arial", "Georgia", "Sans-serif", "Times New Roman", "Verdana"]
  const [font, setFont] = useState("Sans-serif")
  const [aiSummaryEnabled, setAiSummaryEnabled] = useState(true)
  const [displayDate, setDisplayDate] = useState(true)
  const [displayReviewerIcon, setDisplayReviewerIcon] = useState(true)
  const [excludeNoDescription, setExcludeNoDescription] = useState(false)
  const [embedCodeExpanded, setEmbedCodeExpanded] = useState(false)
  const [embedCode, setEmbedCode] = useState(
    '<script src="https://yourwidget.com/embed.js" data-widget-id="123456"></script>',
  )
  const [isEditing, setIsEditing] = useState(false)
  const [colors, setColors] = useState({
    widgetPrimary: "#2C698C",
    widgetSecondary: "#6366f1",
    widgetBackground: "#ffffff",
    reviewPrimary: "#f59e0b",
    reviewSecondary: "#8b5cf6",
    reviewBackground: "#f3f4f6",
    starRating: "#fbbf24",
    border: "#e5e7eb",
    aiSummary: "#6d28d9",
  })

  const [activeColorPicker, setActiveColorPicker] = useState(null)
  const [currentColor, setCurrentColor] = useState("#2C698C")
  const [hexInput, setHexInput] = useState("#2C698C")

  // HSV values - more accurate for color picking
  const [hue, setHue] = useState(200) // 0-360
  const [saturation, setSaturation] = useState(60) // 0-100
  const [value, setValue] = useState(60) // 0-100
  const [alpha, setAlpha] = useState(100) // 0-100

  const colorPanelRef = useRef(null)
  const hueSliderRef = useRef(null)
  const alphaSliderRef = useRef(null)

  // Mouse event handlers for dragging
  const [isDragging, setIsDragging] = useState(null)

  // Convert HSV to RGB
  const hsvToRgb = (h, s, v) => {
    s = s / 100
    v = v / 100

    let r, g, b
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    switch (i % 6) {
      case 0:
        r = v
        g = t
        b = p
        break
      case 1:
        r = q
        g = v
        b = p
        break
      case 2:
        r = p
        g = v
        b = t
        break
      case 3:
        r = p
        g = q
        b = v
        break
      case 4:
        r = t
        g = p
        b = v
        break
      case 5:
        r = v
        g = p
        b = q
        break
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }

  // Convert RGB to Hex
  const rgbToHex = (r, g, b, a = 255) => {
    const toHex = (c) => {
      const hex = c.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 255 ? toHex(a) : ""}`
  }

  // Update color from HSV values
  const updateColorFromHsv = () => {
    const rgb = hsvToRgb(hue / 360, saturation, value)
    const alphaValue = Math.round((alpha * 255) / 100)
    const hexColor = rgbToHex(rgb.r, rgb.g, rgb.b, alphaValue < 255 ? alphaValue : 255)
    setCurrentColor(hexColor)
    setHexInput(hexColor)
  }

  useEffect(() => {
    updateColorFromHsv()
  }, [hue, saturation, value, alpha])

  // Initialize color values when new color is selected
  useEffect(() => {
    if (activeColorPicker) {
      setCurrentColor(colors[activeColorPicker])
      setHexInput(colors[activeColorPicker])

      // For simplicity, we're setting default HSV values here
      // In a real app, you'd convert the hex to HSV
      setHue(200)
      setSaturation(60)
      setValue(60)
      setAlpha(100)
    }
  }, [activeColorPicker])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return

      if (isDragging === "colorPanel") {
        handleColorPanelMove(e)
      } else if (isDragging === "hue") {
        handleHueSliderMove(e)
      } else if (isDragging === "alpha") {
        handleAlphaSliderMove(e)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(null)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleColorPanelMove = (e) => {
    if (!colorPanelRef.current) return

    const rect = colorPanelRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

    setSaturation(x * 100) // Left to right: 0 to 100%
    setValue((1 - y) * 100) // Top to bottom: 100 to 0%
  }

  const handleHueSliderMove = (e) => {
    if (!hueSliderRef.current) return

    const rect = hueSliderRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

    setHue(x * 360) // 0-360 degrees on the color wheel
  }

  const handleAlphaSliderMove = (e) => {
    if (!alphaSliderRef.current) return

    const rect = alphaSliderRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

    setAlpha(x * 100) // 0-100%
  }

  const startDrag = (type, e) => {
    e.stopPropagation()
    setIsDragging(type)

    // Initialize position
    if (type === "colorPanel") {
      handleColorPanelMove(e)
    } else if (type === "hue") {
      handleHueSliderMove(e)
    } else if (type === "alpha") {
      handleAlphaSliderMove(e)
    }
  }

  const applyColor = () => {
    if (activeColorPicker) {
      setColors({
        ...colors,
        [activeColorPicker]: currentColor,
      })
    }
    setActiveColorPicker(null)
  }

  const handleHexInputChange = (e) => {
    setHexInput(e.target.value)
    // Simple validation for hex code
    if (/^#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?$/.test(e.target.value)) {
      setCurrentColor(e.target.value)
      // In a real app, you'd update HSV values from the hex here
    }
  }

  // Get a CSS HSL color string for the current hue to use in the color panel
  const getHueColor = () => {
    const rgb = hsvToRgb(hue / 360, 100, 100)
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }

  // Update the handler for the Edit Widget button
  const handleEditWidget = () => {
    setIsEditing(true)
    setShowCreateModal(true)
  }

  // Update the handler for Create New

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    // You could add a toast notification here
  }

  const rightTabs = ["Saved Widgets", "Templates"]
  const configTabs = ["Layout", "Content", "Appearance", "Settings"]
  const ratingOptions = ["Any Rating", "2 Stars and Above", "3 Stars and Above", "4 Stars and Above", "Only 5 rated"]
  const sourceOptions = [
    { id: "all", label: "All", icons: ["google", "facebook"] },
    { id: "google", label: "All Google pages", icons: ["google"] },
    { id: "facebook", label: "All Facebook pages", icons: ["facebook"] },
  ]

  const handleCreateNewClick = () => setShowCreateModal(true)
  const handleCloseModal = () => setShowCreateModal(false)
  const handleSave = () => {
    console.log("Saving widget configuration")
    setShowCreateModal(false)
  }
  const handleWidgetSelection = (widget) => {
    setSelectedWidget(widget)
    setCurrentContent(widget === "default" ? "testimonials" : "clients")
  }
  const incrementMaxReviews = () => setMaxReviews((prev) => prev + 1)
  const decrementMaxReviews = () => maxReviews > 1 && setMaxReviews((prev) => prev - 1)
  const handleMaxReviewsChange = (e) => setMaxReviews(Number.parseInt(e.target.value) || "")
  const toggleRatingsDropdown = () => {
    setShowRatingsDropdown(!showRatingsDropdown)
    showSourcesDropdown && setShowSourcesDropdown(false)
  }
  const toggleSourcesDropdown = () => {
    setShowSourcesDropdown(!showSourcesDropdown)
    showRatingsDropdown && setShowRatingsDropdown(false)
  }
  const selectRating = (rating) => {
    setSelectedRating(rating)
    setShowRatingsDropdown(false)
  }
  const selectSource = (source) => {
    setSelectedSource(source.label)
    setShowSourcesDropdown(false)
  }
  const handleColorChange = (color, key) => {
    setColors((prev) => ({ ...prev, [key]: color }))
  }

  const SourceIcon = ({ source }) =>
    source === "google" ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.5 12.2305C22.5 11.4414 22.4368 10.6797 22.3232 9.94336H12V14.0781H17.9368C17.6855 15.4336 16.9066 16.5664 15.7063 17.3281V20.0391H19.1937C21.2063 18.1602 22.5 15.4336 22.5 12.2305Z"
          fill="#4285F4"
        />
        <path
          d="M12 22.5C14.7 22.5 17.0295 21.5586 19.1936 20.0391L15.7063 17.3281C14.7063 17.9883 13.4526 18.3633 12 18.3633C9.15474 18.3633 6.75474 16.4414 5.84842 13.7812H2.25V16.5703C4.4021 20.123 8.01369 22.5 12 22.5Z"
          fill="#34A853"
        />
        <path
          d="M5.84832 13.7812C5.62895 13.1211 5.50527 12.4141 5.50527 11.682C5.50527 10.95 5.62895 10.243 5.84832 9.58281V6.79375H2.24995C1.63785 8.24883 1.2821 9.91992 1.2821 11.682C1.2821 13.4441 1.63785 15.1152 2.24995 16.5703L5.84832 13.7812Z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.00625C13.5158 5.00625 14.8768 5.51172 15.9242 6.51328L18.9873 3.45C17.0242 1.61875 14.6947 0.5 12 0.5C8.01374 0.5 4.4021 2.87695 2.25 6.42969L5.84837 9.21875C6.75469 6.55859 9.15469 5.00625 12 5.00625Z"
          fill="#EA4335"
        />
      </svg>
    ) : source === "facebook" ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill="#1877F2" />
        <path
          d="M16.6 12.5H13.9V19.5H10.9V12.5H9V9.9H10.9V8.1C10.9 5.9 12 4.5 14.4 4.5C15.2 4.5 16.1 4.6 16.5 4.7V7H15.1C14.1 7 13.9 7.5 13.9 8.2V9.9H16.6L16.1 12.5H16.6Z"
          fill="white"
        />
      </svg>
    ) : null

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold py-4 mr-8">Reputation</h1>
            <nav className="flex space-x-4">
           
                <Link to="/Ov" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
                  Overview
                </Link>
              

              <Link to="/re" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
                Requests
              </Link>

              <Link to="/rev" className="block py-4 px-3 text-gray-600 hover:text-gray-900">
                Reviews
              </Link>
              <div className="border-b-2 border-blue-500">
              <Link to="/w" className="block py-4 px-3 text-blue-500 font-medium">
                Widgets
              </Link>
              </div>
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
      <div className="flex flex-1">
        <div className="flex-1 p-4">
          <div className="flex justify-end mb-4 space-x-4">
            <button className="p-2 border border-gray-300 rounded bg-white">
              <Smartphone size={20} />
            </button>
            <button className="p-2 border border-gray-300 rounded bg-white">
              <Code size={20} />
            </button>
          </div>

          {currentContent === "testimonials" ? (
            <div className="border border-gray-200 rounded p-8 bg-white">
              {widgetTitleEnabled && (
                <h2 className="text-2xl font-medium text-gray-800">{widgetHeading || "Customer Testimonials"}</h2>
              )}
              <p className="text-gray-500 mb-40">{widgetDescription || "AGADIR, AGADIR, AGADIR, 80000"}</p>
              {poweredBy && (
                <div className="flex justify-end text-gray-400 text-sm">
                  Powered by <span className="ml-1 text-gray-600">digital ah</span>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded p-8 bg-white">
              <div className="flex flex-col items-center text-center">
                {widgetTitleEnabled && (
                  <h2 className="text-xl font-medium text-gray-800 mb-6">
                    {widgetHeading || "What our clients say about us"}
                  </h2>
                )}
                <p className="text-gray-500 mb-6">{widgetDescription || ""}</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">Write a review</button>
              </div>
              {poweredBy && (
                <div className="flex justify-end text-gray-400 text-sm mt-20">
                  Powered by <span className="ml-1 text-gray-600">digital ah</span>
                </div>
              )}
            </div>
          )}
        </div>

        {showCreateModal ? (
          <div className="w-90 border-gray-200 bg-white flex flex-col h-screen">
            <div className="flex shadow-sm border-b border-gray-200">
              {configTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setConfigTab(tab)}
                  className={`px-4 py-3 ${configTab === tab ? "text-gray-800 font-medium" : "text-gray-500"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {configTab === "Layout" && (
                <>
                  {/* Review Source Dropdown */}
                  <div className="mb-6">
                    <label className="block text-[#2A3142] text-lg font-semibold mb-2">Review Source</label>
                    <div className="relative">
                      <div
                        className="flex items-center border border-gray-300 rounded-lg px-4 py-3 cursor-pointer bg-white hover:border-[#5F9EE9] transition-colors duration-200"
                        onClick={toggleSourcesDropdown}
                      >
                        {selectedSource ? (
                          <>
                            {sourceOptions
                              .find((s) => s.label === selectedSource)
                              ?.icons.map((icon, idx) => (
                                <SourceIcon key={idx} source={icon} />
                              ))}
                            <span className="flex-1 ml-2 text-[#2A3142]">{selectedSource}</span>
                          </>
                        ) : (
                          <span className="flex-1 text-[#808487]">Select a source</span>
                        )}
                        <ChevronDown size={20} className="text-[#808487]" />
                      </div>

                      {showSourcesDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-[#5F9EE9] rounded-lg shadow-lg">
                          {sourceOptions.map((source, index) => (
                            <div
                              key={source.id}
                              onClick={() => selectSource(source)}
                              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#5F9EE9]/10 transition-colors duration-200 ${
                                index === 0 ? "rounded-t-lg" : ""
                              } ${index === sourceOptions.length - 1 ? "rounded-b-lg" : ""}`}
                            >
                              <div className="flex">
                                {source.icons.map((icon, idx) => (
                                  <SourceIcon key={idx} source={icon} />
                                ))}
                              </div>
                              <span className="flex-1 ml-2 text-[#2A3142]">{source.label}</span>
                              {selectedSource === source.label && <Check size={20} className="text-[#5F9EE9]" />}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Widget Type Selection */}
                  <div className="mb-6">
                    <label className="block text-[#2A3142] text-lg font-semibold mb-2">Widget Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["List", "Grid", "Masonry"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedWidgetType(type)}
                          className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-200 hover:shadow-md ${
                            selectedWidgetType === type
                              ? "bg-[#5F9EE9]/10 border-[#5F9EE9]"
                              : "border-gray-200 hover:border-[#5F9EE9]"
                          }`}
                        >
                          <div className="h-10 flex items-center justify-center">
                            {type === "List" && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="6"
                                  y="7"
                                  width="2"
                                  height="2"
                                  rx="1"
                                  fill={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                />
                                <rect
                                  x="10"
                                  y="7"
                                  width="8"
                                  height="2"
                                  rx="1"
                                  fill={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                />
                                <rect
                                  x="6"
                                  y="11"
                                  width="2"
                                  height="2"
                                  rx="1"
                                  fill={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                />
                                <rect
                                  x="10"
                                  y="11"
                                  width="8"
                                  height="2"
                                  rx="1"
                                  fill={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                />
                                <rect
                                  x="6"
                                  y="15"
                                  width="2"
                                  height="2"
                                  rx="1"
                                  fill={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                />
                                <rect
                                  x="10"
                                  y="15"
                                  width="8"
                                  height="2"
                                  rx="1"
                                  fill={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                />
                              </svg>
                            )}
                            {type === "Grid" && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="6"
                                  y="6"
                                  width="5"
                                  height="5"
                                  rx="1"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                                <rect
                                  x="13"
                                  y="6"
                                  width="5"
                                  height="5"
                                  rx="1"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                                <rect
                                  x="6"
                                  y="13"
                                  width="5"
                                  height="5"
                                  rx="1"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                                <rect
                                  x="13"
                                  y="13"
                                  width="5"
                                  height="5"
                                  rx="1"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                              </svg>
                            )}
                            {type === "Masonry" && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="6"
                                  y="6"
                                  width="12"
                                  height="12"
                                  rx="2"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                                <line
                                  x1="12"
                                  y1="6"
                                  x2="12"
                                  y2="18"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`mt-2 font-medium ${
                              selectedWidgetType === type ? "text-[#5F9EE9]" : "text-[#808487]"
                            }`}
                          >
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {["Carousel", "Legacy"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedWidgetType(type)}
                          className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-200 hover:shadow-md ${
                            selectedWidgetType === type
                              ? "bg-[#5F9EE9]/10 border-[#5F9EE9]"
                              : "border-gray-200 hover:border-[#5F9EE9]"
                          }`}
                        >
                          <div className="h-10 flex items-center justify-center">
                            {type === "Carousel" && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="4"
                                  y="9"
                                  width="3"
                                  height="3"
                                  rx="0.5"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                                <rect
                                  x="9"
                                  y="9"
                                  width="3"
                                  height="3"
                                  rx="0.5"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M16 12L19 9"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M16 9L19 12"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                            {type === "Legacy" && (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5L14 11L20 11L15 15L17 21L12 17L7 21L9 15L4 11L10 11L12 5Z"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M18 7L20 5"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M4 7L6 5"
                                  stroke={selectedWidgetType === type ? "#5F9EE9" : "#808487"}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`mt-2 font-medium ${
                              selectedWidgetType === type ? "text-[#5F9EE9]" : "text-[#808487]"
                            }`}
                          >
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Max Reviews Input */}
                  <div className="mb-6">
                    <label className="block text-[#2A3142] text-lg font-semibold mb-2">Max number of Reviews</label>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#5F9EE9] focus-within:border-transparent transition-all duration-200">
                      <input
                        type="text"
                        value={maxReviews}
                        onChange={handleMaxReviewsChange}
                        placeholder="example: 20"
                        className="flex-1 px-4 py-2 focus:outline-none text-[#2A3142]"
                      />
                      <div className="flex flex-col border-l border-gray-300">
                        <button
                          className="px-3 py-1 hover:bg-gray-100 border-b border-gray-300 transition-colors duration-200 text-[#2A3142]"
                          onClick={decrementMaxReviews}
                        >
                          −
                        </button>
                        <button
                          className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200 text-[#2A3142]"
                          onClick={incrementMaxReviews}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Ratings Dropdown */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="block text-[#2A3142] text-lg font-semibold">Minimum Ratings</label>
                      <Info size={16} className="ml-2 text-[#808487]" />
                    </div>
                    <div className="relative">
                      <div
                        className="flex items-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:border-[#5F9EE9] transition-colors duration-200"
                        onClick={toggleRatingsDropdown}
                      >
                        <Star size={24} className="text-[#F7B84B] mr-2" />
                        <span className="flex-1 text-[#2A3142]">{selectedRating}</span>
                        <ChevronDown size={20} className="text-[#808487]" />
                      </div>

                      {showRatingsDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-[#5F9EE9] rounded-lg shadow-lg">
                          {ratingOptions.map((rating, index) => (
                            <div
                              key={rating}
                              onClick={() => selectRating(rating)}
                              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-[#5F9EE9]/10 transition-colors duration-200 ${
                                index === 0 ? "rounded-t-lg" : ""
                              } ${index === ratingOptions.length - 1 ? "rounded-b-lg" : ""}`}
                            >
                              <Star size={24} className="text-[#F7B84B] mr-2" />
                              <span className="flex-1 text-[#2A3142]">{rating}</span>
                              {selectedRating === rating && <Check size={20} className="text-[#5F9EE9]" />}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Powered By Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <label className="block text-[#2A3142] text-lg font-semibold">Powered By</label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="opacity-0 w-0 h-0"
                          checked={poweredBy}
                          onChange={() => setPoweredBy(!poweredBy)}
                        />
                        <span
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${
                            poweredBy ? "bg-[#5F9EE9]" : "bg-gray-300"
                          }`}
                          onClick={() => setPoweredBy(!poweredBy)}
                        >
                          <span
                            className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-300 ${
                              poweredBy ? "transform translate-x-6" : ""
                            }`}
                          ></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {configTab === "Content" && (
                <div className="space-y-6">
                  {/* Widget Title Toggle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[#2A3142] text-lg font-semibold">Widget Title</label>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="opacity-0 w-0 h-0"
                          checked={widgetTitleEnabled}
                          onChange={() => setWidgetTitleEnabled(!widgetTitleEnabled)}
                        />
                        <span
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${
                            widgetTitleEnabled ? "bg-[#5F9EE9]" : "bg-gray-300"
                          }`}
                          onClick={() => setWidgetTitleEnabled(!widgetTitleEnabled)}
                        >
                          <span
                            className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-300 ${
                              widgetTitleEnabled ? "transform translate-x-6" : ""
                            }`}
                          ></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Heading Input */}
                  <div className="mb-6">
                    <label className="block text-[#2A3142] text-lg font-semibold mb-2">Heading</label>
                    <input
                      type="text"
                      value={widgetHeading}
                      onChange={(e) => setWidgetHeading(e.target.value)}
                      placeholder="example: What our clients say about"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F9EE9] focus:border-transparent transition-all duration-200 text-[#2A3142]"
                    />
                  </div>

                  {/* Description Textarea */}
                  <div className="mb-6">
                    <label className="block text-[#2A3142] text-lg font-semibold mb-2">Description</label>
                    <textarea
                      value={widgetDescription}
                      onChange={(e) => setWidgetDescription(e.target.value)}
                      placeholder="example: Here are some of our reviews"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F9EE9] focus:border-transparent transition-all duration-200 text-[#2A3142] h-32"
                    />

                    {/* Header Section */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-[#2A3142] text-lg font-semibold">Header</label>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            className="opacity-0 w-0 h-0"
                            checked={headerEnabled}
                            onChange={() => setHeaderEnabled(!headerEnabled)}
                          />
                          <span
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${
                              headerEnabled ? "bg-[#5F9EE9]" : "bg-gray-300"
                            }`}
                            onClick={() => setHeaderEnabled(!headerEnabled)}
                          >
                            <span
                              className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-300 ${
                                headerEnabled ? "transform translate-x-6" : ""
                              }`}
                            ></span>
                          </span>
                        </div>
                      </div>

                      {headerEnabled && (
                        <div className="pl-2 space-y-3">
                          {/* Rating Checkbox */}
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="rating-checkbox"
                              checked={showRating}
                              onChange={() => setShowRating(!showRating)}
                              className="mr-2 w-5 h-5 text-[#5F9EE9] border-gray-300 rounded focus:ring-[#5F9EE9]"
                            />
                            <label htmlFor="rating-checkbox" className="text-[#2A3142]">
                              Rating
                            </label>
                          </div>

                          {/* Review Count Checkbox */}
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="review-count-checkbox"
                              checked={showReviewCount}
                              onChange={() => setShowReviewCount(!showReviewCount)}
                              className="mr-2 w-5 h-5 text-[#5F9EE9] border-gray-300 rounded focus:ring-[#5F9EE9]"
                            />
                            <label htmlFor="review-count-checkbox" className="text-[#2A3142]">
                              Total Review Count
                            </label>
                          </div>

                          {/* Write Review Button Checkbox */}
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="write-review-checkbox"
                              checked={showWriteReviewButton}
                              onChange={() => setShowWriteReviewButton(!showWriteReviewButton)}
                              className="mr-2 w-5 h-5 text-[#5F9EE9] border-gray-300 rounded focus:ring-[#5F9EE9]"
                            />
                            <label htmlFor="write-review-checkbox" className="text-[#2A3142]">
                              Write a Review Button
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {configTab === "Appearance" && (
                <div className="space-y-6 ">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Theme</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="light-theme"
                          name="theme"
                          checked={theme === "Light"}
                          onChange={() => setTheme("Light")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="light-theme" className="ml-2 block text-gray-700">
                          Light
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="dark-theme"
                          name="theme"
                          checked={theme === "Dark"}
                          onChange={() => setTheme("Dark")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="dark-theme" className="ml-2 block text-gray-700">
                          Dark
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="custom-theme"
                          name="theme"
                          checked={theme === "Custom"}
                          onChange={() => setTheme("Custom")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="custom-theme" className="ml-2 block text-gray-700">
                          Custom
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Font</h3>
                    <div className="relative p-2.5 bg-white rounded-lg shadow-sm">
                      <select
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        {fontOptions.map((fontOption) => (
                          <option key={fontOption} value={fontOption}>
                            {fontOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Color</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Widget Primary Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.widgetPrimary }}
                          onClick={() => setActiveColorPicker("widgetPrimary")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Widget Secondary Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.widgetSecondary }}
                          onClick={() => setActiveColorPicker("widgetSecondary")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Widget Background Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.widgetBackground }}
                          onClick={() => setActiveColorPicker("widgetBackground")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Review Primary Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.reviewPrimary }}
                          onClick={() => setActiveColorPicker("reviewPrimary")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Review Secondary Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.reviewSecondary }}
                          onClick={() => setActiveColorPicker("reviewSecondary")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Review Background Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.reviewBackground }}
                          onClick={() => setActiveColorPicker("reviewBackground")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Star Rating Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.starRating }}
                          onClick={() => setActiveColorPicker("starRating")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Border Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.border }}
                          onClick={() => setActiveColorPicker("border")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">AI Summary Color</span>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                          style={{ backgroundColor: colors.aiSummary }}
                          onClick={() => setActiveColorPicker("aiSummary")}
                        />
                      </div>
                    </div>

                    {activeColorPicker && (
                      <div className="absolute top-0 right-0 bg-white rounded-lg shadow-lg p-4 w-72 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-700">
                            {activeColorPicker.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </span>
                          <div className="w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: currentColor }} />
                        </div>

                        {/* Color panel - actual color selection */}
                        <div
                          ref={colorPanelRef}
                          className="w-full h-56 rounded cursor-pointer relative mb-3"
                          style={{
                            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${getHueColor()})`,
                          }}
                          onClick={(e) => handleColorPanelMove(e)}
                        >
                          <div
                            className="absolute w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 shadow-sm cursor-move"
                            style={{
                              left: `${saturation}%`,
                              top: `${100 - value}%`,
                            }}
                            onMouseDown={(e) => startDrag("colorPanel", e)}
                          />
                        </div>

                        {/* Hue slider */}
                        <div className="relative w-full h-6 mb-3">
                          <div
                            ref={hueSliderRef}
                            className="w-full h-full rounded cursor-pointer"
                            style={{
                              background:
                                "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                            }}
                            onClick={(e) => handleHueSliderMove(e)}
                          >
                            <div
                              className="absolute w-4 h-4 bg-white rounded-full border border-gray-200 transform -translate-x-1/2 top-0 shadow-sm cursor-move"
                              style={{ left: `${(hue / 360) * 100}%` }}
                              onMouseDown={(e) => startDrag("hue", e)}
                            />
                          </div>
                        </div>

                        {/* Alpha slider */}
                        <div className="relative w-full h-6 mb-4">
                          <div
                            ref={alphaSliderRef}
                            className="w-full h-full rounded cursor-pointer"
                            style={{
                              background:
                                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC") repeat',
                              backgroundSize: "10px 10px",
                              position: "relative",
                            }}
                            onClick={(e) => handleAlphaSliderMove(e)}
                          >
                            <div
                              className="absolute top-0 left-0 w-full h-full rounded"
                              style={{
                                background: `linear-gradient(to right, transparent, ${getHueColor()})`,
                              }}
                            />
                            <div
                              className="absolute w-4 h-4 bg-white rounded-full border border-gray-200 transform -translate-x-1/2 top-0 shadow-sm cursor-move"
                              style={{ left: `${alpha}%` }}
                              onMouseDown={(e) => startDrag("alpha", e)}
                            />
                          </div>
                        </div>

                        {/* Hex input */}
                        <div className="flex items-center mb-4">
                          <span className="text-gray-700 text-sm font-medium mr-2">HEXA</span>
                          <input
                            type="text"
                            className="flex-1 border border-gray-200 rounded-md px-2 py-1 text-sm"
                            value={hexInput.toUpperCase()}
                            onChange={handleHexInputChange}
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={applyColor}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {configTab === "Settings" && (
                <div className="space-y-6">
                  {/* AI Summary Toggle */}
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-purple-600 mr-2">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                              fill="currentColor"
                              stroke="currentColor"
                            />
                          </svg>
                        </div>
                        <span className="font-semibold text-purple-600">AI Summary</span>
                        <span className="ml-4 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">New</span>
                      </div>
                      <div className="relative inline-block w-14 h-7">
                        <input
                          type="checkbox"
                          id="aiSummaryToggle"
                          className="opacity-0 w-0 h-0"
                          checked={aiSummaryEnabled}
                          onChange={() => setAiSummaryEnabled(!aiSummaryEnabled)}
                        />
                        <label
                          htmlFor="aiSummaryToggle"
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${aiSummaryEnabled ? "bg-blue-600" : "bg-gray-300"}`}
                        >
                          <span
                            className={`absolute h-5 w-5 left-1 bottom-1 bg-white rounded-full transition-transform duration-300 ${aiSummaryEnabled ? "transform translate-x-7" : ""}`}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Review Elements */}
                  <div className="p-4 bg-white rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Review Elements</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="displayDateToggle"
                          className="sr-only"
                          checked={displayDate}
                          onChange={() => setDisplayDate(!displayDate)}
                        />
                        <label
                          htmlFor="displayDateToggle"
                          className={`w-6 h-6 border rounded flex items-center justify-center mr-2 cursor-pointer ${displayDate ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"}`}
                        >
                          {displayDate && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </label>
                        <label htmlFor="displayDateToggle" className="text-gray-700 text-lg cursor-pointer">
                          Display Date
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="displayReviewerToggle"
                          className="sr-only"
                          checked={displayReviewerIcon}
                          onChange={() => setDisplayReviewerIcon(!displayReviewerIcon)}
                        />
                        <label
                          htmlFor="displayReviewerToggle"
                          className={`w-6 h-6 border rounded flex items-center justify-center mr-2 cursor-pointer ${displayReviewerIcon ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"}`}
                        >
                          {displayReviewerIcon && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </label>
                        <label htmlFor="displayReviewerToggle" className="text-gray-700 text-lg cursor-pointer">
                          Display Reviewer Icon
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="excludeNoDescToggle"
                          className="sr-only"
                          checked={excludeNoDescription}
                          onChange={() => setExcludeNoDescription(!excludeNoDescription)}
                        />
                        <label
                          htmlFor="excludeNoDescToggle"
                          className={`w-6 h-6 border rounded flex items-center justify-center mr-2 cursor-pointer ${excludeNoDescription ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"}`}
                        >
                          {excludeNoDescription && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </label>
                        <label htmlFor="excludeNoDescToggle" className="text-gray-700 text-lg cursor-pointer">
                          Exclude reviews containing no description
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Embed Code Section */}
                  <div className="p-4 bg-white rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Embed Code To Website</h3>
                    <button
                      className="flex items-center text-blue-500 mb-4 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      onClick={() => {
                        const code = `<script type='text/javascript' src='https://reputationhub.site/reputation/assets/review-widget.js'></script> <iframe class='lc_reviews_widget' src='https://reputationhub.site/reputation/widgets/review_widget/cXNR...'></iframe>`
                        navigator.clipboard.writeText(code)
                      }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                      Copy Code
                    </button>
                    <div className="border rounded-lg p-4 bg-gray-50 text-sm font-mono overflow-auto max-h-40">
                      <code>
                        &lt;script type='text/javascript'
                        src='https://reputationhub.site/reputation/assets/review-widget.js'&gt;&lt;/script&gt;
                        &lt;iframe class='lc_reviews_widget'
                        src='https://reputationhub.site/reputation/widgets/review_widget/cXNR...'&gt;&lt;/iframe&gt;
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                className="py-2 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button className="py-2 px-6 bg-blue-600 text-white rounded-lg font-medium" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-screen">
            <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex">
                {rightTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveRightTab(tab)}
                    className={`flex-1 py-4 px-2 text-center ${activeRightTab === tab ? "text-gray-800 font-medium" : "text-gray-500"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex flex-col">
                <div className="border border-gray-200 rounded-lg p-8 mb-4 flex items-center justify-center flex-col">
                  <button
                    className="flex flex-col items-center justify-center w-full h-full"
                    onClick={handleCreateNewClick}
                  >
                    <Plus size={24} className="text-gray-800 mb-2" />
                    <span className="text-gray-800 font-medium">Create new</span>
                  </button>
                </div>

                <div
                  className={`border rounded-lg p-4 mb-4 relative ${selectedWidget === "default" ? "border-blue-100 bg-blue-50" : "border-gray-200"}`}
                  onClick={() => handleWidgetSelection("default")}
                >
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    DEFAULT
                  </div>
                  <div className="h-24 flex items-center justify-center">
                    <div className="text-blue-500">
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-gray-600">Untitled</div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <div className="flex justify-center">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
                  onClick={() => setShowCreateModal(true)}
                >
                  Edit Widget
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
