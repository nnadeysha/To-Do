import { url } from "inspector";
import Signal from "./signal"
import { ITaskListData, ITaskData } from "./intefaces";
export class TodoModel {
  private _todoList: ITaskListData;
  onUpdateTodoList: Signal<ITaskListData> = new Signal()
  constructor() {
    this._todoList = [];
  }
  get todoList(){
    return this._todoList
  }
  set todoList(list){
    this._todoList = list
    this.onUpdateTodoList.emit(this.todoList)
  }
  create(props: any) {
    return fetch(`http://localhost:3000/todo_service/create?name=${props.name}&content=${props.content}`)
      .then((response) => response.json())
      .then((data: any)=>{
        return this.list({})
      });
    /*         this._todoList.push({ name: props.name, content: props.content })
     */
  }
  update(props: any) {
    return fetch(`http://localhost:3000/todo_service/update?index=${props.index}&name=${props.name}&content=${props.content}`)
      .then((response) => response.json())
      .then((data: any)=>{
        return this.list({})
      });
    /*         this._todoList[props.index] = { name: props.name, content: props.content }
     */
  }
  delete(props: any) {
    return fetch(`http://localhost:3000/todo_service/delete?index=${props.index}`)
      .then((response) => response.json())
      .then((data: any)=>{
        return this.list({})
      });
    /*       this._todoList.splice(props.index, 1)
     */
  }
  list(props: any) {
    return fetch("http://localhost:3000/todo_service/list").then((response) => response.json())
    .then((data: ITaskListData) => {
      this._todoList = data;
      this.onUpdateTodoList.emit(this.todoList)
      return data;
    });
    /*         return this._todoList
     */
  }
}
