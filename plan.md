# 🧠 PELS Website Dev Plan (Raw Checklist)

- [ ] organize this list, into groups and actually important non redundant ones
- [ ] note down all the things you need
- [ ] make a list of all the extrnal site this site depends on (w3schools)
- [ ] fix mobile menu transparency issue  
- [ ] workshops and events page is going to contain a lot of js
- [ ] remember in workshosp & events, see more should only apply when there are more than 4 events at once. I t should also scroll down to allow others to show up
- [ ] make sure all images are properly object fit
- [ ] consider switching to em and rem for sizes instead of px
- [ ] update home page image
- [ ] remember to add tabindex to make site accessible  
- [ ] find a way to differentiate between officers and memebers on the site and everywhere else  
- [ ] remember to fix responsiveness issues  
- [ ] consider using variable in the css  
- [ ] remember to test touch sensibility for mobile version  
- [ ] revisit the naming conventions of my classes and decide on a consitent one  
- [ ] remember to test different browsers  
- [ ] use a better looking hamburger and close icon for mobile menu  
- [ ] Have scrollable description for project modal n  
- [ ] Add a dark theme section  
- [ ] For workshop modal  
  - [ ] Consider adding a register now button if possible  
  - [ ] and an add to google calender link  
- [ ] Consider a bunch of other project features like join, view reports, etc  
- [ ] Organize json files of all data needed for site  
- [ ] In the future add a "more" drop down for the navbar  
- [ ] the location should show a location for the event on the actual google map  
- [ ] Card hover should have a slight size increase  
- [ ] Do more research on light and dark themes 
- [ ] remember to add an identifier for the active html page  
- [ ] remember to add an alt for all the image tags  
- [ ] ask everyone if there is a different picture they would like for themselves on the site
- [ ] remember to cache json file on the web page  
- [ ] in officer images, during js code, alts should be the position in the json  
- [ ] make join us page more interesting and attention grabbing  
- [ ] fix spacing in joiun us page  
- [ ] cache java file  
- [ ] change icon containers in footer to either buttons or links  
- [ ] add a senior advisor section to officers page  
- [ ] get better officer images
- [ ] use cloudinary to manage images when its time to deploy, preferably make sure all images are jpgs
- [ ] create a more organized folder for officer images, maybe have someone help me do it
- [ ] Consider adding an open positions section in join us page
- [ ] all buttons shold be accessible, might make hamburger a button
- [ ] all modals should be scrollable
- [ ] might make modal contain multiple images or an image slider
- [ ] review classes using good conventions and figure out which ones are useless
- [ ] make css more streamlined and easier to follow and update
- [ ] make program card into button and add size increase on hover
- [ ] figure out how to save which programs are active in workshops & events page
- [ ] remember to add see more buttons in program page
- [ ] plan for a better way to store upcoming and completed programs
- [ ] consider how to improve all card loading performance to prevent page from slowing down
  - [ ] consider using fragments or defer rendering
- [ ] use clamp for fonts, paddings, margins, widths, heights
- [ ] use media quaries for layout
- [ ] Audit your SCSS with a linter like stylelint
- [ ] Use BEM or a simple naming system you can maintain
- [ ] Group variables logically in variables.scss (e.g., color, spacing, typography)
- [ ] have more standard styles, sizes, fonts, etc, this should go into the variables as well, for the different screen sizes
- [ ] Comment tricky styles or sections other people might work on
- [ ] Figure out how to get an actual copyright
- [ ] document website proeprly in readme. i.e have an actual readme.md, proper
- [ ] make layout responsiveness smoother
- [ ] make sure see more button remembers state. remember to add a state check so it preserves when page treloads, and allows user to close extras


```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-light: #121212;
    --text-light: #f5f5f5;
  }
}

- [ ] remmeber to delete all console logs