const home_page = document.getElementById('home__page');
const program_page = document.getElementById('program__page');
const officer_page = document.getElementById('officer__page');
const join_page = document.getElementById('joinus__page');
const newsletter_page = document.getElementById('newsletter__page');
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
const modal_register = document.getElementById('modal__register')
const modal_calendar = document.getElementById('modal__calendar')
const modal_close = document.getElementById('modal__close')

const REGISTER_LINK_FALLBACK = 'https://rowdylink.utsa.edu/organization/powerelectronicssociety';
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
        loadHomeOfficers();
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
    if(join_page) {
        
    }
    if(newsletter_page) {
        
    }
})

//clear workshop or events tab speififier from params
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

    try {
        const response = await fetch('https://qhebafqzladdoxxiojry.supabase.co/functions/v1/get-programs');
        const data = await response.json();

        for (let type of program_types) {
            const program_group = data.programs.filter(program => program.program_type === type.slice(0, -1));
            const upcoming_programs = program_group.filter(program => program.status === false).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 2); // Only take the first 2
            const container = document.querySelector(`.programs__content--${type}`);

            upcoming_programs.forEach(program => {
                const card = createProgramCard(program.status, program.image_url, program.title, program.organizer, formatDateToText(program.date), program.location, formatTimeToText(program.time), program.desc, program.program_type);
                container.appendChild(card);

                card.addEventListener('click', () => {
                    createProgramModal(program, program.program_type);
                    initializeModal();
                });
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault(); // Prevent scrolling if Space
                        createProgramModal(program, program.program_type);
                        initializeModal();
                    }
                })
            });

            if(container.innerHTML == "") {
                container.innerHTML = `
                    <p class="programs__empty">There are currently no upcoming ${type}.</p>
                `;
            }
        }
    } catch (error) {
        console.error(`Failed to load programs:`, error);
    }
};

const createProgramCard = (status, img, title, organizer, date, location, time, desc, program) => {
    let programCard = document.createElement('article');
    programCard.classList.add('program__card',  `program__card--${program}`);
    programCard.setAttribute('tabindex', '0');
    programCard.setAttribute('role', 'button');
    programCard.setAttribute('aria-label', `${title}, organized by ${organizer}, on ${date} at ${time}`);

    const hasImage = img && img.trim() !== '';

    const imageMarkup = hasImage
        ? `<img src="${img}" alt="Banner for ${title}" class="card__image">`
        : `<div class="card__image card__image--empty" role="img" aria-label="No cover image available">
                <svg fill="#000000" viewBox="0 0 512.001 512.001" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M160.235,276.571l-144.5-159.983c-9.383,5.578-15.734,15.711-15.734,27.414v256.005c0,17.672,14.328,31.994,32,31.994
                            h268.625l-58.867-65.17C196.993,360.155,162.407,322.662,160.235,276.571z"/>
                        <path d="M480.001,112.001h-112l-23.156-46.313c-5.422-10.84-16.5-17.687-28.625-17.687H195.782
                            c-12.125,0-23.203,6.848-28.625,17.688l-10.836,21.672L87.782,10.594C75.985-2.539,55.735-3.61,42.594,8.211
                            c-13.141,11.828-14.203,32.063-2.375,45.196l399.992,448c6.313,7.024,15.031,10.594,23.797,10.594
                            c7.625,0,15.281-2.711,21.391-8.211c13.141-11.828,14.203-32.067,2.375-45.2l-23.734-26.59h15.961c17.672,0,32-14.321,32-31.994
                            V144.002C512.001,126.33,497.672,112.001,480.001,112.001z M237.196,177.94c6.086-1.219,12.359-1.938,18.805-1.938
                            c53.016,0,96,42.981,96,96.002c0,10.223-1.758,19.996-4.727,29.227L237.196,177.94z"/>
                    </g>
                </svg>
            </div>`;

    programCard.innerHTML = `
        <p class="card__status ${status ? "completed" : "upcoming"}">${status ? "Completed" : "Upcoming"}</p>
        ${imageMarkup}
        <h3 class="card__title">${title}</h3>
        <p class="card__organizer">${organizer}</p>
        <div class="card__meta">
            <p class="card__date">${date}</p>
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

    if (hasImage) {
        const cardImage = programCard.querySelector('.card__image');
        if (cardImage.complete) {
            cardImage.classList.add('card__image--loaded');
        } else {
            cardImage.addEventListener('load', () => cardImage.classList.add('card__image--loaded'));
            cardImage.addEventListener('error', () => cardImage.classList.add('card__image--loaded'));
        }
    }

    return programCard
}

const renderLoadingSpinner = (container, programType) => {
    container.innerHTML = '';
    const loading = document.createElement('div');
    loading.classList.add('programs__loading', `programs__loading--${programType}`);
    loading.innerHTML = `
        <span class="programs__spinner" aria-hidden="true"></span>
        <p>Loading ${programType}...</p>
    `
    container.appendChild(loading);
}

const createProgramModal = (program, programType) => {
    const { status, image_url: img, title, organizer, location, desc } = program;
    const date = formatDateToText(program.date);
    const time = formatTimeToText(program.time);

    modal.classList.add('program__modal--active');
    modal.firstElementChild.classList.add(`modal__${programType}`)
    overlay.classList.add('overlay--active')
    modal.setAttribute('aria-hidden', 'false');

    if(img !== "") {
        modal.querySelector('.modal__image').classList.add('modal__image--active');
        modal.querySelector('.modal__image__empty').classList.remove("modal__image__empty--active")
        modal.querySelector('.modal__image').src = img;
        modal.querySelector('.modal__image').alt = `${title} Image`;
    } else {
        modal.querySelector('#modal__image').classList.remove('modal__image--active');
        modal.querySelector('.modal__image__empty').classList.add("modal__image__empty--active");
    }

    modal_status.textContent = `${status ? "Completed" : "Upcoming"}`;
    modal_status.classList.add(`${status ? "completed" : "upcoming"}`);
    modal_title.textContent = title;
    modal_organizer.textContent = `By ${organizer}`;
    modal_date.textContent = `${date} @ ${time}`
    modal_location.textContent = location
    modal_desc.innerHTML = `<div class="modal__desc__scroll" tabindex="0">${desc}</div>`;

    // Register and calendar actions only make sense for upcoming programs (workshops or events)
    if (status === false) {
        // Register link is submitted through the admin site; fall back to the org page until it's populated per-program
        modal_register.href = program.register_link || REGISTER_LINK_FALLBACK;
        modal_register.hidden = false;

        modal_calendar.href = buildGoogleCalendarUrl(program);
        modal_calendar.hidden = false;
    } else {
        modal_register.hidden = true;
        modal_calendar.hidden = true;
    }

    trapFocus(modal)
}

const pad2 = (n) => String(n).padStart(2, '0');

const formatGoogleCalendarDateTime = (date) => {
    return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}T${pad2(date.getHours())}${pad2(date.getMinutes())}${pad2(date.getSeconds())}`;
};

const buildGoogleCalendarUrl = (program) => {
    const [year, month, day] = program.date.split('-').map(Number);
    const [hour, minute, second] = program.time.split(':').map(Number);
    const start = new Date(year, month - 1, day, hour, minute, second || 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // default to a 1-hour block, no end time is stored

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: program.title,
        dates: `${formatGoogleCalendarDateTime(start)}/${formatGoogleCalendarDateTime(end)}`,
        details: program.desc || '',
        location: program.location || '',
        ctz: 'America/Chicago'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

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
    const upcomingContainer = document.getElementById(`upcoming-container`);
    const completedContainer = document.getElementById(`completed-container`);
    const seeMoreUpcoming = document.getElementById('seemore--upcoming');
    const seeMoreCompleted = document.getElementById('seemore--completed');

    renderLoadingSpinner(upcomingContainer, programType);
    renderLoadingSpinner(completedContainer, programType);
    seeMoreUpcoming.style.display = 'none';
    seeMoreCompleted.style.display = 'none';

    try {//make a function to filter for program types
        const response = await fetch('https://qhebafqzladdoxxiojry.supabase.co/functions/v1/get-programs')
        const data = await response.json();

        upcomingContainer.innerHTML = '';
        completedContainer.innerHTML = '';

        let currentPrograms = data.programs.filter(program => program.program_type === programType.slice(0, -1));

        currentPrograms.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));

        currentPrograms.forEach(program => {
            const card = createProgramCard(
                program.status,
                program.image_url,
                program.title,
                program.organizer,
                formatDateToText(program.date),
                program.location,
                formatTimeToText(program.time),
                program.desc,
                programType
            );

            const container = program.status === false ? upcomingContainer : completedContainer;
            container.appendChild(card);

            // Click to open modal
            const openModal = () => {
                createProgramModal(program, programType);
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

        setupSeeMore(upcomingContainer, seeMoreUpcoming);
        setupSeeMore(completedContainer, seeMoreCompleted);

        if (upcomingContainer.innerHTML === '') {
            upcomingContainer.innerHTML = `<p class="programs__empty">There are currently no upcoming ${programType}.</p>`;
        }
        if (completedContainer.innerHTML === '') {
            completedContainer.innerHTML = `<p class="programs__empty">There are currently no completed ${programType}.</p>`;
        }
    }catch (err) {
        console.error(`Failed to load ${programType}:`, err);
        upcomingContainer.innerHTML = `<p class="programs__empty">Failed to load ${programType}. Please try again later.</p>`;
        completedContainer.innerHTML = '';
    }
};

// hides cards beyond the first 4 and wires up the See More/See Less toggle
const setupSeeMore = (container, button) => {
    const cards = Array.from(container.children);

    // clone to strip listeners from previous loadPrograms() calls before re-binding
    const buttonId = button.id;
    button.replaceWith(button.cloneNode(true));
    button = document.getElementById(buttonId);

    if (cards.length > 4) {
        cards.slice(4).forEach(card => card.classList.add('hidden-card'));
        button.style.display = 'flex';
        button.setAttribute('aria-expanded', 'false');
        button.querySelector('span').textContent = 'See More';

        button.addEventListener('click', () => toggleSeeMore(container, button));
    } else {
        button.style.display = 'none';
    }
};

const toggleSeeMore = (container, button) => {
    const expanded = button.getAttribute('aria-expanded') === 'true';

    if (expanded) {
        Array.from(container.children).slice(4).forEach(card => card.classList.add('hidden-card'));
        button.setAttribute('aria-expanded', 'false');
        button.querySelector('span').textContent = 'See More';
    } else {
        container.querySelectorAll('.hidden-card').forEach(card => card.classList.remove('hidden-card'));
        button.setAttribute('aria-expanded', 'true');
        button.querySelector('span').textContent = 'See Less';
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
    const seeMoreButtons = document.querySelectorAll('.seemorebutton');

    if(activePrograms === 'workshops') {
        workshop_tab.classList.add('tabs__workshops--active');
        event_tab.classList.remove('tabs__events--active');
        upcomingTitle.textContent = `Upcoming Workshops`
        completedTitle.textContent = `Completed Workshops`
        seeMoreButtons.forEach(button => {
            button.classList.add('seemorebutton--workshops');
            button.classList.remove('seemorebutton--events');
        });
    } else if(activePrograms === 'events') {
        event_tab.classList.add('tabs__events--active');
        workshop_tab.classList.remove('tabs__workshops--active');
        upcomingTitle.textContent = `Upcoming Events`
        completedTitle.textContent = `Completed Events`
        seeMoreButtons.forEach(button => {
            button.classList.add('seemorebutton--events');
            button.classList.remove('seemorebutton--workshops');
        });
    }
}

// //load officers
const  loadOfficers = async () => {
    const officersLoading = document.getElementById('officersLoading');
    const officersContent = document.getElementById('officersContent');
    const presidentContainer = document.getElementById('presidentCont');
    const vicePresidentContainer = document.getElementById('viceCont');
    const officerBoardContainer = document.getElementById('boardCont');
    const juniorOfficerContainer = document.getElementById('juniorCont');
    const advisorOfficerContainer = document.getElementById('advisorCont');
    const pastOfficerContainer = document.getElementById('pastCont');

    const containers = [presidentContainer, vicePresidentContainer, officerBoardContainer, juniorOfficerContainer, advisorOfficerContainer, pastOfficerContainer];

    // reveal the fully-populated page in one go instead of section-by-section, so nothing resizes mid-load
    const revealContent = () => {
        officersLoading.hidden = true;
        officersContent.hidden = false;
    };

    try {
        const response = await fetch('https://qhebafqzladdoxxiojry.supabase.co/functions/v1/get-officers');
        const data = await response.json();

        containers.forEach(cont => {
            cont.innerHTML = "";
        })

        if(data.error) {
            containers[0].parentElement.style.gap = 0;
            containers[0].innerHTML = `
                <p class="officers__error">Error Loading Officers</p>
            `;
            containers[3].innerHTML = `
                <p class="officers__error">Error Loading Officers</p>
            `;
            containers[4].innerHTML = `
                <p class="officers__error">Error Loading Officers</p>
            `;
            containers[5].innerHTML = `
                <p class="officers__error">Error Loading Officers</p>
            `;
        } else {
            data.officers.forEach(officer => {
                let card = createOfficerCard(officer.image_url, officer.name, officer.position, officer.linkedin);

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
        }

        //check if any officer container is empty. The code is really bad and repetitive. Improve this later
        if(containers[0].innerHTML == '' && containers[1].innerHTML == '' && containers[2].innerHTML == '' ) {
            containers[0].parentElement.style.gap = 0;
            containers[0].innerHTML = `
                <p class="officers__empty">No Officers are currently available</p>
            `;
        }

        if(containers[3].innerHTML == '') {
            containers[3].innerHTML = `
                <p class="officers__empty">No Junior Officers are currently available</p>
            `;
        }

        if(containers[4].innerHTML == '') {
            containers[4].innerHTML = `
                <p class="officers__empty">No Senior Advisors are currently available</p>
            `;
        }

        if(containers[5].innerHTML == '') {
            containers[5].innerHTML = `
                <p class="officers__empty">No Past Officers are currently available</p>
            `;
        }

        revealContent();
    }catch (error) {
        console.error('Failed to load officer data:', error);
        containers[0].parentElement.style.gap = 0;
        containers[0].innerHTML = `
            <p class="officers__error">Error Loading Officers</p>
        `;
        revealContent();
    }
}

//officer card
const createOfficerCard = (img, name, position, linkedin) => {
    let officerCard = document.createElement('div');
    officerCard.classList.add('officer__card');
    officerCard.innerHTML = `
        <img src="${img || 'https://res.cloudinary.com/dvcpaters/image/upload/v1756758759/profile-default-svgrepo-com_nh90vr.svg'}" alt="${position}" class="officer__image">
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

const loadHomeOfficers = async () => {
    const container = document.getElementById('officers__container-home');

    try {
        const response = await fetch('https://qhebafqzladdoxxiojry.supabase.co/functions/v1/get-officers');
        const data = await response.json();

        //clear all skeletons
        container.innerHTML = "";

        if(data.error) {
            container.style.marginTop = 0;
            container.innerHTML = `
                <p class="officers__error">Error Loading Officers!!!</p>
            `;
        } else {
            data.officers.forEach(officer => {
                let card = createOfficerCard(officer.image_url, officer.name, officer.position, officer.linkedin);

                if (officer.position.toLowerCase() === 'president') {
                    card.classList.add('P');
                    container.appendChild(card);
                } else if (officer.position.toLowerCase().includes('vice')) {
                    container.appendChild(card);
                }
            });
        }

        if(container.innerHTML == ''  ) {
            container.style.marginTop = 0;
            container.innerHTML = `
                <p class="officers__empty">No Officers are currently available.</p>
            `;
        } 
        
    }catch (error) {
        console.error('Failed to load officer data:', error);
    }
}

const formatDateToText = (raw_date) => {
  const [year, month, day] = raw_date.split("-");
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

const formatTimeToText = (raw_time) => {
  const [hours, minutes, seconds] = raw_time.split(":");
  const date = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  }).format(date);
};