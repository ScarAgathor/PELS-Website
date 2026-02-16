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

- 🌟 Dynamic loading of events and workshops from JSON files
- ♿ Keyboard-accessible program cards and modal popups
- 📱 Responsive design with grid layouts for mobile/tablet/desktop
- 🌐 Cloudinary-hosted images for performance optimization
- 🎨 Modular SCSS structure compiled into a single `main.css`

---

## 🛠️ Tech Stack

- HTML5 & CSS3 (SCSS)
- JavaScript (ES6)
- [Cloudinary](https://cloudinary.com) – Image hosting
- [Netlify](https://www.netlify.com) – Deployment platform

---
## 🚀 Getting Started (For Local Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/ScarAgathor/PELS-Website
   cd PELS-Website

2. Install a static server (if you don’t already have one)
    ```bash
    npm install -g serve

3. Run the project
    ```bash
    serve .

4. Edit content files
    ```bash
    Go to the /data folder.
    Edit officers.json or programs.json as needed.
    Make sure the format is correct JSON.

5. Commit and push changes
    ```bash
    git add data/officers.json
    git commit -m "Update officers list"
    git push


## Folder Structure
pels-utsa-website/
│
├── index.html
├── workshops&events.html
├── officers.html
├── joinus.html
├── data/
|    ├──ooficers.json
│   ├── workshops.json
│   └── events.json
├── assets/
│   ├── images/
│   └── fonts/
├── scss/
│   ├── base/
│   ├── components/
|   ├── pages/
│   └── main.scss
├── scripts/
│   └── index.js
└── styles/
    └── main.css


## 🙋‍♂️ Author
Edidiong Ekong
UTSA Computer Engineering Student
`https://github.com/ScarAgathor`
`https://linkedin.com/in/edidiongdekong`


## 🪶 How to Edit on GitHub
- Go to the repository on GitHub.
- Open the /data folder.
- Click on officers.json or programs.json.
- Click the ✏️ Edit button (top right of the file view).
- Make your changes in the editor.
- Scroll down to the Commit changes section:
   - Add a short description of what you changed.
   - Select "Commit directly to the main branch".
- Click Commit changes.

## Started March 2025
The updated content will go live on the next Netlify deploy automatically.