# PELS @ UTSA Website

This is the official website for the IEEE Power and Energy Society (PELS) student chapter at UTSA.
The site showcases our events, officers, newsletters, and opportunities to get involved.

---

## 🔗 Live Site

👉 [Visit the Live Website](https://pels-website.netlify.app)

---

## 📁 Repository

[GitHub Repo](https://github.com/ScarAgathor/PELS-Website)

---

## 📂 Features

- 🌟 Dynamic loading of events, officers, and newsletters from Supabase
- 📝 Register Now and Add to Google Calendar actions on upcoming events
- 🧑‍💼 Officers grouped by status (Officer, Junior Officer, Senior Advisor, Past Officer) with term dates — the home page preview only shows the current President and Vice President(s) (`officer_status: "Officer"`), never past/junior/advisor officers
- 📰 Newsletter archive with a searchable table and inline preview of the most recent issue
- ♿ Keyboard-accessible event cards and modal popups
- 📱 Responsive layouts for mobile/tablet/desktop, with event cards centered as a group regardless of count
- 🌐 Cloudinary-hosted images for performance optimization
- 🎨 Modular SCSS structure compiled into a single `main.css`

---

## 🛠️ Tech Stack

- HTML5 & CSS3 (SCSS)
- JavaScript (ES6)
- [Supabase](https://supabase.com) – Edge functions and database backing the events/officers/newsletters content
- [Cloudinary](https://cloudinary.com) – Image hosting
- [Netlify](https://www.netlify.com) – Deployment platform

---
## 🚀 Getting Started (For Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/ScarAgathor/PELS-Website
   cd PELS-Website
   ```

2. Install a static server (if you don't already have one)
   ```bash
   npm install -g serve
   ```

3. Run the project
   ```bash
   serve .
   ```

4. Edit styles

   Styles are written in SCSS under `scss/` and compiled into the single `styles/main.css` the pages actually load. There's no build tool installed in this repo, so compile with `sass` via `npx` whenever you change a `.scss` file:
   ```bash
   npx sass scss/main.scss styles/main.css --style=expanded --source-map
   ```
   Commit both `styles/main.css` and `styles/main.css.map` along with your `.scss` changes.

5. Edit content (events, officers, newsletters)

   Event, officer, and newsletter data doesn't live in this repo — it's pulled at runtime from Supabase edge functions (`get-programs`, `get-officers`, `get-newsletters`) and managed through the private admin site. 

6. Commit and push changes
   ```bash
   git add .
   git commit -m "Describe your change"
   git push
   ```


## Folder Structure
pels-utsa-website/
│
├── index.html
├── workshops&events.html   # single "Events" listing page — filename is legacy, the workshop/event distinction was removed
├── officers.html
├── joinus.html
├── newsletter.html
├── admin/              # private admin site for managing event/officer/newsletter content
├── fonts/
├── scss/
│   ├── base/
│   ├── components/
│   ├── pages/
│   └── main.scss
├── src/
│   └── index.js
└── styles/
    ├── main.css
    └── main.css.map


## 🙋‍♂️ Author
Edidiong Ekong
UTSA Computer Engineering Student
`https://github.com/ScarAgathor`
`https://linkedin.com/in/edidiongdekong`


## 🪶 How to Edit Content
Event, officer, and newsletter listings are managed through the private admin site, not by editing files in this repository. 

Code and design changes (HTML/SCSS/JS) still go through this repo as normal commits.

## Started March 2025
The updated content will go live on the next Netlify deploy automatically.
