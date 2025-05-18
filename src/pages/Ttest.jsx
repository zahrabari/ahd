"use client"

import React, { useState } from "react"
import { ArrowLeft, Undo, Redo, Facebook } from 'lucide-react'

// Navigation items
const navItems = [
  { name: "Overview", path: "/Ov" },
  { name: "Requests", path: "/re" },
  { name: "Reviews", path: "/rev" },
  { name: "Widgets", path: "/w" },
  { name: "Listings", path: "/listings" },
  { name: "Settings", path: "/s" }
]

// Sidebar items
const sidebarItems = [
  { name: "Reviews AI", path: "/s" },
  { name: "Review Link", path: "/l" },
  { name: "SMS Review Requests", path: "/m" },
  { name: "Email Review Requests", path: "/e" },
  { name: "WhatsApp Review Requests", path: "/h" },
  { name: "Reviews QR", path: "/r" },
  { name: "Spam Reviews", path: "/p" },
  { name: "Integrations", path: "/i" }
]

// Integration Card Component
function IntegrationCard(props) {
  const { name, logoSrc, logoAlt, textColor = "text-gray-800" } = props

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
      <div className="w-16 h-16 flex items-center justify-center mb-4">
        <img src={logoSrc || "/api/placeholder/100/100"} alt={logoAlt} className="w-10 h-10 object-contain" />
      </div>
      <h3 className={`text-lg font-medium mb-6 ${textColor}`}>{name}</h3>
      <button className="w-full py-2 px-4 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100">Integrate</button>
    </div>
  )
}

// Main Component
export default function ReviewsQRPage() {
  const [activeNavItem, setActiveNavItem] = useState("Settings")
  const [activeSidebarItem, setActiveSidebarItem] = useState("Reviews QR")
  const [showQREditor, setShowQREditor] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("#F2F4F7F")
  const [textColor, setTextColor] = useState("#000")

  // Handle navigation
  const handleNavigation = (itemName) => {
    setActiveNavItem(itemName)
  }

  // Handle sidebar navigation
  const handleSidebarNavigation = (itemName) => {
    setActiveSidebarItem(itemName)
  }

  // Toggle QR Editor
  const handleCreateQRCode = () => {
    setShowQREditor(true)
  }

  // Go back to dashboard
  const handleBackToDashboard = () => {
    setShowQREditor(false)
  }

  // QR Code Editor Component
  const QRCodeEditor = () => {
    return (
      <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between shadow-sm p-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900" onClick={handleBackToDashboard}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            </div>

            <div className="flex-1 flex justify-center">
              <button className="px-4 py-2 shadow-sm rounded-md text-gray-700">Review QR</button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Undo className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Redo className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Download</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex max-h-screen-lg overflow-hidden" style={{ height: "80vh" }}>
            {/* Left Sidebar - Elements */}
            <div className="w-64 shadow-sm overflow-y-auto">
              <div className="p-4 shadow-sm">
                <h2 className="font-medium text-gray-800">Elements</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="flex flex-col items-center justify-center p-4 shadow-sm rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="text-2xl font-serif mb-2">T</div>
                  <span className="text-sm text-gray-600">Text</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 shadow-sm rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                      <path d="M21 15l-5-5L5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Image</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer bg-gray-50">
                  <div className="mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h4v4H4V4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4h4v4h-4V4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16h4v4H4v-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16h4v4h-4v-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4v4h-4V4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 16h4v4h-4v-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 10h4v4H4v-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 10h4v4h-4v-4z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">QR Code</span>
                </div>
              </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 overflow-y-auto flex justify-center items-start p-4 bg-gray-100">
              <div className="bg-white rounded-md shadow-sm w-full max-w-md p-8 flex flex-col items-center">
                <h1 className="text-2xl font-medium text-gray-800 mb-6">Drop a Review</h1>

                <div className="flex gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                </div>

                <div className="w-48 h-48 mb-6">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M0,0 L30,0 L30,30 L0,30 Z M10,10 L20,10 L20,20 L10,20 Z" fill="black" />
                    <path d="M40,0 L70,0 L70,30 L40,30 Z M50,10 L60,10 L60,20 L50,20 Z" fill="black" />
                    <path d="M80,0 L100,0 L100,30 L80,30 Z" fill="black" />
                    <path d="M0,40 L30,40 L30,70 L0,70 Z" fill="black" />
                    <path d="M40,40 L50,40 L50,50 L40,50 Z" fill="black" />
                    <path d="M70,40 L80,40 L80,50 L70,50 Z" fill="black" />
                    <path d="M90,40 L100,40 L100,50 L90,50 Z" fill="black" />
                    <path d="M40,60 L50,60 L50,70 L40,70 Z" fill="black" />
                    <path d="M60,60 L70,60 L70,70 L60,70 Z" fill="black" />
                    <path d="M80,60 L90,60 L90,70 L80,70 Z" fill="black" />
                    <path d="M0,80 L10,80 L10,90 L0,90 Z" fill="black" />
                    <path d="M20,80 L30,80 L30,100 L20,100 Z" fill="black" />
                    <path d="M40,80 L50,80 L50,90 L40,90 Z" fill="black" />
                    <path d="M60,80 L70,80 L70,100 L60,100 Z" fill="black" />
                    <path d="M80,80 L100,80 L100,90 L80,90 Z" fill="black" />
                    <path d="M80,90 L90,90 L90,100 L80,100 Z" fill="black" />
                  </svg>
                </div>

                <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center text-white">LOGO</div>
              </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="w-64 shadow-sm overflow-y-auto">
              <div className="p-4 shadow-sm">
                <h2 className="font-medium text-gray-800">Properties</h2>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                  <div className="flex items-center">
                    <div className="w-6 h-6 shadow-sm rounded mr-2" style={{ backgroundColor }} />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="shadow-sm rounded px-2 py-1 text-sm w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex items-center">
                    <div className="w-6 h-6 shadow-sm rounded mr-2" style={{ backgroundColor: textColor }} />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="shadow-sm rounded px-2 py-1 text-sm w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard Component
  const Dashboard = () => {
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
                      item.name === activeNavItem
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation(item.name)
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
                    item.name === activeSidebarItem
                      ? "text-blue-500 border-l-4 border-blue-500 pl-4 -ml-4"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSidebarNavigation(item.name)
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 shadow-sm">
            <div className="mx-auto max-w-5xl">
              {/* Header with Create Button */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-700">Reviews QR</h2>
                  <p className="text-gray-500">Create and customize your QR Codes</p>
                </div>
                <button
                  className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={handleCreateQRCode}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create QR Code
                </button>
              </div>

              {/* QR Code Empty State */}
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center justify-center py-12">
                  {/* QR Code Placeholder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-40 w-40 text-blue-500 mb-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="5" height="5" rx="1" />
                    <rect x="16" y="3" width="5" height="5" rx="1" />
                    <rect x="3" y="16" width="5" height="5" rx="1" />
                    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                    <path d="M21 21v.01" />
                    <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                    <path d="M3 12h.01" />
                    <path d="M12 3h.01" />
                    <path d="M12 16v.01" />
                    <path d="M16 12h1" />
                    <path d="M21 12v.01" />
                    <path d="M12 21v-1" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Create your QR Code now</h3>
                  <p className="text-gray-500 text-center mb-8">
                    Time's ticking! Let's craft your first QR code to boost review collection.
                  </p>
                  <button
                    className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={handleCreateQRCode}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New QR Code
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Render Dashboard and conditionally render QR Editor as an overlay
  return (
    <>
      <Dashboard />
      {showQREditor && <QRCodeEditor />}
    </>
  )
}