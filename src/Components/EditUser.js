import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", email: "",  company: { name: "" } });
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
      console.log(user);
    } catch (error) {
      alert("Failed to update user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>Name</label><br></br>
      <input name="name" type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value }) } />
      {/* {console.log(user.name)} */}
      <br></br>

      <label>Email</label>
      <br></br>
      <input name="email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      {/* {console.log(user.email)} */}
      <br></br>

      <label>Company</label>
      <br></br>
      <input name="name" value={user.company.name} onChange={handleChange} />
      <br></br>
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
