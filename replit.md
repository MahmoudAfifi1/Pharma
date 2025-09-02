# شركة الدواء العربية - للأدوية والمستحضرات الطبية

## Overview

This is a static Arabic pharmaceutical company website built with vanilla HTML, CSS, and JavaScript. The site serves as a corporate presentation for "شركة الدواء العربية" (Arab Pharmaceutical Company), showcasing their medical products and services. The website features a right-to-left (RTL) layout optimized for Arabic content, with sections for company information, products, services, and contact details.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Website**: Built using vanilla HTML5, CSS3, and JavaScript without any frameworks
- **Single Page Application (SPA)**: Uses JavaScript-based section switching instead of traditional page navigation
- **RTL Layout**: Configured for Arabic language with `dir="rtl"` and right-to-left text alignment
- **Responsive Design**: Mobile-first approach with hamburger menu for mobile navigation

### Design System
- **CSS Custom Properties**: Uses CSS variables for consistent color theming and maintainability
- **Typography**: Cairo font family from Google Fonts for Arabic text rendering
- **Icon System**: Font Awesome 6.0 for consistent iconography
- **Color Scheme**: Professional blue and green color palette suitable for healthcare/pharmaceutical branding

### Navigation System
- **Section-based Navigation**: JavaScript handles switching between different content sections without page reloads
- **Active State Management**: Dynamic highlighting of current navigation items
- **Mobile Menu**: Collapsible hamburger menu for mobile devices
- **Multi-point Navigation**: Navigation possible from header, hero buttons, and footer links

### Content Structure
- **Modular Sections**: Home, About, Products, Services, and Contact sections
- **Product Catalog**: Interactive product cards with filtering/tabbing functionality
- **Contact Form**: Form handling with success/error state management
- **Hero Section**: Landing area with call-to-action buttons

### Code Organization
- **Separation of Concerns**: HTML for structure, CSS for styling, JavaScript for interactivity
- **Event-driven Architecture**: JavaScript uses event listeners for user interactions
- **Responsive Breakpoints**: CSS media queries for different screen sizes

## External Dependencies

### CDN Resources
- **Google Fonts**: Cairo font family for Arabic typography
- **Font Awesome**: Version 6.0 for icons and symbols

### Assets
- **Logo**: SVG format logo file (assets/logo.svg)
- **Images**: Various product and company images (referenced but not provided in repository)

### Browser APIs
- **DOM Manipulation**: Standard DOM APIs for element selection and event handling
- **CSS Custom Properties**: Modern CSS variables for theming
- **Responsive Design**: CSS Grid and Flexbox for layout

Note: The website is completely self-contained with no backend dependencies, databases, or external API integrations. All functionality is client-side only.