const formEl = document.querySelector(".form"); //the form itself (the to do list)
const inputEl = document.querySelector(".input"); //the task entered by the user
const ulEl = document.querySelector(".list"); //the input(new task) is a child of list, so this element is needed in order to append the task at hand to the list
let list = JSON.parse(localStorage.getItem("list"));

list.forEach(task=>{
    toDoList(task);
})

formEl.addEventListener("submit", (event)=>{
    event.preventDefault(); //this will prevent the page from refreshing when a task is entered
    toDoList()
});

function toDoList(task){
    let newTask = inputEl.value;
    if(task){
        newTask = task.name;
    }

    const liEl = document.createElement("li"); //creating a new element to hold the new task, entered by the user
    
    if(task && task.checked){
        liEl.classList.add("checked");    
    }

    liEl.innerText = newTask;
    ulEl.appendChild(liEl); //appends the task to the form, so it will show up in the todo list
    inputEl.value = "";
    
    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `
    <i class="fa-solid fa-square-check">
    `
    liEl.appendChild(checkBtnEl); //this (along with the three lines above) will make the check box show up next to the new task

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `
    <i class="fa-solid fa-trash-can">
    `
    liEl.appendChild(trashBtnEl); //same thing but with the trash icon

    checkBtnEl.addEventListener("click", ()=>{
        liEl.classList.toggle("checked");
        updateLocalStorage();
    })

    trashBtnEl.addEventListener("click", ()=>{
        liEl.remove();
        updateLocalStorage();
    })
    updateLocalStorage();
}

/*
this function stores the tasks in the browsers local storage so that
when the page is refreashed, the information is that same as the user 
left it (taks are checked, they remain on the screen, etc.)
*/ 
function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach(liEl=>{
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")

        })
    })
    localStorage.setItem("list", JSON.stringify(list));
}