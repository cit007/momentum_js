const todoForm = document.querySelector(".js-todoform");
const todoInput = todoForm.querySelector(".js-todo");
const todoList = document.querySelector(".js-todolist");

const TODOS_LS = "todos";
let todos = [];

function setTodoLocalStorage(){
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function printTodo(todoAll) {
    todoAll.forEach((obj,index,array) => {
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
    const newId = todos.length;

    delBtn.innerText = "❎";
    span.innerText = text;

    li.id = newId;
    li.appendChild(delBtn);
    li.appendChild(span);

    todoList.appendChild(li);

    const todo = {
        text: text,
        id: newId
    };

    console.log("before pushTodo : todos");
    console.log(todos);
    todos.push(todo);
    console.log("after pushTodo : todos");
    setTodoLocalStorage();
    console.log(todos);
}

function addTodo(event) {
    console.log("add to do")
    event.preventDefault();
    const todoTxt = todoInput.value;

    pushTodo(todoTxt);
}

function askForTodo() {
    todoForm.classList.add(SHOWING_CN);
    todoForm.addEventListener("submit", addTodo)
}

function loadTodo() {
    todos = JSON.parse(localStorage.getItem(TODOS_LS));

    askForTodo();
    if(todos !== null) {
        printTodo(todos);
    }
}

function init(){
    console.log("##### INIT ######")
    loadTodo();
}

init();