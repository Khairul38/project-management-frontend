"use client";

import React, { useState } from "react";
import Navigation from "../../components/ui/Navigation";
import axios from "axios";
import Loader from "../../components/common/Loader";
import Project from "../../components/ui/Project";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/store";
import ProjectModal from "../../components/ui/ProjectModal";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  // Get Users
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`),
  });

  // Get Projects
  const {
    data: projectsData,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`),
  });

  // Create Projects

  console.log(userData);

  if (projectLoading)
    return (
      <Loader className="h-[50vh] flex items-end justify-center" size="large" />
    );

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navigation />
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <ProjectModal userData={userData?.data} status="create" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
          {projectsData?.data.map((project) => (
            <Project key={project.id} project={project} loggedInUser={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
