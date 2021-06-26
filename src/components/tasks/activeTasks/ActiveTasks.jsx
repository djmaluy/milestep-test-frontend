import React, { useEffect } from "react";
import { ActiveTaskRow } from "./ActiveTaskRow";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTasks, getSortedTasks } from "../../../redux/tasksSelector";
import { getActiveData } from "../../../redux/actions";
import { CheckAllActiveTasks } from "./CheckAllActiveTasks";

export const ActiveTasks = ({
  openModal,
  onDeleteTask,
  onCompleteHandler,
  setIsChecked,
}) => {
  const dispatch = useDispatch();

  const activeTasks = useSelector(getActiveTasks);
  const sortedTasks = useSelector(getSortedTasks);

  useEffect(() => {
    dispatch(getActiveData());
  }, [sortedTasks, dispatch]);
  return (
    <table>
      <thead>
        <tr>
          <CheckAllActiveTasks
            activeTasks={activeTasks}
            setIsChecked={setIsChecked}
          />
          <th colSpan="2">Title</th>
        </tr>
      </thead>
      <tbody>
        <ActiveTaskRow
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          activeTasks={activeTasks}
          onCompleteHandler={onCompleteHandler}
          setIsChecked={setIsChecked}
        />
      </tbody>
    </table>
  );
};
