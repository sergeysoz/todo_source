import React from "react";
import { subset } from "../../auxiliary/Set";
import { observer } from "mobx-react";
import { Mode, taskpad } from "../../state/Taskpad";
import Map from "../../auxiliary/Map";
import Task from "../../state/Task";
import Layout from "../layout/Layout";
import TaskItem from "../task/TaskItem";
import Placeholder from "../task/Placeholder";

const Input = observer(() => {
  const isDone = { reference: taskpad.tasks, isDone: true };
  const isNotDone = { reference: taskpad.tasks, isDone: false };
  const { All, Done, Doing } = Mode;
  const switcher = {
    [All]: taskpad.tasks,
    [Done]: subset(isDone),
    [Doing]: subset(isNotDone),
  };
  return (
    <div>
      <Layout>
        {taskpad.tasks.length === 0 && <Placeholder />}
        {taskpad.tasks.length !== 0 && (
          <Map
            data={switcher[taskpad.viewMode]}
            renderItem={(item: Task, i: number) => (
              <TaskItem
                key={i.toString()}
                animationCumulate={i * 30}
                taskRef={item}
              />
            )}
          />
        )}
      </Layout>
    </div>
  );
});

export default Input;
