function createTasksHtml(pTasks) {
  const checked = `<input type="checkbox" disabled="disabled" checked/><label for="">Complete</label>`;
  const unChecked = `<input type="checkbox" disabled="disabled" /><label for="">Open</label>`;
  return pTasks
    .map(
      (task) =>
        ` <li >
        <div>
            <div class="todo-item">
                <span>${task.due_date}</span>
                <span>${task.title}</span>
                <span>${task.importance}</span>
            </div>
            <div class="todo-item" >
              <div>
              ${task.isCompleted ? checked : unChecked}
              </div>
              <p>${task.description}</p>
          </div>
        </div>
        <button data-id=${task.id} onclick="handleEdit(${task.id})">Edit</button>
    </li>`
    )
    .join("");
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

export { createTasksHtml, handleEdit };
