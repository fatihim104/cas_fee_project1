import { Todo } from "../data/todoModel.js";
export class TodoService {
  constructor() {
    const todo = new Todo();
    this.todo = todo;
  }

  async loadData(pCriteria) {
    const data = await this.todo.get(pCriteria);
    console.log(data)
    return data;
  }

  async getTaskById(pId) {
    const task = await this.todo.getbyId(pId);
    return task;
  }

  async createATask(pNewTask) {
    const createdData = await this.todo.create(pNewTask);
    return createdData;
  }

  async updateTask(pId, pUpdatedTask) {
    await this.todo.update(pId, pUpdatedTask);
  }
}

export const todoService = new TodoService();
