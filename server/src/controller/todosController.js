import { todoService } from "../service/todoService.js";

export class TodosController {
  getTodos = async (req, res) => {
    res.json(await todoService.getAll(req));
  };

  getById = async (req, res) => {
    res.json(await todoService.getById(req.params.id));
  };

  createATodo = async (req, res) => {
    res.json(await todoService.add(req.body));
  };

  updateATask = async (req, res) => {
    res.json(await todoService.update(req.params.id, req.body));
  };
}

export const todosController = new TodosController();
