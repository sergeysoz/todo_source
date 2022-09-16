import React, { useRef, useEffect } from "react";
import Task from "../../state/Task";
import { taskpad } from "../../state/Taskpad";
import "./InputWindow.scss";

export default function InputWindow({ callback }: { callback: any }) {
  let inputRef = useRef<HTMLInputElement | null>(null);
  let taskInput = useRef("");
  const createTask = () => {
    if (!taskInput.current.length) return;
    taskpad.add(new Task(taskInput.current, taskpad));
    return callback();
  };
  useEffect(() => {
    // check for null value is needed:
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <div className="InputWindow__box">
      <div className="InputWindow__window">
        <h1 className="InputWindow__title">Создать задачу</h1>
        <form
          className="InputWindow__form"
          onSubmit={(target) => {
            target.preventDefault();
            createTask();
          }}
        >
          <input
            className="InputWindow__input"
            ref={inputRef}
            onKeyDown={({ code }: { code: any }): void => {
              switch (code) {
                case "Enter":
                  createTask();
                  break;
                case "Escape":
                  callback();
                  break;
                default:
                  break;
              }
            }}
            onChange={({ target }) => {
              taskInput.current = target.value;
            }}
            type="text"
            placeholder="Что сделать?"
          />
        </form>
        <div className="InputWindow__footer">
          <button
            className="InputWindow__footer_button"
            onClick={() => createTask()}
          >
            <i className="bi bi-save"></i> Сохранить
          </button>
          <button
            className="InputWindow__footer_button InputWindow__footer_cancelButton"
            onClick={() => callback()}
            type="button"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
