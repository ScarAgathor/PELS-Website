# 🧠 PELS Website Refactor & Final Polish Checklist

---

## 🎯 Core Code & Structural Cleanup

| Task | Done |
|------|------|
| Revisit the naming conventions of my classes and decide on a consistent one | [ ] |
| Review classes using good conventions and figure out which ones are useless | [ ] |
| Make CSS more streamlined and easier to follow and update | [ ] |
| Make general classes, standardized sizes, colors, etc | [ ] |
| Use variables in the CSS | [ ] |
| Consider switching to em and rem for sizes instead of px | [ ] |
| Use clamp for fonts, paddings, margins, widths, heights | [ ] |
| Organize JSON files of all data needed for site | [ ] |
| Cache JSON file on the web page | [ ] |
| Cache Java file | [ ] |
| Audit SCSS with a linter like stylelint | [ ] |
| Group variables logically in variables.scss (e.g., color, spacing, typography) | [ ] |
| Use BEM or a simple naming system you can maintain | [ ] |
| Have more standard styles, sizes, fonts, etc., in variables for different screen sizes | [ ] |
| Comment tricky styles or sections other people might work on | [ ] |
| Document website properly in README.md | [ ] |
| Create a more organized folder for officer images | [ ] |

---

## 🎨 Styling, Layout & Responsiveness

| Task | Done |
|------|------|
| Fix spacing in Join Us page | [ ] |
| Fix responsiveness issues | [ ] |
| Make layout responsiveness smoother | [ ] |
| Use media queries for layout | [ ] |
| Fix mobile menu transparency issue | [ ] |
| Use a better-looking hamburger and close icon for mobile menu | [ ] |
| All buttons should be accessible, might make hamburger a button | [ ] |
| Add tabindex to make site accessible | [ ] |
| Change icon containers in footer to either buttons or links | [ ] |
| Make sure all images are properly object-fit | [ ] |
| All modals should be scrollable | [ ] |
| Have scrollable description for project modal | [ ] |
| Might make modal contain multiple images or an image slider | [ ] |
| Redesign modal to make it look better, more professional, more interesting | [ ] |
| Make sure see more button remembers state. Add state check so it preserves when page reloads, and allows user to close extras | [ ] |
| Remember to test touch sensibility for mobile version | [ ] |
| Remember to test different browsers | [ ] |

---

## ⚙️ Features, Interactivity & Behavior

| Task | Done |
|------|------|
| Fix the See More / See Less functionality | [ ] |
| See More should only apply when there are more than 4 events at once, and scroll down to show others | [ ] |
| Figure out the safest way to send info between pages (hash, URL query params, etc) | [ ] |
| Figure out how to save which programs are active in workshops & events page | [ ] |
| Add See More buttons in program page | [ ] |
| Plan for a better way to store upcoming and completed programs | [ ] |
| Consider how to improve all card loading performance to prevent slowdown | [ ] |
| Consider using fragments or defer rendering | [ ] |
| Program card hover should have a slight size increase | [ ] |
| Make program card into button and add size increase on hover | [ ] |
| In officer images, during JS code, alts should be the position in the JSON | [ ] |
| In if statements, use strict === so it will be safer | [ ] |
| Add identifier for active HTML page | [ ] |
| Ask everyone if there is a different picture they would like for themselves | [ ] |

---

## 🧩 Workshop & Events Page

| Task | Done |
|------|------|
| Workshops and Events page is going to contain a lot of JS | [ ] |
| Remember to add See More buttons in program page | [ ] |
| Scroll down to allow others to show up when expanded | [ ] |
| Consider adding a register now button if possible | [ ] |
| Add an add-to-Google-Calendar link | [ ] |
| The location should show a location for the event on an actual Google Map | [ ] |

---

## 📋 Join Us Page

| Task | Done |
|------|------|
| Make Join Us page more interesting and attention grabbing | [ ] |
| Fix spacing in Join Us page | [ ] |
| Consider adding an Open Positions section | [ ] |

---

## 🧑‍🤝‍🧑 Officers Page

| Task | Done |
|------|------|
| Find a way to differentiate between officers and members on the site and everywhere else | [ ] |
| Add a senior advisor section to officers page | [ ] |
| Get better officer images | [ ] |
| Use Cloudinary to manage images when deploying (preferably all JPGs) | [ ] |

---

## 🌗 Light / Dark Theme & Accessibility

| Task | Done |
|------|------|
| Add a dark theme section | [ ] |
| Do more research on light and dark themes | [ ] |
| Implement `prefers-color-scheme: dark` in CSS | [ ] |

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-light: #121212;
    --text-light: #f5f5f5;
  }
}
```

---

## 🌍 SEO, Deployment, and Hosting Prep

| Task | Done |
|------|------|
| Update homepage image | [ ] |
| Remember to add a homepage image | [ ] |
| Add alt attributes for all image tags | [ ] |
| Remember to add a favicon | [ ] |
| Create a README.md file with documentation | [ ] |
| Make layout and responsiveness smoother across screen sizes | [ ] |
| Consider using Cloudinary for hosted images | [ ] |
| Remove all console.logs before publishing | [ ] |
| Find a way to get an actual copyright | [ ] |
| Make a list of all the external sites this site depends on (e.g., W3Schools) | [ ] |
