const userForm = document.querySelector(".js-userform");
const userName = userForm.querySelector(".js-username");
const greetings = document.querySelector(".js-greetings");

const USERNAME_LS = "currentUser"
const SHOWING_CN = "showing"
const NOTSHOWING_CN = "notshowing"

function setLocalStorage(text){
    localStorage.setItem(USERNAME_LS, text);
}

function updateText(event){
    event.preventDefault();
    currentUser = userName.value;
    
    setLocalStorage(currentUser);
    paintGreeting(userName.value);
}

function askForName(){
    userForm.classList.add(SHOWING_CN);
    userForm.addEventListener("submit", updateText);
}

function paintGreeting(text){
    userForm.classList.remove(SHOWING_CN);
    userForm.classList.add(NOTSHOWING_CN);
    greetings.innerHTML = `Hello ${text}`;
}

function loadNmae(){
    currentUserName = localStorage.getItem("currentUser");
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