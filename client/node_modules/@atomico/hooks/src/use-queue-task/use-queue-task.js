import { useState, useMemo } from "atomico";
import { Status } from "../use-promise/use-promise.js";

/**
 * Create a queue of tasks associated by an ID, either of the type object or string,
 * if an ID replaces an existing process, the previously defined process
 * will be ignored.
 * @template V, R
 * @param {(value:V)=>Promise<R>} map
 * @param {any} id
 * @returns {[Task<R>, (value:V)=>void, Map<any,Task<R>>]}
 */
export function useQueueTask(map, id) {
  const [queue, setQueue] = useState(() => new Map());
  const [value, addTask] = useState();

  const lastTask = useMemo(() => {
    if (value == undefined) return;
    const currentId = id || value;
    /**
     *
     * @param {TaskStatus} status
     * @param {any} result
     * @returns
     */
    const set = (status, result) =>
      setQueue((queue) =>
        queue.get(currentId) === current
          ? new Map(queue).set(
              currentId,
              Object.assign(current, {
                status,
                result,
              })
            )
          : queue
      );

    const task = map(value)
      .then((result) => set(Status.fulfilled, result))
      .catch((result) => set(Status.rejected, result));

    /**@type {Task<any>} */
    const current = {
      task,
      timeStamp: performance.now(),
      status: Status.pending,
    };
    queue.set(currentId, current);

    return current;
  }, [value]);

  return [lastTask, addTask, queue];
}

/**
 * @template R
 * @typedef {Object} Task
 * @property {TaskStatus} status
 * @property {R} [result]
 * @property {number} timeStamp
 * @property {Promise<R>} task
 */

/**
 * @typedef {Exclude<import("../use-promise/use-promise").PromiseStatus,"">} TaskStatus
 */
