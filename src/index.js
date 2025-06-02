const home_page = document.getElementById('home__page');
const program_page = document.getElementById('program__page');
const officer_page = document.getElementById('officer__page');
const join_page = document.getElementById('joinus__page');
const hamburger = document.getElementById('hamburger');
const mobile_menu = document.getElementById('mobileMenu');
const overlay = document.querySelector('.overlay')
const modal = document.getElementById('modal')
const modal_status = modal?.querySelector('.modal__status')
const modal_title = modal?.querySelector('.modal__title')
const modal_img = modal?.querySelector('.modal__image')
const modal_organizer = modal?.querySelector('.modal__organizer')
const modal_date = modal?.querySelector('.modal__date')
const modal_location = modal?.querySelector('.modal__location__container').lastElementChild
const modal_desc = modal?.querySelector('.modal__desc')
const modal_close = document.getElementById('modal__close')
const tabs = document.querySelector('.tabs'); 
const workshop_tab = tabs?.querySelector('#tab-workshops');
const event_tab = tabs?.querySelector('#tab-events');
const upcomingTitle = document.getElementById('upcoming__title');
const completedTitle = document.getElementById('completed__title');

let lastFocusedElement = null;
let programType = null;

document.addEventListener('DOMContentLoaded', () => {
    if(home_page) {
        loadHomePrograms();
    } 
    if(program_page) {
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        const storedTab = localStorage.getItem('selectedTab');
        const isValidTab = (tab) => tab === 'events' || tab === 'workshops';

        if (isValidTab(tabParam)) {
            programType = tabParam;
            clearTabParam();
        } else if (storedTab === 'events' || storedTab === 'workshops') {
            programType = storedTab;
        } else {
            programType = 'workshops';
        }
        switchTabs(programType);
        loadPrograms(programType);
    }  
    if(officer_page) {
        loadOfficers();
    }
})

const clearTabParam = () => {
    if (window.history.replaceState) {
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('program__modal--active')) {
        resetModal();
    }
});

//hamburger and mobile menu
if(hamburger) {
    hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
})
}

//overlay and modal closing logic
if(overlay) {
    overlay.addEventListener('click', () => {
        resetModal();
    })
}

if(modal_close) {
    modal_close.addEventListener('click', () => {
        resetModal();
    })
}

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
   modal_desc.innerHTML = `<div class="modal__desc__scroll" tabindex="0">${desc}</div>`;

   trapFocus(modal)
}

const trapFocus = (element) => { //focus trapping for the modal. I got it online, I don't fully understand it
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

const loadPrograms = async (programType='workshops') => {
    try {
        const response = await fetch(`../data/${programType}.json`);
        const programs = await response.json();

        const upcomingContainer = document.getElementById(`upcoming-container`);
        const completedContainer = document.getElementById(`completed-container`);

        upcomingContainer.innerHTML = '';
        completedContainer.innerHTML = '';

        programs.forEach(program => {
            const card = createProgramCard(
                program.status,
                program.img_card,
                program.title,
                program.organizer,
                program.date,
                program.location,
                program.time,
                program.description,
                programType
            );

            const container = program.status === 'upcoming' ? upcomingContainer : completedContainer;
            container.appendChild(card);

            // Click to open modal
            const openModal = () => {
                createProgramModal(
                    program.status,
                    program.img_card,
                    program.title,
                    program.organizer,
                    formatDate(program.date),
                    program.location,
                    program.time,
                    program.description,
                    programType
                );
                initializeModal();
            };

            card.addEventListener('click', openModal);

            // Keyboard accessibility (Enter, Space)
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal();
                }
            });
        });

    } catch (err) {
        console.error(`Failed to load ${programType}:`, err);
    }
};


if (workshop_tab && event_tab) {
    workshop_tab.addEventListener("click", () => {
        programType = 'workshops';
        localStorage.setItem('selectedTab', programType);
        switchTabs(programType);
        loadPrograms(programType);
    });

    event_tab.addEventListener("click", () => {
        programType = 'events';
        localStorage.setItem('selectedTab', programType);
        switchTabs(programType);
        loadPrograms(programType);
    });
}

//switch program tabs
const switchTabs = (activePrograms) => {
    if(activePrograms === 'workshops') {
        workshop_tab.classList.add('tabs__workshops--active');
        event_tab.classList.remove('tabs__events--active');
        upcomingTitle.textContent = `Upcoming Workshops`
        completedTitle.textContent = `Completed Workshops`
    } else if(activePrograms === 'events') {
        event_tab.classList.add('tabs__events--active');
        workshop_tab.classList.remove('tabs__workshops--active');
        upcomingTitle.textContent = `Upcoming Events`
        completedTitle.textContent = `Completed Events`
    }
}

// //load officers
const  loadOfficers = async () => {
    try {
        const response = await fetch('../data/officers.json');
        const officers = await response.json();

        const presidentContainer = document.getElementById('presidentCont');
        const vicePresidentContainer = document.getElementById('viceCont');
        const officerBoardContainer = document.getElementById('boardCont');
        const juniorOfficerContainer = document.getElementById('juniorCont');
        const advisorOfficerContainer = document.getElementById('advisorCont');

        officers.forEach(officer => {
            let card = createOfficerCard(officer.image, officer.name, officer.position, officer.linkedin);
            
            if (officer.position.toLowerCase() === 'president') {
                presidentContainer.appendChild(card);
            } else if (officer.position.toLowerCase().includes('vice')) {
                vicePresidentContainer.appendChild(card);
            } else if(officer.position.toLowerCase().includes('junior')) {
                juniorOfficerContainer.appendChild(card);
            } else if(officer.position.toLowerCase().includes('advisor')) {
                advisorOfficerContainer.appendChild(card);
            } else {
                officerBoardContainer.appendChild(card);
            }
        });

        console.table(officers)

    }catch (error) {
        console.error('Failed to load officer data:', error);
    }
}

//officer card
const createOfficerCard = (img, name, position, linkedin) => {
    let officerCard = document.createElement('div');
    officerCard.classList.add('officer__card');
    officerCard.innerHTML = `
        <img src="${img }" alt="${position}" class="officer__image">
        <p class="officer__name">${name}</p>
        <p class="officer__position">${position}</p>
        <a class="officer__linkedin" href="${linkedin}" target="_blank">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="#b71933"/>
                <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="#b71933"/>
                <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="#b71933"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#b71933"/>
            </svg> 
            <span>LinkedIn</span>
        </a>
    `  
    return officerCard
}
