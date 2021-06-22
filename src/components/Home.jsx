import React from "react";

export const Home = ({ user, tasks }) => {
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
      <button type="button" className="btn btn-primary">
        Primary
      </button>
      <div className="myTasks">
        <>
          <h2>All tasks</h2>
          <ul className="list-group ">
            {tasks.map((task) => {
              return (
                <li className="list-group-item col-5" key={task.id}>
                  {task.title}
                </li>
              );
            })}
          </ul>
        </>
      </div>
    </div>
  );
};
