import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import whatsAppLogo from "../../../assets/whatss.jpg";

const WhatsAppReviewRequests = () => {
  const location = useLocation();

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
  const isActive = (path) => location.pathname === path;

  // Background pattern style with directly embedded image
  const backgroundPatternStyle = {
    backgroundImage: `url(${whatsAppLogo})`,
    backgroundSize: '60px 60px',
    opacity: 0.05,
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
                    isActive(item.path)
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
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
                  isActive(item.path)
                    ? "text-blue-500 border-l-4 border-blue-500 pl-4 -ml-4"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 shadow-sm">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              WhatsApp Review Requests
            </h2>

            {/* WhatsApp Connect Card */}
            <div className="rounded-lg border border-green-500 bg-green-50 p-8 mb-8 relative overflow-hidden">
              {/* Background pattern directly using style */}
              <div className="absolute inset-0" style={backgroundPatternStyle}></div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Reach out to your customer on their favourite messaging app
                </h3>
                <p className="text-gray-600 mb-8 max-w-3xl">
                  Stay closer to your customers by providing instant support, sending timely updates, and creating engaging interactions.
                </p>
                <button className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-green-500">
                    <path fill="currentColor" d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c0-5.445 4.455-9.885 9.942-9.885a9.865 9.865 0 0 1 7.022 2.91 9.788 9.788 0 0 1 2.909 6.99c-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                  Connect WhatsApp
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WhatsAppReviewRequests;