import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((resp) => setUsers(resp.data))
      .catch((err) => setError(err.message));
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/add">Add User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
           <label>NAME : {user.name} </label>  <br></br>
           <label>EMAIL : {user.email}</label>   <br></br>
           <label>COMPANY : {user.company.name}</label> <br></br>    
            <Link to={`/edit/${user.id}`}>Edit</Link> <br></br> 
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <br></br> <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
