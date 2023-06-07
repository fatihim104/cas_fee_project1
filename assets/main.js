import taskModel from "../taskModel.js";
import { createTasksHtml } from "./functions.js";
import {
  themeButton,
  taskListElement,
  title,
  description,
  duedate,
  importance,
  checked
} from "./dom.js";


renderTasks();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

function renderTasks() {
  taskListElement.innerHTML = createTasksHtml(taskModel.tasks);
}

// document.getElementById("form").addEventListener("submit", submitForm)
// form.addEventListener("submit", submitForm)
document.getElementById("create").addEventListener("click", submitForm);
let isEditing = false;
let editingIndex;

function submitForm(event) {
  event.preventDefault();
  isEditing === false ? createATask() : updateTask()

}

function updateTask() {
  let editedTask = taskModel.tasks[editingIndex]
  console.log(editedTask)
    
  const newTask = {
      id:editedTask.id,
      title: title.value,
      importance: importance.value,
      due_date: duedate.value,
      isCompleted: checked.checked,
      description: description.value,
    };
    if (
      title.value !== "" &&
      importance.value !== "" &&
      description.value !== ""
    ){
      taskModel.tasks[editingIndex] = newTask;
      isEditing=false;
      editingIndex = "";
      changeTextToCreate()
    }else{
      alert("please fill out fields");
    }
    renderTasks()
    resetForm()
}

function createATask() {
 changeTextToCreate()
  if (
    title.value !== "" &&
    importance.value !== "" &&
    description.value !== ""
  ) {
    const newTask = {
      id:crypto.randomUUID(),
      title: title.value,
      importance: importance.value,
      due_date: duedate.value,
      isCompleted: checked.checked,
      description: description.value,
    };
    taskModel.tasks.push(newTask) 
    renderTasks()
    resetForm()
}else {
  alert("please fill out fields");
} 

}

function handleEdit (id){
  console.log("dddd")
  isEditing = true;
  changeTextToUpdate()
  console.log("secilen id", id)
 
  editingIndex = taskModel.tasks.findIndex((task) => task.id == id);
  console.log("datadaki index", editingIndex)
  
  let editedTask = taskModel.tasks[editingIndex]
   
  title.value = editedTask.title;
  importance.value = editedTask.importance;
  duedate.value = editedTask.due_date;
  checked.value = editedTask.checked;
  description.value = editedTask.description;
  
}

function resetForm(){
  title.value = "";
  importance.value = "";
  duedate.value = ""; 
  checked.value = ""; 
  description.value = "";
}

function changeTextToUpdate(){
  document.getElementById("create").innerText = "Update";
  document.getElementById("create_overwiev").innerText = "Update & Overwiev";
}

function changeTextToCreate(){
  document.getElementById("create").innerText = "Create";
  document.getElementById("create_overwiev").innerText = "Create & Overwiev";
}

window.handleEdit = handleEdit;

