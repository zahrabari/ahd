import { useState } from 'react';
import { HelpCircle, Plus, X } from "lucide-react";

// Navigation configuration
const navItems = [
  { name: "Overview", path: "/Ov" },
  { name: "Requests", path: "/re" },
  { name: "Reviews", path: "/rev" },
  { name: "Widgets", path: "/w" },
  { name: "Listings", path: "/listings" },
  { name: "Settings", path: "/s" }
];

const sidebarItems = [
  { name: "Reviews AI", path: "/s" },
  { name: "Review Link", path: "/l" },
  { name: "SMS Review Requests", path: "/m" },
  { name: "Email Review Requests", path: "/e" },
  { name: "WhatsApp Review Requests", path: "/h" },
  { name: "Reviews QR", path: "/r" },
  { name: "Spam Reviews", path: "/p" },
  { name: "Integrations", path: "/i" }
];

// List of platforms with their logo URLs
const platforms = [
  { name: "Airbnb", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/airbnb-icon.svg", logoAlt: "Airbnb logo", textColor: "text-gray-800" },
  { name: "Aliexpress", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/aliexpress-icon.svg", logoAlt: "Aliexpress logo", textColor: "text-gray-800" },
  { name: "Angies List", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/angieslist-icon.svg", logoAlt: "Angies List logo", textColor: "text-red-500" },
  { name: "Amazon", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/amazon-icon.svg", logoAlt: "Amazon logo", textColor: "text-gray-800" },
  { name: "Agoda", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/agoda-icon.svg", logoAlt: "Agoda logo", textColor: "text-gray-800" },
  { name: "Apple App Store", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/appstore-icon.svg", logoAlt: "Apple App Store logo", textColor: "text-gray-800" },
  { name: "Avvo", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/avvo-icon.svg", logoAlt: "Avvo logo", textColor: "text-gray-800" },
  { name: "Booking.com", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/bookingcom-icon.svg", logoAlt: "Booking.com logo", textColor: "text-gray-800" },
  { name: "Capterra", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/capterra-icon.svg", logoAlt: "Capterra logo", textColor: "text-gray-800" },
  { name: "Car Gurus", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/cargurus-icon.svg", logoAlt: "Car Gurus logo", textColor: "text-gray-800" },
  { name: "Cars.com", logoSrc: "https://storage.googleapis.com/revex-reputation-production/assets/carscom-icon.svg", logoAlt: "Cars.com logo", textColor: "text-gray-800" }
];

function IntegrationCard({ name, logoSrc, logoAlt, textColor, onIntegrate }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
      <div className="w-16 h-16 flex items-center justify-center mb-4">
        <img src={logoSrc || "/api/placeholder/100/100"} alt={logoAlt} className="w-10 h-10 object-contain" />
      </div>
      <h3 className={`text-lg font-medium mb-6 ${textColor}`}>{name}</h3>
      <button
        onClick={onIntegrate}
        className="w-full py-2 px-4 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100"
      >
        Integrate
      </button>
    </div>
  );
}

export default function ReputationSettings() {
  const [activeNavItem, setActiveNavItem] = useState("Settings");
  const [activeSidebarItem, setActiveSidebarItem] = useState("Integrations");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false); // State for custom link modal
  const [isIntegrateModalOpen, setIsIntegrateModalOpen] = useState(false); // State for integrate modal
  const [customLink, setCustomLink] = useState(""); // State for custom link input
  const [integrateLink, setIntegrateLink] = useState(""); // State for integrate link input
  const [selectedPlatform, setSelectedPlatform] = useState(null); // State for selected platform

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.href = path;
  };

  // Custom Link Modal Handlers
  const openCustomModal = () => setIsCustomModalOpen(true);
  const closeCustomModal = () => {
    setIsCustomModalOpen(false);
    setCustomLink("");
  };
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted custom link:", customLink);
    closeCustomModal();
  };

  // Integrate Modal Handlers
  const openIntegrateModal = (platform) => {
    setSelectedPlatform(platform);
    setIsIntegrateModalOpen(true);
  };
  const closeIntegrateModal = () => {
    setIsIntegrateModalOpen(false);
    setIntegrateLink("");
    setSelectedPlatform(null);
  };
  const handleIntegrateSubmit = (e) => {
    e.preventDefault();
    console.log(`Integrating ${selectedPlatform?.name} with link:`, integrateLink);
    closeIntegrateModal();
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

        {/* Main Content */}
        <main className="flex-1 pt-8 pb-16">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-6">Integrations</h2>
            <p className="text-gray-600 mb-8">Add review platforms by entering the page link to import reviews.</p>
            <div className="border-t border-gray-200 pt-8">
              {/* Integration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Custom Links */}
                <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Custom Links</h3>
                  <div className="flex items-center justify-center mb-6">
                    <HelpCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <button
                    onClick={openCustomModal}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Add Platform
                  </button>
                </div>

                {/* Platform Cards */}
                {platforms.map((platform) => (
                  <IntegrationCard
                    key={platform.name}
                    name={platform.name}
                    logoSrc={platform.logoSrc}
                    logoAlt={platform.logoAlt}
                    textColor={platform.textColor}
                    onIntegrate={() => openIntegrateModal(platform)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for Custom Link Submission */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeCustomModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Submit Custom Link</h3>
            <p className="text-gray-600 text-center mb-6">
              Can't find the platform you need? Just share the page link, and we'll work on integrating it soon!
            </p>
            <form onSubmit={handleCustomSubmit}>
              <label htmlFor="customLink" className="block text-sm font-medium text-gray-700 mb-2">
                Link
              </label>
              <input
                type="url"
                id="customLink"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
                placeholder="Enter URL"
                className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeCustomModal}
                  className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Platform Integration */}
      {isIntegrateModalOpen && selectedPlatform && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeIntegrateModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src={selectedPlatform.logoSrc}
                  alt={selectedPlatform.logoAlt}
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Integrate {selectedPlatform.name}</h3>
            <p className="text-gray-600 text-center mb-6">
              Please enter the link to your page.
            </p>
            <form onSubmit={handleIntegrateSubmit}>
              <label htmlFor="integrateLink" className="block text-sm font-medium text-gray-700 mb-2">
                Link
              </label>
              <input
                type="url"
                id="integrateLink"
                value={integrateLink}
                onChange={(e) => setIntegrateLink(e.target.value)}
                placeholder="Enter URL"
                className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeIntegrateModal}
                  className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Integrate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}