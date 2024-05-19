"use client";

import React from "react";
import Navigation from "../../../../components/ui/Navigation";
import { useAuthStore } from "../../../../store/store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Board from "../../../../components/projectBoard/Board";
import Loader from "../../../../components/common/Loader";

const ProjectBoardPage = ({ params }) => {
  const { id } = params;
  const user = useAuthStore((state) => state.user);

  // Get Project
  const {
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ["project"],
    queryFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${id}`),
  });
  // Get Tasks
  const {
    data: tasksData,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks?project.id=${id}&_sort=date&_order=desc`
      ),
  });

  console.log(tasksData);

  if (projectLoading || tasksLoading)
    return (
      <Loader className="h-[50vh] flex items-end justify-center" size="large" />
    );

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Navigation />
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">
          Project Board of{" "}
          <span className="text-blue-700">{projectData.data.title}</span>
        </h1>
      </div>
      <Board tasksData={tasksData?.data} projectData={projectData.data} />
    </div>
  );
};

export default ProjectBoardPage;
