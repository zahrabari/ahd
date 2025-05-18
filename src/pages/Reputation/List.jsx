import { useState, useEffect, useRef } from 'react';
import { Settings, Link as LinkIcon, Cloud, Copy, Globe, ArrowUpCircle, Star, RefreshCw, Link, Database, Check, Search, ChevronDown } from 'lucide-react';

// BusinessListingsInterface Component (from the provided code)
function BusinessListingsInterface({ setShowScanResults }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessName, setBusinessName] = useState("AH digital");
  const [address, setAddress] = useState("2BIS RUE MARCEL SEMBAT");
  const [city, setCity] = useState("DENAIN");
  const [state, setState] = useState("belgium");
  const [zipCode, setZipCode] = useState("80000");
  const [phone, setPhone] = useState("0636-308953");
  const [phoneError, setPhoneError] = useState("");
  const [activeTab, setActiveTab] = useState("Listings");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Vietnam",
    code: "+84",
    flag: "🇻🇳"
  });

  const countryDropdownRef = useRef(null);

  // Phone number validation and formatting
  const validateAndFormatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 7) {
      setPhoneError("Phone number must be at least 7 digits");
    } else {
      setPhoneError("");
    }
    if (selectedCountry.code === "+1" && cleaned.length <= 10) {
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formatted = validateAndFormatPhone(e.target.value);
    setPhone(formatted);
  };

  const countries = [
    { name: "Afghanistan", code: "+93", flag: "🇦🇫", nativeName: "(افغانستان)" },
    { name: "Åland Islands", code: "+358", flag: "🇦🇽" },
    { name: "Albania", code: "+355", flag: "🇦🇱", nativeName: "(Shqipëri)" },
    { name: "Algeria", code: "+213", flag: "🇩🇿", nativeName: "(الجزائر)" },
    { name: "American Samoa", code: "+1", flag: "🇦🇸" },
    { name: "Andorra", code: "+376", flag: "🇦🇩" },
    { name: "Angola", code: "+244", flag: "🇦🇴" },
    { name: "Anguilla", code: "+1", flag: "🇦🇮" },
    { name: "Antigua and Barbuda", code: "+1", flag: "🇦🇬" },
    { name: "Argentina", code: "+54", flag: "🇦🇷" },
    { name: "Armenia", code: "+374", flag: "🇦🇲", nativeName: "(Հայաստան)" },
    { name: "Aruba", code: "+297", flag: "🇦🇼" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "Austria", code: "+43", flag: "🇦🇹" },
    { name: "Azerbaijan", code: "+994", flag: "🇦🇿", nativeName: "(Azərbaycan)" },
    { name: "Bahamas", code: "+1", flag: "🇧🇸" },
    { name: "Bahrain", code: "+973", flag: "🇧🇭", nativeName: "(البحرين)" },
    { name: "Bangladesh", code: "+880", flag: "🇧🇩", nativeName: "(বাংলাদেশ)" },
    { name: "Barbados", code: "+1", flag: "🇧🇧" },
    { name: "Belarus", code: "+375", flag: "🇧🇾", nativeName: "(Беларусь)" },
    { name: "Belgium", code: "+32", flag: "🇧🇪" },
    { name: "Belize", code: "+501", flag: "🇧🇿" },
    { name: "Benin", code: "+229", flag: "🇧🇯" },
    { name: "Bermuda", code: "+1", flag: "🇧🇲" },
    { name: "Bhutan", code: "+975", flag: "🇧🇹", nativeName: "(འབྲུག)" },
    { name: "Bolivia", code: "+591", flag: "🇧🇴" },
    { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
    { name: "Botswana", code: "+267", flag: "🇧🇼" },
    { name: "Brazil", code: "+55", flag: "🇧🇷", nativeName: "(Brasil)" },
    { name: "British Indian Ocean Territory", code: "+246", flag: "🇮🇴" },
    { name: "British Virgin Islands", code: "+1", flag: "🇻🇬" },
    { name: "Brunei", code: "+673", flag: "🇧🇳" },
    { name: "Bulgaria", code: "+359", flag: "🇧🇬", nativeName: "(България)" },
    { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
    { name: "Burundi", code: "+257", flag: "🇧🇮" },
    { name: "Cambodia", code: "+855", flag: "🇰🇭", nativeName: "(កម្ពុជា)" },
    { name: "Cameroon", code: "+237", flag: "🇨🇲" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Cape Verde", code: "+238", flag: "🇨🇻" },
    { name: "Cayman Islands", code: "+1", flag: "🇰🇾" },
    { name: "Central African Republic", code: "+236", flag: "🇨🇫" },
    { name: "Chad", code: "+235", flag: "🇹🇩" },
    { name: "Chile", code: "+56", flag: "🇨🇱" },
    { name: "China", code: "+86", flag: "🇨🇳", nativeName: "(中国)" },
    { name: "Colombia", code: "+57", flag: "🇨🇴" },
    { name: "Comoros", code: "+269", flag: "🇰🇲" },
    { name: "Congo", code: "+242", flag: "🇨🇬" },
    { name: "Cook Islands", code: "+682", flag: "🇨🇰" },
    { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
    { name: "Croatia", code: "+385", flag: "🇭🇷", nativeName: "(Hrvatska)" },
    { name: "Cuba", code: "+53", flag: "🇨🇺" },
    { name: "Curaçao", code: "+599", flag: "🇨🇼" },
    { name: "Cyprus", code: "+357", flag: "🇨🇾" },
    { name: "Czech Republic", code: "+420", flag: "🇨🇿", nativeName: "(Česká republika)" },
    { name: "Denmark", code: "+45", flag: "🇩🇰", nativeName: "(Danmark)" },
    { name: "Djibouti", code: "+253", flag: "🇩🇯" },
    { name: "Dominica", code: "+1", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "+1", flag: "🇩🇴" },
    { name: "Ecuador", code: "+593", flag: "🇪🇨" },
    { name: "Egypt", code: "+20", flag: "🇪🇬", nativeName: "(مصر)" },
    { name: "El Salvador", code: "+503", flag: "🇸🇻" },
    { name: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
    { name: "Eritrea", code: "+291", flag: "🇪🇷" },
    { name: "Estonia", code: "+372", flag: "🇪🇪", nativeName: "(Eesti)" },
    { name: "Ethiopia", code: "+251", flag: "🇪🇹" },
    { name: "Falkland Islands", code: "+500", flag: "🇫🇰" },
    { name: "Faroe Islands", code: "+298", flag: "🇫🇴" },
    { name: "Fiji", code: "+679", flag: "🇫🇯" },
    { name: "Finland", code: "+358", flag: "🇫🇮", nativeName: "(Suomi)" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "French Guiana", code: "+594", flag: "🇬🇫" },
    { name: "French Polynesia", code: "+689", flag: "🇵🇫" },
    { name: "Gabon", code: "+241", flag: "🇬🇦" },
    { name: "Gambia", code: "+220", flag: "🇬🇲" },
    { name: "Georgia", code: "+995", flag: "🇬🇪", nativeName: "(საქართველო)" },
    { name: "Germany", code: "+49", flag: "🇩🇪", nativeName: "(Deutschland)" },
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Gibraltar", code: "+350", flag: "🇬🇮" },
    { name: "Greece", code: "+30", flag: "🇬🇷", nativeName: "(Ελλάδα)" },
    { name: "Greenland", code: "+299", flag: "🇬🇱" },
    { name: "Grenada", code: "+1", flag: "🇬🇩" },
    { name: "Guadeloupe", code: "+590", flag: "🇬🇵" },
    { name: "Guam", code: "+1", flag: "🇬🇺" },
    { name: "Guatemala", code: "+502", flag: "🇬🇹" },
    { name: "Guernsey", code: "+44", flag: "🇬🇬" },
    { name: "Guinea", code: "+224", flag: "🇬🇳" },
    { name: "Guinea-Bissau", code: "+245", flag: "🇬🇼" },
    { name: "Guyana", code: "+592", flag: "🇬🇾" },
    { name: "Haiti", code: "+509", flag: "🇭🇹" },
    { name: "Honduras", code: "+504", flag: "🇭🇳" },
    { name: "Hong Kong", code: "+852", flag: "🇭🇰" },
    { name: "Hungary", code: "+36", flag: "🇭🇺", nativeName: "(Magyarország)" },
    { name: "Iceland", code: "+354", flag: "🇮🇸", nativeName: "(Ísland)" },
    { name: "India", code: "+91", flag: "🇮🇳", nativeName: "(भारत)" },
    { name: "Indonesia", code: "+62", flag: "🇮🇩" },
    { name: "Iran", code: "+98", flag: "🇮🇷", nativeName: "(ایران)" },
    { name: "Iraq", code: "+964", flag: "🇮🇶", nativeName: "(العراق)" },
    { name: "Ireland", code: "+353", flag: "🇮🇪", nativeName: "(Éire)" },
    { name: "Isle of Man", code: "+44", flag: "🇮🇲" },
    { name: "Israel", code: "+972", flag: "🇮🇱", nativeName: "(ישראל)" },
    { name: "Italy", code: "+39", flag: "🇮🇹", nativeName: "(Italia)" },
    { name: "Jamaica", code: "+1", flag: "🇯🇲" },
    { name: "Japan", code: "+81", flag: "🇯🇵", nativeName: "(日本)" },
    { name: "Jersey", code: "+44", flag: "🇯🇪" },
    { name: "Jordan", code: "+962", flag: "🇯🇴", nativeName: "(الأردن)" },
    { name: "Kazakhstan", code: "+7", flag: "🇰🇿", nativeName: "(Казахстан)" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
    { name: "Kiribati", code: "+686", flag: "🇰🇮" },
    { name: "Kosovo", code: "+383", flag: "🇽🇰" },
    { name: "Kuwait", code: "+965", flag: "🇰🇼", nativeName: "(الكويت)" },
    { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬", nativeName: "(Кыргызстан)" },
    { name: "Laos", code: "+856", flag: "🇱🇦", nativeName: "(ລາວ)" },
    { name: "Latvia", code: "+371", flag: "🇱🇻", nativeName: "(Latvija)" },
    { name: "Lebanon", code: "+961", flag: "🇱🇧", nativeName: "(لبنان)" },
    { name: "Lesotho", code: "+266", flag: "🇱🇸" },
    { name: "Liberia", code: "+231", flag: "🇱🇷" },
    { name: "Libya", code: "+218", flag: "🇱🇾", nativeName: "(ليبيا)" },
    { name: "Liechtenstein", code: "+423", flag: "🇱🇮" },
    { name: "Lithuania", code: "+370", flag: "🇱🇹", nativeName: "(Lietuva)" },
    { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
    { name: "Macau", code: "+853", flag: "🇲🇴" },
    { name: "North Macedonia", code: "+389", flag: "🇲🇰" },
    { name: "Madagascar", code: "+261", flag: "🇲🇬" },
    { name: "Malawi", code: "+265", flag: "🇲🇼" },
    { name: "Malaysia", code: "+60", flag: "🇲🇾" },
    { name: "Maldives", code: "+960", flag: "🇲🇻" },
    { name: "Mali", code: "+223", flag: "🇲🇱" },
    { name: "Malta", code: "+356", flag: "🇲🇹" },
    { name: "Marshall Islands", code: "+ dynasty", flag: "🇲🇭" },
    { name: "Martinique", code: "+596", flag: "🇲🇶" },
    { name: "Mauritania", code: "+222", flag: "🇲🇷", nativeName: "(موريتانيا)" },
    { name: "Mauritius", code: "+230", flag: "🇲🇺" },
    { name: "Mayotte", code: "+262", flag: "🇾🇹" },
    { name: "Mexico", code: "+52", flag: "🇲🇽", nativeName: "(México)" },
    { name: "Micronesia", code: "+691", flag: "🇫🇲" },
    { name: "Moldova", code: "+373", flag: "🇲🇩" },
    { name: "Monaco", code: "+377", flag: "🇲🇨" },
    { name: "Mongolia", code: "+976", flag: "🇲🇳", nativeName: "(Монгол)" },
    { name: "Montenegro", code: "+382", flag: "🇲🇪", nativeName: "(Црна Гора)" },
    { name: "Montserrat", code: "+1", flag: "🇲🇸" },
    { name: "Morocco", code: "+212", flag: "🇲🇦", nativeName: "(المغرب)" },
    { name: "Mozambique", code: "+258", flag: "🇲🇿" },
    { name: "Myanmar", code: "+95", flag: "🇲🇲", nativeName: "(မြန်မာ)" },
    { name: "Namibia", code: "+264", flag: "🇳🇦" },
    { name: "Nauru", code: "+674", flag: "🇳🇷" },
    { name: "Nepal", code: "+977", flag: "🇳🇵", nativeName: "(नेपाल)" },
    { name: "Netherlands", code: "+31", flag: "🇳🇱", nativeName: "(Nederland)" },
    { name: "New Caledonia", code: "+687", flag: "🇳🇨" },
    { name: "New Zealand", code: "+64", flag: "🇳🇿" },
    { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
    { name: "Niger", code: "+227", flag: "🇳🇪" },
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "Norfolk Island", code: "+672", flag: "🇳🇫" },
    { name: "North Korea", code: "+850", flag: "🇰🇵", nativeName: "(조선)" },
    { name: "Northern Mariana Islands", code: "+1", flag: "🇲🇵" },
    { name: "Norway", code: "+47", flag: "🇳🇴", nativeName: "(Norge)" },
    { name: "Oman", code: "+968", flag: "🇴🇲", nativeName: "(عُمان)" },
    { name: "Pakistan", code: "+92", flag: "🇵🇰", nativeName: "(پاکستان)" },
    { name: "Palau", code: "+680", flag: "🇵🇼" },
    { name: "Palestine", code: "+970", flag: "🇵🇸", nativeName: "(فلسطين)" },
    { name: "Panama", code: "+507", flag: "🇵🇦" },
    { name: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
    { name: "Paraguay", code: "+595", flag: "🇵🇾" },
    { name: "Peru", code: "+51", flag: "🇵🇪" },
    { name: "Philippines", code: "+63", flag: "🇵🇭" },
    { name: "Poland", code: "+48", flag: "🇵🇱", nativeName: "(Polska)" },
    { name: "Portugal", code: "+351", flag: "🇵🇹" },
    { name: "Puerto Rico", code: "+1", flag: "🇵🇷" },
    { name: "Qatar", code: "+974", flag: "🇶🇦", nativeName: "(قطر)" },
    { name: "Réunion", code: "+262", flag: "🇷🇪" },
    { name: "Romania", code: "+40", flag: "🇷🇴", nativeName: "(România)" },
    { name: "Russia", code: "+7", flag: "🇷🇺", nativeName: "(Россия)" },
    { name: "Rwanda", code: "+250", flag: "🇷🇼" },
    { name: "Saint Kitts and Nevis", code: "+1", flag: "🇰🇳" },
    { name: "Saint Lucia", code: "+1", flag: "🇱🇨" },
    { name: "Saint Vincent and the Grenadines", code: "+1", flag: "🇻🇨" },
    { name: "Samoa", code: "+685", flag: "🇼🇸" },
    { name: "San Marino", code: "+378", flag: "🇸🇲" },
    { name: "São Tomé and Príncipe", code: "+239", flag: "🇸🇹" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", nativeName: "(المملكة العربية السعودية)" },
    { name: "Senegal", code: "+221", flag: "🇸🇳" },
    { name: "Serbia", code: "+381", flag: "🇷🇸", nativeName: "(Србија)" },
    { name: "Seychelles", code: "+248", flag: "🇸🇨" },
    { name: "Sierra Leone", code: "+232", flag: "🇸🇱" },
    { name: "Singapore", code: "+65", flag: "🇸🇬" },
    { name: "Slovakia", code: "+421", flag: "🇸🇰", nativeName: "(Slovensko)" },
    { name: "Slovenia", code: "+386", flag: "🇸🇮", nativeName: "(Slovenija)" },
    { name: "Solomon Islands", code: "+677", flag: "🇸🇧" },
    { name: "Somalia", code: "+252", flag: "🇸🇴", nativeName: "(الصومال)" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
    { name: "South Korea", code: "+82", flag: "🇰🇷", nativeName: "(대한민국)" },
    { name: "South Sudan", code: "+211", flag: "🇸🇸" },
    { name: "Spain", code: "+34", flag: "🇪🇸", nativeName: "(España)" },
    { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
    { name: "Sudan", code: "+249", flag: "🇸🇩", nativeName: "(السودان)" },
    { name: "Suriname", code: "+597", flag: "🇸🇷" },
    { name: "Swaziland", code: "+268", flag: "🇸🇿" },
    { name: "Sweden", code: "+46", flag: "🇸🇪", nativeName: "(Sverige)" },
    { name: "Switzerland", code: "+41", flag: "🇨🇭", nativeName: "(Schweiz)" },
    { name: "Syria", code: "+963", flag: "🇸🇾", nativeName: "(سوريا)" },
    { name: "Taiwan", code: "+886", flag: "🇹🇼", nativeName: "(台灣)" },
    { name: "Tajikistan", code: "+992", flag: "🇹🇯", nativeName: "(Тоҷикистон)" },
    { name: "Tanzania", code: "+255", flag: "🇹🇿" },
    { name: "Thailand", code: "+66", flag: "🇹🇭", nativeName: "(ประเทศไทย)" },
    { name: "Timor-Leste", code: "+670", flag: "🇹🇱" },
    { name: "Togo", code: "+228", flag: "🇹🇬" },
    { name: "Tokelau", code: "+690", flag: "🇹🇰" },
    { name: "Tonga", code: "+676", flag: "🇹🇴" },
    { name: "Trinidad and Tobago", code: "+1", flag: "🇹🇹" },
    { name: "Tunisia", code: "+216", flag: "🇹🇳", nativeName: "(تونس)" },
    { name: "Turkey", code: "+90", flag: "🇹🇷", nativeName: "(Türkiye)" },
    { name: "Turkmenistan", code: "+993", flag: "🇹🇲" },
    { name: "Turks and Caicos Islands", code: "+1", flag: "🇹🇨" },
    { name: "Tuvalu", code: "+688", flag: "🇹🇻" },
    { name: "Uganda", code: "+256", flag: "🇺🇬" },
    { name: "Ukraine", code: "+380", flag: "🇺🇦", nativeName: "(Україна)" },
    { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", nativeName: "(الإمارات العربية المتحدة)" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "Uruguay", code: "+598", flag: "🇺🇾" },
    { name: "Uzbekistan", code: "+998", flag: "🇺🇿", nativeName: "(Oʻzbekiston)" },
    { name: "Vanuatu", code: "+678", flag: "🇻🇺" },
    { name: "Vatican City", code: "+379", flag: "🇻🇦" },
    { name: "Venezuela", code: "+58", flag: "🇻🇪" },
    { name: "Vietnam", code: "+84", flag: "🇻🇳", nativeName: "(Việt Nam)" },
    { name: "Wallis and Futuna", code: "+681", flag: "🇼🇫" },
    { name: "Western Sahara", code: "+212", flag: "🇪🇭" },
    { name: "Yemen", code: "+967", flag: "🇾🇪", nativeName: "(اليمن)" },
    { name: "Zambia", code: "+260", flag: "🇿🇲" },
    { name: "Zimbabwe", code: "+263", flag: "🇿🇼" }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (country.nativeName && country.nativeName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const tabs = ["Overview", "Requests", "Reviews", "Widgets", "Listings", "Settings"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center">
            <div className="text-lg font-medium text-gray-800 py-4 mr-8">Reputation</div>
            <div className="flex space-x-6">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 py-4 cursor-pointer ${
                    activeTab === tab
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-6xl mx-auto w-full my-6">
        <div className="w-1/3 pr-4">
          <div className="bg-white rounded-md shadow p-4 mb-6 overflow-y-scroll h-140">
            <div className="flex justify-between items-center">
              <div className="text-gray-800 font-medium">Steps</div>
              <div className="text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative mt-6">
              <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="relative flex items-start mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full z-10">
                  <div>1</div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center font-medium">
                    Scan Your Business
                    <Search className="w-5 h-5 ml-1 text-blue-500" />
                  </div>
                  <div className="text-gray-700 text-sm">Get a Snapshot of Your Online Presence</div>
                </div>
              </div>

              <div className="relative flex items-start mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full z-10">
                  <div className="text-gray-400">2</div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center text-gray-400 font-medium">
                    Review Your Listings
                    <Globe className="w-5 h-5 ml-1 text-blue-400" />
                  </div>
                  <div className="text-gray-400 text-sm">See How You're Represented Online</div>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full z-10">
                  <div className="text-gray-400">3</div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center text-gray-400 font-medium">
                    Correct and Elevate
                    <Star className="w-5 h-5 ml-1 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="text-gray-400 text-sm">Fix Issues and Boost Your Business Visibility</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow mt-8">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mx-auto">
                  <RefreshCw className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="font-medium text-center">Activate Listings</div>
                <div className="text-sm text-gray-600 text-center flex items-center justify-center">
                  What we offer
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="ml-2 text-gray-700">Listing Management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="ml-2 text-gray-700">Sync Functionality</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Link className="w-4 h-4 text-yellow-500" />
                    </div>
                    <span className="ml-2 text-gray-700">Premium Backlinks</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <Database className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="ml-2 text-gray-700">Duplicate Suppression</span>
                  </div>
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-6">
                  Activate for $49 /month
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 pl-4">
          <div className="bg-white rounded-md shadow p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth={2} d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 0L9 3m6 0v4H9V3m6 0l-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-xl font-medium">Scan My business</div>
                <div className="text-gray-500">Get a Snapshot of Your Online Presence</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-gray-700 mb-1">
                  Business name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Zip code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className={`flex border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-md overflow-hidden`}>
                    <div
                      className="bg-gray-50 flex items-center px-2 cursor-pointer"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    >
                      <div className="text-sm font-medium mr-1">{selectedCountry.code}</div>
                      <div className="text-xl">{selectedCountry.flag}</div>
                      <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                    <input
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="flex-1 px-3 py-2 outline-none"
                      placeholder={selectedCountry.code === "+1" ? "(123) 456-7890" : "Enter phone number"}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                  )}

                  {countryDropdownOpen && (
                    <div
                      ref={countryDropdownRef}
                      className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-72 overflow-y-auto"
                    >
                      <div className="p-2 border-b border-gray-100">
                        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                          <Search className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search country"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ml-2 outline-none w-full text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        {filteredCountries.map((country) => (
                          <div
                            key={`${country.name}-${country.code}`}
                            className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setSelectedCountry(country);
                              setCountryDropdownOpen(false);
                              setPhone(""); // Reset phone when country changes
                            }}
                          >
                            <div className="text-xl mr-2">{country.flag}</div>
                            <div className="flex-1">
                              {country.name} {country.nativeName && `(${country.nativeName})`} {country.code}
                            </div>
                            {selectedCountry.code === country.code && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-2 flex justify-end space-x-4 mt-4">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowScanResults(false)} // Return to ListingManagement
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                  disabled={phoneError || !phone}
                >
                  Scan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Original ListingManagement Component with navigation to BusinessListingsInterface
export default function ListingManagement() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeNav, setActiveNav] = useState('listings');
  const [showScanResults, setShowScanResults] = useState(false); // State to toggle pages

  // Define slides data
  const slides = [
    {
      title: "One Tool to List",
      image: (
        <img
          src="https://storage.googleapis.com/preview-production-assets/yext/assets/listings-promo-connect.png"
          alt="Listing Management Tool"
          className="max-w-full h-auto"
        />
      ),
    },
    {
      title: "One Tool to Rank",
      image: (
        <img
          src="https://storage.googleapis.com/preview-production-assets/yext/assets/pitch-carousel-image-two.svg"
          alt="Business Presence Management"
          className="max-w-full h-auto"
        />
      ),
    },
    {
      title: "One Tool to Dominate",
      image: (
        <img
          src="https://storage.googleapis.com/preview-production-assets/yext/assets/pitch-carousel-image-three.svg"
          alt="Online Visibility Enhancement"
          className="max-w-full h-auto"
        />
      ),
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!showScanResults) {
      const interval = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [slides.length, showScanResults]);

  // Navigation items
  const navItems = [
    { name: "Overview", path: "/Ov" },
    { name: "Requests", path: "/re" },
    { name: "Reviews", path: "/rev" },
    { name: "Widgets", path: "/w" },
    { name: "Listings", path: "/lii" },
    { name: "Settings", path: "/s" },
  ]
  // Handle navigation click
  const handleNavClick = (navId) => {
    setActiveNav(navId);
  };

  // Handle scan button click
  const handleScanClick = () => {
    setShowScanResults(true); // Switch to the BusinessListingsInterface page
  };

  // Conditionally render the BusinessListingsInterface page or the original content
  if (showScanResults) {
    return <BusinessListingsInterface setShowScanResults={setShowScanResults} />;
  }



   const handleTemplateChange = (index, field, value) => {
   

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
                    item.name === "Listings"
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

      {/* Scrollable Main Content */}
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 max-w-2xl mx-auto h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="p-6">
              {/* Slide title */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">
                  {slides[activeSlide].title.split(' ').map((word, index) => {
                    const highlightWords = ['list', 'dominate', 'rank'];
                    return highlightWords.includes(word.toLowerCase()) ? (
                      <span key={index} className="text-blue-600">
                        {word}{' '}
                      </span>
                    ) : (
                      <span key={index}>{word} </span>
                    );
                  })}
                </h2>
              </div>

              {/* Slide content */}
              <div className="flex justify-center mb-8">{slides[activeSlide].image}</div>

              {/* Slider dots */}
              <div className="flex justify-center space-x-2 mb-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === activeSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* CTA Text */}
              <div className="text-center mb-8">
                <p className="text-gray-800 max-w-2xl mx-auto">
                  Don't leave your online reputation to chance - harness the potential of Listings today!
                </p>
              </div>

              {/* Unlock Potential Box */}
              <div className="border border-gray-200 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Unlock Your Business's Potential</h3>
                      <p className="text-gray-600 text-sm">
                        Scan Now to Discover If a Listings Subscription is Your Missing Link
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleScanClick} // Trigger page switch to BusinessListingsInterface
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors duration-200 whitespace-nowrap"
                  >
                    Scan my business for FREE!
                  </button>
                </div>
              </div>

              {/* What We Offer Section */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-center mb-6">What We Offer</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Settings, color: 'blue', text: 'Listing Management' },
                    { icon: LinkIcon, color: 'yellow', text: 'Premium Backlinks' },
                    { icon: Cloud, color: 'green', text: 'Sync Functionality' },
                    { icon: Copy, color: 'purple', text: 'Duplicate Suppression' },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          item.color === 'blue'
                            ? 'bg-blue-100'
                            : item.color === 'yellow'
                            ? 'bg-yellow-100'
                            : item.color === 'green'
                            ? 'bg-green-100'
                            : 'bg-purple-100'
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 ${
                            item.color === 'blue'
                              ? 'text-blue-600'
                              : item.color === 'yellow'
                              ? 'text-yellow-600'
                              : item.color === 'green'
                              ? 'text-green-600'
                              : 'text-purple-600'
                          }`}
                        />
                      </div>
                      <span className="text-sm text-gray-800 text-center">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-4 mb-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200">
                  Activate Listings for $49 / month
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}