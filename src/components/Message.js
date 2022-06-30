import React from "react";

const Message = ({ message, type }) => {
  const messageStyle = {
    background: "rgba(163, 163, 162, 0.2)",
    fontSize: 18,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  };
  if (message === null) return null;
  return <div style={{ ...messageStyle, ...type }}>{message}</div>;
};

export default Message;
