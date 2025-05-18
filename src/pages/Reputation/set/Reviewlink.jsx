import { useState } from 'react';
import { Hash, Link as LinkIcon, ChevronUp, ChevronDown, Facebook, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  { name: "Reviews QR", path: "r" },
  { name: "Spam Reviews", path: "/p" },
  { name: "Integrations", path: "/i" }
];

export default function ReputationManagement() {
  const [reviewBalancingEnabled, setReviewBalancingEnabled] = useState(true);
  const [selectedLink, setSelectedLink] = useState('custom');
  const [isLinkSetupExpanded, setIsLinkSetupExpanded] = useState(true);
  const [isGoogleSelected, setIsGoogleSelected] = useState(false);
  const [isFacebookSelected, setIsFacebookSelected] = useState(false);
  const [customLink, setCustomLink] = useState('www.custom-link.business.com/review');
  const [isOpen, setIsOpen] = useState(false);
  const [googlePercentage, setGooglePercentage] = useState("");
  const [facebookPercentage, setFacebookPercentage] = useState("");
  const [autoBalance, setAutoBalance] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("Settings");
  const [activeSidebarItem, setActiveSidebarItem] = useState("Review Link");

  const handleGoogleChange = (e) => {
    setGooglePercentage(e.target.value);
  };

  const handleFacebookChange = (e) => {
    setFacebookPercentage(e.target.value);
  };

  const handleAutoBalanceClick = () => {
    setAutoBalance(true);
    setGooglePercentage("50");
    setFacebookPercentage("50");
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.href = path;
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

        {/* Main panel */}
        <div className="flex-1 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium">Review Link</h2>
            {reviewBalancingEnabled && (
              <div className="flex items-center mt-1">
                <span className="text-green-600 flex items-center">
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Auto Balance Enabled
                </span>
              </div>
            )}
            <p className="text-gray-500 mt-1">Configure your Review Link to collect feedback from customers</p>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <div className="relative w-12 h-6 rounded-full transition-colors" 
                    style={{ backgroundColor: reviewBalancingEnabled ? '#2563eb' : '#d1d5db' }}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={reviewBalancingEnabled}
                      onChange={() => setReviewBalancingEnabled(!reviewBalancingEnabled)}
                    />
                    <span 
                      className="absolute bg-white w-4 h-4 rounded-full transition-transform transform"
                      style={{ 
                        top: '0.25rem', 
                        left: '0.25rem',
                        transform: reviewBalancingEnabled ? 'translateX(1.5rem)' : 'translateX(0)'
                      }}
                    ></span>
                  </div>
                  <div className="ml-4 rounded-lg">
                    <div className="font-medium rounded-lg">Review Balancing</div>
                    <div className="text-sm text-gray-500">Automatically balance reviews for multiple socials</div>
                  </div>
                </label>
              </div>
              
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  reviewBalancingEnabled 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => reviewBalancingEnabled && setIsOpen(true)}
                disabled={!reviewBalancingEnabled}
              >
                Configure Balance
              </button>

              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[500px] max-w-full">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="mr-3 text-gray-600">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">Review Balancing</h3>
                          <p className="text-gray-600">Configure your Review Link to collect feedback from customers</p>
                        </div>
                      </div>
                      <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-600">Sets Percentage equally to all or you can update manually</p>
                        <button 
                          className={`px-4 py-1 rounded-md ${autoBalance ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`}
                          onClick={handleAutoBalanceClick}
                        >
                          Auto Balance
                        </button>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="mr-2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Get Reviews on Google</p>
                              <p className="text-gray-500 text-sm">Not connected</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={googlePercentage}
                              onChange={handleGoogleChange}
                              className="w-12 text-center border rounded p-1 mr-1"
                            />
                            <span className="mr-3">%</span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="mr-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <svg width="12" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Get Reviews on Facebook</p>
                              <p className="text-gray-500 text-sm">Not connected</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={facebookPercentage}
                              onChange={handleFacebookChange}
                              className="w-12 text-center border rounded p-1 mr-1"
                            />
                            <span className="mr-3">%</span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <button 
                        className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100" 
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Review Platforms Section */}
          <div className="flex border-b border-gray-200">
            <div className="w-1/2 p-6 space-y-4">
              {/* Google Option */}
              <div
                className={`border rounded-lg flex items-center p-4 cursor-pointer ${
                  isGoogleSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => {
                  setIsGoogleSelected(true);
                  setIsFacebookSelected(false);
                  setSelectedLink('');
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H12V14.0415H17.6055C17.2327 16.0415 15.5522 17.5212 12 17.5212C8.82727 17.5212 6.24545 14.9394 6.24545 11.7667C6.24545 8.59394 8.82727 6.01212 12 6.01212C13.4873 6.01212 14.7782 6.54303 15.7782 7.39394L18.7891 4.38303C17.0291 2.76667 14.6509 1.77576 12 1.77576C6.44727 1.77576 2 6.22303 2 11.7758C2 17.3285 6.44727 21.7758 12 21.7758C17.9564 21.7758 22 17.7321 22 11.7758C22 11.203 21.9345 10.6121 21.8055 10.0415Z" fill="#4285F4"/>
                    <path d="M3.15283 7.24835L6.57374 9.74653C7.48465 7.56744 9.57374 6.01208 12.0001 6.01208C13.4873 6.01208 14.7783 6.54299 15.7783 7.3939L18.7892 4.38299C17.0292 2.76663 14.651 1.77572 12.0001 1.77572C8.15829 1.77572 4.82738 4.01205 3.15283 7.24835Z" fill="#EA4335"/>
                    <path d="M12.0002 21.7759C14.5893 21.7759 16.9199 20.8244 18.6675 19.2699L15.3675 16.4971C14.4094 17.1753 13.2184 17.5214 12.0002 17.5214C8.45893 17.5214 5.77866 15.0517 5.39684 11.8911L1.95593 14.5729C3.61139 18.9032 7.50593 21.7759 12.0002 21.7759Z" fill="#34A853"/>
                    <path d="M21.8055 10.0415H12V14.0415H17.6055C16.9346 15.9659 15.684 17.1569 14.0237 17.8605L14.028 17.8569L17.328 20.6297C17.1382 20.8023 22 17.3333 22 11.7757C22 11.203 21.9346 10.6121 21.8055 10.0415Z" fill="#FBBC05"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-700">Get Reviews on Google</div>
                  <div className="text-sm text-gray-500">Not connected</div>
                </div>
                <div className="ml-auto">
                  <div className={`w-4 h-4 rounded-full border ${
                    isGoogleSelected ? 'border-blue-500' : 'border-gray-300'
                  }`}>
                    {isGoogleSelected && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full m-1"></div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Facebook Option */}
              <div
                className={`border rounded-lg flex items-center p-4 cursor-pointer ${
                  isFacebookSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => {
                  setIsFacebookSelected(true);
                  setIsGoogleSelected(false);
                  setSelectedLink('');
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#1877F2"/>
                    <path d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80078 14.3391 7.875 15.8297 7.875H17.3438V4.92188C17.3438 4.92188 15.9703 4.6875 14.6578 4.6875C11.9203 4.6875 10.125 6.34922 10.125 9.35625V12H7.07812V15.4688H10.125V23.8547C10.7367 23.9508 11.3625 24 12 24C12.6375 24 13.2633 23.9508 13.875 23.8547V15.4688H16.6711Z" fill="white"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-700">Get Reviews on Facebook</div>
                  <div className="text-sm text-gray-500">Not connected</div>
                </div>
                <div className="ml-auto">
                  <div className={`w-4 h-4 rounded-full border ${
                    isFacebookSelected ? 'border-blue-500' : 'border-gray-300'
                  }`}>
                    {isFacebookSelected && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full m-1"></div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Custom Link Option */}
              <div
                className={`border rounded-lg flex items-center p-4 cursor-pointer ${
                  selectedLink === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => {
                  setSelectedLink('custom');
                  setIsGoogleSelected(false);
                  setIsFacebookSelected(false);
                }}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                  <Hash size={20} />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-700">Custom Link</div>
                  <div className="text-sm text-gray-500">No Link Found</div>
                </div>
                <div className="ml-auto">
                  <div className={`w-4 h-4 rounded-full border ${
                    selectedLink === 'custom' ? 'border-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedLink === 'custom' && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full m-1"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 p-6 relative">
              {isFacebookSelected && (
                <div className="rounded-lg border border-gray-100 shadow-sm">
                  <div className="p-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#1877F2"/>
                            <path d="M22.2281 20.625L22.9375 16H18.5V13C18.5 11.7344 18.9188 10.5 20.8562 10.5H23.125V6.5625C23.125 6.5625 21.2938 6.25 19.5438 6.25C15.8938 6.25 13.5 8.46562 13.5 12.475V16H9.4375V20.625H13.5V31.8062C14.3156 31.9344 15.15 32 16 32C16.85 32 17.6844 31.9344 18.5 31.8062V20.625H22.2281Z" fill="white"/>
                          </svg>
                        </div>
                        <div className="ml-3 font-medium">Facebook</div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ChevronUp size={20} />
                      </button>
                    </div>

                    <div className="pt-4">
                      <p className="text-gray-700 mb-4">
                        Your review will be posted in Facebook, which is the best way to share your experience with your customer. We are dedicated to providing you with a great service and will take care of posting the reviews on our social media accounts.
                      </p>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Select Page</label>
                        <div className="relative">
                          <select className="block w-full border border-gray-300 rounded-lg p-3 appearance-none">
                            <option>Choose a Facebook page</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <ChevronDown size={16} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                        <LinkIcon size={20} className="text-gray-500 mr-2" />
                        <span className="text-gray-600">business.facebook.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedLink === 'custom' && (
                <div className="rounded-lg border border-gray-100 shadow-sm">
                  <div className="p-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                          <Hash size={24} />
                        </div>
                        <div className="ml-3 font-medium">Custom Link</div>
                      </div>
                      <button
                        onClick={() => setIsLinkSetupExpanded(!isLinkSetupExpanded)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {isLinkSetupExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    <div className={`pt-4 ${isLinkSetupExpanded ? 'block' : 'hidden'}`}>
                      <h3 className="text-lg font-medium text-gray-700 mb-4">Setup your custom link</h3>

                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                        <LinkIcon size={20} className="text-gray-500 mr-2" />
                        <input 
                          type="text" 
                          className="bg-transparent flex-1 outline-none text-gray-600"
                          value={customLink}
                          onChange={(e) => setCustomLink(e.target.value)}
                        />
                      </div>

                      <div className="py-4">
                        <p className="text-gray-600 mb-4">
                          Your customers will provide reviews through the given link
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {isGoogleSelected && (
                <div className="rounded-lg border border-gray-100 shadow-sm">
                  <div className="p-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.074 13.3887H16V18.7219H23.474C22.9769 21.3887 20.7363 23.3619 16 23.3619C11.7697 23.3619 8.32727 19.9194 8.32727 15.6889C8.32727 11.4584 11.7697 8.01605 16 8.01605C17.9831 8.01605 19.7043 8.7242 20.9043 9.85855L25.052 5.81069C22.7055 3.6887 19.5345 2.36771 16 2.36771C8.5963 2.36771 2.66667 8.29733 2.66667 15.701C2.66667 23.1046 8.5963 29.0343 16 29.0343C23.9418 29.0343 29.3333 23.6429 29.3333 15.701C29.3333 14.9379 29.246 14.1496 29.074 13.3887Z" fill="#4285F4"/>
                            <path d="M4.20384 9.66446L8.76504 12.9954C9.97952 10.0902 12.7651 8.01611 16.0001 8.01611C17.9832 8.01611 19.7044 8.72425 20.9044 9.85861L25.0521 5.81075C22.7056 3.68877 19.5346 2.36777 16.0001 2.36777C10.8779 2.36777 6.4365 5.34939 4.20384 9.66446Z" fill="#EA4335"/>
                            <path d="M16.0002 29.0344C19.4525 29.0344 22.5598 27.7658 24.8899 25.6929L20.4899 21.9962C19.2126 22.9004 17.6246 23.3618 16.0002 23.3618C11.2787 23.3618 9.03824 20.0689 8.52912 17.1882L3.94141 20.764C6.14853 25.2042 10.0079 29.0344 16.0002 29.0344Z" fill="#34A853"/>
                            <path d="M29.074 13.3887H16V18.7219H23.474C22.7128 21.2878 20.912 23.0092 18.698 24.114L18.704 24.0092L23.104 27.5061C22.8509 27.7364 29.3333 23.1111 29.3333 15.7009C29.3333 14.9379 29.2461 14.1496 29.074 13.3887Z" fill="#FBBC05"/>
                          </svg>
                        </div>
                        <div className="ml-3 font-medium">Google</div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ChevronUp size={20} />
                      </button>
                    </div>

                    <div className="pt-4">
                      <p className="text-gray-700 mb-4">
                        Connect your Google Business Profile to collect reviews that will help improve your local search ranking and visibility.
                      </p>
                      
                      <button className="w-full border border-gray-300 rounded-lg p-3 flex items-center justify-center mb-4 bg-white hover:bg-gray-50">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M18.1713 8.36786H10V11.684H14.6713C14.3606 13.3673 13.0267 14.6013 10 14.6013C7.35606 14.6013 5.20404 12.4493 5.20404 9.80533C5.20404 7.16133 7.35606 5.0093 10 5.0093C11.2394 5.0093 12.3152 5.45252 13.1485 6.16133L15.6576 3.65252C14.1909 2.30533 12.2091 1.47974 10 1.47974C5.3727 1.47974 1.66667 5.18582 1.66667 9.81317C1.66667 14.4405 5.3727 18.1466 10 18.1466C14.9636 18.1466 18.3333 14.777 18.3333 9.81317C18.3333 9.32525 18.2788 8.84342 18.1713 8.36786Z" fill="#4285F4"/>
                          <path d="M2.62738 6.0403L5.47813 8.12192C6.23742 6.30621 7.97813 5.00933 10.0001 5.00933C11.2395 5.00933 12.3153 5.45255 13.1486 6.16136L15.6577 3.65255C14.191 2.30536 12.2092 1.47977 10.0001 1.47977C6.79828 1.47977 4.02277 3.34342 2.62738 6.0403Z" fill="#EA4335"/>
                          <path d="M10.0001 18.1466C12.1577 18.1466 14.0998 17.3529 15.5559 16.058L12.8059 13.7479C12.0078 14.3129 11.0153 14.6012 10.0001 14.6012C7.04916 14.6012 5.67389 12.5425 5.33054 11.1171L2.46387 13.3099C3.8425 16.4258 6.71554 18.1466 10.0001 18.1466Z" fill="#34A853"/>
                          <path d="M18.1713 8.36795H10V11.684H14.6713C14.0288 13.3047 12.7575 14.3727 11.0198 15.0712L11.025 15.0058L13.775 17.3158C13.6322 17.4351 18.3333 14.4443 18.3333 9.81325C18.3333 9.32533 18.2788 8.8435 18.1713 8.36795Z" fill="#FBBC05"/>
                        </svg>
                        <span className="text-gray-700">Connect Google Business Profile</span>
                      </button>
                      
                      <div className="py-2">
                        <p className="text-gray-500 text-sm">
                          You'll need to authorize access to your Google Business Profile
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 flex justify-end">
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg mr-2 hover:bg-gray-50">
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}