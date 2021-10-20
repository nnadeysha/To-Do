import Control from "./common/control";
let arr: ITaskListData = [
  { name: "Nana", content: "string" },
  { name: "Tana", content: "string" },
  { name: "Sana", content: "string" },
];

export class App extends Control {
  taskList: TaskList;
  tools: Tools;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.tools = new Tools(this.node);
    this.tools.onAddClick = () => {
      arr.push({ name: "Jana", content: "string" });
      this.update(arr);
    };
    this.taskList = new TaskList(this.node);
    this.taskList.onEditClick = (i) => {
        const form = new TaskForm(this.node, arr[i]);
        form.onOk = (data) =>{form.destroy()
            arr[i]= data;
            this.update(arr)
        }

        form.onCancel= () =>{form.destroy()}
    };
    this.taskList.onDeleteClick = (i) => {
      arr.splice(i, 1);

      this.update(arr);
    };
    this.update(arr);
  }
  update(data: ITaskListData) {
    this.taskList.update(data);
  }
}

export class Tools extends Control {
  addButton: Control<HTMLButtonElement>;
  onAddClick: () => void;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.addButton = new Control(this.node, "button", "add", "add");

    this.addButton.node.onclick = () => {
      this.onAddClick();
    };
  }
}

type ITaskListData = Array<ITaskData>;
interface ITaskData {
  name: string;
  content: string;
}

export class TaskList extends Control {
  tasks: Task[];
  onEditClick: (index: number) => void;
  onDeleteClick: (index: number) => void;
  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.tasks = [];
  }

  update(data: ITaskListData) {
    data.forEach((it, i) => {
      if (this.tasks[i]) {
        this.tasks[i].update(it);
      } else {
        const task = new Task(this.node);
        task.onEditClick = () => this.onEditClick(i);
        task.onDeleteClick = () => this.onDeleteClick(i);
        task.update(it);
        this.tasks.push(task);
      }
    });
    const taskLength = this.tasks.length;
    for (let i = taskLength - 1; i >= data.length; i--) {
      const task = this.tasks.pop();
      task.destroy();
    }
  }
}
export class Task extends Control {
  taskName: Control<HTMLElement>;
  taskContent: Control<HTMLElement>;
  editButton: Control<HTMLButtonElement>;
  deleteButton: Control<HTMLButtonElement>;
  onEditClick: () => void;
  onDeleteClick: () => void;
  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", "task");
    this.taskName = new Control(this.node, "div", "task-name");
    this.taskContent = new Control(this.node, "div", "task-content");
    const buttons = new Control(this.node, "div", "buttons");
    this.editButton = new Control(this.node, "button", "edit", "Edit");
    this.deleteButton = new Control(this.node, "button", "delete", "Delete");
    this.editButton.node.onclick = () => this.onEditClick();
    this.deleteButton.node.onclick = () => this.onDeleteClick();
  }
  update(it: ITaskData) {
    this.taskName.node.textContent = it.name;
    this.taskContent.node.textContent = it.content;
  }

  
}

export class TaskForm extends Control {
    nameInput: Control<HTMLInputElement>;
    contentInput: Control<HTMLTextAreaElement>;
    okBtn: Control<HTMLButtonElement>;
    cancelBtn: Control<HTMLButtonElement>;
    onOk: (data: ITaskData)=>void;
    onCancel: ()=>void;
    constructor(parentNode: HTMLElement, initialdata: ITaskData){
        super(parentNode, "div");
        this.nameInput = new Control(this.node, "input", "name-input");
        this.contentInput = new Control(this.node, "textarea", "content-input");
        this.okBtn = new Control(this.node, "button", "ok-button", "OK");
        this.cancelBtn = new Control(this.node, "button", "cancel-button", "CANCEL");
        this.nameInput.node.value = initialdata.name;
        this.contentInput.node.value = initialdata.content
        this.okBtn.node.onclick = () => this.onOk({name: this.nameInput.node.value , content:this.contentInput.node.value })
        this.cancelBtn.node.onclick = () => this.onCancel()
    }
}