export class Todo {
  constructor(
    _id,
    title,
    importance,
    due_date,
    isCompleted,
    description,
    creationDate
  ) {
    this._id = _id;
    this.title = title;
    this.importance = importance;
    this.due_date = due_date;
    this.isCompleted = isCompleted;
    this.description = description;
    this.creationDate = creationDate;
  }

  async get(pCriteria) {
    if (pCriteria) {
      const urlParams = new URLSearchParams(pCriteria);
      try {
        const response = await fetch("http://127.0.0.1:3001/todos/?" + urlParams);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:3001/todos/");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getbyId(pId) {
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/" + pId);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async create(pNewTask) {
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

  async update(pId, pUpdatedTask) {
    try {
      const response = await fetch("http://127.0.0.1:3001/todos/" + pId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pUpdatedTask),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export const todo = new Todo();
