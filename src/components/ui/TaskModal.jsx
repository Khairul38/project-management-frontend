import { useMutation, que, useQueryClient } from "@tanstack/react-query";
import MultiModal from "../common/MultiModal";
import {
  Button,
  Col,
  ColorPicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskCreateForm = ({ initialValues, onFormInstanceReady, userData }) => {
  const [form] = Form.useForm();

  // console.log(userData);

  // Create a map to store additional data
  // const userMap = userData.reduce((acc, user) => {
  //   acc[user.id] = user;
  //   return acc;
  // }, {});

  useEffect(() => {
    onFormInstanceReady(form);
  }, [form, onFormInstanceReady]);
  return (
    <Form
      layout="vertical"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <FormItem
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of task!",
              },
            ]}
          >
            <Input />
          </FormItem>
        </div>
        <FormItem
          label="Task Color"
          name="color"
          rules={[
            {
              required: true,
              message: "Please pick the color of task!",
            },
          ]}
        >
          <ColorPicker
            onChange={(value) =>
              form.setFieldsValue({ color: value.toHexString() })
            }
          />
        </FormItem>
      </div>
      <FormItem
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input the description of task!",
          },
        ]}
      >
        <TextArea rows={2} />
      </FormItem>
      <FormItem
        label="Assign Members"
        name="assignMembers"
        rules={[
          {
            required: true,
            message: "Please Assign Members!",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          virtual={false}
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          // onChange={(selectedIds) => {
          //   const selectedUsers = selectedIds.map((id) => userMap[id]);
          //   form.setFieldValue({ membersDetails: selectedUsers });
          // }}
          options={userData.map((user) => ({
            label: user.email,
            value: user.email,
          }))}
        />
      </FormItem>
    </Form>
  );
};

const TaskCreateFormModal = ({
  open,
  onCreate,
  onCancel,
  initialValues,
  confirmLoading,
  userData,
  status,
}) => {
  const [formInstance, setFormInstance] = useState();
  return (
    <Modal
      open={open}
      title={status === "create" ? "Create a new task" : "View/Update a task"}
      okText={status === "create" ? "Create" : "Update"}
      cancelText="Cancel"
      okButtonProps={{
        autoFocus: true,
      }}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          formInstance?.resetFields();
          onCreate(values);
        } catch (error) {
          console.log("Failed:", error);
        }
      }}
    >
      <TaskCreateForm
        initialValues={initialValues}
        userData={userData}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

const TaskModal = ({ userData, projectData, loggedInUser, status, task }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  console.log(status);

  // Create Task
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, data),
    onSuccess: (data) => {
      console.log(data);
      message.success("Task Created Successful");
      queryClient.invalidateQueries(["tasks"]);
      setOpen(false);
    },
    onError: (error) => message.error(`${error?.response?.data}`),
  });

  // Update Task
  const { mutate: updateMutate, isPending: UpdatePending } = useMutation({
    mutationFn: async (data) =>
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task.id}`,
        data
      ),
    onSuccess: (data) => {
      console.log(data);
      message.success("Task Updated Successful");
      queryClient.invalidateQueries(["tasks"]);
      setOpen(false);
    },
    onError: (error) => message.error(`${error?.response?.data}`),
  });

  const onCreate = (values) => {
    const data = {
      project: projectData,
      title: values.title,
      description: values.description,
      color: values.color,
      stage: "Todo",
      assignMembers: userData.filter((user) =>
        values.assignMembers.includes(user.email)
      ),
      creator: {
        name: loggedInUser.name,
        email: loggedInUser.email,
        id: loggedInUser.id,
      },
      date: new Date(),
    };
    const updateData = {
      title: values.title,
      description: values.description,
      color: values.color,
      assignMembers: userData?.filter((user) =>
        values.assignMembers.includes(user.email)
      ),
    };
    // console.log("Received values of form: ",values, updateData);
    if (status === "create") {
      mutate(data);
    }
    if (status === "edit") {
      updateMutate(updateData);
    }
  };

  return (
    <>
      {status === "create" ? (
        <button
          onClick={() => setOpen(true)}
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
      ) : (
        <span className="w-full" onClick={() => setOpen(true)}>
          View/Edit
        </span>
      )}
      <TaskCreateFormModal
        open={open}
        status={status}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        confirmLoading={status === "create" ? isPending : UpdatePending}
        userData={userData}
        initialValues={{
          title: task?.title,
          description: task?.description,
          assignMembers: task?.assignMembers.map((user) => ({
            label: user.email,
            value: user.email,
          })),
          color: task?.color,
        }}
      />
    </>
  );
};
export default TaskModal;
