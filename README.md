# Job Application Tracker

A simple and elegant **Job Application Tracker** web app built with **Vanilla JavaScript**, HTML, and CSS, integrated with the **Brandfetch API** to fetch real-time company branding data such as logos. This project helps users keep track of their job applications and statuses, empowering them to stay organized during their job search.

---

## Demo

*(Coming Soon)*

---

## Features

- **User Registration & Login** with localStorage (no backend required)
- Store and use your **Brandfetch API key** to fetch real company logos and details
- Add, view, edit, and delete job application cards
- Track job status (Applied, Interview, Offered, Rejected) with visual indicators
- Responsive and modern UI design with glassmorphism effects
- Collapsible guide on how to get your Brandfetch API key included in the registration form

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- A **Brandfetch API key** (free to register at [Brandfetch Developers](https://developers.brandfetch.com/register))

### How to get your API key

1. Visit [Brandfetch Developer Portal](https://developers.brandfetch.com/register)
2. Sign up or log in
3. Navigate to the **"Brand API"** tab from the sidebar
4. Create or copy your existing API key
5. Use this key when registering a new account in the app

---

## Installation & Usage

Clone the repo or download the ZIP:

```bash
git clone https://github.com/Pankaj254/Job-Application-Status.git
```
Open index.html in your browser to use the application:
```bash
# For Windows
start index.html

# For macOS/Linux
open index.html
```
✅ No backend or build step required — it runs purely in the browser.

## 📁Folder Structure

```bash
Job-Application-Status/
│
├── index.html             # Main dashboard after login
├── login.html             # Login and Registration form
├── login.js               # Handles login, registration, API key logic
├── index.js               # Application logic (job cards, Brandfetch API, status updates)
├── login.css              # Styled login/registration page
├── style.css              # Main UI design for application dashboard 
└── README.md              # You’re reading it!
```
