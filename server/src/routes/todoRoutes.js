import express from 'express';
const router = express.Router();
import {todosController} from '../controller/todosController.js';

router.get("/downSort", todosController.sortByQueryDown);
router.get("/upSort", todosController.sortByQueryUp);
router.get("/filter", todosController.filterByQuery);
router.get("/:id", todosController.getById);
router.post("/", todosController.createATodo);
router.put("/:id", todosController.updateATask)
router.get("/", todosController.getTodos);

export const todoRoutes = router;