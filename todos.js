const todoForm = document.querySelector(".js-todoform");
const todoInput = todoForm.querySelector(".js-todo");
const todoList = document.querySelector(".js-todolist");

const TODOS_LS = "todos"

function setLocalStorage(text){
    console.log(text);
}

function printTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    delBtn.innerText = "❎"
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);

    todoList.appendChild(li);

}

function addTodo(event) {
    event.preventDefault();
    const todo = todoInput.value;

    printTodo(todo);
}

function askForTodo() {
    todoForm.classList.add(SHOWING_CN);
    todoForm.addEventListener("submit", addTodo)
}

function loadTodo() {
    const todos = localStorage.getItem(TODOS_LS);
    // if(todos !== null) {
        askForTodo();
    // }
}

function init(){
    loadTodo();
}

init();