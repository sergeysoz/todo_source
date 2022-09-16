import React from "react";
import "./Message.scss";

interface MessageRef {
  children: JSX.Element;
}

export default function Message(ref: MessageRef): JSX.Element {
  return <div className="Message__message">{ref.children}</div>;
}
