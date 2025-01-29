import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({ name: "", email: "",company: { name: "" } });
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
      console.log(user);
    } catch (error) {
      alert("Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>Name</label><br></br>
      <input  type="text"  name="name" placeholder="Name" onChange={handleChange} />
      <br></br>
      <label>Email</label><br></br>
      <input type="text" name="email" placeholder="Email" onChange={handleChange} />
      <br></br>
        <label>Company</label><br></br>
      <input  type="text" name="name" placeholder="Company Name" onChange={handleCompanyChange} />
      <br></br>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
