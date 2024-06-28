import { signInWithPopup } from "firebase/auth";
import React from "react";
import {auth ,provider} from "../../firebase/index"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleButton = ({isSignUp}) => {
    const navigate = useNavigate()

  const handleLogin = () => {
    signInWithPopup(auth ,provider).then(() =>{
        navigate("/feed");
        toast.success("Successfully Logged in")
    })
  };

  
  return (
    <button
      onClick={handleLogin}
      className="flex items-center bg-white text-black py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 whitespace-nowrap "
    >
      <img className="h-[20px]" src="/public/google2.png" alt="google logo" />
      {!isSignUp ? "Log in with Google" : "Sign up with Google"}
    </button>
  );
};

export default GoogleButton;
