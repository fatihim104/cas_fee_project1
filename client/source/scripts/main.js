import {tasks, sortByUp,sortByDown } from "./data/taskModel.js";

import {
  formSection, 
  listSection,
  form,
  overviewButton,
  createOverwievButton,
  themeButton,
  taskListElement,
  templateSource,
  showFormButton,
  sortButtons,
  filterButton,
  title,
  description,
  duedate,
  importance,
  checked
} from "./dom.js";

renderTasks(tasks);

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

let filtered=false;
filterButton.addEventListener("click", () => {
  filtered ? filtered=false : filtered=true;
  const completedTasks=tasks.filter(task => task.isCompleted)
  filtered ? renderTasks(completedTasks) : renderTasks(tasks)
})


let previousButtonId = null;
sortButtons.addEventListener("click", (event) => {
  const buttonId= event.target.id;
  const button= event.target;
  const sortCriter= event.target.dataset.sort;

  if(event.target.matches("button")){
        if (button.classList.contains('down')) {
          button.classList.remove('down');
          button.classList.add('up');
          renderTasks(sortByUp(tasks, sortCriter))
          
      } else {
          button.classList.remove('up');
          button.classList.add('down');
          renderTasks(sortByDown(tasks, sortCriter))
      }

      if (previousButtonId !== null && previousButtonId !== buttonId) {
          let previousButton = document.getElementById(previousButtonId);
          previousButton.classList.remove('up');
          previousButton.classList.remove('down');
      }
      previousButtonId = buttonId;
  }
})

function renderTasks(ptasks) {
  const template = Handlebars.compile(templateSource);
  const dynamicHTML = template({taskList:ptasks})
  taskListElement.innerHTML = dynamicHTML;
}


function submitForm(event) {
  event.preventDefault();
  isEditing === false ? createATask() : updateTask(editingIndex)
}

function updateTask(pEditingIndex) {
  let editedTask = tasks[pEditingIndex]
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
      tasks[pEditingIndex] = newTask;
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
 
  editingIndex = tasks.findIndex((task) => task.id == pId);
  console.log("datadaki index", editingIndex)

  let editedTask = tasks[editingIndex]

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
    renderTasks(tasks)
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

