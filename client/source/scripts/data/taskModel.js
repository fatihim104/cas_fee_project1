const tasks = [
    {"id":"01", "title":"Shopping", "importance":"4", "due_date":"2023-06-20", "isCompleted":false, "description":"Broad,egg, water" },
    {"id":"02", "title":"HomeWork", "importance":"3", "due_date":"2023-06-30", "isCompleted":false, "description":"investigate blogchain" },
    {"id":"03", "title":"Exam", "importance":"5", "due_date":"2023-06-25", "isCompleted":true, "description":"cas-Projekt 1" },
    {"id":"04", "title":"Sport", "importance":"2", "due_date":"2023-06-10", "isCompleted":true, "description":"football, run" }
]

function sortByUp(pTasks, key) {
    pTasks.sort(function(a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  
    console.log(pTasks)
    return pTasks;
}

function sortByDown(pTasks, key) {
  pTasks.sort(function(a, b) {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  });
  return pTasks;
}
  
export {tasks, sortByUp, sortByDown }

