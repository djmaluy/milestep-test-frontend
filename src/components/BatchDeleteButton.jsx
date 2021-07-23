import React from "react";

export const BatchDeleteButton = ({ deleteTasksByIds }) => {
  return (
    <button
      type="button"
      className="btn btn-danger  mb-3"
      onClick={() => {
        deleteTasksByIds();
      }}
    >
      Batch delete
    </button>
  );
};
