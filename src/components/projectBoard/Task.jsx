import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Tooltip, message } from "antd";
import moment from "moment";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const {
    id,
    date,
    stage,
    title,
    description,
    color,
    team,
    creator,
    assignedMembers,
    match,
  } = task;

  // const { user: loggedInUser } = useSelector((state) => state.auth);

  // const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  // const handleDeleteProject = () => {
  //   if (!isLoading) {
  //     deleteProject({ id, email: loggedInUser.email });
  //     notify("Project Deleted Successfully");
  //   }
  // };

  const onClick = ({ key }) => {
    // if (key === "1") {
    //   router.push(`/projectBoard/${id}`);
    // }
    // if (key === "3") {
    //   message.loading("Project Deleting...");
    //   mutate(id);
    // }
  };

  const items = [
    {
      key: "1",
      label: "View",
    },
    // {
    //   key: "2",
    //   label: (
    //     <ProjectModal
    //       userData={usersData}
    //       loggedInUser={loggedInUser}
    //       status="edit"
    //       project={project}
    //     />
    //   ),
    // },
    {
      key: "3",
      danger: true,
      label: "Delete",
    },
  ];

  return (
    <Draggable index={index} draggableId={task.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${
            match && "border-2 border-indigo-600"
          }`}
          draggable="true"
        >
          {stage === "Todo" && (
            <div className="absolute top-0 right-0 items-center justify-center w-5 h-5 mt-2 mr-4">
              <Dropdown
                menu={{
                  items,
                  onClick,
                }}
                // trigger={["click"]}
                placement="bottomRight"
              >
                <Button className="!px-1.5">
                  <MoreOutlined />
                </Button>
              </Dropdown>
            </div>
          )}
          <span
            style={{
              backgroundColor: `${color}33`, // Adding 33 to color for 20% opacity in hex
            }}
            className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full`}
          >
            <p style={{ color: color }}>{title}</p>
          </span>
          <h4 className="mt-3 text-sm font-medium">{description}</h4>
          <div className="flex items-center w-full mt-6 justify-between gap-2 text-xs font-medium text-gray-400">
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

            <div className="flex gap-1">
              <Avatar.Group
                maxCount={3}
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                {assignedMembers.map((m, index) => (
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
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
