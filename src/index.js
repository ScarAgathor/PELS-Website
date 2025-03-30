//hamburger and mobile menu
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('.mobileMenu');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('active')
    mobileMenu.classList.toggle('active')
})


//officer page
document.addEventListener('DOMContentLoaded', () => {
    const officerPage = document.getElementById('officerPage');
    
    if (officerPage) {
      loadOfficers();
    }

    
});

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

    }catch (error) {
        console.error('Failed to load officer data:', error);
    }
}


//officer card
let createOfficerCard = (img, name, position) => {
    let officerCard = document.createElement('div');
    officerCard.classList.add('officer--card');
    officerCard.innerHTML = `
        <div class="officer--card">
            <img src="${img }" alt="${position}">
            <p class="name">${name}</p>
            <p class="position">${position}</p>
        </div>
    `  
    return officerCard
}
