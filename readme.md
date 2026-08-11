# PELS @ UTSA Website

This is the official website for the IEEE Power and Energy Society (PELS) student chapter at UTSA.
The site showcases our workshops, events, officers, and opportunities to get involved.

---

## 🔗 Live Site

👉 [Visit the Live Website](https://pels-website.netlify.app)

---

## 📁 Repository

[GitHub Repo](https://github.com/ScarAgathor/PELS-Website)

---

## 📂 Features

- 🌟 Dynamic loading of workshops, events, and officers from Supabase
- 📝 Register Now and Add to Google Calendar actions on upcoming programs
- ♿ Keyboard-accessible program cards and modal popups
- 📱 Responsive design with grid layouts for mobile/tablet/desktop
- 🌐 Cloudinary-hosted images for performance optimization
- 🎨 Modular SCSS structure compiled into a single `main.css`

---

## 🛠️ Tech Stack

- HTML5 & CSS3 (SCSS)
- JavaScript (ES6)
- [Supabase](https://supabase.com) – Edge functions and database backing the programs/officers content
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

5. Edit content (workshops, events, officers)

   Workshop, event, and officer data no longer lives in this repo — it's pulled at runtime from Supabase edge functions (`get-programs`, `get-officers`) and managed through the private admin site. To update that content, use the admin site rather than editing files here.

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
├── workshops&events.html
├── officers.html
├── joinus.html
├── newsletter.html
├── admin/              # private admin site for managing workshop/event/officer content
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
Workshop, event, and officer listings are managed through the private admin site, not by editing files in this repository. Log into the admin site to add, update, or remove programs and officers — changes there are picked up by the public site on its next data fetch, no deploy needed.

Code and design changes (HTML/SCSS/JS) still go through this repo as normal commits.

## Started March 2025
The updated content will go live on the next Netlify deploy automatically.
