import React, { useEffect } from "react";
import { CompletedTaskRow } from "./CompletedTaskRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedTasks,
  getSortedTasks,
} from "../../../redux/tasksSelector";
import { getCompletedData } from "../../../redux/actions";

export const CompletedTasks = ({
  openModal,
  onDeleteTask,
  onMooveToActiveHandler,
  setIsChecked,
}) => {
  const dispatch = useDispatch();

  const completedTasks = useSelector(getCompletedTasks);
  const sortedTasks = useSelector(getSortedTasks);

  useEffect(() => {
    dispatch(getCompletedData());
  }, [sortedTasks, dispatch]);

  return (
    <div className="completedTasks">
      <h3>Completed tasks</h3>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  let value = e.target.checked;
                  setIsChecked(
                    completedTasks.map((d) => {
                      d.select = value;
                      return d;
                    })
                  );
                }}
              />
              <span>Check all</span>
            </th>
            <th colSpan="2">Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CompletedTaskRow
            openModal={openModal}
            onDeleteTask={onDeleteTask}
            completedTasks={completedTasks}
            onMooveToActiveHandler={onMooveToActiveHandler}
            setIsChecked={setIsChecked}
          />
        </tbody>
      </table>
    </div>
  );
};
