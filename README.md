# ☕ Fire Pot — Cafe Website

A cafe website built week by week for the **3-1 Essentials of Web Programming (EWP)** lab at Anurag University. It starts as static HTML/CSS pages and grows through JavaScript validation, XML/DTD, the Fetch API, TypeScript and finally a full **Angular** single-page app.

The main site uses plain **HTML5, CSS3 and vanilla JavaScript**, with no frameworks and no backend. Weeks 11–14 live in their own folders: `typescript/` and `cafe-angular/`.

---

## 🗓️ Lab Programs

| Week | Task | Where |
|------|------|-------|
| 1 | Static web pages: Home and Login | `index.html`, `login.html` |
| 2 | Registration page with HTML form validation | `register.html` (`required`, `pattern`, `minlength`, field types) |
| 3 | Internal, external and inline CSS | `style.css` (external), `<style>` blocks (internal), `style=""` (inline). Each type is labelled with a comment in the week 1–2 pages |
| 4 | JavaScript validation for the registration page | `script.js` (10 fields: name, username, email, phone, age 13+, gender, drink, password, confirm, terms) |
| 5 | Catalogue page with HTML, CSS and JS | `catalogue.html`, `catalogue.css`, `catalogue.js` (search, filters, sort, cart) |
| 6 | XML file displaying item info, validated with a DTD | `menu.xml`, `menu.dtd`, `menu.xsl` |
| 7 | Review and Skill Test-1 | — |
| 8 | Ajax / Fetch: load text asynchronously | `loadtext.html` → `notes.txt`, `about.html` → `about.txt`, shared navbar |
| 9 | Ajax / Fetch: parse JSON and XML responses | `menu.html` → `menu.json` + `menu.xml` (`DOMParser`) |
| 10 | Ajax / Fetch: send data with POST | `postdata.html`, feedback form in `contact.html` |
| 11 | TypeScript: classes, interfaces, functions | `typescript/src/` |
| 12 | Angular components, data binding, directives | `cafe-angular/src/app/components`, `directives/` |
| 13–14 | Angular forms, routing and services (SPA) | `cafe-angular/src/app/pages`, `services/`, `app.routes.ts` |

---

## 🚀 Getting Started

```bash
git clone https://github.com/karthikeya0922/cafe-website.git
cd cafe-website
```

### Weeks 1–10: the static site

> **Use a local server.** The pages load `navbar.html`, `menu.json`, `menu.xml` and the text files with `fetch()`. Browsers block these requests when a page is opened straight from disk (`file://`).

```bash
python -m http.server 8000      # or: npx serve .
```

Open **http://localhost:8000**. In VS Code you can also use **Live Server**.

- To see the XSLT-styled XML (week 6), open **http://localhost:8000/menu.xml**.
- The POST demos (week 10) send requests to [JSONPlaceholder](https://jsonplaceholder.typicode.com/), so they need an internet connection.

### Week 11: TypeScript

```bash
npm install
npm run ts:interfaces
npm run ts:classes
npm run ts:functions
npm run ts:billing
```

Each script compiles `typescript/src` with `tsc` and runs one program with Node.

### Weeks 12–14: Angular

```bash
cd cafe-angular
npm install
npm start                       # http://localhost:4200
```

See [cafe-angular/README.md](cafe-angular/README.md) for the routes and which file covers each topic.

---

## 🔍 How It Works

**Registration (weeks 2 and 4).** The form uses HTML5 validation attributes, so it is validated even without JavaScript. When `script.js` loads, it sets `form.noValidate` and takes over: each field has a rule, errors appear under fields as you type, and the form won't submit while anything is invalid.

**Catalogue (week 5).** The products are a JavaScript array. Search, category filter and sort all update a small `state` object and re-render the cards. The cart tracks quantities and the total.

**XML + DTD (week 6).** `menu.xml` declares `<!DOCTYPE menu SYSTEM "menu.dtd">`. The DTD requires `name`, `category` and `price` in that order, makes `description` optional, gives every item a unique `ID`, and limits `veg` to `yes|no`. `menu.xsl` turns the XML into a styled table in the browser.

**Fetch (weeks 8–10).** Every page fetches `navbar.html` into `<div id="navbar">`. The menu page loads JSON and XML together with `Promise.all`, parses the XML with `DOMParser`, and renders both lists in the same format. The feedback form POSTs JSON and shows the server's echo.

**TypeScript (week 11).** There are four programs: interfaces (readonly/optional properties, extension, function types, index signatures); classes (abstract base, inheritance, access modifiers, getters/setters, static members); functions (optional/default/rest parameters, overloads, generics, closures); and a billing system that combines all three.

**Angular (weeks 12–14).** Built with Angular 22 using standalone components and signals. Week 12 covers components with inputs/outputs, the four kinds of data binding, `@if`/`@for`/`@switch`, `ngClass`/`ngStyle` and a custom `appHighlight` directive. Weeks 13–14 add the router (route params, lazy loading, a guard and a 404 page), services (menu over HttpClient, cart, orders), a reactive checkout form with conditional validators, and a template-driven reservation form.

---

## 📂 Project Structure

```text
cafe-website/
├── index.html  login.html  register.html          # Weeks 1-4
├── catalogue.html  catalogue.css  catalogue.js    # Week 5
├── menu.xml  menu.dtd  menu.xsl                   # Week 6
├── loadtext.html  notes.txt  about.html  about.txt # Week 8
├── menu.html  menu.json                           # Week 9
├── postdata.html  contact.html                    # Week 10
├── services.html  trail.html
├── navbar.html  style.css  script.js              # Shared navbar, styles, validation
├── *.jpg  *.png  *.ico                            # Logos and backgrounds
│
├── typescript/                                    # Week 11
│   ├── tsconfig.json
│   └── src/  interfaces.ts  classes.ts  functions.ts  cafe-billing.ts
│
└── cafe-angular/                                  # Weeks 12-14
    ├── public/menu-data.json
    └── src/app/
        ├── components/   header, menu-card, menu-list, cart-summary
        ├── directives/   highlight.ts
        ├── services/     menu, cart, order
        ├── guards/       cart-not-empty.ts
        ├── pages/        home, menu, item-detail, cart, checkout,
        │                 order-confirmation, reservation, not-found
        └── app.routes.ts
```

---

## 🛠️ Tech Stack

HTML5 · CSS3 · JavaScript (ES6) · XML / DTD / XSLT · JSON · Fetch API · TypeScript 7 · Angular 22

---

## ⚠️ Disclaimer

The login, registration, checkout and reservation forms are **for demonstration only**. Nothing is authenticated or stored on a server. Feedback submissions go only to a public test API, and Angular orders and reservations exist only until the page reloads.

---

## 👨‍💻 Author

**Karthikeya Gupta**
B.Tech, Artificial Intelligence & Machine Learning, Anurag University

GitHub: [@karthikeya0922](https://github.com/karthikeya0922)

---

⭐ If you found this project useful, consider giving it a star!
