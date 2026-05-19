import { useEffect, useState } from "react";
import axios from "axios";

export default function Register() {

  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    admissionNumber: "",
    department: ""
  });

  // FETCH DEPARTMENTS
  useEffect(() => {

    const fetchDepartments = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/departments"
        );

        console.log(res.data);

        setDepartments(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchDepartments();

  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log(formData);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log(res.data);

      alert("Registration Successful");

    } catch (error) {

      console.log(error.response?.data);

      alert(
        JSON.stringify(error.response?.data)
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="admissionNumber"
          placeholder="Admission Number"
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="department"
          onChange={handleChange}
        >

          <option value="">
            Select Department
          </option>

          {departments.map((dept) => (

            <option
              key={dept._id}
              value={dept._id}
            >
              {dept.name}
            </option>

          ))}

        </select>

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>
    </div>
  );
}