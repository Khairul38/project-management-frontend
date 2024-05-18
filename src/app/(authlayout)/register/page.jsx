"use client";

import React from "react";
import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuthStore } from "../../../store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { setToLocalStorage } from "../../../utils/local-storage";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const userLoggedIn = useAuthStore((state) => state.userLoggedIn);
  const queryClient = useQueryClient();

  // console.log(user);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["movies"], //Array according to Documentation
  //   queryFn: async () => await getMovies(),
  // });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        data
      ),
    onSuccess: (data) => {
      console.log(data);
      userLoggedIn({
        ...data?.data?.user,
        accessToken: data?.data?.accessToken,
      });
      setToLocalStorage("auth", {
        ...data?.data?.user,
        accessToken: data?.data?.accessToken,
      });
      message.success("Registration Successful");
      router.push("/");
      // queryClient.invalidateQueries([""])
    },
    onError: (error) => message.error(`${error?.response?.data}`),
  });

  const onFinish = (values) => {
    mutate(values);
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <div className="flex flex-col justify-center items-center">
        <svg width="50" height="50" viewBox="0 0 32 32">
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
        <h2 className="my-5 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <Form
        name="normal_login"
        className="login-form w-72"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <FormItem
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="name"
            placeholder="Name"
          />
        </FormItem>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </FormItem>
        <FormItem>
          Already have an account? <Link href="/login">Login</Link>
        </FormItem>

        <FormItem>
          <Button
            loading={isPending}
            type="primary"
            htmlType="submit"
            className="login-form-button w-full"
          >
            Register
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default RegisterPage;
