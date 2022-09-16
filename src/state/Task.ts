import { makeObservable, observable, action } from "mobx";
import Taskpad from "./Taskpad";

/**
 * Each Task contains the reference
 * to the Taskpad singleton
 */

export default class Task {
  name: string;
  taskpad: Taskpad;
  isCompleted: boolean;
  constructor(name: string, taskpad: Taskpad, completed?: boolean) {
    this.name = name;
    this.taskpad = taskpad;
    this.isCompleted = completed || false;
    makeObservable(this, {
      isCompleted: observable,
      toggle: action,
    });
  }
  toggle() {
    this.isCompleted = !this.isCompleted;
  }
  delete() {
    this.taskpad.remove(this);
  }
}
