import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({ name: "", email: "",company: { name: "" } });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
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
      <input  type="text"  name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="email" placeholder="Email" onChange={handleChange} />
      <input   type="text" name="name" placeholder="Company Name" onChange={handleCompanyChange} />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
