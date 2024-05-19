"use client";

import React from "react";
import Navigation from "../../../../components/ui/Navigation";
import { useAuthStore, useTaskStore } from "../../../../store/store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Board from "../../../../components/projectBoard/Board";
import Loader from "../../../../components/common/Loader";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Input } from "antd";
const { Search } = Input;

const ProjectBoardPage = ({ params }) => {
  const { id } = params;
  const search = useTaskStore((state) => state.search);

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

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleSearch = (e) => {
    search(e.target.value);
  };

  if (projectLoading || tasksLoading)
    return (
      <Loader className="h-[50vh] flex items-end justify-center" size="large" />
    );

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Navigation />
      <div className="md:flex items-center justify-between px-10 mt-6 space-y-3 md:space-y-0">
        <h1 className="text-2xl font-bold">
          Project Board of{" "}
          <span className="text-blue-700">{projectData.data.title}</span>
        </h1>
        <div className="md:flex items-center gap-2 space-y-3 md:space-y-0">
          <div className="flex gap-1">
            <Avatar.Group
              maxCount={3}
              maxStyle={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
            >
              {projectData?.data?.members.map((m, index) => (
                <Tooltip key={index} title={m.name} placement="top">
                  <Avatar
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
          <Search
            placeholder="input search text"
            allowClear
            // onSearch={(value, _e, info) => console.log(info?.source, value)}
            onChange={debounce(handleSearch, 400)}
            style={{
              width: 200,
            }}
          />
        </div>
      </div>
      <Board tasksData={tasksData?.data} projectData={projectData.data} />
    </div>
  );
};

export default ProjectBoardPage;
