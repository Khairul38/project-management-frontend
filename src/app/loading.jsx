import React from "react";
import Loader from "../components/common/Loader";

const Loading = () => {
  return (
    <div>
      <Loader className="h-[50vh] flex items-end justify-center" size="large" />
    </div>
  );
};

export default Loading;
