import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", email: "", company: { name: "" } });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => setUser(res.data))
      .catch(() => alert("Failed to fetch user"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      company: {
        ...prevUser.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.company.name) {
      alert("All fields are required!");
      return;
    }
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      alert("User updated successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to update user");
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <label>Name</label>
        <input name="name" type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        
        <label>Email</label>
        <input name="email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        
        <label>Company</label>
        <input name="name" value={user.company.name} onChange={handleChange} />
        
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
