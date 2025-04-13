const hamburger = document.getElementById('hamburger');
const mobile_menu = document.getElementById('mobileMenu');
const overlay = document.querySelector('.overlay')
const modal = document.getElementById('modal')
const modal_status = modal.querySelector('.modal__status')
const modal_title = modal.querySelector('.modal__title')
const modal_img = modal.querySelector('.modal__image')
const modal_organizer = modal.querySelector('.modal__organizer')
const modal_date = modal.querySelector('.modal__date')
const modal_location = modal.querySelector('.modal__location__container').lastElementChild
const modal_desc = modal.querySelector('.modal__desc')
const modal_close = document.getElementById('modal__close')
const home_page = document.getElementById('home__page');

let lastFocusedElement = null;

document.addEventListener('DOMContentLoaded', () => {
    if(home_page) {
        loadHomePrograms();
    }    
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('program__modal--active')) {
        resetModal();
    }
});

//hamburger and mobile menu
hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
})

// programs Home Page
overlay.addEventListener('click', () => {
    resetModal();
})

modal_close.addEventListener('click', () => {
    resetModal();
})

const loadHomePrograms = async () => {
    const program_types = ['workshops', 'events'];

    for (let program_type of program_types) {
        try {
            const response = await fetch(`../data/${program_type}.json`);
            const programs = await response.json();

            // Filter only upcoming and sort by date (assumes ISO date format: YYYY-MM-DD) 
            const upcoming_programs = programs.filter(program => program.status === 'upcoming').sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 2); // Only take the first 2
            const container = document.querySelector(`.programs__content--${program_type}`);

            upcoming_programs.forEach(program => {
                const card = createProgramCard(program.status, program.img_card, program.title, program.organizer, program.date, program.location, program.time, program.description, program_type);
                container.appendChild(card);

                // Add click-to-open modal
                card.addEventListener('click', () => {
                    createProgramModal(program.status, program.img_card, program.title, program.organizer, formatDate(program.date), program.location, program.time, program.description, program_type);
                    initializeModal();
                });                
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault(); // Prevent scrolling if Space
                        createProgramModal(program.status, program.img_card, program.title, program.organizer, formatDate(program.date), program.location, program.time, program.description, program_type);
                        initializeModal();
                    }
                })

            });
        } catch (error) {
            console.error(`Failed to load ${program_type}:`, error);
        }
    }
};

const createProgramCard = (status, img, title, organizer, date, location, time, desc, program) => {
    let programCard = document.createElement('article');
    programCard.classList.add('program__card',  `program__card--${program}`);
    programCard.setAttribute('tabindex', '0');
    programCard.setAttribute('role', 'button');
    programCard.setAttribute('aria-label', `${title}, organized by ${organizer}, on ${formatDate(date)} at ${time}`);

    programCard.innerHTML = `
        <p class="card__status ${status}">${status}</p>
        <img src="${img}" alt="Banner for ${title}" class="card__image">
        <h3 class="card__title">${title}</h3>
        <p class="card__organizer">${organizer}</p>
        <div class="card__meta">
            <p class="card__date">
                <time datetime="${date}">${formatDate(date)}</time>
            </p>
            <p class="card__location__container">
                <svg width="19px" height="19px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="card__location__svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="#000000"/>
                </svg>
                <span class="card__location__text">${location}</span>
            </p>
        </div>
        <p class="card__time">${time}</p>
        <p class="card__description">${desc}</p>
    `  
    return programCard
}

const formatDate = (raw_date) => {
    const date = new Date(raw_date);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const createProgramModal = (status, img, title, organizer, date, location, time, desc, program) => {
   modal.classList.add('program__modal--active');
   modal.firstElementChild.classList.add(`modal__${program}`)
   overlay.classList.add('overlay--active')
   modal.setAttribute('aria-hidden', 'false');
   modal_status.textContent = status;
   if(status === 'upcoming') {
    modal_status.classList.add(`upcoming`)
    modal_status.classList.remove('completed')
   } else if(status === 'completed') {
    modal_status.classList.add(`completed`)
    modal_status.classList.remove('upcoming')
   }
   modal_img.src = img
   modal_img.alt = `Banner for ${title}`
   modal_title.textContent = title;
   modal_organizer.textContent = organizer;
   modal_date.textContent = `${date} @ ${time}`
   modal_location.textContent = location
   modal_desc.textContent = desc

   trapFocus(modal)
}

const trapFocus = (element) => { //focus trapping for the modal. I don't fully understand it
    const focusableSelectors = [
        'a[href]', 'button:not([disabled])', 'textarea', 'input[type="text"]',
        'input[type="radio"]', 'input[type="checkbox"]', 'select', '[tabindex]:not([tabindex="-1"])'
    ];
    const focusableElements = element.querySelectorAll(focusableSelectors.join(', '));
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            }
        } else {
            if (document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    });
};

const resetModal = () => {
    overlay.classList.remove('overlay--active')
    modal.classList.remove('program__modal--active')
    document.body.classList.remove('no-scroll');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) lastFocusedElement.focus();
    modal.firstElementChild.classList.remove('modal__workshops', 'modal__events')
    if (lastFocusedElement) lastFocusedElement.focus();
}

const initializeModal = () => {
    document.body.classList.add('no-scroll');   
    modal_close.focus();
    lastFocusedElement = document.activeElement;
}



// //officer page
// document.addEventListener('DOMContentLoaded', () => {
//     const officerPage = document.getElementById('officerPage');
    
//     if (officerPage) {
//       loadOfficers();
//     }

    
// });

// //load officers
// const  loadOfficers = async () => {
//     try {
//         const response = await fetch('../data/officers.json');
//         const officers = await response.json();

//         const presidentContainer = document.getElementById('presidentCont');
//         const vicePresidentContainer = document.getElementById('viceCont');
//         const officerBoardContainer = document.getElementById('boardCont');
//         const juniorOfficerContainer = document.getElementById('juniorCont');
//         const advisorOfficerContainer = document.getElementById('advisorCont');

//         officers.forEach(officer => {
//             let card = createOfficerCard(officer.image, officer.name, officer.position);
            
//             if (officer.position.toLowerCase() === 'president') {
//                 presidentContainer.appendChild(card);
//                 console.log(`${officer.name}, ${officer.position}`)
//             } else if (officer.position.toLowerCase().includes('vice')) {
//                 vicePresidentContainer.appendChild(card);
//                 console.log(`${officer.name}, ${officer.position}`)
//             } else if(officer.position.toLowerCase().includes('junior')) {
//                 juniorOfficerContainer.appendChild(card);
//                 console.log(`${officer.name}, ${officer.position}`)
//             } else if(officer.position.toLowerCase().includes('advisor')) {
//                 advisorOfficerContainer.appendChild(card);
//                 console.log(`${officer.name}, ${officer.position}`)
//             } else {
//                 officerBoardContainer.appendChild(card);
//                 console.log(`${officer.name}, ${officer.position}`)
//             }
//         });

//         console.table(officers)

//     }catch (error) {
//         console.error('Failed to load officer data:', error);
//     }
// }


// //officer card
// const createOfficerCard = (img, name, position) => {
//     let officerCard = document.createElement('div');
//     officerCard.classList.add('officer--card');
//     officerCard.innerHTML = `
//         <img src="${img }" alt="${position}">
//         <p class="name">${name}</p>
//         <p class="position">${position}</p>
//     `  
//     return officerCard
// }


// //program tabs
// // const tabs = document.querySelector('.tabs') 
// // const workshop_tab = tabs.querySelector('.workshops');
// // // const event_tab = tabs.querySelector('.events');
// // const upcomingTitle = document.querySelector('.upcoming-header')
// // const completedTitle = document.querySelector('.completed-header')
// // const programPage = document.getElementById('programPage');
// // // const overlay = document.querySelector('.overlay')
// // // const modal = document.querySelector('.program--modal')
// // // const modal_status = modal.querySelector('.status')
// // // const modal_title = modal.querySelector('.modal__title')
// // // const modal_img = modal.querySelector('.modal__img')
// // // const modal_organizer = modal.querySelector('.organizer')
// // // const modal_date = modal.querySelector('.date')
// // // const modal_location = modal.querySelector('.location').lastElementChild
// // // const modal_desc = modal.querySelector('.desc')
// // // const modal_close = document.getElementById('modal__close')
// // const home_page = document.getElementById('home__page');

// //program page load
// //from the home page it should be able to to set active a workshop or event depending on what was clicked
// document.addEventListener('DOMContentLoaded', () => {

//     if(home_page) {
//         loadHomePrograms()
//     }
    
    
//     if (programPage) {
//         const hash = window.location.hash;
//         if(hash === '#workshops') {
//             switchTabs('workshops');
//             loadPrograms('workshops')
//         } else if(hash === '#events') {
//             switchTabs('events');
//             loadPrograms('events')
//         } else {
//             switchTabs('workshops');
//             loadPrograms('workshops')
//         }
    
//     }

// });

// //workshop tab
// // workshop_tab.addEventListener("click", () => {
// //     let program = 'workshops';
// //     switchTabs(program)
// //     loadPrograms(program);
// // })

// // //event tab
// // event_tab.addEventListener("click", () => {
// //     let program = 'events'
// //     switchTabs(program);
// //     loadPrograms(program);
// // })

// //switch program tabs
// const switchTabs = (active) => {
//     if(active == 'workshops') {
//         workshop_tab.classList.add('workshops--active');
//         event_tab.classList.remove('events--active');
//         upcomingTitle.textContent = `Upcoming Workshops`
//         completedTitle.textContent = `Completed Workshops`
//     } else if(active == 'events') {
//         event_tab.classList.add('events--active');
//         workshop_tab.classList.remove('workshops--active');
//         upcomingTitle.textContent = `Upcoming Events`
//         completedTitle.textContent = `Completed Events`
//     }
// }

// // load programs
// const loadPrograms = async (programType) => {
//     try {
//         const response = await fetch(`../data/${programType}.json`);
//         const programs = await response.json();

//         const upcomingContainer = document.getElementById('upcoming');
//         const completedContainer = document.getElementById('completed');

//         const seeMoreUpcomingBtn = document.getElementById('see-more-upcoming');
//         const seeMoreCompletedBtn = document.getElementById('see-more-completed');

//         upcomingContainer.innerHTML = ``;
//         completedContainer.innerHTML = ``;

//         let upcomingProgramCount = 0;
//         let completedProgramCount = 0;

//         let expanded = false;

//         //create program cards
//         programs.forEach(program => {
//             let card = createProgramCard(program.status, program.img_card, program.title, program.organizer, program.date, program.location, program.time, program.description, programType);
//             if(program.status == 'upcoming') {
//                 if (upcomingProgramCount >= 4) {
//                     card.classList.add('hidden-card');
//                     card.classList.add('hideable') //consider using dataset or a better state storer
//                 } 
//                 upcomingContainer.appendChild(card);
//                 upcomingProgramCount++;
//             } else if (program.status == 'completed') {
//                 if (completedProgramCount >= 4) {
//                     card.classList.add('hidden-card');
//                     card.classList.add('hideable')
//                 }
//                 completedContainer.appendChild(card);
//                 completedProgramCount++;
//             }
//         });

//         //toggle see more visibility and see more logic
        
//         if (upcomingProgramCount > 4) {
//             seeMoreUpcomingBtn.style.display = 'flex';
//             seeMoreUpcomingBtn.onclick = () => {
//                 document.querySelectorAll('#upcoming .hideable').forEach(card => {
//                     if(expanded == true) {
//                         card.classList.remove('hidden-card');
//                     } else if(expanded == false) {
//                         card.classList.add('hidden-card');
//                     }
//                 });
//                 seeMoreUpcomingBtn.textContent = expanded ? 'See Less' : 'See More';
//             };
//         } else {
//             seeMoreUpcomingBtn.style.display = 'none';
//         }

//         if (completedProgramCount > 4) {
//             seeMoreCompletedBtn.style.display = 'flex';
//             seeMoreCompletedBtn.onclick = () => {
//                 expanded = !expanded
//                 document.querySelectorAll('#completed .hideable').forEach(card => {
//                     if(expanded == true) {
//                         card.classList.remove('hidden-card');
//                     } else if(expanded == false) {
//                         card.classList.add('hidden-card');
//                     }

//                     // the issue is that because I remove the hidden card, the program doesn't know which cards are hidden meant to be hidden anymore so it can't find them
                    
//                 });
//                 seeMoreCompletedBtn.textContent = expanded ? 'See Less' : 'See More';
//             };
//         } else {
//             seeMoreCompletedBtn.style.display = 'none';
//         }

//         //create program modal
//         let program_cards = document.querySelectorAll('.program--card');
//         program_cards.forEach(card => {
//             card.addEventListener('click', () => {
//                 let status = card.children[0].textContent
//                 let img = card.children[1].getAttribute('src')
//                 let title = card.children[2].textContent
//                 let organizer = card.children[3].textContent
//                 let date = card.children[4].children[0].textContent
//                 let location = card.children[4].children[1].lastElementChild.textContent
//                 let time = card.children[5].textContent
//                 let desc = card.children[6].textContent
//                 createProgramModal(status, img, title, organizer, date, location, time, desc, programType);
//             })
//         })

        

//     }catch (error) {
//         console.error('Failed to load workshop data:', error);
//     }


// }
