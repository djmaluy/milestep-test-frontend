import React from "react";

export const Home = React.memo(({ user }) => {
  return (
    <div>
      <h1 className="mt-4">
        {user
          ? `Hello, ${user.first_name} ${user.last_name}`
          : "You are not logged in"}
      </h1>
    </div>
  );
});
