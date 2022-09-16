import React, { useState } from "react";
import { observer } from "mobx-react";
import { Mode, taskpad } from "../../state/Taskpad";
import InputWindow from "../input/InputWindow";
import "./Handler.scss";
import HandlerButton from "./HandlerButton";

const Handler = observer(() => {
  const [currentMode, setCurrentMode] = useState(Mode.All);
  const [inputIsOpen, toggleInput] = useState(false);
  const switchMode = (mode: Mode) => {
    setCurrentMode(mode);
    taskpad.switchMode(mode);
  };
  const isActive = (mode: Mode) =>
    currentMode === mode ? "Handler_active" : "";

  return (
    <>
      {inputIsOpen && (
        <InputWindow callback={() => toggleInput(!inputIsOpen)} />
      )}
      <div className="Handler__box">
        <HandlerButton
          callback={() => switchMode(Mode.All)}
          title="Все задачи"
          styleName={"Handler__button " + isActive(Mode.All)}
          isDisabled={inputIsOpen || !taskpad.tasks.length ? true : false}
        >
          <i style={{ color: "#fafafa" }} className="bi bi-circle-half"></i>
        </HandlerButton>

        <HandlerButton
          callback={() => switchMode(Mode.Doing)}
          title="Только текущие задачи 2"
          styleName={"Handler__button " + isActive(Mode.Doing)}
          isDisabled={inputIsOpen || !taskpad.tasks.length ? true : false}
        >
          <i style={{ color: "#fafafa" }} className="bi bi-circle"></i>
        </HandlerButton>

        <HandlerButton
          callback={() => switchMode(Mode.Done)}
          title="Только выполненные задачи"
          styleName={"Handler__button " + isActive(Mode.Done)}
          isDisabled={inputIsOpen || !taskpad.tasks.length ? true : false}
        >
          <i style={{ color: "#fafafa" }} className="bi bi-circle-fill"></i>
        </HandlerButton>

        <HandlerButton
          callback={() => taskpad.toggleEditable()}
          title="Изменить задачи"
          styleName="Handler__button"
          isDisabled={inputIsOpen || !taskpad.tasks.length ? true : false}
        >
          {taskpad.isEditable ? (
            <i style={{ color: "#fafafa" }} className="bi bi-check2"></i>
          ) : (
            <i style={{ color: "#fafafa" }} className="bi bi-pencil"></i>
          )}
        </HandlerButton>

        <HandlerButton
          callback={() => {
            taskpad.toggleEditable(false);
            toggleInput(!inputIsOpen);
          }}
          title="Добавить новую задачу"
          styleName="Handler__button"
          isDisabled={inputIsOpen ? true : false}
        >
          <i style={{ color: "#fafafa" }} className="bi bi-plus"></i>
        </HandlerButton>
      </div>
    </>
  );
});

export default Handler;
