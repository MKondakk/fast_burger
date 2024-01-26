import React from "react";

interface ErrorMessageProps {
  message: string;
}

const Error: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className="error-message">{message}</div>;
};

export {Error};
