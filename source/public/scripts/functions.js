
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
