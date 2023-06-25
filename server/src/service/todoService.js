import Datastore from 'nedb-promises'

export class Todo {
    constructor(title, importance, due_date, isCompleted, description) {
        this.title = title;
        this.importance = importance;
        this.due_date = due_date;
        this.isCompleted = isCompleted;
        this.description = description;
        this.creationDate = new Date();
    }
}

export class TodoService {
    constructor(db) {
        const options = this.db = db || new Datastore({filename: './data/todos.db', autoload: true});
        this.db = db || new Datastore(options);
    }

    async getAll(req) {
        const {sort, filter, direction} = req.query
        console.log(sort)
        console.log(filter)
        console.log(direction)
        const isCompleted=filter === "true";
        if(isCompleted){
            return this.db.find({ isCompleted:false}).sort({[sort]:direction} ).exec();
        }else{
            return this.db.find({}).sort({[sort]:direction} ).exec();
        }
    }

    async add(title, importance, due_date, isCompleted, description) {
        let todo = new Todo(title, importance, due_date, isCompleted, description);
        let createdTodo = todo.title
        createdTodo.creationDate=new Date();
        return this.db.insert( createdTodo );
    }

    async getById(id) {
        return this.db.findOne({_id: id});
    }

    async update(id, body) {
        return this.db.update({_id: id}, {$set: {...body, updateDate: new Date() },  $unset: { creationDate: '' }});
    }

    async sortByUp(query) {
        return this.db.find({}).sort( { [query]: 1 }).exec();
    }

    async sortByDown(query) {
        return this.db.find({}).sort( { [query]: -1 }).exec();
    }

    async filter(query) {
        const isCompleted=query === "true";
        return this.db.find({isCompleted:isCompleted }).exec();
    }
}

export const todoService = new TodoService();