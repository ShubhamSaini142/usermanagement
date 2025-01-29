import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddUser.css';

const AddUser = () => {
  const [user, setUser] = useState({ name: "", email: "", company: { name: "" } });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      company: {
        ...prevUser.company,
        name: e.target.value,
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
      await axios.post("https://jsonplaceholder.typicode.com/users", user);
      alert("User added successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to add user");
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <label>Name</label>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" onChange={handleChange} />
        
        <label>Company</label>
        <input type="text" name="companyName" placeholder="Company Name" onChange={handleCompanyChange} />
        
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
