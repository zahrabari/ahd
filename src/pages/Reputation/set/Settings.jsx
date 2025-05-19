import { useState, useEffect } from "react";
import { Settings, MessageSquare, Send, ArrowRight, Plus, Zap, MoreVertical, X, ChevronDown, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReputationDashboard(props) {
  const [currentView, setCurrentView] = useState("reviewsAI");
  const [selectedOption, setSelectedOption] = useState("auto");
  const [waitTime, setWaitTime] = useState(4);
  const [timeUnit, setTimeUnit] = useState("Mins");
  const [showTimeUnitDropdown, setShowTimeUnitDropdown] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [reviewBalancingEnabled, setReviewBalancingEnabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [editingAgentIndex, setEditingAgentIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [agents, setAgents] = useState(() => [
    {
      id: `agent-1-${Date.now()}`,
      name: "Solutions Sally",
      dateUpdated: "Today at 01:42",
      reviewType: "2 stars or below",
      reviewSource: "All",
      tone: "Solution Oriented",
      responses: 0,
      instructions: "You will be provided with negative reviews of a business. Craft responses focused on offering solutions and addressing concerns effectively...",
      enabled: true,
    },
    {
      id: `agent-2-${Date.now()}`,
      name: "Axel Dazzle",
      dateUpdated: "Today at 01:42",
      reviewType: "4 stars or above",
      reviewSource: "All",
      tone: "Playful",
      responses: 0,
      instructions: "You will be provided with reviews of a business. Create playful and engaging responses to brighten the customer's day...",
      enabled: true,
    },
    {
      id: `agent-3-${Date.now()}`,
      name: "Taylor Sailor",
      dateUpdated: "Today at 01:42",
      reviewType: "All Reviews",
      reviewSource: "All",
      tone: "Optimistic",
      responses: 0,
      instructions: "You will be provided with reviews of a business. Reply to the reviews with a focus on customer success. Highlight how the business values feedback and is committed to continuous improvement. Keep...",
      enabled: true,
    },
    {
      id: `agent-4-${Date.now()}`,
      name: "Grace Space",
      dateUpdated: "Today at 01:42",
      reviewType: "2 stars or below",
      reviewSource: "All",
      tone: "Empathetic, Solution Oriented",
      responses: 0,
      instructions: "You will be provided with negative reviews of a business. Write a heartfelt and empathetic response that acknowledges the customer's concerns and frustrations in a genuine manner. Begin by sincerely...",
      enabled: true,
    },
    {
      id: `agent-5-${Date.now()}`,
      name: "Claire Flair",
      dateUpdated: "Today at 01:42",
      reviewType: "3 stars or above",
      reviewSource: "All",
      tone: "Professional",
      responses: 0,
      instructions: "You will be provided with good reviews of a business. Your job is to craft a professional and authoritative response that reflects a deep sense of expertise and reliability. Begin by expressing sincere gratitude...",
      enabled: true,
    },
    {
      id: `agent-6-${Date.now()}`,
      name: "zahra",
      dateUpdated: "Today at 01:42",
      reviewType: "4 stars or above",
      reviewSource: "Facebook",
      tone: "Empathetic",
      responses: 0,
      instructions: "You will be provided with reviews of a business. Respond with empathy and understanding to customer feedback...",
      enabled: true,
    },
  ]);

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownIndex !== null && !event.target.closest(".dropdown-container")) {
        setDropdownIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownIndex]);

  const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="#EA4335"/>
      <path d="M8 8.5v3.08h4.537c-.21.781-.638 1.439-1.244 1.916a4.44 4.44 0 0 1-6.274-1.736 4.79 4.79 0 0 1 0-3.053 4.444 4.444 0 0 1 6.274-1.736A3.34 3.34 0 0 1 12.55 8.5H8z" fill="#34A853"/>
      <path d="M4.375 8.5a3.87 3.87 0 0 1 0-1 4.45 4.45 0 0 1 3.124-3.366V2.08A7.555 7.555 0 0 0 3.58 4.947 7.689 7.689 0 0 0 2.5 8.5c0 1.346.342 2.615.95 3.727A7.553 7.553 0 0 0 7.472 15.62v-2.054A4.45 4.45 0 0 1 4.375 8.5z" fill="#FBBC05"/>
      <path d="M8 3.5c1.35 0 2.479.435 3.354 1.29L13.36 2.78A7.68 7.68 0 0 0 8 0a7.553 7.553 0 0 0-5.52 2.38 7.7 7.7 0 0 0-1.03 1.566v2.054A4.45 4.45 0 0 1 8 3.5z" fill="#4285F4"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" fill="#1877F2"/>
    </svg>
  );

  const CombinedIcon = () => (
    <div className="flex items-center space-x-1">
      <GoogleIcon />
      <FacebookIcon />
    </div>
  );

  const options = [
    { value: "All", label: "All", icon: <CombinedIcon /> },
    { value: "Google", label: "All Google pages", icon: <GoogleIcon /> },
    { value: "Facebook", label: "All Facebook pages", icon: <FacebookIcon /> },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelected(option);
    setIsOpen(false);
  };
  const clearSelection = (e) => {
    e.stopPropagation();
    setSelected("");
  };

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleProceed() {
    const newAgents = Array.from({ length: 5 }, (_, index) => ({
      id: `agent-${agents.length + index + 1}-${Date.now()}`,
      name: `Agent ${agents.length + index + 1}`,
      dateUpdated: new Date().toLocaleDateString(),
      reviewType: "All Reviews",
      reviewSource: "All",
      tone: "No Tone",
      responses: 0,
      instructions: "",
      enabled: true,
    }));
    setAgents((prevAgents) => [...prevAgents, ...newAgents]);
    closeModal();
  }

  const incrementWaitTime = () => {
    setWaitTime((prev) => prev + 1);
  };

  const decrementWaitTime = () => {
    if (waitTime > 1) {
      setWaitTime((prev) => prev - 1);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleTimeUnitChange = (unit) => {
    setTimeUnit(unit);
    setShowTimeUnitDropdown(false);
  };

  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  const toggleReviewBalancing = () => {
    setReviewBalancingEnabled(!reviewBalancingEnabled);
  };

  const openTemplateModal = () => {
    setShowTemplateModal(true);
  };

  const closeTemplateModal = () => {
    setShowTemplateModal(false);
  };

  const handleTemplateSelection = (template) => {
    setSelectedTemplate(template);
    setShowTemplateModal(false);
    setShowAgentModal(true);
    setEditingAgentIndex(null);

    const templateDetails = {
      "scratch": { tones: [], instructions: "", name: "New Agent" },
      "Claire Flair": { tones: ["Professional"], instructions: "You will be provided with good reviews of a business. Your job is to craft a professional and authoritative response that reflects a deep sense of expertise and reliability. Begin by expressing sincere gratitude...", name: "Claire Flair" },
      "Grace Space": { tones: ["Empathetic", "Solution Oriented"], instructions: "You will be provided with negative reviews of a business. Write a heartfelt and empathetic response that acknowledges the customer's concerns and frustrations in a genuine manner. Begin by sincerely...", name: "Grace Space" },
      "Taylor Sailor": { tones: ["Optimistic"], instructions: "You will be provided with reviews of a business. Reply to the reviews with a focus on customer success. Highlight how the business values feedback and is committed to continuous improvement. Keep...", name: "Taylor Sailor" },
      "Solutions Sally": { tones: ["Solution Oriented"], instructions: "You will be provided with negative reviews of a business. Craft responses focused on offering solutions and addressing concerns effectively...", name: "Solutions Sally" },
      "Axel Dazzle": { tones: ["Playful"], instructions: "You will be provided with reviews of a business. Create playful and engaging responses to brighten the customer's day...", name: "Axel Dazzle" },
      "zahra": { tones: ["Empathetic"], instructions: "You will be provided with reviews of a business. Respond with empathy and understanding to customer feedback...", name: "zahra" },
    };

    const templateData = templateDetails[template] || {};
    setAgentName(templateData.name || "");
    setInstructions(templateData.instructions || "");
    setSelectedTones(templateData.tones || []);
    setReviewType("All Reviews");
    setSelected("All");
    setLanguageType("Dynamic"); // Default to Dynamic
    setSpecificLanguage("English (United States)"); // Default specific language
    setFooterText("Example: Thank you!");
    setResponsePreview(null);
  };

  const handleEditAgent = (index) => {
    const agent = agents[index];
    setEditingAgentIndex(index);
    setAgentName(agent.name);
    setInstructions(agent.instructions);
    setReviewType(agent.reviewType);
    setSelected(agent.reviewSource);
    setLanguageType("Dynamic"); // Default to Dynamic for now; you might want to adjust based on agent data
    setSpecificLanguage("English (United States)");
    setFooterText("Example: Thank you!");
    setSelectedTones(agent.tone === "No Tone" ? [] : agent.tone.split(", "));
    setResponsePreview(null);
    setShowAgentModal(true);
    setDropdownIndex(null);
  };

  const handleCloneAgent = (index) => {
    const agentToClone = { ...agents[index] };
    agentToClone.id = `agent-${agents.length + 1}-${Date.now()}`;
    agentToClone.name = `${agentToClone.name} (Clone)`;
    agentToClone.dateUpdated = new Date().toLocaleDateString();
    setAgents([...agents, agentToClone]);
    setDropdownIndex(null);
  };

  const handleDisableAgent = (index) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent, i) =>
        i === index ? { ...agent, enabled: !agent.enabled } : agent
      )
    );
    setDropdownIndex(null);
  };

  const handleDeleteAgent = (index) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      setAgents((prevAgents) => prevAgents.filter((_, i) => i !== index));
      setDropdownIndex(null);
    }
  };

  const closeAgentModal = () => {
    setShowAgentModal(false);
    setSelectedTemplate(null);
    setEditingAgentIndex(null);
    setAgentName("");
    setInstructions("");
    setReviewType("All Reviews");
    setLanguageType("Dynamic");
    setSpecificLanguage("English (United States)");
    setFooterText("Example: Thank you!");
    setSelectedTones([]);
    setResponsePreview(null);
    setSelected("All");
  };

  const handleAgentSave = (agentData) => {
    if (!agentData.name || !agentData.instructions) {
      alert("Please fill in all required fields: Agent Name and Agent Instructions.");
      return;
    }

    const templateDetails = {
      "scratch": { tones: [], instructions: "" },
      "Claire Flair": { tones: ["Professional"], instructions: "You will be provided with good reviews of a business. Your job is to craft a professional and authoritative response that reflects a deep sense of expertise and reliability. Begin by expressing sincere gratitude..." },
      "Grace Space": { tones: ["Empathetic", "Solution Oriented"], instructions: "You will be provided with negative reviews of a business. Write a heartfelt and empathetic response that acknowledges the customer's concerns and frustrations in a genuine manner. Begin by sincerely..." },
      "Taylor Sailor": { tones: ["Optimistic"], instructions: "You will be provided with reviews of a business. Reply to the reviews with a focus on customer success. Highlight how the business values feedback and is committed to continuous improvement. Keep..." },
      "Solutions Sally": { tones: ["Solution Oriented"], instructions: "You will be provided with negative reviews of a business. Craft responses focused on offering solutions and addressing concerns effectively..." },
      "Axel Dazzle": { tones: ["Playful"], instructions: "You will be provided with reviews of a business. Create playful and engaging responses to brighten the customer's day..." },
      "zahra": { tones: ["Empathetic"], instructions: "You will be provided with reviews of a business. Respond with empathy and understanding to customer feedback..." },
    };

    const templateData = selectedTemplate && templateDetails[selectedTemplate];
    const finalTones = selectedTones.length > 0 ? selectedTones : (templateData?.tones || []);

    const newAgent = {
      id: editingAgentIndex !== null ? agents[editingAgentIndex].id : `agent-${agents.length + 1}-${Date.now()}`,
      name: agentData.name || (selectedTemplate || "New Agent"),
      dateUpdated: "Today at 01:42",
      reviewType: agentData.reviewType || "All Reviews",
      reviewSource: agentData.reviewSource || "All",
      tone: finalTones.length > 0 ? finalTones.join(", ") : "No Tone",
      responses: 0,
      instructions: agentData.instructions || (templateData?.instructions || ""),
      enabled: true,
      languageType: agentData.languageType || "Dynamic",
      specificLanguage: agentData.languageType === "Fixed" ? agentData.specificLanguage : null,
    };

    setAgents((prevAgents) => {
      let updatedAgents;
      if (editingAgentIndex !== null) {
        updatedAgents = [...prevAgents];
        updatedAgents[editingAgentIndex] = newAgent;
      } else {
        updatedAgents = [...prevAgents, newAgent];
      }
      return updatedAgents;
    });
    closeAgentModal();
  };

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
  const [activeNavItem, setActiveNavItem] = useState("Settings");
  const [activeSidebarItem, setActiveSidebarItem] = useState("Reviews AI");

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const [agentName, setAgentName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [reviewType, setReviewType] = useState("All Reviews");
  const [languageType, setLanguageType] = useState("Dynamic");
  const [specificLanguage, setSpecificLanguage] = useState("English (United States)");
  const [footerText, setFooterText] = useState("Example: Thank you!");
  const [selectedTones, setSelectedTones] = useState([]);
  const [responsePreview, setResponsePreview] = useState(null);

  const handleToneSelection = (toneName) => {
    setSelectedTones((prev) => {
      if (prev.includes(toneName)) {
        return prev.filter((t) => t !== toneName);
      } else if (prev.length < 2) {
        return [...prev, toneName];
      }
      return prev;
    });
  };

  const generateResponse = () => {
    const possibleNames = ["Ethan", "Sofia", "Marcus", "Olivia", "Daniel", "Emma", "James"];
    const randomName = possibleNames[Math.floor(Math.random() * possibleNames.length)];

    const toneMessages = {
      Professional: "We appreciate your detailed feedback regarding our services.",
      Playful: "Your review made our day brighter than our storefront lights!",
      Empathetic: "We truly understand how important a good experience is.",
      Optimistic: "We're excited to welcome you back again soon!",
      "Solution Oriented": "We're implementing changes based on your valuable input.",
      Funny: "Your review had us laughing—thanks for the chuckle!",
      Grateful: "We're so thankful for your kind words and support!",
      Friendly: "It’s always a pleasure to hear from a friend like you!",
      Concise: "Thanks for your feedback—we’ll keep improving!",
      Inquisitive: "We’d love to learn more about your experience—can you share more?",
    };

    let message = `Thank you, ${randomName}, for your wonderful review! `;

    if (selectedTones.length > 0) {
      selectedTones.forEach((tone) => {
        message += toneMessages[tone] + " ";
      });
    } else {
      message += "We're thrilled to hear that you enjoyed the cozy atmosphere and decor—your feedback inspires us to keep creating a welcoming environment.";
    }

    message += footerText ? ` ${footerText}` : "";
    setResponsePreview(message);
  };

  return (
    <div className="min-h-screen bg-white">
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

        <div className="flex-1 p-8 overflow-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reviews AI</h2>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              className={`border-2 ${
                selectedOption === "off" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              } rounded-xl p-6 relative cursor-pointer hover:shadow-md transition-all duration-200`}
              onClick={() => handleOptionSelect("off")}
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Off</h3>
                  <p className="text-gray-600 mt-1">Turn off Reviews AI to stop receiving suggestions.</p>
                </div>
              </div>
              <div className="absolute right-4 top-6">
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedOption === "off" ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  {selectedOption === "off" && <div className="w-4 h-4 bg-blue-600 rounded-full m-1"></div>}
                </div>
              </div>
            </div>

            <div
              className={`border-2 ${
                selectedOption === "suggestive" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              } rounded-xl p-6 relative cursor-pointer hover:shadow-md transition-all duration-200`}
              onClick={() => handleOptionSelect("suggestive")}
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Suggestive</h3>
                  <p className="text-gray-600 mt-1">Helps you articulate review responses</p>
                </div>
              </div>
              <div className="absolute right-4 top-6">
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedOption === "suggestive" ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  {selectedOption === "suggestive" && <div className="w-4 h-4 bg-blue-600 rounded-full m-1"></div>}
                </div>
              </div>
            </div>

            <div
              className={`border-2 ${
                selectedOption === "auto" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              } rounded-xl p-6 relative cursor-pointer hover:shadow-md transition-all duration-200`}
              onClick={() => handleOptionSelect("auto")}
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Send className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Auto Responses</h3>
                  <p className="text-gray-600 mt-1">Automatically sends review responses</p>
                </div>
              </div>
              <div className="absolute right-4 top-6">
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedOption === "auto" ? "border-blue-600" : "border-gray-300"
                  } ${selectedOption === "auto" ? "bg-blue-600" : ""}`}
                >
                  {selectedOption === "auto" && <div className="w-4 h-4 bg-white rounded-full m-1"></div>}
                </div>
              </div>
            </div>
          </div>

          {selectedOption === "auto" && (
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-700 mb-3">Wait time before responding</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm">
                  <button
                    onClick={decrementWaitTime}
                    className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium text-gray-800">{waitTime}</span>
                  <button
                    onClick={incrementWaitTime}
                    className="px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="relative">
                  <div
                    className="flex items-center bg-white border border-gray-200 rounded-full pl-4 pr-3 py-2 shadow-sm cursor-pointer min-w-[100px]"
                    onClick={() => setShowTimeUnitDropdown(!showTimeUnitDropdown)}
                  >
                    <span className="text-gray-800 font-medium">{timeUnit}</span>
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                  </div>
                  {showTimeUnitDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full">
                      {["Mins", "Hours", "Days"].map((unit) => (
                        <div
                          key={unit}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            handleTimeUnitChange(unit);
                            setShowTimeUnitDropdown(false);
                          }}
                        >
                          {unit}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div
            className="bg-blue-50 p-4 rounded-lg mb-8 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-all duration-200"
            onClick={togglePaymentModal}
          >
            <div className="flex items-center">
              <Zap className="text-purple-600 mr-2" size={20} />
              <span className="text-purple-600 font-medium">Upgrade to unlimited AI Employee plan</span>
            </div>
            <ArrowRight className="text-purple-600" size={20} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium">Reviews AI Agents</h2>
              <div className="flex items-center">
                <button
                  onClick={openModal}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg mr-4 text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={18} className="mr-2" />
                  <span>Create Starter Agents</span>
                </button>

                {showModal && (
                  <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Create Starter Agents</h2>
                        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                          ✕
                        </button>
                      </div>

                      <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                          Using this option will create five new Reviews AI Agents, which will automatically generate
                          responses for future reviews. By default, they will be set to respond to all reviews. If you
                          prefer to limit their responses to specific review sources or types, you can update their
                          settings anytime after creation. Would you like to proceed?
                        </p>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={closeModal}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleProceed}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={openTemplateModal}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  <span>Create Agent</span>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl shadow-sm">
              <div className="grid grid-cols-6 bg-gray-50 text-gray-700 text-sm font-medium border-b border-gray-200">
                <div className="px-6 py-4">Agent Name</div>
                <div className="px-6 py-4">Date Updated</div>
                <div className="px-6 py-4">Review Type</div>
                <div className="px-6 py-4">Review Source</div>
                <div className="px-6 py-4">Tones</div>
                <div className="px-6 py-4">Responses</div>
              </div>

              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="grid grid-cols-6 border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => handleEditAgent(agents.findIndex((a) => a.id === agent.id))}
                >
                  <div className="px-6 py-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 text-white font-medium">
                      {agent.name.split(" ")[0][0] + (agent.name.split(" ")[1] ? agent.name.split(" ")[1][0] : "")}
                    </div>
                    <span className="text-gray-800 font-medium">
                      {agent.name}
                      {!agent.enabled && (
                        <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                          Disabled
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="px-6 py-4 flex items-center text-gray-600">{agent.dateUpdated}</div>
                  <div className="px-6 py-4 flex items-center">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      {agent.reviewType}
                    </span>
                  </div>
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex items-center">
                      {agent.reviewSource === "Facebook" ? (
                        <FacebookIcon className="mr-2" />
                      ) : agent.reviewSource === "Google" ? (
                        <GoogleIcon className="mr-2" />
                      ) : (
                        <CombinedIcon className="mr-2" />
                      )}
                      <span className="text-gray-800">{agent.reviewSource}</span>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex items-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm flex items-center">
                      {agent.tone.split(", ").map((tone, index) => (
                        <span key={index} className="flex items-center mr-1">
                          {tone === "Optimistic" && "🌟"}
                          {tone === "Professional" && "👨‍💼"}
                          {tone === "Playful" && "😄"}
                          {tone === "Empathetic" && "❤️"}
                          {tone === "Solution Oriented" && "🔧"}
                          {tone === "Funny" && "😂"}
                          {tone === "Grateful" && "🙏"}
                          {tone === "Friendly" && "😊"}
                          {tone === "Concise" && "✂️"}
                          {tone === "Inquisitive" && "❓"}
                          {tone}
                          {index < agent.tone.split(", ").length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-between relative dropdown-container">
                    <span className="text-gray-800">{agent.responses}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownIndex(dropdownIndex === agents.findIndex((a) => a.id === agent.id) ? null : agents.findIndex((a) => a.id === agent.id));
                      }}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {dropdownIndex === agents.findIndex((a) => a.id === agent.id) && (
                      <div
                        className="absolute right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg w-40"
                        style={{
                          top: agents.findIndex((a) => a.id === agent.id) === agents.length - 1 ? "auto" : "2.5rem",
                          bottom: agents.findIndex((a) => a.id === agent.id) === agents.length - 1 ? "2.5rem" : "auto",
                        }}
                      >
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAgent(agents.findIndex((a) => a.id === agent.id));
                          }}
                        >
                          <Settings size={16} className="mr-2" />
                          Edit
                        </div>
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloneAgent(agents.findIndex((a) => a.id === agent.id));
                          }}
                        >
                          <Plus size={16} className="mr-2" />
                          Clone
                        </div>
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDisableAgent(agents.findIndex((a) => a.id === agent.id));
                          }}
                        >
                          <X size={16} className="mr-2" />
                          {agent.enabled ? "Disable" : "Enable"}
                        </div>
                        <div
                          className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600 flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAgent(agents.findIndex((a) => a.id === agent.id));
                          }}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-end p-4 bg-white">
                <div className="flex items-center text-sm">
                  <button className="px-3 py-1 border border-gray-300 rounded-l-lg text-gray-500 hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 border-t border-b border-gray-300 bg-blue-50 text-blue-600 font-medium">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4 overflow-hidden shadow-xl">
            <div className="p-8 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6 shadow-sm">
                <X className="text-red-500" size={36} />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Payment Not Available</h3>
              <p className="text-gray-600 text-center mb-8">
                Your account is not configured for payments. Please contact your administrator to enable payment
                processing.
              </p>
              <button
                onClick={togglePaymentModal}
                className="px-6 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-lg hover:shadow-md transition-all duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden transition-all duration-300 animate-slideUp">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">Select Template</h2>
              <button
                onClick={closeTemplateModal}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                    selectedTemplate === "scratch"
                      ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-gradient-to-br from-blue-50 to-white"
                  }`}
                  onClick={() => setSelectedTemplate("scratch")}
                >
                  <div className="mb-4 bg-white rounded-full p-3 w-14 h-14 flex items-center justify-center border border-gray-200 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Start from scratch</h3>
                  <p className="text-gray-600">Configure your own prompt to start generating replies</p>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                    selectedTemplate === "Claire Flair"
                      ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
                  }`}
                  onClick={() => setSelectedTemplate("Claire Flair")}
                >
                  <div className="mb-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-3 w-14 h-14 flex items-center justify-center text-white shadow-md">
                    <span className="text-xl font-bold">CF</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Claire Flair</h3>
                  <div className="mb-3">
                    <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full flex items-center w-fit font-medium">
                      👨‍💼 Professional
                    </span>
                  </div>
                  <p className="text-gray-600">
                    You will be provided with good reviews of a business. Your job is to craft a professional and
                    authoritative response that reflects a deep sense of expertise and reliability. Begin by expressing
                    sincere gratitude...
                  </p>
                </div>

                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                      selectedTemplate === agent.name
                        ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
                    }`}
                    onClick={() => setSelectedTemplate(agent.name)}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mr-3 text-gray-500 bg-gray-50 shadow-sm">
                        <span className="font-medium">
                          {agent.name.split(" ")[0][0] + (agent.name.split(" ")[1] ? agent.name.split(" ")[1][0] : "")}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {agent.tone.split(", ").map((tone, index) => (
                        <span
                          key={index}
                          className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center"
                        >
                          <span className="mr-1">
                            {tone === "Optimistic" && "🌟"}
                            {tone === "Professional" && "👨‍💼"}
                            {tone === "Playful" && "😄"}
                            {tone === "Empathetic" && "☑"}
                            {tone === "Solution Oriented" && "🔧"}
                            {tone === "Funny" && "😂"}
                            {tone === "Grateful" && "🙏"}
                            {tone === "Friendly" && "😊"}
                            {tone === "Concise" && "✂️"}
                            {tone === "Inquisitive" && "❓"}
                          </span>
                          {tone}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {agent.instructions || "No instructions provided for this agent."}
                    </p>
                  </div>
                ))}

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                    selectedTemplate === "Grace Space"
                      ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-gradient-to-br from-blue-50 to-white"
                  }`}
                  onClick={() => setSelectedTemplate("Grace Space")}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full border border-blue-200 flex items-center justify-center mr-3 text-gray-500 bg-white shadow-sm">
                      <span className="font-medium">GS</span>
                    </div>
                    <h3 className="font-semibold text-lg">Grace Space</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                      <span className="mr-1">☑</span>
                      Empathetic
                    </span>
                    <span className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                      <span className="mr-1">🔧</span>
                      Solution Oriented
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You will be provided with negative reviews of a business. Write a heartfelt and empathetic response
                    that acknowledges the customer's concerns and frustrations in a genuine manner. Begin by
                    sincerely...
                  </p>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                    selectedTemplate === "Taylor Sailor"
                      ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
                  }`}
                  onClick={() => setSelectedTemplate("Taylor Sailor")}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mr-3 text-gray-500 bg-gray-50 shadow-sm">
                      <span className="font-medium">TS</span>
                    </div>
                    <h3 className="font-semibold text-lg">Taylor Sailor</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-white border border-yellow-200 text-yellow-700 text-xs px-3 py-1 rounded-full flex items-center">
                      <span className="mr-1">🌟</span>
                      Optimistic
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You will be provided with reviews of a business. Reply to the reviews with a focus on customer
                    success. Highlight how the business values feedback and is committed to continuous improvement.
                    Keep...
                  </p>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                    selectedTemplate === "Solutions Sally"
                      ? "border-blue-500 bg-green-50 shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-gradient-to-br from-green-50 to-white"
                  }`}
                  onClick={() => setSelectedTemplate("Solutions Sally")}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full border border-green-200 flex items-center justify-center mr-3 text-gray-500 bg-white shadow-sm">
                      <span className="font-medium">SS</span>
                    </div>
                    <h3 className="font-semibold text-lg">Solutions Sally</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-white border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full flex items-center">
                      <span className="mr-1">🔧</span>
                      Solution Oriented
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You will be provided with negative reviews of a business. Craft responses focused on offering
                    solutions and addressing concerns effectively...
                  </p>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                    selectedTemplate === "Axel Dazzle"
                      ? "border-blue-500 bg-orange-50 shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-gradient-to-br from-orange-50 to-white"
                  }`}
                  onClick={() => setSelectedTemplate("Axel Dazzle")}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full border border-orange-200 flex items-center justify-center mr-3 text-gray-500 bg-white shadow-sm">
                      <span className="font-medium">AD</span>
                    </div>
                    <h3 className="font-semibold text-lg">Axel Dazzle</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-white border border-orange-200 text-orange-700 text-xs px-3 py-1 rounded-full flex items-center">
                      <span className="mr-1">😄</span>
                      Playful
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You will be provided with reviews of a business. Create playful and engaging responses to brighten
                    the customer's day...
                  </p>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px] ${
                    selectedTemplate === "zahra"
                      ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200 ring-opacity-50"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-gradient-to-br from-blue-50 to-white"
                  }`}
                  onClick={() => setSelectedTemplate("zahra")}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full border border-blue-200 flex items-center justify-center mr-3 text-gray-500 bg-white shadow-sm">
                      <span className="font-medium">Z</span>
                    </div>
                    <h3 className="font-semibold text-lg">zahra</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center">
                      <span className="mr-1">❤️</span>
                      Empathetic
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You will be provided with reviews of a business. Respond with empathy and understanding to customer
                    feedback...
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 mr-6 border-t border-gray-100 flex justify-end space-x-4">
              <button
                onClick={closeTemplateModal}
                className="px-6 py-2 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedTemplate && handleTemplateSelection(selectedTemplate)}
                disabled={!selectedTemplate}
                aria-disabled={!selectedTemplate}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedTemplate
                    ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
                    : "bg-gray-200 text-gray-500"
                } ${!selectedTemplate ? "opacity-60 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {showAgentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editingAgentIndex !== null ? "Edit AI Agent" : "Create AI Agent"}</h2>
              <button
                onClick={closeAgentModal}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agent Name *</label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Reviews AI Agent"
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Agent Instructions *</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Example: Generate an appropriate reply for a review. Follow this instruction while generating a reply: Keep the reply short and sweet!"
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Select the tone of the Agent</label>
                  <div className="mt-2 flex flex-wrap gap-2 min-h-[60px]">
                    {[
                      { name: "No Tone", icon: "✕" },
                      { name: "Professional", icon: "👨‍💼" },
                      { name: "Funny", icon: "😂" },
                      { name: "Empathetic", icon: "❤️" },
                      { name: "Optimistic", icon: "🌟" },
                      { name: "Playful", icon: "😄" },
                      { name: "Grateful", icon: "🙏" },
                      { name: "Friendly", icon: "😊" },
                      { name: "Concise", icon: "✂️" },
                      { name: "Inquisitive", icon: "❓" },
                      { name: "Solution Oriented", icon: "🔧" },
                    ].map((tone) => (
                      <button
                        key={tone.name}
                        onClick={() => handleToneSelection(tone.name)}
                        className={`px-3 py-1 rounded-full text-sm border ${
                          selectedTones.includes(tone.name)
                            ? "bg-blue-100 border-blue-300 text-blue-700"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        } flex items-center`}
                      >
                        <span className="mr-1 text-lg">{tone.icon}</span>
                        {tone.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">You can select a maximum of 2 tones.</p>
                  {selectedTones.length > 0 && (
                    <p className="text-sm text-gray-700 mt-1">Selected tones: {selectedTones.join(", ")}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Select the language of the Agent</label>
                  <div className="flex flex-col space-y-2">
                    <select
                      value={languageType}
                      onChange={(e) => setLanguageType(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Fixed">Fixed</option>
                      <option value="Dynamic">Dynamic</option>
                    </select>
                    {languageType === "Fixed" && (
                      <select
                        value={specificLanguage}
                        onChange={(e) => setSpecificLanguage(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>English (United States)</option>
                        <option>Finnish</option>
                        <option>French (Canada)</option>
                        <option>French (France)</option>
                        <option>German</option>
                        <option>Greek</option>
                        <option>Hindi</option>
                        <option>Hungarian</option>
                        <option>Russian</option>
                        <option>Spanish</option>
                        <option>Swedish</option>
                        <option>Thai</option>
                        <option>Turkish</option>
                        <option>Ukrainian</option>
                        <option>Vietnamese</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="relative w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Source</label>
                  <div className="relative w-full cursor-pointer" onClick={toggleDropdown}>
                    <div className="flex items-center justify-between w-full border border-gray-300 rounded-lg p-2 bg-white">
                      <div className="flex items-center space-x-2">
                        {selected && options.find((opt) => opt.value === selected)?.icon}
                        <span>{selected || "Select a source"}</span>
                        {selected && (
                          <button onClick={clearSelection} className="ml-1 text-gray-400 hover:text-gray-600">
                            <X size={16} />
                          </button>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                      />
                    </div>

                    {isOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {options.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectOption(option.value)}
                          >
                            {option.icon}
                            <span>{option.label}</span>
                            {selected === option.value && (
                              <svg
                                className="w-4 h-4 ml-auto text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Review Type</label>
                  <select
                    value={reviewType}
                    onChange={(e) => setReviewType(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>All Reviews</option>
                    <option>5 stars</option>
                    <option>4 stars or above</option>
                    <option>3 stars or above</option>
                    <option>2 stars or above</option>
                    <option>4 stars or below</option>
                    <option>3 stars or below</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Footer</label>
                  <textarea
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    placeholder="Example: Thank you!"
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">AI Agent Response Preview</label>
                  <div className="mt-1 p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-700">
                    {responsePreview ? (
                      <p>{responsePreview}</p>
                    ) : (
                      <p>Click on generate to see a preview of the AI Agent's response.</p>
                    )}
                  </div>
                  <button
                    onClick={generateResponse}
                    className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center"
                  >
                    <span className="mr-2">✨</span> Generate
                  </button>
                  <p className="mt-2 text-sm text-red-600">You can generate up to 50 reviews in 24 hours.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeAgentModal}
                className="px-6 py-2 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const agentData = {
                    name: agentName,
                    instructions,
                    reviewType,
                    reviewSource: selected,
                    tone: selectedTones,
                    languageType,
                    specificLanguage,
                  };
                  handleAgentSave(agentData);
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {editingAgentIndex !== null ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}