let taskInput = document.getElementById("taskInput");
let priority = document.getElementById("priority");
let dueDate = document.getElementById("dueDate");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let searchTask = document.getElementById("searchTask");

let totalTask = document.getElementById("totalTask");
let completedTask = document.getElementById("completedTask");
let pendingTask = document.getElementById("pendingTask");
let progressFill = document.getElementById("progressFill");

addBtn.onclick = addTask;

taskInput.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        addTask();
    }
});

function addTask(){

    if(taskInput.value.trim()==""){
        alert("Please Enter Task");
        return;
    }

    let li=document.createElement("li");

    let left=document.createElement("div");

    let check=document.createElement("input");
    check.type="checkbox";

    let span=document.createElement("span");
    span.innerText=taskInput.value;

    let info=document.createElement("p");
    info.innerHTML=
    "<br>Priority : "+priority.value+
    " | Due : "+dueDate.value;

    left.append(check);
    left.append(span);
    left.append(info);

    let right=document.createElement("div");

    let edit=document.createElement("button");
    edit.innerText="Edit";

    let del=document.createElement("button");
    del.innerText="Delete";

    right.append(edit);
    right.append(del);

    li.append(left);
    li.append(right);

    taskList.append(li);

    taskInput.value="";
    dueDate.value="";

    updateCount();

    check.onclick=function(){

        span.classList.toggle("completed");

        updateCount();

    }

    del.onclick=function(){

        li.remove();

        updateCount();

    }

    edit.onclick=function(){

        let newTask=prompt("Edit Task",span.innerText);

        if(newTask!=null && newTask.trim()!=""){
            span.innerText=newTask;
        }

    }

}

searchTask.onkeyup=function(){

    let filter=searchTask.value.toLowerCase();

    let li=document.querySelectorAll("#taskList li");

    li.forEach(function(item){

        let text=item.querySelector("span").innerText.toLowerCase();

        if(text.includes(filter)){
            item.style.display="flex";
        }
        else{
            item.style.display="none";
        }

    });

}

function updateCount(){

    let tasks=document.querySelectorAll("#taskList li");

    let completed=document.querySelectorAll(".completed");

    totalTask.innerText=tasks.length;

    completedTask.innerText=completed.length;

    pendingTask.innerText=tasks.length-completed.length;

    let percent=0;

    if(tasks.length>0){

        percent=(completed.length/tasks.length)*100;

    }

    progressFill.style.width=percent+"%";

}