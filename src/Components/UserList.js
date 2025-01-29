import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './UserList.css';

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
    <div className="user-list-container">
      <h1>User List</h1>
      {error && <p className="error">{error}</p>}
      <Link to="/add" className="add-user-button">Add User</Link>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <div className="actions">
              <Link to={`/edit/${user.id}`} className="edit-link">Edit</Link>
              <button onClick={() => deleteUser(user.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;