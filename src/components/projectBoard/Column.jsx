import React, { useEffect, useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { useTaskStore } from "../../store/store";

const Column = ({ boardTasks, stage }) => {
  const [tasks, setProjects] = useState([]);
  const searchString = useTaskStore((state) => state.searchString);

  const search = (searchString) => {
    return (boardTask) => {
      if (searchString.length === 0) {
        return boardTask;
      } else {
        return boardTask.description
          .toLowerCase()
          .match(searchString.toLowerCase())
          ? { ...boardTask, match: true }
          : { ...boardTask, match: false };
      }
    };
  };

  useEffect(() => {
    const filteredTasks = boardTasks
      .map(search(searchString))
      .filter((boardTask) => boardTask.stage === stage);
    setProjects(filteredTasks);
  }, [boardTasks, stage, searchString]);

  return (
    <Droppable droppableId={stage}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`flex flex-col flex-shrink-0 w-72 rounded-md pl-2.5 ${
            snapshot.isDraggingOver && "bg-indigo-100"
          }`}
        >
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">{stage}</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              {tasks.length}
            </span>
            {stage === "Backlog" && (
              <button
                // onClick={() => controlModal()}
                className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-col pb-2 pr-2.5 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
            {tasks.map((task, index) => (
              <Task key={task.id} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
