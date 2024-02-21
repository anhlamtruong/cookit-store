import React from "react";

const ErrorComponent: React.FC<{ message?: string }> = ({
  message = "Something went wrong!",
}) => {
  return (
    <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
