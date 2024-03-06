/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, toggleStatus } from "../store/reducers/actions";
import "./TaskList.css";
import { N } from "../constants";
import Checkbox from "../assets/icons/Checkbox.png";
import CheckboxCompleted from "../assets/icons/CheckboxCompleted.png";

const TaskList: React.FC = () => {
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const dispatch = useDispatch();
  const records = useSelector((state: any) => state.records);

  const handleAddTask = (): void => {
    if (newTask.trim().length <= N) {
      dispatch(addRecord(newTask.trim()));
      setNewTask("");
    } else {
      alert(`Task length exceeds the maximum limit of ${N} characters.`);
    }
  };

  const changeTextHandler = (e: any): void => {
    setNewTask(e.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleTaskStatus = (id: number): void => {
    dispatch(toggleStatus(id));
  };

  const filteredTasks = records.filter((record: any) => {
    if (filter === "all") return true;
    if (filter === "completed") return record.completed;
    if (filter === "current") return !record.completed;
    return true;
  });

  const completedTasksCount = records.filter(
    (task: any) => task.completed
  ).length;
  const uncompletedTasksCount = records.length - completedTasksCount;

  return (
    <div className="container">
      <h2 className="containerHeadline">Create new task</h2>
      <div className="inputContainer">
        <input
          className="reccordInput"
          type="text"
          value={newTask}
          onChange={changeTextHandler}
          placeholder="Enter a new task"
          onKeyDown={handleKeyPress}
        />
        <button className="inputButton" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <h2 className="containerHeadline">Tasks</h2>
      <div className="filterContainer">
        <button
          className={`filterButton ${filter === "all" ? "selected" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filterButton ${filter === "completed" ? "selected" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`filterButton ${filter === "current" ? "selected" : ""}`}
          onClick={() => setFilter("current")}
        >
          Current
        </button>
      </div>
      <div
        className={`${
          filter === "completed"
            ? "completedRecordsContainer"
            : "unCompletedRecordsContainer"
        }`}
      >
        <div className="completedContainer">
          {filter === "all" ? (
            <p className="completedText completedTasks">
              All: {records.length}
            </p>
          ) : filter === "completed" ? (
            <p className="completedText completedTasks">
              Completed: {completedTasksCount}
            </p>
          ) : (
            <p className="completedText uncompletedTasks">
              Uncompleted: {uncompletedTasksCount}
            </p>
          )}
        </div>
        <ul style={{ padding: 0 }}>
          {filteredTasks.map((task: any) => (
            <li
              className="task"
              key={task.id}
              onClick={() => handleToggleTaskStatus(task.id)}
            >
              <img
                className="taskCheckbox"
                src={task.completed ? CheckboxCompleted : Checkbox}
                alt="checkBox"
              />
              {task.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
