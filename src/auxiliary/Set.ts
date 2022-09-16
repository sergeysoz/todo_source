import Task from "../state/Task";

/**
 * Operations for Set in mathematical meaning;
 * The most important operations on sets have realised.
 */

interface ArrayPair {
  firstArray: Array<Task>;
  secondArray: Array<Task>;
}

interface ArrayPairAttr extends ArrayPair {
  byName?: boolean;
}

interface ArrayTask {
  firstArray: Array<Task>;
  task: Task;
}

interface RefBool {
  reference: Array<Task>;
  isDone: boolean;
}

// prettier-ignore
export function intersection(
  payload: ArrayPairAttr
): Task[] {
  // payload.byName = false;
  const t: Task[] = [];
  for (let item of payload.secondArray) {
    if (
      payload.firstArray.filter((element) =>
      payload.byName 
          ? element.name === item.name 
          : element === item
      ).length
    )
      t.push(item);
  }
  return t;
}

export function subtraction(payload: ArrayPair): Task[] {
  const t: Task[] = [];
  for (let item of payload.firstArray) {
    if (!payload.secondArray.filter((element) => element === item).length)
      t.push(item);
  }
  for (let item of payload.secondArray) {
    if (!payload.firstArray.filter((element) => element === item).length)
      t.push(item);
  }
  return t;
}

export function exclude(payload: ArrayTask): Task[] {
  return payload.firstArray.filter((item) => item !== payload.task);
}

export function include(payload: ArrayTask): Task[] {
  return (payload.firstArray = [...payload.firstArray, payload.task]);
}

/**
 * Make subset of Tasks
 * based on isCompleted attribute
 */

export function subset(ref: RefBool) {
  return [
    ...ref.reference.filter((item: Task) =>
      ref.isDone ? item.isCompleted : !item.isCompleted
    ),
  ];
}
