import { makeObservable, observable, action } from "mobx";
import Message from "./Message";

export class MessageStack {
  messages: Array<Message> = [];
  constructor() {
    makeObservable(this, {
      messages: observable,
      add: action,
      pull: action,
    });
  }
  add(name: string, addition: string) {
    this.messages.push(new Message(name, addition));
    const timer = setTimeout(() => {
      this.pull();
      clearTimeout(timer);
    }, 3000);
  }
  get len() {
    return this.messages.length;
  }
  pull() {
    this.messages = [...this.messages.slice(1)];
  }
}

const messageStack = new MessageStack();
export default messageStack;
