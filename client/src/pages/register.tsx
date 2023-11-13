import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", formData);
      if (res.data.success) {
        setLoading(!loading);
      }
    } catch (error: any) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <div className="text-3xl text-center font-semibold my-7  ">Register</div>
      <form
        className="flex flex-col gap-4"
        autoComplete={"off"}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          className="p-3 rounded-lg"
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 rounded-lg"
          name="email"
          onChange={handleChange}
        />
        <input
          type={"password"}
          placeholder="password"
          className="p-3 rounded-lg"
          name="password"
          onChange={handleChange}
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          {loading ? "Register" : "Register ....."}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to={"/login"}>
          <span className=" text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <div className=" text-red-500">{error}</div>}
    </div>
  );
};

export default Register;
