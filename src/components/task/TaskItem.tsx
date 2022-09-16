import React, { useRef, useEffect } from "react";
import { taskpad } from "../../state/Taskpad";
import { observer } from "mobx-react-lite";
import Task from "../../state/Task";
import reduceName from "../../auxiliary/reduceName";
import messageStack from "../message/MessageStack";
import "./TaskItem.scss";

interface Ref {
  taskRef: Task;
  animationCumulate: number;
  finished?: boolean;
}

const TaskItem = observer((ref: Ref) => {
  const translationY = [
    { transform: "translateY(5px)", easing: "ease-in-out" },
    { transform: "translateY(0px)", easing: "ease-in-out" },
  ];
  const translationTiming = {
    duration: 100 + ref.animationCumulate,
    iterations: 1,
  };
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.animate(translationY, translationTiming);
    }
  }, []);
  return (
    <div
      ref={divRef}
      className={
        "TaskItem__taskbox " +
        (ref.taskRef.isCompleted ? "TaskItem__complited" : "")
      }
    >
      <div className="TaskItem__taskRow">
        <div className="TaskItem__taskRow_main">
          <input
            title="Завершить задачу"
            checked={ref.taskRef.isCompleted}
            onChange={() => {
              taskpad.toggleEditable(false);
              ref.taskRef.toggle();
            }}
            type="checkbox"
          />
          <p>{reduceName(ref.taskRef.name, 20)}</p>
        </div>

        {ref.taskRef.taskpad.isEditable && (
          <button
            className="TaskItem__trashButton"
            type="button"
            onClick={() => {
              ref.taskRef.delete();
              // inputRef.current.value = "";
              messageStack.add(ref.taskRef.name, "была удалена");
            }}
          >
            <i style={{ color: "#eee" }} className="bi bi-trash3-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
});

export default TaskItem;
