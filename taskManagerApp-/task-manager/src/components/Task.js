import React, { useEffect, useRef, useState } from "react";
import "./Task.css";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

function Task() {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTask = () => {
    if (input !== "") {
      setTask([...task, { list: input, id: Date.now(), state: false }]);
      console.log(task);
      setInput("");
    }
  };
  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    setTask(task.filter((arr) => arr.id !== id));
  };

  const onComplete = (id) => {
    let complete = task.map((list) => {
      if (list.id === id) {
        return { ...list, state: !list.state };
      }
      return list;
    });
    setTask(complete);
  };

  return (
    <div className="container">
      <h2>TASK MANAGER APP</h2>
      <form className="formInput" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          ref={inputRef}
          placeholder="Enter your task"
          className="formControl"
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={addTask}>Create Task</button>
      </form>
      <div className="list">
        <ul>
          {task.map((arr) => (
            <li className="list-items">
              <div className="list-item-list" id={arr.state ? "list-item" : ""}>
                {arr.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(arr.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(arr.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Task;
