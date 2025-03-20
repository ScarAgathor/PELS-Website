//hamburger and mobile menu
let hamburger = document.querySelector('.hamburger');
let mobileMenu = document.querySelector('.mobileMenu');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('active')
    mobileMenu.classList.toggle('active')
})


//officer cards