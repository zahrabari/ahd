"use client"

import { useState } from "react"
import {
  ChevronDown,
  Settings,
  Plus,
  MoreHorizontal,
  ChevronUp,
  Star,
  X,
  Pencil,
  Eye,
  Layers,
  HelpCircle,
  Square,
  Type,
  ImageIcon,
  Layout,
  Share2,
  Code,
  Video,
  Scissors,
  Monitor,
  Smartphone,
  RotateCcw,
  RotateCw,
  ShoppingCart,
  Rss,
  ExternalLink,
  Clock,
} from "lucide-react"

// Element Button Component
const ElementButton = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center shadow-sm rounded-md p-3 hover:bg-blue-50 hover:shadow-md cursor-pointer transition-all duration-200">
      <div className="flex items-center justify-center h-10 mb-1 text-gray-600 group-hover:text-blue-600">{icon}</div>
      <span className="text-xs text-gray-600 text-center font-medium">{label}</span>
    </div>
  )
}

// Modal Component
function Modal({
  setIsTemplateModalOpen,
  templates,
  handleTemplateChange,
  setIsCreateNewModalOpen,
  isCreateNewModalOpen,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Settings className="text-blue-500" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Select Templates</h2>
                <p className="text-gray-600">Select and Assign Templates for Every Recurring Email/Retry.</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsTemplateModalOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 mt-6">
            {templates.map((template, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 bg-gray-50 p-3 rounded-md">
                  <span className="text-gray-700">{template.type}</span>
                </div>
                <div className="col-span-4 relative">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md pr-10 appearance-none"
                    value={template.template}
                    onChange={(e) => handleTemplateChange(index, "template", e.target.value)}
                  >
                    <option>Default Email</option>
                    <option>First Repeat Email</option>
                    <option>Second Repeat Email</option>
                    <option>New Template</option>
                    <option>Follow-up Email</option>
                    <option>Thank You Email</option>
                    <option>Reminder Email</option>
                    <option>Feedback Request</option>
                    <option>No Templates Selected</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Add a subject for this template"
                    value={template.subject}
                    onChange={(e) => handleTemplateChange(index, "subject", e.target.value)}
                    disabled={template.template === "No Templates Selected"}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8 space-x-3">
            <button
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setIsTemplateModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setIsTemplateModalOpen(false)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Template Modal Component
function TemplateModal({
  isTemplateModalOpen,
  setIsTemplateModalOpen,
  templates,
  handleTemplateChange,
  setIsCreateNewModalOpen,
  isCreateNewModalOpen,
  elementItems,
  advancedElements,
  layoutOptions,
}) {
  return (
    <>
      {isTemplateModalOpen && (
        <Modal
          setIsTemplateModalOpen={setIsTemplateModalOpen}
          templates={templates}
          handleTemplateChange={handleTemplateChange}
          setIsCreateNewModalOpen={setIsCreateNewModalOpen}
          isCreateNewModalOpen={isCreateNewModalOpen}
        />
      )}

      {isCreateNewModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-6xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-medium">New Template</h2>
                <Pencil className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 shadow-sm rounded-md flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
                <button className="text-gray-500 p-2" onClick={() => setIsCreateNewModalOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="shadow-sm flex items-center justify-between p-2">
              <div className="flex items-center">
                <button className="p-3 hover:bg-gray-100 rounded-md">
                  <Plus className="h-5 w-5" />
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-md">
                  <Layers className="h-5 w-5" />
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-md">
                  <HelpCircle className="h-5 w-5" />
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-md">
                  <Square className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center bshadow-sm rounded-md">
                <button className="p-3 hover:bg-gray-100">
                  <Scissors className="h-5 w-5" />
                </button>
                <button className="p-3 bg-blue-50 shadow-sm border-blue-500">
                  <Monitor className="h-5 w-5" />
                </button>
                <button className="p-3 hover:bg-gray-100">
                  <Smartphone className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-3 hover:bg-gray-100 rounded-md">
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-md">
                  <RotateCw className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Elements sidebar */}
              <div className="w-64 shadow-sm overflow-y-auto">
                <div className="p-4 shadow-sm">
                  <h3 className="font-medium">Elements</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {elementItems.map((item, index) => (
                      <ElementButton key={index} icon={item.icon} label={item.label} />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-8">
                    {advancedElements.map((item, index) => (
                      <ElementButton key={index} icon={item.icon} label={item.label} />
                    ))}
                  </div>

                  <h3 className="font-medium mb-4">Layouts</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {layoutOptions.map((item, index) => (
                      <ElementButton key={index} icon={item.icon} label={item.label} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview area */}
              <div className="flex-1 overflow-y-auto bg-gray-100">
                <div className="h-full flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl bg-white shadow-sm">
                    {/* Template preview */}
                    <div className="bg-[#2d3748] text-white p-12 text-center">
                      <div className="flex justify-center mb-6">
                        <div className="text-8xl text-gray-400 font-serif">"</div>
                        <div className="text-8xl text-gray-400 font-serif">"</div>
                      </div>
                      <div className="mb-6">
                        <span className="font-serif italic text-3xl mr-2">Your</span>
                        <span className="uppercase tracking-wider">TESTIMONIAL</span>
                      </div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-10 h-10 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Template content */}
                    <div className="p-12 text-center">
                      <h2 className="text-5xl font-bold mb-4">Your Experience</h2>
                      <h2 className="text-5xl font-bold mb-8">Matters to Us</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Main Component
export default function EmailReviewRequests() {
  const [isEmailEnabled, setIsEmailEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("recurring")
  const [isCardExpanded, setIsCardExpanded] = useState(true)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [isCreateNewModalOpen, setIsCreateNewModalOpen] = useState(false)

  const navItems = [
    { name: "Overview", path: "/Overview" },
    { name: "Requests", path: "/Requests" },
    { name: "Reviews", path: "/Reviews" },
    { name: "Widgets", path: "/Widgets" },
    { name: "Listings", path: "/Listings" },
    { name: "Settings", path: "/Settings" },
  ]

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

  // Template data
  const [templates, setTemplates] = useState([
    { type: "live", template: "Default Email", subject: "Would you recommend us?" },
    { type: "Retry1", template: "First Repeat Email", subject: "Would you recommend us?" },
    { type: "Retry2", template: "Second Repeat Email", subject: "Would you recommend us?" },
    { type: "Retry3", template: "Default Email", subject: "Would you recommend us?" },
    { type: "Retry4", template: "Default Email", subject: "Would you recommend us?" },
    { type: "Retry5", template: "No Templates Selected", subject: "" },
  ])

  // Template elements data
  const elementItems = [
    { icon: <Type size={20} />, label: "Text" },
    { icon: <ImageIcon size={20} />, label: "Image" },
    { icon: <Square size={20} />, label: "Button" },
    { icon: <Layout size={20} />, label: "Logo" },
    { icon: <div className="w-full h-0.5 bg-gray-400" />, label: "Divider" },
    { icon: <Share2 size={20} />, label: "Social" },
    { icon: <Layout size={20} />, label: "Footer" },
    { icon: <Code size={20} />, label: "Code" },
    { icon: <Video size={20} />, label: "Video" },
  ]

  // Advanced elements data
  const advancedElements = [
    { icon: <ShoppingCart size={20} />, label: "Shopping Cart" },
    { icon: <Rss size={20} />, label: "RSS Header" },
    { icon: <Rss size={20} />, label: "RSS Items" },
    {
      icon: (
        <div className="flex flex-col gap-1">
          <div className="h-1 w-8 bg-gray-400"></div>
          <div className="h-1 w-8 bg-gray-400"></div>
        </div>
      ),
      label: "FAQ",
    },
    {
      icon: (
        <div className="flex items-center">
          <span className="text-xs mr-1">{"<"}</span>
          <div className="h-3 w-6 border border-gray-400 rounded-sm"></div>
          <span className="text-xs ml-1">{">"}</span>
        </div>
      ),
      label: "Image Slider",
    },
    { icon: <ExternalLink size={20} />, label: "Preview URL" },
    { icon: <Clock size={20} />, label: "Countdown" },
  ]

  // Layout options
  const layoutOptions = [
    {
      icon: (
        <div className="flex items-center gap-1">
          <div className="h-6 w-4 border border-gray-400"></div>
          <div className="flex flex-col gap-1">
            <div className="h-1 w-8 bg-gray-400"></div>
            <div className="h-1 w-8 bg-gray-400"></div>
          </div>
        </div>
      ),
      label: "Text & Image",
    },
    { icon: <div className="h-6 w-12 bg-gray-200 rounded-sm"></div>, label: "1" },
    {
      icon: (
        <div className="flex gap-1">
          <div className="h-6 w-6 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-sm"></div>
        </div>
      ),
      label: "2",
    },
    {
      icon: (
        <div className="flex gap-1">
          <div className="h-6 w-4 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-4 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-4 bg-gray-200 rounded-sm"></div>
        </div>
      ),
      label: "3",
    },
    {
      icon: (
        <div className="flex gap-1">
          <div className="h-6 w-4 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-8 bg-gray-200 rounded-sm"></div>
        </div>
      ),
      label: "1/3 : 2/3",
    },
    {
      icon: (
        <div className="flex gap-1">
          <div className="h-6 w-8 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-4 bg-gray-200 rounded-sm"></div>
        </div>
      ),
      label: "2/3 : 1/3",
    },
    {
      icon: (
        <div className="flex gap-1">
          <div className="h-6 w-3 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-9 bg-gray-200 rounded-sm"></div>
        </div>
      ),
      label: "1/4 : 3/4",
    },
    {
      icon: (
        <div className="flex gap-1">
          <div className="h-6 w-9 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-3 bg-gray-200 rounded-sm"></div>
        </div>
      ),
      label: "3/4 : 1/4",
    },
    {
      icon: (
        <div className="flex gap-1">
          <div className="h-6 w-3 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-3 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-3 bg-gray-200 rounded-sm"></div>
          <div className="h-6 w-3 bg-gray-200 rounded-sm"></div>
        </div>
      ),
      label: "4",
    },
  ]

  const handleTemplateChange = (index, field, value) => {
    const newTemplates = [...templates]
    newTemplates[index][field] = value

    if (field === "template") {
      if (value === "No Templates Selected") {
        newTemplates[index].subject = ""
      } else {
        newTemplates[index].subject = "Would you recommend us?"
      }
    }

    setTemplates(newTemplates)
  }

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
                <a
                  key={item.name}
                  href={item.path}
                  className={`py-4 px-1 ${
                    item.name === "Settings"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation(item.path)
                  }}
                >
                  {item.name}
                </a>
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
              <a
                key={item.name}
                href={item.path}
                className={`block py-2 ${
                  item.name === "Email Review Requests"
                    ? "text-blue-500 border-l-4 border-blue-500 pl-4 -ml-4"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(item.path)
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main panel */}
        <div className="flex-1">
          {/* Header section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-medium">Email Review Requests</h2>
                <p className="text-gray-600 mt-2">Engage your audience with a personalized touch.</p>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <div
                    className={`relative ${isEmailEnabled ? "bg-blue-600" : "bg-gray-300"} w-12 h-6 rounded-full transition-colors duration-200`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isEmailEnabled}
                      onChange={() => setIsEmailEnabled(!isEmailEnabled)}
                    />
                    <span
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${isEmailEnabled ? "translate-x-6" : ""}`}
                    ></span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Settings section */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">When to send Email after check-in?</label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500">
                    <option>Immediately</option>
                    <option>2 Hours</option>
                    <option>4 Hours</option>
                    <option>24 Hours</option>
                    <option>48 Hours</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Until clicked, repeat this every</label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500">
                    <option>Don't Repeat</option>
                    <option>1 Day</option>
                    <option>2 Days</option>
                    <option>1 Week</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Maximum retries</label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>5</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email templates section */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Choose email templates for your email requests</h3>
              <div className="flex space-x-3">
                <button
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsTemplateModalOpen(true)}
                >
                  <Settings size={18} className="mr-2" />
                  <span>Set Email Templates</span>
                </button>
                <button
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setIsCreateNewModalOpen(true)}
                >
                  <Plus size={18} className="mr-2" />
                  <span>Create New</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-6 py-3 ${activeTab === "recurring" ? "bg-blue-50 text-blue-600 border-t border-l border-r border-blue-200 rounded-t-lg" : "text-gray-600"}`}
                  onClick={() => setActiveTab("recurring")}
                >
                  Recurring Emails
                </button>
                <button
                  className={`px-6 py-3 ${activeTab === "draft" ? "bg-blue-50 text-blue-600 border-t border-l border-r border-blue-200 rounded-t-lg" : "text-gray-600"}`}
                  onClick={() => setActiveTab("draft")}
                >
                  Draft Emails
                </button>
              </div>
            </div>

            {/* Template card */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="flex justify-between items-center p-4 bg-white">
                <div className="flex items-center">
                  <div className="w-14 h-10 bg-gray-800 rounded flex items-center justify-center mr-4">
                    <div className="text-yellow-400 flex">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" stroke="none" />
                        ))}
                    </div>
                  </div>
                  <div className="font-medium">New Template</div>
                  <div className="ml-4 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Live</div>
                </div>
                <div className="flex items-center">
                  <button className="text-gray-500 p-1">
                    <MoreHorizontal size={20} />
                  </button>
                  <button className="text-gray-500 p-1 ml-2" onClick={() => setIsCardExpanded(!isCardExpanded)}>
                    {isCardExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
              {isCardExpanded && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    <p className="mb-2">
                      <strong>Subject:</strong> Would you recommend us?
                    </p>
                    <p className="text-gray-500">Email content preview would appear here...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TemplateModal
        isTemplateModalOpen={isTemplateModalOpen}
        setIsTemplateModalOpen={setIsTemplateModalOpen}
        templates={templates}
        handleTemplateChange={handleTemplateChange}
        setIsCreateNewModalOpen={setIsCreateNewModalOpen}
        isCreateNewModalOpen={isCreateNewModalOpen}
        elementItems={elementItems}
        advancedElements={advancedElements}
        layoutOptions={layoutOptions}
      />
    </div>
  )
}
