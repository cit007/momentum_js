const todoForm = document.querySelector(".js-todoform");
const todoInput = todoForm.querySelector(".js-todo");
const todoList = document.querySelector(".js-todolist");

const TODOS_LS = "todos";
const todos = [];

function setTodoLocalStorage(todos){
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function printTodo(todos) {
    todos.forEach((obj,index,array) => {
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        const span = document.createElement("span");

        console.log(obj);
        delBtn.innerText = "❎"
        span.innerText = obj.text;
    
        li.id = obj.id;
        li.appendChild(delBtn);
        li.appendChild(span);
    
        todoList.appendChild(li);
    })
}

function pushTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    delBtn.innerText = "❎"
    span.innerText = text;

    newId = todos.length;
    li.id = newId;
    li.appendChild(delBtn);
    li.appendChild(span);

    todoList.appendChild(li);

    todo = {
        text: text,
        id: newId
    }

    todos.push(todo);
    setTodoLocalStorage(todos);
}

function addTodo(event) {
    event.preventDefault();
    const todo = todoInput.value;

    pushTodo(todo);
}

function askForTodo() {
    todoForm.classList.add(SHOWING_CN);
    todoForm.addEventListener("submit", addTodo)
}

function loadTodo() {
    const todos = localStorage.getItem(TODOS_LS);
    askForTodo();
    if(todos !== null) {
        printTodo(JSON.parse(localStorage.getItem(TODOS_LS)));
    }
}

function init(){
    loadTodo();
}

init();