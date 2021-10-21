import "./style.css"
import {App } from './app'
import {TodoModel} from "./todoModel"

const model = new TodoModel()
const app = new App(document.querySelector('#app'), model);
model.list({}).then(_=>{
 app.update(model.todoList)
});
(window as any).app = app