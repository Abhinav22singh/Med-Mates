import React, { useState, useContext, useEffect } from "react"; // ✅ added useContext
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ added

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext);

  const navigate =  useNavigate();

  const [state, setState] = useState("Sign up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }

      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", { // ✅ fixed
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() =>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">

        <p className="text-2xl font-semibold text-gray-800 text-center">
          {state === "Sign up" ? "Create Account" : "Login"}
        </p>

        <p className="text-gray-500 text-center mt-1 text-sm">
          Please {state === "Sign up" ? "sign up" : "login"} to book an appointment
        </p>

        {state === "Sign up" && (
          <div className="w-full">
            <p className="text-sm text-gray-600 mb-1">Full name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
        </div>

        <div className="w-full">
          <p className="text-sm text-gray-600 mb-1">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
        </div>

        <button type="submit" className="w-full mt-6 py-3 bg-sky-500 text-white font-medium rounded-lg shadow-md hover:bg-sky-600 transition">
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => setState("Login")}
              className="text-sky-500 underline cursor-pointer"
            >
              {" "}Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account!
            <span
              onClick={() => setState("Sign up")}
              className="text-sky-500 underline cursor-pointer"
            >
              {" "}CLICK HERE
            </span>
          </p>
        )}

      </div>
    </form>
  );
};

export default Login;