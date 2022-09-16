/**
 * String message for Stack of Messages
 */

import reduceName from "../../auxiliary/reduceName";

export enum MessageType {
  Success,
  Warning,
}

export default class Message {
  name: string;
  addition: string;
  // type: MessageType;
  constructor(name: string, addition: string = "", type?: MessageType) {
    this.name = reduceName(name, 15);
    this.addition = addition;
    this.name = `"${this.name}" ${this.addition}`;
    // this.type = MessageType.Success;
  }
  get message() {
    return this.name;
  }
}
