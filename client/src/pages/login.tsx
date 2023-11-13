import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      setLoading(!loading);
      const res = await axios.post("/api/login", formData);
      if (res.data.accessToken) {
        setLoading(!loading);
      }
      navigate("/");
    } catch (error: any) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className=" max-w-lg mx-auto">
      <div className=" text-center my-7 text-3xl">Login</div>
      <form
        action=""
        className=" flex flex-col gap-3"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          required
          type="text"
          name="username"
          placeholder="username"
          className="p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          required
          type="password"
          placeholder="password"
          name="password"
          className="p-3 rounded-lg"
        />
        <button className="p-3 rounded-lg bg-slate-700 text-white uppercase">
          {loading ? " Log in" : "Log in ....."}
        </button>
      </form>
      <div className="mt-5 flex gap-2">
        <span>Have not account ?</span>
        <Link to={"/register"}>
          <span className=" text-blue-700"> Register now!</span>
        </Link>
      </div>
      {error && <div className=" text-red-500">{error}</div>}
    </div>
  );
};

export default Login;
