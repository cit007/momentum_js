const userForm = document.querySelector(".js-userform");
const userName = userForm.querySelector(".js-username");
const greetings = document.querySelector(".js-greetings");

const USERNAME_LS = "currentUser"
const SHOWING_CN = "showing"
const NOTSHOWING_CN = "notshowing"

function setUserLocalStorage(text){
    localStorage.setItem(USERNAME_LS, text);
}

function updateText(event){
    event.preventDefault();
    currentUser = userName.value;
    
    setUserLocalStorage(currentUser);
    paintGreeting(userName.value);
}

function askForName(){
    userForm.classList.add(SHOWING_CN);
    userForm.addEventListener("submit", updateText);
}

function paintGreeting(text){
    userForm.classList.remove(SHOWING_CN);
    userForm.classList.add(NOTSHOWING_CN);
    
    const date =  new Date();
    const hours = date.getHours();
    if(hours >= 0 && hours < 12) {
        greetings.innerHTML = `Good Morning, ${text}`;
    } else if(hours >= 12 && hours <17) {
        greetings.innerHTML = `Good Afternonn, ${text}`;
    } else {
        greetings.innerHTML = `Good Evening, ${text}`;
    }
    
}

function loadNmae(){
    currentUserName = localStorage.getItem(USERNAME_LS);
    if(currentUserName === null){
        askForName();
    } else {
        paintGreeting(currentUserName);
        
    }
}

function init(){
    loadNmae();
}

init();