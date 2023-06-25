import { todoService } from "../service/todoService.js";

export class TodoController{
    constructor(){
        
        this.templateComplied = Handlebars.compile(document.getElementById("todo-list-templete").innerHTML);
        this.taskListElement = document.getElementById("todo-items");

        this.formSection = document.getElementById("form_section");
        this.listSection = document.getElementById("list_section");

        this.showFormButton = document.querySelector("#create-button");
        
        this.form = document.getElementById("form-element");
        this.title = document.getElementById("title");
        this.importance = document.getElementById("importance");
        this.duedate = document.getElementById("duedate");
        this.checked = document.getElementById("checked");
        this.description = document.getElementById("description");

        this.createUpdateButton = document.getElementById("create");
        this.createOverwievButton = document.getElementById("create_overwiev")
        this.overviewButton = document.getElementById("overwiev");
        this.sortButtons = document.querySelector("#sort_buttons");
        this.filterButton = document.querySelector("#filter-button");

        this.isEditing = false;
        this.editingId;
        this.filtered=false;
        this.previousSortedId = null;  
        this.criteria={};
        this.tasklist=[];  
        this.filteredList=[];    
    }

    async getTaskList(pCriteria){
        return this.taskList = await todoService.loadData(pCriteria);
    }

    async renderTasks(pTasks){
        this.taskListElement.innerHTML = this.templateComplied(
            {taskList:await pTasks},
            {allowProtoPropertiesByDefault: true});
    }


    initEventHandlers(){
        this.showFormButton.addEventListener("click", () => { this.showForm() })

        this.overviewButton.addEventListener("click", () => { 
            // this.filtered ? this.renderTasks(this.get) : this.renderTasks(this.taskList) 
            this.renderTasks(this.getTaskList(this.criteria))
            this.showList()
        })

        this.form.addEventListener("submit", (event) => { this.submitForm(event) })

        this.taskListElement.addEventListener("click", (event) =>{
            const taskId= event.target.dataset.id;
            if(taskId){
              this.handleEdit(taskId)
            }
        })

      
        this.filterButton.addEventListener("click", async() => {
            this.filtered ? this.filtered= false : this.filtered=true;
            this.criteria.filter = this.filtered;       
            this.renderTasks(this.getTaskList(this.criteria))
            this.filteredList = this.taskList
            this.filtered ? this.filterButton.classList.add('dark-filter') : this.filterButton.classList.remove('dark-filter')
        })

        this.sortButtons.addEventListener("click", async(event) => {
            let button= event.target;
            let buttonId= event.target.id;
            let sortCriter= event.target.dataset.sort;
            this.criteria.sort = sortCriter;
          
            if(event.target.matches("button")){
                if (button.classList.contains('down')) {
                    button.classList.remove('down');
                    button.classList.add('up');
                    this.criteria.direction=1;
                    this.renderTasks( this.getTaskList(this.criteria));                  

                } else {
                    button.classList.remove('up');
                    button.classList.add('down');
                    this.criteria.direction=-1;
                    this.renderTasks(this.getTaskList(this.criteria));
                }
          
                if (this.previousSortedId != null && this.previousSortedId != buttonId) {
                    const previousButton = document.getElementById(this.previousSortedId);
                    previousButton.classList.remove('up');
                    previousButton.classList.remove('down');
                }
                this.previousSortedId = buttonId;
            }
          })
    }

    submitForm(event) {
        event.preventDefault();
        this.isEditing === false ? this.createATask() : this.updateTask(this.editingId)
    }

    async createATask(){
        this.changeTextToCreate()
        if (
          this.title.value !== "" &&
          this.importance.value !== "" &&
          this.description.value !== ""
        ) {
          const newTask = {
            title : this.title.value,
            importance: this.importance.value,
            due_date: this.duedate.value,
            isCompleted: this.checked.checked,
            description: this.description.value,
          };
         
          await todoService.createATask(newTask)
          this.renderTasks(this.getTaskList())
        }else {
          alert("please fill out fields");
        } 
    }

    async handleEdit (pId){
        this.showForm()
        this.isEditing = true;
        this.editingId = pId;
        this.changeTextToUpdate()

        let editedTask = await todoService.getTaskById(pId)     
      
        this.title.value = editedTask.title;
        this.importance.value = editedTask.importance;
        this.duedate.value = editedTask.due_date;
        this.checked.value = editedTask.checked;
        this.description.value = editedTask.description;
    }

    async updateTask(pEditingId) {
              
        let updatedTask = {
            _id: pEditingId,
            title: this.title.value,
            importance: this.importance.value,
            due_date: this.duedate.value,
            isCompleted: this.checked.checked,
            description: this.description.value,
        };
        if (
            title.value !== "" &&
            importance.value !== "" &&
            description.value !== ""
        ){
  
           await todoService.updateTask(pEditingId, updatedTask)
        //    updatedTask = await todoService.getTaskById(pEditingId)
        //    let filteredListIndex=this.filteredList.findIndex(task => task._Id = updatedTask._id)
        //    if(filteredListIndex != -1){
        //     this.filteredList[filteredListIndex] = updatedTask;
        //     console.log(this.filteredList)
        //     this.renderTasks(this.filterTask(this.filteredList))
        //    }
            // this.taskList = this.getTaskList()
            this.renderTasks(this.getTaskList(this.criteria))
            // this.renderTasks(this.filteredList)
           
        //    this.renderTasks(await this.getTaskList())

            this.isEditing=false;
            this.pEditingId = "";
            this.changeTextToCreate()
        }else{
            alert("please fill out fields");
        }
       
        this.resetForm()
    }

    
    filterTask(ptaskList){
        const uncompletedTasks=ptaskList.filter(task => task.isCompleted == false)
        this.filteredList = uncompletedTasks; 
        return this.filteredList;
    }

    showForm(){
        this.formSection.style.display ="block";
        this.listSection.style.display ="none";
        this.resetForm()
        this.changeTextToCreate()
    }

    showList(){
        this.formSection.style.display ="none";
        this.listSection.style.display ="block";
    }

    resetForm(){
        this.title.value = "";
        this.importance.value = "";
        this.duedate.value = ""; 
        this.checked.value = ""; 
        this.description.value = "";
    }

    changeTextToCreate(){
        this.createUpdateButton.innerText = "Create";
        this.createOverwievButton.innerText = "Create & Overwiev";
    }

    changeTextToUpdate(){
        this.createUpdateButton.innerText = "Update";
        this.createOverwievButton.innerText = "Update & Overwiev";
    }

    initialize() {
        this.initEventHandlers();
        // todoService.loadData();
        // this.getTaskList();
        this.renderTasks(this.getTaskList());
    }
}

new TodoController().initialize();      