import React from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";

export const HomePageButtons = React.memo(
  ({
    deleteTasksByIds,
    handleSubmit,
    formik,
    handleClickOpen,
    handleClose,
    open,
    activeTasks,
    setIsChecked,
    showCompletedTasks,
    showActiveTasks,
    // handleFileUpload,
    // onSubmit,
  }) => {
    return (
      <>
        {showActiveTasks ? (
          <>
            <button
              type="button"
              className="btn btn-danger  mb-3"
              onClick={() => {
                deleteTasksByIds();
              }}
            >
              Batch delete
            </button>
            <AddTaskForm
              handleSubmit={handleSubmit}
              formik={formik}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              open={open}
              // handleFileUpload={handleFileUpload}
              // onSubmit={onSubmit}
            />
            <div className="home__checkAll">
              <input
                type="checkbox"
                onChange={(e) => {
                  let value = e.target.checked;
                  setIsChecked(
                    activeTasks.map((d) => {
                      d.checked = value;
                      return d;
                    })
                  );
                }}
              />
              <span className="home__checkAll-text">Check all</span>
            </div>
          </>
        ) : (
          <AddTaskForm
            handleSubmit={handleSubmit}
            formik={formik}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={open}
            // handleFileUpload={handleFileUpload}
            // onSubmit={onSubmit}
          />
        )}
        {/* <button
          type="button"
          className="btn btn-danger  mb-3"
          onClick={() => {
            deleteTasksByIds();
          }}
        >
          Batch delete
        </button>
        <AddTaskForm
          handleSubmit={handleSubmit}
          formik={formik}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          // handleFileUpload={handleFileUpload}
          // onSubmit={onSubmit}
        />
        <div className="home__checkAll">
          <input
            type="checkbox"
            onChange={(e) => {
              let value = e.target.checked;
              setIsChecked(
                activeTasks.map((d) => {
                  d.checked = value;
                  return d;
                })
              );
            }}
          />
          <span className="home__checkAll-text">Check all</span>
        </div> */}
      </>
    );
  }
);
