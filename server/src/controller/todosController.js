import { todoService } from "../service/todoService.js";

export class TodosController {

    getTodos = async (req, res) => {
        res.json((await todoService.getAll(req)))
    };

    getById = async (req, res) => {
        res.json(await todoService.getById(req.params.id))
    }

    createATodo = async (req, res) => {
        res.json(await todoService.add(req.body));
    };

    updateATask = async (req, res) => {
        res.json(await todoService.update(req.params.id, req.body) )
    }

    sortByQueryUp =  async (req, res) => {
        const criteria = req.query.criteria;
        console.log(criteria.criteria)
        res.json(await todoService.sortByUp(criteria))
    }

    sortByQueryDown =  async (req, res) => {
        const criteria = req.query.criteria;
        res.json(await todoService.sortByDown(criteria))
    }

    filterByQuery =  async (req, res) => {
        const criteria = req.query.criteria;
        res.json(await todoService.filter(criteria))
    }
}

export const todosController = new TodosController();