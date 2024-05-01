import React from "react";
import { Spin } from "antd";

const Loader = ({ className, size }) => {
  return (
    <div>
      <Spin className={className && className} size={size && size} />
    </div>
  );
};

export default Loader;
