//hamburger and mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
})


//officer page
document.addEventListener('DOMContentLoaded', () => {
    const officerPage = document.getElementById('officerPage');
    
    if (officerPage) {
      loadOfficers();
    }

    
});

//load officers
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
            let card = createOfficerCard(officer.image, officer.name, officer.position);
            
            if (officer.position.toLowerCase() === 'president') {
                presidentContainer.appendChild(card);
                console.log(`${officer.name}, ${officer.position}`)
            } else if (officer.position.toLowerCase().includes('vice')) {
                vicePresidentContainer.appendChild(card);
                console.log(`${officer.name}, ${officer.position}`)
            } else if(officer.position.toLowerCase().includes('junior')) {
                juniorOfficerContainer.appendChild(card);
                console.log(`${officer.name}, ${officer.position}`)
            } else if(officer.position.toLowerCase().includes('advisor')) {
                advisorOfficerContainer.appendChild(card);
                console.log(`${officer.name}, ${officer.position}`)
            } else {
                officerBoardContainer.appendChild(card);
                console.log(`${officer.name}, ${officer.position}`)
            }
        });

        console.table(officers)

    }catch (error) {
        console.error('Failed to load officer data:', error);
    }
}


//officer card
const createOfficerCard = (img, name, position) => {
    let officerCard = document.createElement('div');
    officerCard.classList.add('officer--card');
    officerCard.innerHTML = `
        <img src="${img }" alt="${position}">
        <p class="name">${name}</p>
        <p class="position">${position}</p>
    `  
    return officerCard
}


//program tabs
const tabs = document.querySelector('.tabs') 
const workshop_tab = tabs.querySelector('.workshops');
const event_tab = tabs.querySelector('.events');
const upcomingTitle = document.querySelector('.upcoming-header')
const completedTitle = document.querySelector('.completed-header')
const programPage = document.getElementById('programPage');
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.program--modal')
const modal_status = modal.querySelector('.status')
const modal_title = modal.querySelector('.modal__title')
const modal_img = modal.querySelector('.modal__img')
const modal_organizer = modal.querySelector('.organizer')
const modal_date = modal.querySelector('.date')
const modal_location = modal.querySelector('.location').lastElementChild
const modal_desc = modal.querySelector('.desc')
const modal_close = document.getElementById('modal__close')

//program page load
//from the home page it should be able to to set active a workshop or event depending on what was clicked
document.addEventListener('DOMContentLoaded', () => {
    
    const hash = window.location.hash;
    if (programPage) {
        if(hash === '#workshops') {
            switchTabs('workshops');
            loadPrograms('workshops')
        } else if(hash === '#events') {
            switchTabs('events');
            loadPrograms('events')
        } else {
            switchTabs('workshops');
            loadPrograms('workshops')
        }
    
    }

});

//workshop tab
workshop_tab.addEventListener("click", () => {
    let program = 'workshops';
    switchTabs(program)
    loadPrograms(program);
})

//event tab
event_tab.addEventListener("click", () => {
    let program = 'events'
    switchTabs(program);
    loadPrograms(program);
})

//switch program tabs
const switchTabs = (active) => {
    if(active == 'workshops') {
        workshop_tab.classList.add('workshops--active');
        event_tab.classList.remove('events--active');
        upcomingTitle.textContent = `Upcoming Workshops`
        completedTitle.textContent = `Completed Workshops`
    } else if(active == 'events') {
        event_tab.classList.add('events--active');
        workshop_tab.classList.remove('workshops--active');
        upcomingTitle.textContent = `Upcoming Events`
        completedTitle.textContent = `Completed Events`
    }
}

// load programs
const loadPrograms = async (programType) => {
    try {
        const response = await fetch(`../data/${programType}.json`);
        const programs = await response.json();

        const upcomingContainer = document.getElementById('upcoming');
        const completedContainer = document.getElementById('completed');

        const seeMoreUpcomingBtn = document.getElementById('see-more-upcoming');
        const seeMoreCompletedBtn = document.getElementById('see-more-completed');

        upcomingContainer.innerHTML = ``;
        completedContainer.innerHTML = ``;

        let upcomingProgramCount = 0;
        let completedProgramCount = 0;

        let expanded = false;

        //create program cards
        programs.forEach(program => {
            let card = createProgramCard(program.status, program.img_card, program.title, program.organizer, program.date, program.location, program.time, program.description, programType);
            if(program.status == 'upcoming') {
                if (upcomingProgramCount >= 4) {
                    card.classList.add('hidden-card');
                    card.classList.add('hideable') //consider using dataset or a better state storer
                } 
                upcomingContainer.appendChild(card);
                upcomingProgramCount++;
            } else if (program.status == 'completed') {
                if (completedProgramCount >= 4) {
                    card.classList.add('hidden-card');
                    card.classList.add('hideable')
                }
                completedContainer.appendChild(card);
                completedProgramCount++;
            }
        });

        //toggle see more visibility and see more logic
        
        if (upcomingProgramCount > 4) {
            seeMoreUpcomingBtn.style.display = 'flex';
            seeMoreUpcomingBtn.onclick = () => {
                document.querySelectorAll('#upcoming .hideable').forEach(card => {
                    if(expanded == true) {
                        card.classList.remove('hidden-card');
                    } else if(expanded == false) {
                        card.classList.add('hidden-card');
                    }
                });
                seeMoreUpcomingBtn.textContent = expanded ? 'See Less' : 'See More';
            };
        } else {
            seeMoreUpcomingBtn.style.display = 'none';
        }

        if (completedProgramCount > 4) {
            seeMoreCompletedBtn.style.display = 'flex';
            seeMoreCompletedBtn.onclick = () => {
                expanded = !expanded
                document.querySelectorAll('#completed .hideable').forEach(card => {
                    if(expanded == true) {
                        card.classList.remove('hidden-card');
                    } else if(expanded == false) {
                        card.classList.add('hidden-card');
                    }

                    // the issue is that because I remove the hidden card, the program doesn't know which cards are hidden meant to be hidden anymore so it can't find them
                    
                });
                seeMoreCompletedBtn.textContent = expanded ? 'See Less' : 'See More';
            };
        } else {
            seeMoreCompletedBtn.style.display = 'none';
        }

        //create program modal
        let program_cards = document.querySelectorAll('.program--card');
        program_cards.forEach(card => {
            card.addEventListener('click', () => {
                let status = card.children[0].textContent
                let img = card.children[1].getAttribute('src')
                let title = card.children[2].textContent
                let organizer = card.children[3].textContent
                let date = card.children[4].children[0].textContent
                let location = card.children[4].children[1].lastElementChild.textContent
                let time = card.children[5].textContent
                let desc = card.children[6].textContent
                createProgramModal(status, img, title, organizer, date, location, time, desc, programType);
            })
        })

        

    }catch (error) {
        console.error('Failed to load workshop data:', error);
    }


}

//overlay
overlay.addEventListener('click', () => {
    overlay.classList.remove('overlay--active')
    modal.classList.remove('program--modal__active')
})

modal_close.addEventListener('click', () => {
    overlay.classList.remove('overlay--active')
    modal.classList.remove('program--modal__active')
})

//program card  
const createProgramCard = (status, img, title, organizer, date, location, time, desc, program) => {
    let programCard = document.createElement('div');
    programCard.classList.add('program--card');
    programCard.classList.add(`program--card__${program}`)

    programCard.innerHTML = `
        <p class="status ${status}">${status}</p>
        <img src="${img}" alt="">
        <h3 class="card__title">${title}</h3>
        <p class="organizer">${organizer}</p>
        <div class="meta">
            <p class="date">${date}</p>
            <p class="location">
                <svg width="19px" height="19px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="#000000"/>
                    </svg>
                <span>${location}</span>
            </p>
        </div>
        <p class="time">${time}</p>
        <p style="display: none;">${desc}</p>
    `  
    return programCard
}

//program modal - change this to just update the modal instead of creating a new modal everytime
const createProgramModal = (status, img, title, organizer, date, location, time, desc, program) => {
   modal.classList.add('program--modal__active');
   modal.firstElementChild.classList.add(`article__${program}`)
   overlay.classList.add('overlay--active')

   modal_status.textContent = status;
   if(status == 'upcoming') {
    modal_status.classList.add(`upcoming`)
    modal_status.classList.remove('completed')
   } else if(status == 'completed') {
    modal_status.classList.add(`completed`)
    modal_status.classList.remove('upcoming')
   }
   
   modal_title.textContent = title;
   modal_organizer.textContent = organizer;
   modal_date.textContent = `${date} @ ${time}`
   modal_location.textContent = location
   modal_desc.textContent = desc
}