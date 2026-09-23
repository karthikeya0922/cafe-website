# ☕ Fire Pot — Cafe Website

A multi-page cafe website built week by week for the **3-1 Essentials of Web Programming (EWP)** lab at Anurag University. It starts as a static HTML/CSS site and grows to cover client-side JavaScript: form validation, the Fetch API, JSON and XML parsing, and AJAX POST requests.

It uses plain **HTML5, CSS3 and vanilla JavaScript**. There are no frameworks, no build step and no backend.

---

## ✨ Features

- **Shared navigation bar**: `navbar.html` is fetched and injected into every page, so the menu is defined in one place
- **Glass-effect navbar** over a full-page cafe background
- **Menu page from two data sources**: items are loaded from `menu.json` and `menu.xml` (parsed with `DOMParser`) and shown in one combined view
- **Registration form validation**: live, per-field error messages for username, email and password
- **Feedback form (AJAX POST)**: sends JSON to a test API and shows the server's response
- **Fetch text loading**: the About page loads its content from `about.txt`
- **Login page**: interface only, with no real authentication

---

## 🛠️ Tech Stack

| Layer | Used |
|-------|------|
| Markup | HTML5 |
| Styling | CSS3 (`style.css`) |
| Scripting | Vanilla JavaScript (ES6) |
| Data | JSON, XML, plain text |
| Networking | Fetch API (GET and POST) |
| Test API | [JSONPlaceholder](https://jsonplaceholder.typicode.com/) |

---

## 📄 Pages

| Page | File | What it shows |
|------|------|---------------|
| Home | `index.html` | Hero section and welcome message |
| Services | `services.html` | What the cafe offers |
| Menu | `menu.html` | Menu items loaded from JSON and XML |
| About | `about.html` | Cafe story, fetched from `about.txt` |
| Contact | `contact.html` | Contact details and a feedback form that POSTs via fetch |
| Login | `login.html` | Login form (interface only) |
| Register | `register.html` | Sign-up form with JavaScript validation |
| Load Text | `loadtext.html` | Lab exercise: load a text file with fetch |
| Post Data | `postdata.html` | Lab exercise: send JSON with a fetch POST |
| Trail | `trail.html` | Scratch page used during development |

---

## 🗓️ Lab Progress

| Week | Topic |
|------|-------|
| 1–7 | Static pages, CSS styling, shared glass navbar, layout fixes |
| 8 | Fetch-based text and menu loading; register form validation |
| 9 | Menu page redesign with a combined JSON and XML view |
| 10 | AJAX / Fetch POST program |

---

## 📂 Project Structure

```text
cafe-website/
├── index.html            # Home
├── services.html
├── menu.html             # JSON + XML menu
├── about.html
├── contact.html          # Feedback form (fetch POST)
├── login.html
├── register.html         # Validated sign-up form
├── loadtext.html         # Fetch text exercise
├── postdata.html         # Fetch POST exercise
├── trail.html
│
├── navbar.html           # Shared navbar, injected with fetch
├── style.css             # Site-wide styles
├── script.js             # Navbar loader and registration validation
│
├── menu.json             # Menu data (JSON)
├── menu.xml              # Menu data (XML)
├── about.txt             # About page text
│
└── images                # Logos and background images (*.jpg, *.png, *.ico)
```

---

## 🚀 Getting Started

> **Run the site through a local server.** The pages load `navbar.html`, `menu.json`, `menu.xml` and `about.txt` with `fetch()`. Browsers block these requests when a file is opened straight from disk (`file://`), so the navbar and menu will not appear.

1. Clone the repository:

   ```bash
   git clone https://github.com/karthikeya0922/cafe-website.git
   cd cafe-website
   ```

2. Start a local server. Any of these works:

   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .
   ```

   In VS Code you can also right-click `index.html` and choose **Open with Live Server**.

3. Open **http://localhost:8000** in your browser.

The feedback form and `postdata.html` send requests to JSONPlaceholder, so those two need an internet connection.

---

## 🔍 How It Works

**Shared navbar**: each page has an empty `<div id="navbar">`. On load, the page fetches `navbar.html` and inserts it there.

**Menu (JSON + XML)**: `menu.html` fetches both files at the same time with `Promise.all`. The JSON is read with `response.json()`. The XML is read as text and parsed with `DOMParser`. Both lists are converted to the same item shape and rendered together.

**Registration validation** (`script.js`):

| Field | Rules |
|-------|-------|
| Username | Required, at least 3 characters, only letters, numbers and `_` |
| Email | Required, must be a valid email format |
| Password | Required, at least 6 characters, must contain letters and numbers |

Errors show under each field as you type, and the form will not submit while any field is invalid.

**Fetch POST**: the feedback form sends its values as JSON to `https://jsonplaceholder.typicode.com/posts` and prints the echoed response. JSONPlaceholder is a fake API, so nothing is actually stored.

---

## 📌 Future Improvements

- Fully responsive layout for phones and tablets
- Move inline styles into `style.css`
- Real backend for login, registration and feedback
- Online table reservation
- Image gallery and customer reviews
- Dark mode

---

## ⚠️ Disclaimer

The login and registration pages are **for demonstration only**. They do not authenticate anyone and do not store any user data. Form submissions go only to a public test API.

---

## 👨‍💻 Author

**Karthikeya Gupta**
B.Tech, Artificial Intelligence & Machine Learning, Anurag University

GitHub: [@karthikeya0922](https://github.com/karthikeya0922)

---

⭐ If you found this project useful, consider giving it a star!
