import React, {useState} from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Modal from 'react-modal'
import { TaskDetail } from "./tasks/TaskDetail";
import { NavLink } from "react-router-dom";

export const Home = ({
  user,
  tasks,
  formik,
  handleSubmit,
  handleClickOpen,
  handleClose,
  open,
  onDeleteTask,
  setOpen,
  
}) => {
  const [showTask, setShowTask] = useState(null)


  const openModal = (task) => {
    setShowTask(task)
  }
  const closeModal = () => {
    setShowTask(null)
  }
  
  return (
    <div>
      <h1 className="mt-4">
        {user ? (
          <>
            <div className="text-center">
              Hello, {user.first_name} {user.last_name}
            </div>
          </>
        ) : (
          "You are not logged in"
        )}
      </h1>

      <div className="myTasks">
          <ul className="list-group ">
            {tasks.map((task) => {
              return (
                <li className="list-group-item col-5" key={task.id}>
                    <button onClick={() => openModal(task)} className = 'titleButton' > 
                      {task.title}
                    </button>
                    <ButtonGroup color="primary" size="small">
                      <NavLink to={{ pathname: `/edit`, state: { task } }}>
                        <Button  color="primary">
                          Edit
                        </Button>
                      </NavLink>
                      <Button  onClick={() => onDeleteTask(task.id)} color="primary">
                        Delete
                      </Button>
                  </ButtonGroup>
                </li>
              );
            })}
            
          </ul>
          
      </div>
      <AddTaskForm
        handleSubmit={handleSubmit}
        formik={formik}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        
      />

      <div>
        {showTask && (
          <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false} >
            <Button className = 'close-modal' onClick={closeModal}>
              X
            </Button>
              <TaskDetail showTask={showTask}/>
            </Modal>
        )}
      </div>
    </div>
  );
};
