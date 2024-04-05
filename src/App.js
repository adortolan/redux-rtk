import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./features/users/userSlice";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>App of users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
