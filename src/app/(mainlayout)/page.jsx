"use client";

import React from "react";
import Navigation from "../../components/ui/Navigation";
import axios from "axios";
import Loader from "../../components/common/Loader";
import Project from "../../components/ui/Project";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/store";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () =>
      await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`),
  });
  console.log(data);

  if (isLoading)
    return (
      <Loader className="h-[50vh] flex items-end justify-center" size="large" />
    );

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navigation />
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button
            // onClick={controlModal}
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
          {data?.data.map((project) => (
            <Project key={project.id} project={project} loggedInUser={user} />
          ))}
        </div>
      </div>
      {/* <AddTeamModal
        opened={opened}
        controlModal={controlModal}
        notify={notify}
      /> */}
      {/* <ToastContainer autoClose={3000} theme="colored" /> */}
    </>
  );
};

export default HomePage;
