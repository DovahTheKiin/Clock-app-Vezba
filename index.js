const moreLess = document.querySelector(".more-less")
const header = document.querySelector(".header")
const quote = document.querySelector(".quote")
const main = document.querySelector(".main")
const arrowIcon = document.querySelector(".arrow-icon")
const animationDiv = document.querySelector(".animation-div")
const quoteButton = document.querySelector(".refresh-quote-btn")
const timeTitle = document.querySelector(".time-title")
const mainTime = document.querySelector(".time")
const body = document.body;
const sunIcon = document.querySelector(".sun-icon")
const quoteText = document.querySelector(".quote-text")

const mediaQuery = window.matchMedia('(min-width: 700px)')

moreLess.addEventListener('click', () => {
    header.classList.toggle("header-height")
    main.classList.toggle("main-height")
    arrowIcon.classList.toggle("arrow-animation")
    animationDiv.classList.toggle("quote-animation")
})

async function randomQuote() {

    const quote = document.querySelector(".quote-p")
    const author = document.querySelector(".quote-person")


    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();

    let max = Number(data.length);

    let i = Math.floor(Math.random() * max);
    quote.innerText = data[i].text;
    
    let authorData = data[i].author;
    let authorName = authorData.substring(0, authorData.indexOf(','));
    author.innerText = authorName;
    quoteText.classList.add("quoteAnimation");
    quoteButton.classList.add("refreshAnimation");

}

let city;
let country;
let continent;
let ip;

async function cityAndCountry() {

    const cityCountry = document.querySelector(".city-country");

    const response = await fetch(`https://freeipapi.com/api/json`);
    const data = await response.json();

    console.log(data)

    city = `${data.cityName}`;
    continent = `${data.continent}`;
    country = `${data.countryName}`;

    ip = `${data.ipAddress}`;

    cityCountry.innerText = `IN ${city}, ${data.countryCode}`;

    time();

}

async function time() {

    const time = document.querySelector(".time")
    const timeZone = document.querySelector(".time-zone")
    const currentTimezone = document.querySelector(".current-timezone")
    const dayOfTheYear = document.querySelector(".day-of-the-year")
    const dayOfTheWeek = document.querySelector(".day-of-the-week")
    const weekNumber = document.querySelector(".week-number")

    const response = await fetch(`http://worldtimeapi.org/api/ip/${ip}`);
    const data = await response.json();


    let timeData = data.datetime;
    time.innerText = timeData.substring(11, 16);
    timeZone.innerText = `${data.abbreviation}`;
    currentTimezone.innerText =`${data.timezone}`;
    dayOfTheYear.innerText =`${data.day_of_year}`;
    dayOfTheWeek.innerText =`${data.day_of_week}`;
    weekNumber.innerText =`${data.week_number}`;

}
let timeOfDay;
let nightTime = false;
function changeTheme() {
    timeOfDay = Number(mainTime.innerText.substring(0, 2));
    if(timeOfDay > 18 || timeOfDay < 5) {
        nightTime = true;
        resizePicture();
         sunIcon.src = "assets/desktop/icon-moon.svg";
         main.style.color = "var(--white-100)";
         main.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
    } else {
        nightTime = false;
    }
    periodOfTheDay();
}

function periodOfTheDay() {
    if(timeOfDay > 5 && timeOfDay < 12 && mediaQuery.matches) {
        timeTitle.innerText = "GOOD MORNING, IT’S CURRENTLY"; 
    } else if(timeOfDay > 5 && timeOfDay < 12 && !mediaQuery.matches) {
        timeTitle.innerText = "GOOD MORNING";
    }
    if(timeOfDay > 12 && timeOfDay < 18 && mediaQuery.matches) {
        timeTitle.innerText = "GOOD AFTERNOON, IT’S CURRENTLY"; 
    } else if(timeOfDay > 12 && timeOfDay < 18 && !mediaQuery.matches) {
        timeTitle.innerText = "GOOD AFTERNOON";
    }
    if(timeOfDay > 18 && timeOfDay < 24 && mediaQuery.matches) {
        timeTitle.innerText = "GOOD EVENING, IT’S CURRENTLY"; 
    } else if(timeOfDay > 18 && timeOfDay < 24 && !mediaQuery.matches) {
        timeTitle.innerText = "GOOD EVENING";
    }
    if(timeOfDay > 0 && timeOfDay < 5 && mediaQuery.matches) {
        timeTitle.innerText = "GOOD EVENING, IT’S CURRENTLY"; 
    } else if(timeOfDay > 0 && timeOfDay < 5 && !mediaQuery.matches) {
        timeTitle.innerText = "GOOD EVENING";
    }
}

function resizePicture() {
    const mediaQueryMobile = window.matchMedia('(max-width: 700px)')
    const mediaQueryTablet = window.matchMedia('(min-width: 700px)')
    const mediaQueryDesktop = window.matchMedia('(min-width: 1150px)')
    if (mediaQueryMobile.matches) {
        body.style.backgroundImage = "url('../assets/mobile/bg-image-nighttime.jpg')"; 
    }
    if (mediaQueryTablet.matches) {
        body.style.backgroundImage = "url('../assets/tablet/bg-image-nighttime.jpg')";
    }
    if (mediaQueryDesktop.matches) {
        body.style.backgroundImage = "url('../assets/desktop/bg-image-nighttime.jpg')";
    }
}

quoteButton.addEventListener('click', () => {
    randomQuote();
    quoteText.classList.remove("quoteAnimation");
    quoteButton.classList.remove("refreshAnimation");
})
document.addEventListener('DOMContentLoaded', () => {
    //cityAndCountry();
    changeTheme();
})

window.addEventListener("resize", () => {
    periodOfTheDay();
    if(nightTime === true) {
        resizePicture();
    }
})



