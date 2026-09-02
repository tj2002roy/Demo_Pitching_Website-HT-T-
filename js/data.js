/**
 * Default Seed Data for Hrishi Tours & Travels
 * Specializing in Sikkim, Old Silk Route, Darjeeling, Dooars & Northeast India
 * Contact / WhatsApp: +91 7908287972
 */

const DEFAULT_DATA = {
  company: {
    name: "Hrishi Tours & Travels",
    founder: "Hrishav Saha",
    tagline: "Explore The Soul of The Himalayas with Local Mountain Experts",
    phone: "+91 7908287972",
    whatsapp: "917908287972",
    email: "hrishitoursandtravels@gmail.com",
    address: "Pradhan Nagar, Near Junction Railway Station, Siliguri, West Bengal 734003",
    logo: "HT&T.jpeg",
    operatingRegions: ["Sikkim", "Old Silk Route", "Darjeeling", "Kalimpong", "Dooars", "Meghalaya", "Arunachal Pradesh"],
    facebookUrl: "https://www.facebook.com/profile.php?id=61561791995901",
    instagramUrl: "#",
    experienceYears: "8+",
    happyTravelers: "4,500+",
    rating: "4.9/5",
    totalReviews: "320+"
  },

  banner: {
    enabled: true,
    text: "🏔️ Special Early-Bird Offer: Get 15% OFF on 5N/6D Sikkim Silk Route & North Sikkim Packages! Call/WhatsApp: +91 7908287972",
    ctaText: "Claim Discount",
    ctaLink: "#contact"
  },

  destinations: [
    {
      id: "sikkim",
      name: "Sikkim (Gangtok & North Sikkim)",
      tagline: "Land of Kanchenjunga, Sacred Lakes & Alpine Valleys",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      highlights: ["Gurudongmar Lake (17,800 ft)", "Yumthang Valley of Flowers", "Tsomgo Lake & Nathula Pass", "Pelling Skywalk & Kanchenjunga View"],
      bestTime: "Oct to Dec (Snow/Clear Views), Mar to Jun (Flowers)",
      duration: "4 to 8 Days",
      popular: true
    },
    {
      id: "silk-route",
      name: "The Old Silk Route (Zuluk)",
      tagline: "Zig-Zag Mountain Loops, Historic Indo-Tibet Trails",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      highlights: ["32 Zig-Zag Hairpin Loops", "Thambi View Point Sunrise", "Kupup (Elephant) Lake & Golf Course", "Gnathang Valley & Padamchen Homestays"],
      bestTime: "Oct to Jun (Snow in Winter, Rhododendrons in Spring)",
      duration: "3 to 5 Days",
      popular: true
    },
    {
      id: "darjeeling",
      name: "Darjeeling & Kalimpong",
      tagline: "Queen of the Hills, Lush Tea Gardens & Heritage Toy Train",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      highlights: ["Tiger Hill Golden Sunrise", "Batasia Loop & UNESCO Toy Train", "Happy Valley Tea Estate", "Deolo Hill & Morgan House Kalimpong"],
      bestTime: "Sep to Nov & Mar to May",
      duration: "3 to 5 Days",
      popular: true
    },
    {
      id: "dooars",
      name: "Dooars Wildlife & Jungle Safari",
      tagline: "Dense Sal Forests, One-Horned Rhinos & River Valleys",
      image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
      highlights: ["Jaldapara Elephant & Jeep Safari", "Gorumara Rhino Spotting", "Buxa Fort & Tiger Reserve", "Jayanti Riverbank & Chilapata Forest"],
      bestTime: "Oct to May (Safaris open)",
      duration: "3 to 5 Days",
      popular: false
    },
    {
      id: "offbeat",
      name: "Offbeat North Bengal & Sikkim",
      tagline: "Serene Village Homestays Away From Crowds",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      highlights: ["Lepchajagat Pine Forest Mist", "Sittong Orange Orchards", "Lamahatta Sacred Grove", "Chatakpur & Ahaldara Viewpoint"],
      bestTime: "Round the Year",
      duration: "2 to 4 Days",
      popular: true
    },
    {
      id: "meghalaya",
      name: "Meghalaya (Abode of Clouds)",
      tagline: "Living Root Bridges, Crystal Dawki Waters & Waterfalls",
      image: "meghalaya.jpg",
      highlights: ["Nohkalikai & Seven Sisters Falls", "Cherrapunji Double Decker Root Bridge", "Dawki Transparent River Boating", "Mawlynnong Cleanest Village"],
      bestTime: "Oct to May",
      duration: "5 to 7 Days",
      popular: false
    }
  ],

  packages: [
    {
      id: "pkg-silk-route-4n5d",
      title: "Enchanting Old Silk Route Zuluk & Gnathang Tour",
      destination: "silk-route",
      duration: "4 Nights / 5 Days",
      pickupDrop: "NJP Railway Stn / Bagdogra Airport (IXB)",
      price: 8499,
      originalPrice: 10499,
      rating: 4.9,
      reviewsCount: 84,
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      featured: true,
      category: "Special",
      inclusions: ["Dedicated Mountain Cab (Bolero/Innova)", "Authentic Cozy Homestays", "All Meals (Breakfast, Lunch, Dinner)", "Silk Route Permits & Inner Line Passes", "Driver Allowances & Fuel"],
      exclusions: ["Train / Flight Tickets", "Personal Expenses & Extra Snacks", "Nathula Pass Entry (if opted additional)"],
      itinerary: [
        { day: 1, title: "NJP/IXB to Sillery Gaon / Pedong", desc: "Pickup from NJP/Bagdogra and scenic drive across Teesta River to tranquil Sillery Gaon ('The New Darjeeling'). Evening walk to Ramitey View Point." },
        { day: 2, title: "Sillery Gaon to Zuluk via Rongli & Padamchen", desc: "Complete permit formalities at Rongli. Witness Kuikhola Waterfalls, Lingtam, Padamchen and overnight at historical Zuluk village." },
        { day: 3, title: "Zuluk Sunrise, Gnathang Valley & Kupup Lake", desc: "Early morning sunrise at Thambi View Point (32 hairpin loops view). Visit Lungthung, Gnathang Valley, Old Baba Mandir, Kupup (Elephant) Lake & Tukla Valley." },
        { day: 4, title: "Zuluk/Padamchen to Aritar Lake & Mankhim", desc: "Drive to emerald green Aritar (Lampokhari) Lake. Enjoy paddle boating and magnificent panoramic views from Mankhim Hill top temple." },
        { day: 5, title: "Aritar to NJP / Bagdogra Drop", desc: "After wholesome local breakfast, drive down through scenic valleys back to NJP Railway Station or Bagdogra Airport with unforgettable memories." }
      ]
    },
    {
      id: "pkg-sikkim-glory-5n6d",
      title: "Gems of Sikkim: Gangtok, Tsomgo Lake, Lachen & Lachung",
      destination: "sikkim",
      duration: "5 Nights / 6 Days",
      pickupDrop: "NJP / Bagdogra",
      price: 12999,
      originalPrice: 15499,
      rating: 5.0,
      reviewsCount: 112,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      featured: true,
      category: "Bestseller",
      inclusions: ["Private Bolero / Scorpio / Innova", "Premium 3-Star Hotels & Mountain Lodges", "Breakfast & Dinner", "North Sikkim Restricted Area Permits", "Experienced Local Driver"],
      exclusions: ["Nathula Pass fee", "Zero Point / Katao vehicle addon", "Personal laundry & beverages"],
      itinerary: [
        { day: 1, title: "Arrival NJP/Bagdogra - Transfer to Gangtok", desc: "Scenic mountain drive along Teesta River to Gangtok (5,500 ft). Evening leisure stroll along bustling MG Marg." },
        { day: 2, title: "Excursion to Sacred Tsomgo Lake & Baba Mandir", desc: "Drive to Tsomgo Lake (12,400 ft) surrounded by alpine peaks. Visit historic Baba Harbhajan Singh Mandir & optional Nathula Pass." },
        { day: 3, title: "Gangtok to Lachen (North Sikkim)", desc: "Enthralling drive via Singhik Viewpoint, Seven Sisters Waterfalls, and Chungthang Confluence. Check into Lachen village." },
        { day: 4, title: "Sacred Gurudongmar Lake & Transfer to Lachung", desc: "Pre-dawn excursion to Gurudongmar Lake (17,800 ft - one of world's highest lakes). Post-lunch transfer to apple orchards of Lachung." },
        { day: 5, title: "Yumthang Valley of Flowers & Gangtok Return", desc: "Visit breathtaking Yumthang Valley, Hot Springs, and optional Zero Point (Yumesamdong). Drive back to Gangtok in evening." },
        { day: 6, title: "Gangtok to NJP / Bagdogra Departure", desc: "Morning breakfast, souvenir shopping at MG Marg, and smooth drop at NJP or Bagdogra Airport." }
      ]
    },
    {
      id: "pkg-darjeeling-pelling-4n5d",
      title: "Darjeeling Sunrise & Royal Pelling Kanchenjunga Tour",
      destination: "darjeeling",
      duration: "4 Nights / 5 Days",
      pickupDrop: "NJP / Bagdogra",
      price: 9499,
      originalPrice: 11999,
      rating: 4.8,
      reviewsCount: 68,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      featured: true,
      category: "Popular",
      inclusions: ["Exclusive Cab for entire tour", "Deluxe Hotel Stays with Mountain Views", "Daily Breakfast & Dinner", "All Sightseeing & Tolls/Parking", "Driver Food & Night Stay"],
      exclusions: ["Toy Train Ride Ticket", "Monument Entry fees", "Items not specified in inclusions"],
      itinerary: [
        { day: 1, title: "NJP/IXB to Darjeeling Transfer", desc: "Drive through rolling tea estates to Darjeeling (6,700 ft). Evening visit to Chowrasta Mall Road and Glenary's bakery." },
        { day: 2, title: "Tiger Hill Sunrise & Darjeeling 7-Points Sightseeing", desc: "4:00 AM Tiger Hill sunrise over Mt. Kanchenjunga. Visit Batasia Loop, Ghoom Monastery, Himalayan Mountaineering Institute & Tea Garden." },
        { day: 3, title: "Darjeeling to Pelling via Rabdentse Ruins", desc: "Drive to West Sikkim's jewel Pelling. Visit Rabdentse Ruins (ancient capital), Pemayangtse Monastery, and Glass Skywalk." },
        { day: 4, title: "Pelling Full Day Sightseeing (Waterfalls & Lake)", desc: "Visit sacred Khecheopalri Wish-Fulfilling Lake, Rimbi Waterfalls, Kanchenjunga Falls, and Orange Garden." },
        { day: 5, title: "Pelling to NJP / Bagdogra Drop", desc: "Descend through lush green forests and tea valleys to NJP Station/Bagdogra Airport." }
      ]
    },
    {
      id: "pkg-offbeat-lepchajagat-sittong-3n4d",
      title: "Hidden Gem: Lepchajagat, Sittong Orange Valley & Lamahatta",
      destination: "offbeat",
      duration: "3 Nights / 4 Days",
      pickupDrop: "NJP / Siliguri",
      price: 6999,
      originalPrice: 8499,
      rating: 4.9,
      reviewsCount: 47,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      featured: false,
      category: "Offbeat",
      inclusions: ["Dedicated Cab & Driver", "Authentic Organic Village Homestays", "All Organic Home-Cooked Meals", "Campfire / Evening Tea", "Local Guide Assistance"],
      exclusions: ["Alcoholic beverages", "Personal tips & porter charges"],
      itinerary: [
        { day: 1, title: "NJP to Lepchajagat Pine Woods", desc: "Check into peaceful homestay in Lepchajagat amidst dense rhododendron and oak trees. Mesmerizing sunset over Kanchenjunga." },
        { day: 2, title: "Lepchajagat to Sittong via Lamahatta Eco Park", desc: "Visit Lamahatta manicured garden & sacred pond. Continue to Sittong, renowned for orange orchards and birdwatching." },
        { day: 3, title: "Sittong Exploration & Ahaldara Viewpoint", desc: "Visit Ahaldara View Point with 360-degree views, Namthing Pokhari (Himalayan Salamander habitat), and cinchona plantation." },
        { day: 4, title: "Sittong to NJP Departure", desc: "Relaxing drive back through tea estates to Siliguri/NJP." }
      ]
    },
    {
      id: "pkg-dooars-wildlife-3n4d",
      title: "Wild Dooars: Jaldapara, Gorumara & Buxa Tiger Trail",
      destination: "dooars",
      duration: "3 Nights / 4 Days",
      pickupDrop: "Hasimara / NJP / Alipurduar",
      price: 7999,
      originalPrice: 9999,
      rating: 4.7,
      reviewsCount: 39,
      image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
      featured: false,
      category: "Wildlife",
      inclusions: ["Jungle Resort Stays", "Private Safari Vehicle Assistance", "Breakfast & Dinner", "Driver Allowance & Inter-state permit", "Expert Nature Guide"],
      exclusions: ["Forest Safari Entry Tickets (Direct at Counter)", "Camera fees"],
      itinerary: [
        { day: 1, title: "Arrival NJP/Hasimara to Lataguri/Gorumara", desc: "Transfer to jungle resort. Evening tribal dance show and bonfire." },
        { day: 2, title: "Gorumara Morning Safari & Murti River", desc: "Early morning jeep safari into Gorumara National Park. Afternoon visit to Murti River bank and Samsing-Suntalekhola." },
        { day: 3, title: "Jaldapara Rhino Safari & Chilapata Forest", desc: "Explore Jaldapara National Park known for Indian One-horned Rhinoceros and elephant safaris. Visit ancient ruins inside Chilapata." },
        { day: 4, title: "Buxa-Jayanti Exploration & Drop", desc: "Visit Jayanti river bed (Queen of Dooars) and transfer to Hasimara/NJP railway station." }
      ]
    },
    {
      id: "pkg-meghalaya-wonders-5n6d",
      title: "Meghalaya Escapade: Shillong, Cherrapunji & Crystal Dawki",
      destination: "meghalaya",
      duration: "5 Nights / 6 Days",
      pickupDrop: "Guwahati Airport (GAU) / Station",
      price: 14999,
      originalPrice: 17999,
      rating: 5.0,
      reviewsCount: 53,
      image: "meghalaya.jpg",
      featured: true,
      category: "Adventure",
      inclusions: ["Private AC/Heated Cab with Mountain Driver", "Deluxe Resort & Homestay Stays", "Daily Breakfast", "Dawki Boating Coordination", "Kamakhya VIP Pass Support"],
      exclusions: ["Airfare to Guwahati", "Ziplining / Adventure Sports fees"],
      itinerary: [
        { day: 1, title: "Guwahati to Shillong via Umiam Lake", desc: "Pickup from Guwahati. Stop at majestic Umiam Lake (Barapani). Check into Shillong hotel & Police Bazar evening walk." },
        { day: 2, title: "Shillong to Cherrapunji (Sohra) Waterfalls", desc: "Visit Elephant Falls, Mawkdok Dympep Valley Viewpoint, Nohkalikai Falls, Mawsmai Cave, and Seven Sisters Falls." },
        { day: 3, title: "Double Decker Living Root Bridge Trek", desc: "Trek through lush tropical jungle in Tyrna down to the legendary Double Decker Living Root Bridge & Rainbow Falls." },
        { day: 4, title: "Cherrapunji to Dawki & Mawlynnong", desc: "Boating in crystal clear Umngot River at Dawki (Indo-Bangladesh border). Explore Mawlynnong (Asia's Cleanest Village)." },
        { day: 5, title: "Mawlynnong to Shillong via Krang Shuri", desc: "Visit stunning turquoise Krang Shuri Waterfalls. Return to Shillong for leisure evening." },
        { day: 6, title: "Shillong - Kamakhya Temple - Guwahati Drop", desc: "Morning darshan at sacred Maa Kamakhya Temple in Guwahati, followed by drop at Airport/Station." }
      ]
    }
  ],

  cabs: [
    {
      id: "cab-innova-crysta",
      name: "Toyota Innova / Innova Crysta",
      type: "Luxury SUV / Mountain Cruiser",
      capacity: "6 - 7 Passengers",
      luggage: "4 Large Bags",
      features: ["Pushback Captain Seats", "Dual AC & Climate Control", "High Ground Clearance", "Experienced Mountain Chauffeur"],
      ratePerDay: 4200,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      recommendedFor: "Family Tours, Long Himalayan Journeys, North Sikkim & Silk Route"
    },
    {
      id: "cab-scorpio-bolero",
      name: "Mahindra Scorpio / Bolero 4x4",
      type: "Rugged Mountain 4WD / MUV",
      capacity: "6 - 8 Passengers",
      luggage: "3 Large Bags + Roof Carrier",
      features: ["All-Terrain 4WD Capability", "Perfect for Gurudongmar & High Passes", "Robust Hill Suspension", "Local Sikkim Permit Driver"],
      ratePerDay: 3500,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
      recommendedFor: "Zuluk Silk Route, Gurudongmar Lake, Offbeat Rough Terrains"
    },
    {
      id: "cab-swift-dzire",
      name: "Swift Dzire / Toyota Etios",
      type: "Compact Sedan",
      capacity: "4 Passengers",
      luggage: "2 Medium Bags",
      features: ["High Mileage & Affordable", "Comfortable for Couples & Small Families", "Smooth Ride on Paved Hill Roads", "AC & Clean Interiors"],
      ratePerDay: 2600,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80",
      recommendedFor: "Darjeeling, Kalimpong, Gangtok Town, Dooars Safari"
    },
    {
      id: "cab-tempo-traveller",
      name: "Force Tempo Traveller (13/17/26 Seater)",
      type: "Group Minibus",
      capacity: "12 - 26 Passengers",
      luggage: "Ample Luggage Boot & Roof Rack",
      features: ["Comfortable Pushback High-Back Seats", "Music System & Mic", "Spacious Aisle", "Expert Group Tour Chauffeur"],
      ratePerDay: 6500,
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
      recommendedFor: "Corporate Groups, College Excursions, Extended Family Trips"
    }
  ],

  cabRoutes: [
    { from: "NJP Railway Stn / Bagdogra Airport", to: "Gangtok (East Sikkim)", distance: "125 km (4.5 hrs)", sedanRate: 2800, suvRate: 4200 },
    { from: "NJP Railway Stn / Bagdogra Airport", to: "Darjeeling", distance: "70 km (3 hrs)", sedanRate: 2500, suvRate: 3800 },
    { from: "NJP / Bagdogra Airport", to: "Zuluk (Silk Route Base)", distance: "140 km (5 hrs)", sedanRate: 3200, suvRate: 4500 },
    { from: "NJP / Bagdogra Airport", to: "Pelling (West Sikkim)", distance: "135 km (5 hrs)", sedanRate: 3200, suvRate: 4500 },
    { from: "Gangtok", to: "Lachen & Lachung (North Sikkim 2N3D)", distance: "Roundtrip Package", sedanRate: null, suvRate: 16500 },
    { from: "NJP / Bagdogra Airport", to: "Lataguri / Jaldapara (Dooars)", distance: "80-130 km (2.5-3.5 hrs)", sedanRate: 2600, suvRate: 3900 }
  ],

  testimonials: [
    {
      id: "rev-1",
      name: "Debashis Banerjee & Family",
      location: "Kolkata, West Bengal",
      rating: 5,
      tour: "5N/6D Sikkim Silk Route & Gangtok",
      date: "October 2025",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      review: "Hrishi Tours & Travels made our Silk Route trip flawless! Hrishav Da took care of everything from permits in Rongli to the coziest homestay in Zuluk. The Bolero driver was extremely polite and skilled on the 32 hairpin turns. Highly recommended!"
    },
    {
      id: "rev-2",
      name: "Sneha & Rohit Verma",
      location: "Pune, Maharashtra",
      rating: 5,
      tour: "North Sikkim (Gurudongmar & Yumthang)",
      date: "November 2025",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      review: "We booked our honeymoon tour to North Sikkim through Hrishi Tours. The hotel view in Lachung was breathtaking. They arranged warm blankets, room heaters, and healthy food throughout. Zero hidden costs. True professionals!"
    },
    {
      id: "rev-3",
      name: "Amitabha Roy",
      location: "Howrah, West Bengal",
      rating: 5,
      tour: "Darjeeling & Offbeat Lepchajagat 4D",
      date: "January 2026",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      review: "Clean cabs, punctual pickup from NJP, and genuine local advice. They helped us avoid crowded spots and took us to serene pine homestays. Will book Meghalaya with them next time for sure."
    },
    {
      id: "rev-4",
      name: "Priyanka Sharma",
      location: "Guwahati, Assam",
      rating: 5,
      tour: "Dooars Jungle Safari & Lataguri",
      date: "February 2026",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      review: "Super smooth coordination! The jeep safari booking in Gorumara was arranged seamlessly. We spotted rhinos and wild elephants. Thank you Hrishi Tours team!"
    }
  ],

  initialEnquiries: [
    {
      id: "ENQ-1001",
      customerName: "Souvik Mukherjee",
      phone: "+91 9830123456",
      email: "souvik.mukh@gmail.com",
      destination: "Silk Route Zuluk",
      travelDate: "2026-10-15",
      adults: 4,
      children: 1,
      cabRequired: "Bolero / Scorpio",
      notes: "Need 4N/5D package with Zuluk and Gnathang homestay. Please share quotation on WhatsApp.",
      status: "New",
      timestamp: "2026-09-02T10:14:00"
    },
    {
      id: "ENQ-1002",
      customerName: "Ananya Ghosh",
      phone: "+91 9433987654",
      email: "ananya.ghosh@outlook.com",
      destination: "North Sikkim (Gurudongmar)",
      travelDate: "2026-11-04",
      adults: 2,
      children: 0,
      cabRequired: "Innova Crysta",
      notes: "Honeymoon couple trip. Need luxury hotels and heater facilities in Lachen/Lachung.",
      status: "Contacted",
      timestamp: "2026-09-01T14:30:00"
    },
    {
      id: "ENQ-1003",
      customerName: "Rajesh Kulkarni",
      phone: "+91 9822114455",
      email: "rajesh.k@rediffmail.com",
      destination: "Darjeeling & Pelling",
      travelDate: "2026-10-22",
      adults: 6,
      children: 2,
      cabRequired: "Tempo Traveller",
      notes: "Family reunion. Pickup from Bagdogra Airport. Need senior-citizen friendly stays.",
      status: "Confirmed",
      timestamp: "2026-08-30T18:45:00"
    },
    {
      id: "ENQ-1004",
      customerName: "Meghna Sengupta",
      phone: "+91 8777654321",
      email: "meghna.sengupta@gmail.com",
      destination: "Meghalaya & Cherrapunji",
      travelDate: "2026-12-10",
      adults: 3,
      children: 0,
      cabRequired: "Innova Crysta",
      notes: "Double decker root bridge trek and Dawki transparent water boating inquiry.",
      status: "New",
      timestamp: "2026-09-02T09:20:00"
    }
  ],

  faqs: [
    {
      q: "What permits are required for Sikkim and the Old Silk Route?",
      a: "For North Sikkim (Gurudongmar, Yumthang) and Old Silk Route (Zuluk, Gnathang), Restricted Area Permits (RAP/PAP) are mandatory. We handle 100% of your permit paperwork! You only need to provide 2 passport-size photos and a valid Voter ID / Passport photocopy (Aadhaar is not accepted by Army checkpoints for border zones)."
    },
    {
      q: "Can we customize our itinerary with specific homestays or offbeat spots?",
      a: "Yes, absolutely! Hrishi Tours & Travels specializes in bespoke tailor-made itineraries. Whether you want an extra day relaxing in Sittong orange gardens, a heritage stay in Darjeeling, or a campfire in Zuluk, we tailor the entire plan to your comfort and pace."
    },
    {
      q: "What vehicles do you provide for mountain travel?",
      a: "We operate well-maintained Innova Crysta, Scorpio, Bolero 4x4, Swift Dzire, and Tempo Travellers. All our chauffeurs are local Himalayan terrain experts trained in cold-start mountain driving and high-altitude safety."
    },
    {
      q: "How do we confirm our booking with Hrishi Tours & Travels?",
      a: "You can send us an inquiry via our website form, call us, or WhatsApp us directly at +91 7908287972. We will provide a transparent day-wise itinerary with total breakdown. A small advance deposit confirms your cab and hotel dates, with the balance payable during the tour."
    }
  ]
};
