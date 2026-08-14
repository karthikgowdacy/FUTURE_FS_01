# Karthik Gowda C Y — Full Stack Web Developer & AI Portfolio

> **Task 1 Deliverable — Full Stack Web Development Internship**  
> A recruiter-ready, responsive, personal portfolio website built with HTML5, Vanilla CSS3 (Glassmorphism design system), JavaScript (ES6+), and Node.js / Express backend API.

---

## 🌟 Key Features

1. **Modern Glassmorphism UI & Design System**
   - High-contrast typography featuring **Plus Jakarta Sans** and **Fira Code**.
   - Custom gradient text, glowing card borders, and ambient background lighting.
   - Persistent **Dark / Light theme switcher** using `localStorage`.

2. **Interactive Developer Showcases**
   - **Hero Section**: Introduces skills, contact quick links, developer terminal JSON view, downloadable resume CTA, and social links.
   - **Skills & Tech Matrix**: Filterable grid covering Languages, Web Frameworks, AI/ML concepts, and DevOps/Cloud tools.
   - **Featured Projects**: Filterable project cards (*CodeSync*, *Blood Donation Management System*, *Portfolio API*, *Smart Task Manager*) with modal popups providing deep project details and impact summaries.
   - **Internship Experience Timeline**: Visual timeline showcasing full-stack development responsibilities at **Future Interns** and **Elewayte Company**.
   - **Education & Certifications**: Highlighted credentials from Google Cloud (Generative AI), IBM SkillsBuild (AI), IIT Bombay (JavaScript), IIPS (Cyber Security), and Zysk Technologies.

3. **Backend Contact API & Admin Portal**
   - Asynchronous contact form submitter hitting the Express backend endpoint `/api/contact`.
   - Real-time client & server validation with toast status feedback.
   - Persistent JSON database storage in `messages.json`.
   - Private Admin Dashboard at `/admin/messages` to view, search, and manage received recruiter inquiries.

4. **SEO & Mobile Accessibility**
   - Comprehensive OpenGraph (`og:title`, `og:description`, `og:image`) and Twitter Card meta tags.
   - Fully responsive grid layout supporting widescreen desktops, laptops, tablets, and smartphones.
   - Accessible ARIA labels and semantic HTML5 tags (`header`, `main`, `section`, `article`, `footer`).

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Glassmorphism, Flexbox, Grid), JavaScript (ES6+, Fetch API, IntersectionObserver)
- **Backend**: Node.js, Express.js
- **Data Persistence**: JSON File System Storage (`messages.json`)
- **Fonts & Icons**: Google Fonts (Plus Jakarta Sans, Fira Code), FontAwesome 6.5

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Installation & Run

1. Clone or navigate into the project folder:
   ```bash
   cd "karthi portfolio"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   - **Live Portfolio**: `http://localhost:8080`
   - **Admin Message Inbox**: `http://localhost:8080/admin/messages`

---

## 📁 Project Structure

```
karthi portfolio/
├── index.html          # Main HTML5 portfolio structure & modal elements
├── styles.css          # Design system, glassmorphism tokens, dark/light theme, media queries
├── script.js           # Theme persistence, scroll-spy, filters, modal handlers, contact submitter
├── server.js           # Node/Express backend server with contact API & admin endpoints
├── admin.html          # Admin dashboard page to manage inquiries
├── messages.json       # JSON database storing contact form submissions
├── package.json        # Node project metadata & Express dependency
└── README.md           # Documentation & setup guide
```

---

## 🌐 Deployment Instructions

- **Static Hosting (GitHub Pages / Netlify / Vercel)**:  
  Push source code to GitHub repository and link to Netlify/Vercel for automatic deployment.
- **Full Stack Hosting (Render / Railway)**:  
  Deploy the Node.js `server.js` backend to Render or Railway to enable live persistent contact form submission.

---

## 👤 Author & Contact

**Karthik Gowda C Y**  
- **Role**: Computer Science Engineering Student & Full Stack Intern  
- **Email**: [karthikgowdacy45@gmail.com](mailto:karthikgowdacy45@gmail.com)  
- **Phone**: +91-6364527371  
- **LinkedIn**: [linkedin.com/in/karthikgowdacy](https://www.linkedin.com/in/karthikgowdacy)  
- **Location**: Bengaluru, Karnataka, India  
