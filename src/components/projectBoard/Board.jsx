import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

const Board = ({ tasksData, projectData }) => {
  const queryClient = useQueryClient();
  const [boardTasks, setBoardTasks] = useState(tasksData);
  // const [updatedProject] = useUpdateTaskMutation();

  // Update Task
  const { mutate: updateTaskMutate, isPending: UpdateTaskPending } =
    useMutation({
      mutationFn: async ({ data, id }) =>
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${id}`,
          data
        ),
      onSuccess: (data) => {
        console.log(data);
        // message.success("Task Updated Successful");
        queryClient.invalidateQueries(["tasks"]);
      },
      onError: (error) => message.error(`${error?.response?.data}`),
    });

  useEffect(() => {
    setBoardTasks(tasksData);
  }, [tasksData]);

  console.log(boardTasks);

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

    updateTaskMutate({
      data: { stage: droppableDestination.droppableId },
      id: removed.id,
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
      const filteredSourceTasks = boardTasks.filter(
        (p) => p.stage === source.droppableId
      );
      const filteredRestTasks = boardTasks.filter(
        (p) => p.stage !== source.droppableId
      );
      const items = reorder(
        filteredSourceTasks,
        source.index,
        destination.index
      );
      setBoardTasks([...filteredRestTasks, ...items]);
    } else {
      const filteredSourceTasks = boardTasks.filter(
        (p) => p.stage === source.droppableId
      );
      const filteredDestinationTasks = boardTasks.filter(
        (p) => p.stage === destination.droppableId
      );
      const filteredRestTasks = boardTasks.filter((p) => {
        if (p.stage === source.droppableId) {
          return false;
        } else if (p.stage === destination.droppableId) {
          return false;
        } else {
          return true;
        }
      });
      const result = move(
        filteredSourceTasks,
        filteredDestinationTasks,
        source,
        destination
      );
      setBoardTasks([...filteredRestTasks, ...result]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-grow px-10 mt-4 space-x-5 overflow-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-gray-400 !scrollbar-track-rounded-full !scrollbar-thumb-rounded-full">
        <Column
          projectData={projectData}
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
