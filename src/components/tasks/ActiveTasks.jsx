import React, { useEffect } from "react";
import { ActiveTaskRow } from "./ActiveTaskRow";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTasks, getSortedTasks } from "../../redux/tasksSelector";
import { getActiveData } from "../../redux/actions";

export const ActiveTasks = ({
  openModal,
  onDeleteTask,
  onCompleteHandler,
  isHovered,
  setIsHovered,
}) => {
  const dispatch = useDispatch();

  const activeTasks = useSelector(getActiveTasks);
  const sortedTasks = useSelector(getSortedTasks);

  useEffect(() => {
    dispatch(getActiveData());
  }, [sortedTasks]);
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={(e) => {
                let value = e.target.checked;
                dispatch(
                  getActiveData(
                    activeTasks.map((d) => {
                      d.select = value;
                      return d;
                    })
                  )
                );
              }}
            />
            <span>Check all</span>
          </th>
          <th colSpan="2">Title</th>
          {/* <th>Actions</th> */}
        </tr>
      </thead>
      <tbody>
        <ActiveTaskRow
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          activeTasks={activeTasks}
          onCompleteHandler={onCompleteHandler}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />
      </tbody>
    </table>
  );
};
