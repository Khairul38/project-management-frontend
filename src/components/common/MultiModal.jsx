import React, { useState } from "react";
import { Button, Modal } from "antd";

const MultiModal = ({
  children,
  button,
  title,
  open,
  setOpen,
  loading,
  handleOk,
  handleCancel,
}) => {
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const showModal = () => {
  //   setOpen(true);
  // };
  // const handleOk = () => {
  //   setModalText("The modal will be closed after two seconds");
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };
  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setOpen(false);
  // };
  return (
    <>
      {button && button}
      <Modal
        title={title ? title : "Title"}
        open={open}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};
export default MultiModal;
