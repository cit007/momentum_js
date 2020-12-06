const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-form__input");
const pendingList = document.querySelector(".pending-list");
const finishList = document.querySelector(".finish-list");

const checkBtn = document.querySelector(".check-btn");
const backBtn = document.querySelector(".back-btn");
const deleteBtn = document.querySelector(".delete-btn");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";
let pendingArr = [];
let finishArr = [];

function appendItem(text, pending=true) {
  const item = document.createElement("li");
  let idAttr = document.createAttribute("id");
  const spanTxt = document.createElement("span");
  spanTxt.innerText = text;
  //delete button
  const delBtn = deleteBtn.cloneNode(true);
  delBtn.addEventListener("click", handleDelete)

  let chkBtn = ""
  if(pending == true) {
    chkBtn = checkBtn.cloneNode(true);
    chkBtn.addEventListener("click", handleCheck);
  } else {
    chkBtn = backBtn.cloneNode(true);
    chkBtn.addEventListener("click", handleBack);
  }

  const id = Date.now();
  console.log(id);
  idAttr.value = id;
  item.setAttributeNode(idAttr);
  item.appendChild(spanTxt);
  item.appendChild(delBtn);
  item.appendChild(chkBtn);
  if(pending == true) {
    pendingList.appendChild(item);

    const insObj = {"id":id, "text":text};
    pendingArr.push(insObj);
    console.log("local", insObj)
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingArr));
  } else {
    finishList.appendChild(item);

    const insObj = {"id":id, "text":text};
    finishArr.push(insObj);
    console.log("local", insObj)
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishArr));
  }
}

function handleSubmit(e) {
  e.preventDefault();

  appendItem(todoInput.value, true);
  todoInput.value = "";
}

function handleDelete(e) {
  console.log(e.target.parentElement)
  const className = e.target.parentElement.parentElement.getAttribute("class");
  const id = e.target.parentElement.getAttribute("id");
  console.log("-----", id, className)

  if(className === "pending-list") {
    // delete from array list & set localStorage
    pendingArr = pendingArr.filter( obj => {
      console.log(obj.id, id)
      if(obj.id.toString() !== id)
        return true;
    })
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingArr));

    // delete from ui
    pendingList.removeChild(e.target.parentElement);
  } else {
    // delete from array list & set localStorage
    finishArr = finishArr.filter( obj => {
      console.log(obj.id, id)
      if(obj.id.toString() !== id)
        return true;
    })
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishArr));

    // delete from ui
    finishList.removeChild(e.target.parentElement);
  }
  
}

function handleCheck(e) {
  const text = e.target.parentElement.querySelector("span").innerText
  // console.log(text)
  appendItem(text, false);
  handleDelete(e);
}

function handleBack(e) {
  const text = e.target.parentElement.querySelector("span").innerText
  appendItem(text, true);
  handleDelete(e);
}

function printAllFromLocalStorage(arrData, pending=true) {
  arrData.forEach((obj) => {
    console.log(obj.id, obj.text);
    const item = document.createElement("li");
    let idAttr = document.createAttribute("id");
    const spanTxt = document.createElement("span");
    spanTxt.innerText = obj.text;
    const delBtn = document.createElement("button");
    delBtn.innerText = "❎";
    delBtn.addEventListener("click", handleDelete)
    const chkBtn = document.createElement("button");
    if(pending == true) {
      chkBtn.innerText = "✔︎";
      chkBtn.addEventListener("click", handleCheck);
    } else {
      chkBtn.innerText = "◀︎";
      chkBtn.addEventListener("click", handleBack);
    }

    idAttr.value = obj.id;
    item.setAttributeNode(idAttr);
    item.appendChild(spanTxt);
    item.appendChild(delBtn);
    item.appendChild(chkBtn);
    if(pending == true) {
      pendingList.appendChild(item);
    } else {
      finishList.appendChild(item);
    }
  })
}

function init() {
  let pendingLs = JSON.parse(localStorage.getItem(PENDING_LS));
  pendingLs ? pendingArr = pendingLs : [];
  let finishLs = JSON.parse(localStorage.getItem(FINISHED_LS));
  finishLs ? finishArr = finishLs : [];
  console.log(pendingArr,finishArr);

  if(pendingArr.length > 0) {
    printAllFromLocalStorage(pendingArr, true);
  }
  if(finishArr.length > 0) {
    printAllFromLocalStorage(finishArr, false);
  }

  todoForm.addEventListener("submit", handleSubmit);
}

init();
