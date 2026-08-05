# PMS Landing Dashboard — Module 1

A modern, responsive **Placement Management System** landing dashboard built with **React + Vite**.

## 🚀 Live Demo
> Coming soon (Deploy on Vercel)

---

## 📦 Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **React Router v6** — Client-side routing
- **Vanilla CSS** with CSS custom properties (no Tailwind dependency)
- **Google Fonts** — Inter + Poppins

---

## ⚡ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/pms-dashboard.git
cd pms-dashboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🗂️ Project Structure

```
src/
├── config/
│   └── app.config.js     ← ⭐ Change college name & developer info here
├── hooks/
│   └── useTheme.js       ← Dark/light mode logic
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ThemeToggle.jsx
├── pages/
│   ├── Home.jsx
│   ├── AdminLogin.jsx
│   ├── TPOLogin.jsx
│   ├── StudentLogin.jsx
│   └── StudentRegister.jsx
└── styles/
    ├── index.css         ← Global design tokens
    ├── Navbar.css
    ├── Home.css
    ├── Footer.css
    └── Auth.css
```

---

## 🎨 Features

- ✅ **Dark / Light Mode** — toggle with OS preference detection
- ✅ **Fully Responsive** — mobile, tablet, desktop
- ✅ **3 Login Portals** — Admin, TPO, Student
- ✅ **Student Registration** with live form validation & password strength meter
- ✅ **Config-driven** — change college name in one file, updates everywhere
- ✅ **Smooth animations** — scroll-triggered, hover effects, floating elements
- ✅ **React Router v6** — 5 working routes

---

## ⚙️ Configuration

Edit `src/config/app.config.js` to customize:

```js
export const APP_CONFIG = {
  collegeName: 'Your College Name',   // ← Change this
  developer: {
    name: 'Your Name',
    github: 'https://github.com/your-handle',
    // ...
  }
};
```

---

## 📄 Routes

| Path | Page |
|---|---|
| `/` | Landing Page |
| `/login/admin` | Admin Login |
| `/login/tpo` | TPO Login |
| `/login/student` | Student Login |
| `/register/student` | Student Registration |

---

## 🚀 Deployment (Vercel)

```bash
npm run build
# Then drag the dist/ folder to Vercel, or connect the GitHub repo directly.
```

---

## 📌 Modules Roadmap

- [x] **Module 1** — Landing Dashboard *(this repo)*
- [ ] Module 2 — Admin Dashboard
- [ ] Module 3 — TPO Dashboard
- [ ] Module 4 — Student Dashboard
- [ ] Module 5 — Backend API (Node.js + Express)
- [ ] Module 6 — Database Integration

---

## 👨‍💻 Developer

Built as part of a modular Placement Management System project.

---

## 📝 License

MIT
