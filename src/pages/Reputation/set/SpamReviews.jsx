import { useState } from 'react';
import { Link } from 'react-router-dom';

function IntegrationCard(props) {
  const { name, logoSrc, logoAlt, textColor = "text-gray-800" } = props;

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
      <div className="w-16 h-16 flex items-center justify-center mb-4">
        <img src={logoSrc || "/api/placeholder/100/100"} alt={logoAlt} className="w-10 h-10 object-contain" />
      </div>
      <h3 className={`text-lg font-medium mb-6 ${textColor}`}>{name}</h3>
      <button className="w-full py-2 px-4 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100">Integrate</button>
    </div>
  );
}

export default function SpamReviewsPage() {
  const [activeNavItem, setActiveNavItem] = useState("Settings");
  const [activeSidebarItem, setActiveSidebarItem] = useState("Spam Reviews");
  const [spamDetection, setSpamDetection] = useState("off");
  
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
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.href = path;
  };

  const handleSpamDetectionChange = (value) => {
    setSpamDetection(value);
  };

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
                    e.preventDefault();
                    setActiveNavItem(item.name);
                    handleNavigation(item.path);
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
                  e.preventDefault();
                  setActiveSidebarItem(item.name);
                  handleNavigation(item.path);
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Right content area */}
        <div className="flex-1 py-6 px-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Spam Reviews</h2>

          {/* Settings toggle box */}
          <div>
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <div className="flex max-h-40 overflow-y-auto pr-2 mb-2">
                {/* Off option */}
                <div 
                  className="flex-1 p-6 flex items-center border-r border-gray-200 cursor-pointer"
                  onClick={() => handleSpamDetectionChange("off")}
                >
                  <div className="mr-4">
                    <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12.707 11.293a1 1 0 010 1.414" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 16L3 22M3 16L9 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Off</div>
                    <div className="text-gray-600">Turn Off Reviews Spam Detection</div>
                  </div>
                  <div>
                    <div className={`w-6 h-6 rounded-full border-2 ${spamDetection === "off" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center bg-white`}>
                      <div className={`w-3 h-3 rounded-full ${spamDetection === "off" ? "bg-blue-500" : ""}`}></div>
                    </div>
                  </div>
                </div>

                {/* On option */}
                <div 
                  className="flex-1 p-6 flex items-center cursor-pointer"
                  onClick={() => handleSpamDetectionChange("on")}
                >
                  <div className="mr-4">
                    <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 10l7 7 7-7M5 4l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">On</div>
                    <div className="text-gray-600">Automatically Detects whether incoming review is spam or not</div>
                  </div>
                  <div>
                    <div className={`w-6 h-6 rounded-full border-2 ${spamDetection === "on" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center bg-white`}>
                      <div className={`w-3 h-3 rounded-full ${spamDetection === "on" ? "bg-blue-500" : ""}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spam Detection Info */}
            <div className="bg-gray-50 p-6 rounded-md mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Spam Detection of Reviews</h3>
              <p className="text-gray-600 mb-4">Enabling Spam Detection of Reviews will have the following impacts in the system.</p>
              <div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    All new incoming reviews will be automatically detected if they are spam or not.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Users will have control to override the decision taken by the system.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Automatic Reviews Reply will not be sent for spam detected reviews.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Scheduled Review Replies can be stopped by manually marking reviews as spam.
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    Spam detected reviews will not show up in Review Widget.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}