import express from 'express';
const router = express.Router();
import {todosController} from '../controller/todosController.js';

router.get("/", todosController.getTodos);
router.get("/:id", todosController.getById);
router.post("/", todosController.createATodo);
router.put("/:id", todosController.updateATask)

export const todoRoutes = router;