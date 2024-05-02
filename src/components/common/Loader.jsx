import React from "react";
import { Spin } from "antd";

const Loader = ({ className, size }) => {
  return (
    <div className={className && className}>
      <Spin size={size && size} />
    </div>
  );
};

export default Loader;
