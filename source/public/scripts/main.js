import taskModel from "./data/taskModel.js";

import {
  formSection, 
  listSection,
  form,
  formButtons,
  overviewButton,
  createOverwievButton,
  themeButton,
  taskListElement,
  templateSource,
  showFormButton,
  title,
  description,
  duedate,
  importance,
  checked
} from "./dom.js";

renderTasks();

let isEditing = false;
let editingIndex;

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

taskListElement.addEventListener("click", (event) =>{
  const taskId= event.target.dataset.id;
  if(taskId){
    handleEdit(taskId)
  }
})

showFormButton.addEventListener("click", showForm)

form.addEventListener("submit", submitForm)

overviewButton.addEventListener("click", showList)

createOverwievButton.addEventListener("click", () =>{
  submitForm()
  showList()
})

function renderTasks() {
  const template = Handlebars.compile(templateSource);
  const dynamicHTML = template({taskList:taskModel.tasks})
  taskListElement.innerHTML = dynamicHTML;
}


function submitForm(event) {
  event.preventDefault();
  isEditing === false ? createATask() : updateTask(editingIndex)
}

function updateTask(pEditingIndex) {
  let editedTask = taskModel.tasks[pEditingIndex]
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
      taskModel.tasks[pEditingIndex] = newTask;
      isEditing=false;
      pEditingIndex = "";
      changeTextToCreate()
  }else{
      alert("please fill out fields");
  }

  renderTasks()
  resetForm()
}

function handleEdit (pId){
  showForm()
  isEditing = true;
  changeTextToUpdate()
  console.log("secilen id", pId)
 
  editingIndex = taskModel.tasks.findIndex((task) => task.id == pId);
  console.log("datadaki index", editingIndex)

  let editedTask = taskModel.tasks[editingIndex]

  title.value = editedTask.title;
  importance.value = editedTask.importance;
  duedate.value = editedTask.due_date;
  checked.value = editedTask.checked;
  description.value = editedTask.description;
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
  }else {
    alert("please fill out fields");
  } 
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

function showForm(){
  formSection.style.display ="block";
  listSection.style.display ="none";
  resetForm()
  changeTextToCreate()
}

function showList(){
  formSection.style.display ="none";
  listSection.style.display ="block";
}

