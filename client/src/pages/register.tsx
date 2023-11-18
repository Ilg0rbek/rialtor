import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { register } from "../redux/user/userSlice";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user);
  const { data, loading } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  useEffect(() => {
    if (data.status == "200") {
      navigate("/");
    } else {
      setError(data.msg);
    }
  }, [data, loading, error]);

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
          required
          placeholder="username"
          className="p-3 rounded-lg"
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          required
          placeholder="email"
          className="p-3 rounded-lg"
          name="email"
          onChange={handleChange}
        />
        <input
          type={"password"}
          required
          placeholder="password"
          className="p-3 rounded-lg"
          name="password"
          onChange={handleChange}
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          {!loading ? "Register" : "Register ....."}
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
