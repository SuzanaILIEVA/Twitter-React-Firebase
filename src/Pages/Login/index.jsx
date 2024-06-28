import { useState } from "react";
import GoogleButton from "./GoogleButton";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResetButton from "./ResetButton";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email , setEmail] = useState("")
  const [pass ,setPass] = useState("")
  const [isError ,setIsError] =useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email ,pass);

    if(isSignUp){
      // Email ve sifre ile oturum acma 
        // kaydolma modunda ise hesap olustur
        createUserWithEmailAndPassword(auth, email, pass)
        .then(()=>{
          toast.success("Your account has been created"),
          navigate("/feed")})
        .catch((err) => toast.error("Something went wrong" + err.code))

    }else{
      // giris yapma modunda ise giris yap
      signInWithEmailAndPassword(auth ,email ,pass)
      .then(()=>{
        toast.success("The account has been logged in."),
        navigate("/feed")})
      .catch((err)=> {
        // eger giris bilgileri yanlis hatasi geldiyse error state'ini true'ya cekiyoruz
        if(err.code === "auth/invalid-credential"){
          setIsError(true)
        }
        toast.error("Something went wrong :" + err.code)})
    }
  }

  return (
    <div className="h-auto bg-[#242424] text-white grid place-items-center">
      <div className=" bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img
            className="h-[60px]"
            src="/public/x2-logo.png"
            alt="x shaped logo black and white"
          />
        </div>
        <h1 className="text-lg font-bold text-center"> {isSignUp ? "Sign up to twitter" : "Log in to twitter"}</h1>
        <GoogleButton isSignUp={isSignUp} />

        <form  onSubmit={handleSubmit} className="flex flex-col ">
          <label>Email</label>
          <input
            className="rounded text-black mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Password</label>
          <input
            className="rounded text-black mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300"
            type="submit"
          >
            {isSignUp ? "Sign up" : "Log in"}
          </button>

        </form>
        <p className="mt-5  whitespace-nowrap">
          <span className="text-gray-500">{isSignUp ? "Already have an account?" : "No account yet?"}</span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="cursor-pointer ms-2 text-blue-500"
          >
            {" "}
            {isSignUp ? "Log in" : "Sign up"}
          </span>
        </p>

        {isError && <ResetButton email={email}/>}
      </div>
    </div>
  );
};

export default Login;
