import React from "react";
import "./Handler.scss";

interface HandlerRef {
  callback: any;
  isDisabled?: boolean;
  title: string;
  styleName: string;
  children: JSX.Element;
}

export default function HandlerButton(ref: HandlerRef): JSX.Element {
  return (
    <button
      disabled={ref.isDisabled}
      className={ref.styleName}
      title={ref.title}
      onClick={() => ref.callback()}
      type="button"
    >
      {ref.children}
    </button>
  );
}
