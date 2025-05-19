import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Undo, Redo, Copy, Trash2 } from "lucide-react";

// Navigation items
const navItems = [
  { name: "Overview", path: "/Overview" },
  { name: "Requests", path: "/Requests" },
  { name: "Reviews", path: "/Reviews" },
  { name: "Widgets", path: "/Widgets" },
  { name: "Listings", path: "/Listings" },
  { name: "Settings", path: "/Settings" },
];

// Sidebar items
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

// Editable Text Component
const EditableText = ({ value, onChange, textColor, className = "", fontSize = "text-xl" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value || "");
  const inputRef = useRef(null);

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 10);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={`relative cursor-pointer group ${className}`} onClick={handleClick}>
      {isEditing ? (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 left-1/4 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 right-1/4 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-px left-0 w-full h-0.5 bg-blue-400"></div>
          <div className="absolute -bottom-px left-0 w-full h-0.5 bg-blue-400"></div>

          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full ${fontSize} font-medium text-center focus:outline-none focus:ring-2 focus:ring-blue-400 p-2`}
            style={{ color: textColor }}
          />
        </>
      ) : (
        <div className="relative">
          <div className="invisible group-hover:visible">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -top-1 left-1/4 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -top-1 right-1/4 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -top-px left-0 w-full h-0.5 bg-blue-400"></div>
            <div className="absolute -bottom-px left-0 w-full h-0.5 bg-blue-400"></div>
          </div>

          <h1 className={`${fontSize} font-medium text-center px-2 py-1`} style={{ color: textColor }}>
            {text}
          </h1>
        </div>
      )}
    </div>
  );
};

// Social Media Icon Component
const SocialMediaIcon = ({ platform, selected, onClick }) => {
  const getIcon = () => {
    switch (platform) {
      case "facebook":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "google":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
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
        );
      default:
        return null;
    }
  };

  const bgColor = platform === "google" ? "bg-white" : platform === "facebook" ? "bg-blue-500" : "bg-gray-500";

  return (
    <div
      className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center relative cursor-pointer shadow-sm ${
        platform === "google" ? "border border-gray-100" : ""
      }`}
      onClick={onClick}
    >
      {selected && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 right-1/2 translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -bottom-1 right-1/2 translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>

          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-md flex items-center p-1">
            <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Copy">
              <Copy size={16} />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
      {getIcon()}
    </div>
  );
};

// QR Code Editor Component
function QRCodeEditor({ onClose }) {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#000");
  const [reviewText, setReviewText] = useState("Drop a Review");
  const [companyName, setCompanyName] = useState("AH digital");
  const [logoText, setLogoText] = useState("LOGO");
  const [imageUrl, setImageUrl] = useState("https://storage.googleapis.com/...");
  const [opacity, setOpacity] = useState(100);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleReviewTextChange = (newText) => {
    setReviewText(newText);
  };

  const handleCompanyNameChange = (newText) => {
    setCompanyName(newText);
  };

  const handleLogoTextChange = (newText) => {
    setLogoText(newText);
  };

  const handleElementClick = (element, e) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleBackgroundClick = () => {
    setSelectedElement(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden">
        <div className="flex items-center justify-between shadow-sm p-4 border-b">
          <div className="flex items-center gap-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900" onClick={onClose}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-medium">Review QR</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Undo className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Redo className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 shadow-sm border border-gray-200 rounded-md">
              Download
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
          </div>
        </div>

        <div className="flex h-screen max-h-[80vh] overflow-hidden">
          <div className="w-64 border-r overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-800">Elements</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                <div className="text-2xl font-serif mb-2">T</div>
                <span className="text-sm text-gray-600">Text</span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
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
                    <path
                      d="M21 15l-5-5L5 21"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Image</span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                <div className="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h7v7H3z" />
                    <path d="M14 3h7v7h-7z" />
                    <path d="M3 14h7v7H3z" />
                    <path d="M14 14h3v3h-3z" />
                    <path d="M20 14h1v1h-1z" />
                    <path d="M20 17h1v4h-1z" />
                    <path d="M17 20h3v1h-3z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">QR Code</span>
              </div>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto flex justify-center items-start p-8 bg-gray-50"
            onClick={handleBackgroundClick}
          >
            <div
              className="bg-white rounded-lg w-full max-w-md p-8 flex flex-col items-center relative"
              style={{ backgroundColor }}
            >
              <EditableText
                value={reviewText}
                onChange={handleReviewTextChange}
                textColor={textColor}
                className="w-full mb-6"
                fontSize="text-2xl"
              />

              <div className="flex gap-4 mb-6">
                <SocialMediaIcon
                  platform="facebook"
                  selected={selectedElement === "facebook"}
                  onClick={(e) => handleElementClick("facebook", e)}
                />
                <SocialMediaIcon
                  platform="google"
                  selected={selectedElement === "google"}
                  onClick={(e) => handleElementClick("google", e)}
                />
              </div>

              <div className="w-48 h-48 mb-6 relative cursor-pointer" onClick={(e) => handleElementClick("qrcode", e)}>
                {selectedElement === "qrcode" && (
                  <>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>

                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-md flex items-center p-1">
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Copy">
                        <Copy size={16} />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}

                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: textColor }}>
                  <rect x="0" y="0" width="30" height="30" fill="black" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" fill="black" />
                  <rect x="40" y="0" width="30" height="30" fill="black" />
                  <rect x="45" y="5" width="20" height="20" fill="white" />
                  <rect x="50" y="10" width="10" height="10" fill="black" />
                  <rect x="80" y="0" width="20" height="30" fill="black" />
                  <rect x="0" y="40" width="30" height="30" fill="black" />
                  <rect x="5" y="45" width="20" height="20" fill="white" />
                  <rect x="10" y="50" width="10" height="10" fill="black" />
                  <rect x="40" y="40" width="10" height="10" fill="black" />
                  <rect x="70" y="40" width="10" height="10" fill="black" />
                  <rect x="90" y="40" width="10" height="10" fill="black" />
                  <rect x="40" y="60" width="10" height="10" fill="black" />
                  <rect x="60" y="60" width="10" height="10" fill="black" />
                  <rect x="80" y="60" width="10" height="10" fill="black" />
                  <rect x="0" y="80" width="10" height="10" fill="black" />
                  <rect x="20" y="80" width="10" height="20" fill="black" />
                  <rect x="40" y="80" width="10" height="10" fill="black" />
                  <rect x="60" y="80" width="10" height="20" fill="black" />
                  <rect x="80" y="80" width="20" height="10" fill="black" />
                  <rect x="80" y="90" width="10" height="10" fill="black" />
                </svg>
              </div>

              <div
                className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4 relative cursor-pointer"
                onClick={(e) => handleElementClick("logo", e)}
              >
                {selectedElement === "logo" && (
                  <>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -top-1 left-1/4 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -top-1 right-1/4 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>

                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-md flex items-center p-1">
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Copy">
                        <Copy size={16} />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
                <span className="text-lg font-medium">{logoText}</span>
              </div>

              <div className="text-center mb-2">
                <EditableText
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  textColor={textColor}
                  className="w-full"
                  fontSize="text-lg"
                />
              </div>
            </div>
          </div>

          <div className="w-64 border-l overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-800">Properties</h2>
            </div>

            <div className="p-4 space-y-6">
              {selectedElement === "logo" ? (
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                      <span className="text-xs">{logoText}</span>
                    </div>
                    <span className="text-sm font-medium truncate">{imageUrl}</span>
                    <button className="ml-auto text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="text"
                      placeholder="Insert image URL"
                      className="shadow-sm border border-gray-300 rounded px-2 py-1 text-sm w-full"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opacity</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 shadow-sm border border-gray-300 rounded mr-2"
                        style={{ backgroundColor }}
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 shadow-sm border border-gray-300 rounded mr-2"
                        style={{ backgroundColor: textColor }}
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        placeholder="#000"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
function ReviewsQRDashboard() {
  const [activeNavItem, setActiveNavItem] = useState("Settings");
  const [activeSidebarItem, setActiveSidebarItem] = useState("Reviews QR");
  const [showQREditor, setShowQREditor] = useState(false);

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    if (path === "/create-qr") {
      setShowQREditor(true);
    }
  };

  const handleCloseEditor = () => {
    setShowQREditor(false);
  };

  return (
    <div className="min-h-screen bg-white">
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

        <main className="flex-1 p-6 shadow-sm">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">Reviews QR</h2>
                <p className="text-gray-500">Create and customize your QR Codes</p>
              </div>
              <button
                className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => setShowQREditor(true)}
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

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center justify-center py-12">
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
                  onClick={() => setShowQREditor(true)}
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

      {showQREditor && <QRCodeEditor onClose={handleCloseEditor} />}
    </div>
  );
}

// App Component
const App = () => <ReviewsQRDashboard />;

export default App;