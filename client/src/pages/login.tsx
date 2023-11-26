import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

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
    dispatch(login(formData));
  };

  useEffect(() => {
    if (data.status == "200") {
      navigate("/main");
    } else {
      setError(data.msg);
    }
  }, [loading, data, error]);

  return (
    <div className=" max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Login</div>
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
        <button
          disabled={loading}
          className="p-3 rounded-lg bg-slate-700 text-white uppercase"
        >
          {!loading ? " Log in" : "Log in ....."}
        </button>
        <OAuth />
      </form>
      <div className="mt-5 flex gap-2">
        <span>Dont have an account ?</span>
        <Link to={"/register"}>
          <span className=" text-blue-700"> Register now!</span>
        </Link>
      </div>
      {error && <div className=" text-red-500">{error}</div>}
    </div>
  );
};

export default Login;
