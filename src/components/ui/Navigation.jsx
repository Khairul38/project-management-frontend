"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuthStore } from "../../store/store";

const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const userLoggedOut = useAuthStore((state) => state.userLoggedIn);
  const pathname = usePathname();

  const onClick = ({ key }) => {
    if (key === "3") {
      userLoggedOut();
      localStorage.clear();
    }
  };

  const items = [
    {
      key: "1",
      label: `${user?.name}`,
    },
    {
      key: "2",
      label: `${user?.email}`,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      danger: true,
      label: "Logout",
    },
  ];
  return (
    <div className="flex items-center justify-between w-full h-16 px-10 bg-white bg-opacity-75">
      <Link href="/">
        {/* <img src={logoImage} className="h-10 w-10 cursor-pointer" alt="" /> */}
        <svg width="32" height="32" viewBox="0 0 32 32">
          <defs>
            <linearGradient
              x1="28.538%"
              y1="20.229%"
              x2="100%"
              y2="108.156%"
              id="logo-a"
            >
              <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
              <stop stopColor="#A5B4FC" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="88.638%"
              y1="29.267%"
              x2="22.42%"
              y2="100%"
              id="logo-b"
            >
              <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
              <stop stopColor="#38BDF8" offset="100%" />
            </linearGradient>
          </defs>
          <rect fill="#6366F1" width="32" height="32" rx="16" />
          <path
            d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
            fill="#4F46E5"
          />
          <path
            d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
            fill="url(#logo-a)"
          />
          <path
            d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
            fill="url(#logo-b)"
          />
        </svg>
      </Link>

      <div className="flex">
        <Link href="/">
          <p
            className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
              pathname === "/" ? "text-indigo-700" : "text-gray-600"
            }`}
          >
            Home
          </p>
        </Link>
        {/* <Link href="/projects">
          <p
            className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
              pathname === "/projects" ? "text-indigo-700" : "text-gray-600"
            }`}
          >
            Projects
          </p>
        </Link> */}
      </div>
      {/* {children} */}
      {/* <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
        <img
          src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
          alt="pathyhssdf asd "
        />
      </button> */}
      <div className="flex items-center justify-center">
        {/* <DropdownProfile user={user} handleLogout={handleLogout} /> */}
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          placement="bottomRight"
        >
          {/* <Button>bottomRight</Button> */}
          <Avatar
            style={{ cursor: "pointer" }}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navigation;
