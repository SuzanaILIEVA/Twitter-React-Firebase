import { signOut } from "firebase/auth";
import { navSections } from "../../constant";
import { RiDoorOpenLine } from "react-icons/ri";
import { auth } from "../../firebase";

const Nav = ({ user }) => {
  // console.log(user);
  return (
    <nav className="justify-between items-end px-2 py-4">
      <div className="">
        <img className="w-14 mb-4" src="/public/x2-logo.png" alt="" />

        {navSections.map((i, key) => (
          <div
            key={key}
            className="flex items-center gap-3 whitespace-nowrap text-2xl md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-[#505050b7] max-md:justify-center"
          >
            {i.icon}
            <span className="max-md:hidden">{i.title}</span>
          </div>
        ))}
      </div>

      <div className="">
        {!user ? (
          <div className="w-12 h-12 rounded-full bg-gray-400 animate-bounce " />
        ) : (
          <div  className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">

              {user.photoURL ?  <img className="rounded-full max-w-[45px]" src={user.photoURL}  alt={user.displayName} /> : <img className="rounded-full max-w-[45px]" src="/public/default-avatarr.jpg"/>}
               
                <p className="max-md:hidden">{user.displayName}</p>
            </div>

            <button onClick={()=> signOut(auth)} className="whitespace-nowrap flex items-center bg-zinc-700 p-2 hover:bg-zinc-900 rounded text-[15px] text-xl gap-2">
            <RiDoorOpenLine className="text-2xl" />
                <span className="max-md:hidden">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
