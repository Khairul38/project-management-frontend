import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Board = ({ tasksData }) => {
  const [boardTasks, setBoardTasks] = useState(tasksData);
  // const [updatedProject] = useUpdateTaskMutation();

  useEffect(() => {
    setBoardTasks(tasksData);
  }, [tasksData]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, {
      ...removed,
      stage: droppableDestination.droppableId,
    });

    // const result = {};
    const result = [...sourceClone, ...destClone];
    // result[droppableSource.droppableId] = sourceClone;
    // result[droppableDestination.droppableId] = destClone;

    updatedProject({
      id: removed.id,
      data: { stage: droppableDestination.droppableId },
    });

    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const filteredSourceProjects = boardProjects.filter(
        (p) => p.stage === source.droppableId
      );
      const filteredRestProjects = boardProjects.filter(
        (p) => p.stage !== source.droppableId
      );
      const items = reorder(
        filteredSourceProjects,
        source.index,
        destination.index
      );
      setBoardProjects([...filteredRestProjects, ...items]);
    } else {
      const filteredSourceProjects = boardProjects.filter(
        (p) => p.stage === source.droppableId
      );
      const filteredDestinationProjects = boardProjects.filter(
        (p) => p.stage === destination.droppableId
      );
      const filteredRestProjects = boardProjects.filter((p) => {
        if (p.stage === source.droppableId) {
          return false;
        } else if (p.stage === destination.droppableId) {
          return false;
        } else {
          return true;
        }
      });
      const result = move(
        filteredSourceProjects,
        filteredDestinationProjects,
        source,
        destination
      );
      setBoardProjects([...filteredRestProjects, ...result]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-grow px-10 mt-4 space-x-5 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        <Column
          boardTasks={boardTasks}
          stage="Todo"
          // controlModal={controlModal}
        />
        <Column boardTasks={boardTasks} stage="In Progress" />
        <Column boardTasks={boardTasks} stage="Review" />
        <Column boardTasks={boardTasks} stage="Blocked" />
        <Column boardTasks={boardTasks} stage="Done" />
      </div>
    </DragDropContext>
  );
};

export default Board;
