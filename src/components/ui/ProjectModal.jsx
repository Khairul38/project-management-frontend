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

const ProjectCreateForm = ({
  initialValues,
  onFormInstanceReady,
  userData,
}) => {
  const [form] = Form.useForm();

  // Create a map to store additional data
  const userMap = userData.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
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
                message: "Please input the title of project!",
              },
            ]}
          >
            <Input />
          </FormItem>
        </div>
        <FormItem
          label="Project Color"
          name="color"
          rules={[
            {
              required: true,
              message: "Please pick the color of project!",
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
            message: "Please input the description of project!",
          },
        ]}
      >
        <TextArea rows={2} />
      </FormItem>
      <FormItem
        label="Add Member"
        name="members"
        rules={[
          {
            required: true,
            message: "Please Add Member!",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          // virtual
          // listItemHeight={10}
          // listHeight={250}
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          onChange={(selectedIds) => {
            const selectedUsers = selectedIds.map((id) => userMap[id]);
            form.setFieldsValue({ members: selectedUsers });
          }}
          options={userData.map((user) => ({
            label: user.email,
            value: user.id,
          }))}
        />
      </FormItem>
    </Form>
  );
};

const ProjectCreateFormModal = ({
  open,
  onCreate,
  onCancel,
  initialValues,
  confirmLoading,
  userData,
}) => {
  const [formInstance, setFormInstance] = useState();
  return (
    <Modal
      open={open}
      title="Create a new project"
      okText="Create"
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
      <ProjectCreateForm
        initialValues={initialValues}
        userData={userData}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

const ProjectModal = ({ userData }) => {
  const [formValues, setFormValues] = useState();
  const [open, setOpen] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    // setFormValues(values);
    setOpen(false);
  };

  return (
    <>
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
      <ProjectCreateFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        confirmLoading={false}
        userData={userData}
        // initialValues={{
        //   title: "Frontend Development",
        //   description: "Design and Develop all frontend component",
        //   members: [
        //     { label: "a11", value: "1" },
        //     { label: "c14", value: "3" },
        //   ],
        //   color: "",
        // }}
      />
    </>
  );
};
export default ProjectModal;
