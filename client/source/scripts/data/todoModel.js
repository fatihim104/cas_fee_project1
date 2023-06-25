export class Todo {
  constructor(_id, title, importance, due_date, isCompleted, description, creationDate ) {
      this._id = _id ;
      this.title = title;
      this.importance = importance;
      this.due_date = due_date;
      this.isCompleted = isCompleted;
      this.description = description;
      this.creationDate = creationDate;
  }
 
  
  async get(pCriteria ){
   if(pCriteria){
    const urlParams = new URLSearchParams(pCriteria);
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/?"+urlParams);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    } 
   }
   
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/?");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    } 
  }

  async getbyId(pId){
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/" + pId);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    } 
  }

  async create(pNewTask){
      try {
        const response = await fetch("http://127.0.0.1:3001/todos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pNewTask),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
  }

  async update(pId, pUpdatedTask){
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/"+pId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pUpdatedTask),
      });
      const data = await response.json();
      console.log("updated", data)
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async sortUp(pCriteria){
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/upSort/?criteria="+pCriteria);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    } 
  }
  async sortDown(pCriteria){
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/downSort/?criteria="+pCriteria);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    } 
  }

  async filter(pCriteria){
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/filter/?criteria="+pCriteria);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }

  }
  
}

export const todo = new Todo();




// const tasks = [
//     {"id":"01", "title":"Shopping", "importance":"4", "due_date":"2023-06-20", "isCompleted":false, "description":"Broad,egg, water" },
//     {"id":"02", "title":"HomeWork", "importance":"3", "due_date":"2023-06-30", "isCompleted":false, "description":"investigate blogchain" },
//     {"id":"03", "title":"Exam", "importance":"5", "due_date":"2023-06-25", "isCompleted":true, "description":"cas-Projekt 1" },
//     {"id":"04", "title":"Sport", "importance":"2", "due_date":"2023-06-10", "isCompleted":true, "description":"football, run" }
// ]

// const url = "http://127.0.0.1:3001/todos/";
// const tasks = getTasks()

// async function getTasks(){
//   try {
//     const response = await fetch(url); 
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Hata:', error);
//   }
// }


// function sortByUp(pTasks, key) {
//     pTasks.sort(function(a, b) {
//       if (a[key] < b[key]) {
//         return -1;
//       }
//       if (a[key] > b[key]) {
//         return 1;
//       }
//       return 0;
//     });
  
//     console.log(pTasks)
//     return pTasks;
// }

// function sortByDown(pTasks, key) {
//   pTasks.sort(function(a, b) {
//     if (a[key] < b[key]) {
//       return 1;
//     }
//     if (a[key] > b[key]) {
//       return -1;
//     }
//     return 0;
//   });
//   return pTasks;
// }
  
// export {sortByUp, sortByDown }

