# NeuroPulse - Neurology & Headache Care Clinic HTML Template

**NeuroPulse** is a premium, multipurpose HTML5 & TailwindCSS web template meticulously engineered for modern medical practices, neurology clinics, headache and migraine treatment centers, neuro-technology startups, and healthcare specialists.

Built according to modern UI/UX principles, NeuroPulse is completely responsive, theme-ready (Dark & Light modes), RTL-compatible (Arabic & Hebrew), and includes a full front-end clinic website along with an interactive Patient Dashboard.

---

## 🌟 Key Features

- **15 Ready-to-Use HTML Pages**:
  - `index.html`: Home 1 – General Neurology & Headache Clinic Landing
  - `index-2.html`: Home 2 – Niche Neuro-Tech, Concussion Recovery & Telehealth
  - `about.html`: About (Clinical philosophy, milestones, medical board)
  - `services.html`: Filterable Clinic Services Grid (Migraine, Diagnostics, EEG/EMG, Infusions)
  - `service-details.html`: Deep-dive service page with CGRP infusion therapy, clinical eligibility, and transparent comparison pricing
  - `doctors.html`: Searchable and filterable medical specialist directory
  - `pricing.html`: Transparent consultation tiers, diagnostic procedure menu, and insurance partner matrix
  - `blog.html`: Filterable medical journal with category navigation and search bar
  - `blog-details.html`: Full clinical article with study callouts, reader feedback counter, and comment system
  - `contact.html`: Clinic inquiry form, emergency triage callout, and branch locator
  - `dashboard.html`: Interactive Patient Dashboard with **live Headache Diary logger**, imaging vault (3T MRI/EEG), and appointments
  - `login.html`: Patient Portal Login with demo credential auto-fill and password reveal
  - `register.html`: New Patient Intake registration with condition selection and HIPAA consent
  - `404.html`: Custom error page with quick clinical recovery links
  - `coming-soon.html`: Pre-launch page with live countdown timer and VIP notification form

- **Precision Header & Navigation**:
  - **Home Dropdown**: Seamlessly toggle between Home 1 and Home 2
  - **Direct Top-Level Links**: About, Services, Doctors, Pricing, Blog, Contact, Dashboard
  - **Instant RTL/LTR Switcher**: Flips document direction (`dir="rtl"`) with mirrored navigation and layout flow
  - **Dark / Light Mode Switcher**: Smooth, persistent theme switching saved to `localStorage`
  - **Patient Login CTA Button**

- **Interactive Functional Components**:
  - Global Fast-Appointment Booking Modal (`openBookingModal()`)
  - Interactive Migraine Trigger & Pain Level Calculator
  - Working Headache Diary Logger (saves entries to browser `localStorage` in real time)
  - Live Doctor Search & Filter
  - Dynamic FAQ Accordions
  - Fast Lucide SVG Icons & Google Fonts (`Plus Jakarta Sans`)

---

## 📁 File Structure

```text
Neurology/
├── index.html            # Home 1 - General Clinic Landing
├── index-2.html          # Home 2 - Neuro-Tech & Concussion
├── about.html            # About Clinic & Medical Leadership
├── services.html         # Treatment Offerings
├── service-details.html  # Specialized Service In-depth
├── doctors.html          # Neurologists & Headache Specialists
├── pricing.html          # Treatment Tiers & Procedures
├── blog.html             # Clinical Research & Articles
├── blog-details.html     # Single Blog Article
├── contact.html          # Contact, Triage & Branches
├── dashboard.html        # Patient Portal & Headache Diary
├── login.html            # Patient Portal Login
├── register.html         # Patient Intake Registration
├── 404.html              # Custom 404 Page
├── coming-soon.html      # Launch Countdown & Maintenance
├── css/
│   └── style.css         # Clinical color tokens, glassmorphism, dark/RTL rules
├── js/
│   └── main.js           # Theme, RTL, mobile drawer, modal, and diary scripts
└── assets/               # Logos and icons
```

---

## 🚀 Quick Start

1. Open any `.html` file directly in Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge.
2. Or serve via any local HTTP server:
   ```bash
   # Using Python 3:
   python -m http.server 8000
   
   # Using Node (npx):
   npx serve .
   ```
3. Visit `http://localhost:8000` to preview the full site.

---

## 🎨 Customization

- **Primary Colors**: Medical Teal (`#0d9488`), Cyan (`#06b6d4`), Deep Clinical Slate (`#0f172a`).
- **Typography**: Google Font `Plus Jakarta Sans` is loaded via CDN in each page's `<head>`.
- **Styling**: Tailwind CSS configuration is embedded in each header with extended color palettes and `darkMode: 'class'`. Additional custom rules are organized in [`css/style.css`](file:///c:/Users/HP/Downloads/Neurology/css/style.css).
- **Scripts**: Modular JavaScript functions for modals, notifications, theme toggling, and RTL are documented in [`js/main.js`](file:///c:/Users/HP/Downloads/Neurology/js/main.js).
