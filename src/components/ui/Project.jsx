import {
  AntDesignOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Tooltip } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Project = ({ project, loggedInUser }) => {
  const { id, projectName, projectColor, description, date, members } = project;

  const router = useRouter();

  const items = [
    {
      key: "1",
      label: (
        <button
          onClick={() => {
            router.push(`/projectBoard/${id}`);
          }}
        >
          View
        </button>
      ),
    },
    {
      key: "2",
      label: "Edit",
    },
    {
      key: "3",
      danger: true,
      label: <button onClick={() => {}}>Delete</button>,
    },
  ];
  return (
    <>
      <div
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        {/* <DropdownEditMenu
          align="right"
          className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
        >
          <li
            onClick={controlModal}
            className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3 hover:bg-slate-100"
          >
            Add member
          </li>
          {loggedInUser.email === team.creator.email && (
            <li
              onClick={handleDeleteTeam}
              className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3 hover:bg-slate-100"
            >
              Delete
            </li>
          )}
        </DropdownEditMenu> */}
        <div className="absolute top-0 right-0 items-center justify-center w-5 h-5 mt-3 mr-4">
          <Dropdown
            menu={{
              items,
            }}
            // trigger={["click"]}
            placement="bottomRight"
          >
            <Button className="!px-1.5">
              <MoreOutlined />
            </Button>
          </Dropdown>
        </div>

        <span
          // style={{
          //   color: projectColor,
          // }}
          className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full text-[${projectColor}] bg-[${projectColor}] bg-opacity-20`}
        >
          <p>{projectName}</p>
        </span>
        <h4 className="mt-3 text-sm font-medium">{description}</h4>
        <div className="mt-2 flex gap-1">
          <Avatar.Group
            maxCount={2}
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            {members.map((m, index) => (
              // <img
              //   key={index}
              //   className="w-7 h-7 ml-auto rounded-full"
              //   src={gravatarUrl(m)}
              //   alt=""
              // />
              <Tooltip key={index} title="Ant User" placement="top">
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
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {moment(date).format("ll")}
            </span>
          </div>
        </div>
      </div>
      {/* <AddMemberModal
        opened={opened}
        controlModal={controlModal}
        team={team}
        notify={notify}
      /> */}
    </>
  );
};

export default Project;
