# 🏔️ Hrishi Tours & Travels - Website Architecture & Developer Guide

This document provides a comprehensive technical blueprint, design specification, and future extension guide for **Hrishi Tours & Travels** (+91 7908287972).

---

## 1. Project Overview & Business Domain

- **Business Name**: Hrishi Tours & Travels
- **Founder / Lead**: Hrishav Saha
- **Primary Phone & WhatsApp**: `+91 7908287972`
- **Headquarters Base**: Siliguri / NJP Railway Station / Bagdogra, West Bengal
- **Operating Regions**: Sikkim (East, West, South, North Sikkim & Gurudongmar Lake), Old Silk Route (Zuluk, Gnathang, Padamchen), Darjeeling, Kalimpong, Offbeat Dooars, Meghalaya, and Arunachal Pradesh.
- **Core Value Proposition**: Verified local Himalayan chauffeurs, authentic handpicked village homestays, 100% Inner Line / RAP permit handling, and zero hidden costs.

---

## 2. Directory Structure

```
d:/Hrishi Tour&Travels/
├── index.html               # Main entrypoint housing User View & Admin Control Dashboard
├── HT&T.jpeg                # Official circular brand logo (Hiker & Himalayan Peaks)
├── meghalaya.jpg            # High-definition photograph of Nohkalikai Falls, Cherrapunji
├── css/
│   ├── style.css            # Primary design system, typography, colors & responsive layouts
│   └── admin.css            # Admin Dashboard layout, dark sidebar, tables & form styles
├── js/
│   ├── data.js              # Initial seed data for packages, cabs, reviews, inquiries & FAQs
│   ├── app.js               # Application bootstrap, routing, state bridge & toast notifications
│   ├── user.js              # User portal controllers: filters, modal rendering, cab calculator
│   └── admin.js             # Admin management controllers: CRUD, lead updates, CSV export
├── DOCUMENTATION.md         # Full developer instructions & deployment roadmap
└── README.md                # Quickstart guide
```

---

## 3. Design System & Aesthetics

### Color Tokens
- **Himalayan Emerald (Primary)**:
  - Deep Pine: `#04241e`
  - Emerald Green: `#064e3b`
  - Teal Accent: `#0d9488` / `#14b8a6`
- **Sunrise Mountain Gold (Accent)**:
  - Rich Gold: `#f59e0b` / `#d97706`
  - Pale Amber: `#fef3c7`
- **Dark & Glassmorphism Surfaces**:
  - Dark Slate: `#0f172a` / `#0b1322`
  - Background Light: `#f8fafc` / `#f1f5f9`
  - Glass Overlays: `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(14px)`

### Typography
- **Headings**: `Outfit`, sans-serif (700, 800, 900)
- **Body & Captions**: `Plus Jakarta Sans`, sans-serif (400, 500, 600, 700)

---

## 4. Feature Breakdown

### Part 1: Customer-Facing User Portal (`#user-view`)
1. **Dynamic Top Announcement Bar**: Displays active seasonal promotions with quick claim link.
2. **Hero Section**: Tagline, quick trust stats (4.9★ rating, 4,500+ happy travelers), and floating trust cards.
3. **Quick Search & Filter Bar**: Instant multi-criteria package filter (Destination, Duration, Cab Type, Expected Date).
4. **Featured Himalayan Destinations Grid**: Visual cards for Sikkim, Silk Route, Darjeeling, Dooars, Offbeat, and Meghalaya.
5. **Tour Packages Showcase**:
   - Filter pills by region.
   - Package cards with duration badge, pickup location, pricing breakdown, and inclusion highlights.
   - **Day-by-Day Itinerary Modal**: Interactive timeline view with detailed daily plans, full inclusion list, and exclusion list.
6. **Car Rental & Mountain Taxi Fleet**:
   - Vehicle cards for Innova Crysta, Scorpio/Bolero 4x4, Swift Dzire, and Tempo Traveller.
   - **Interactive Cab Fare Estimator**: Real-time fare calculation between NJP/Bagdogra and Gangtok, Darjeeling, Zuluk, Pelling, and Lataguri with direct 1-click WhatsApp quote booking.
7. **Old Silk Route Spotlight**: Dedicated visual feature for Zuluk's 32 hairpin loops and Gnathang homestays.
8. **Testimonials & Reviews**: Verified guest feedback cards with star ratings and tour badges.
9. **Interactive Custom Trip Planner**: Multi-field booking inquiry form that stores leads directly into state and generates a formatted WhatsApp inquiry link.
10. **FAQ Accordion**: Answers permit requirements, cancellation policies, vehicle capabilities, and homestay standards.

---

### Part 2: Admin Control Dashboard (`#admin-view`)
1. **Authentication**: Secured via demo password (`admin123` or 1-Click Quick Demo access).
2. **Executive KPI Cards**: Real-time counters for Total Inquiries, New Leads, Active Tour Packages, Cab Fleet, and Estimated Pipeline Revenue.
3. **Inquiries & Leads Manager**:
   - Full tabular lead tracker.
   - Status switcher (`New` 🔵, `Contacted` 🟡, `Confirmed` 🟢, `Cancelled` 🔴).
   - 1-Click **WhatsApp Customer** button (pre-fills greetings and inquiries).
   - Instant lead deletion with confirmation.
   - **Export to CSV** for spreadsheets.
4. **Tour Package CRUD Manager**:
   - Create new packages with custom itineraries, prices, inclusions, and photo URLs.
   - Edit existing packages live.
   - Delete outdated packages.
   - Toggle "Featured on Homepage" badge.
5. **Cab Fleet Rates Manager**: Update daily rental rates for all vehicle models on the live site.
6. **Announcement Bar Controller**: Modify top promotional text and toggle banner visibility.
7. **System Tools**: Export complete system state as JSON backup or restore default seed data.

---

## 5. Instructions for Antigravity & Future Developers

### How to Run Locally
1. Simply open `index.html` in any modern web browser, or run a local development server:
   ```bash
   # Using Python
   python -m http.server 8080

   # Or using Node.js
   npx serve .
   ```
2. Navigate to `http://localhost:8080`.

### Admin Portal Access (Stealth Security)
To prevent unauthorized tampering, the prominent admin button was removed from the header:
- **Discreet Button**: A small lock icon (`🔒`) at the bottom of the footer.
- **Keyboard Shortcut**: Press `Ctrl + Shift + A` on any page to open the Admin Portal login.
- **Demo Passcode**: `admin123`

### State Management & Persistence
- Data is initialized from `js/data.js` into `localStorage` under the key `hrishi_tours_data_v2`.
- Any edit made in the Admin panel automatically updates `localStorage` and triggers the `dataUpdated` event to refresh both the User and Admin views in real-time.

### Deploying to Production
1. **Netlify**: Drag and drop the `Hrishi Tour&Travels` folder into Netlify Drop.
2. **Vercel**: Run `vercel` in the project root.
3. **GitHub Pages**: Push the repository and enable GitHub Pages on `main` branch.

### Connecting a Real Backend (Node.js / Supabase / Firebase)
- In `js/app.js`, replace the `localStorage` getter and setter inside `AppState` with asynchronous API calls (`fetch('/api/packages')`, `fetch('/api/enquiries')`).
- The modular separation between `js/user.js` and `js/admin.js` ensures backend integration requires zero UI rewriting.

---

## 6. SEO & Schema.org Checklist

- [x] Standard `<title>` and `<meta name="description">` optimized for Sikkim, Silk Route, and Darjeeling tourism.
- [x] OpenGraph meta tags (`og:title`, `og:description`, `og:image`) for Facebook and WhatsApp link previews.
- [x] Schema.org `TravelAgency` JSON-LD structured data linking phone `+917908287972` and Siliguri address.
- [x] Mobile viewport responsive tags and semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>`).
