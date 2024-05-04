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

const RegisterPage = () => {
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
      userLoggedIn({
        ...data?.data?.user,
        accessToken: data?.data?.accessToken,
      });
      setToLocalStorage("auth", {
        ...data?.data?.user,
        accessToken: data?.data?.accessToken,
      });
      message.success("Registration Successful");
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
    <div className="flex justify-center min-h-screen items-center">
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
