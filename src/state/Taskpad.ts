import { makeObservable, observable, action } from "mobx";
import { exclude, intersection } from "../auxiliary/Set";
import messageStack from "../components/message/MessageStack";
import Task from "./Task";

/**
 * The Taskpad used us an application
 * singleton - a root of app data that
 * includes all Tasks.
 */

export enum Mode {
  All,
  Done,
  Doing,
}

export default class Taskpad {
  tasks: Task[] = [];
  isEditable: boolean = false;
  viewMode: Mode = Mode.All;
  constructor() {
    makeObservable(this, {
      tasks: observable,
      isEditable: observable,
      viewMode: observable,
      add: action,
      toggleEditable: action,
      remove: action,
      switchMode: action,
    });
  }
  add(newTask: Task) {
    if (
      !intersection({
        firstArray: this.tasks,
        secondArray: [newTask],
        byName: true,
      }).length
    ) {
      this.tasks.push(newTask);
      return messageStack.add(newTask.name, "добавлена");
    }
    messageStack.add(newTask.name, "уже добавлена");
  }
  toggleEditable(forceToggle?: boolean) {
    if (forceToggle === undefined) {
      this.isEditable = !this.isEditable;
      return;
    }
    this.isEditable = forceToggle;
    return;
  }
  remove(taskRef: Task) {
    this.tasks = exclude({ firstArray: this.tasks, task: taskRef });
  }
  switchMode(mode: Mode) {
    this.viewMode = mode;
  }
}

export const taskpad = new Taskpad();

// add some initial tasks
taskpad.add(new Task("Найти второй носок", taskpad));
taskpad.add(new Task("Захватить мир", taskpad, true));
