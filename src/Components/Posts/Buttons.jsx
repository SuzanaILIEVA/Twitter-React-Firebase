import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { auth, db } from "../../firebase";

// console.log(auth);

const Buttons = ({ tweet }) => {
  // oturumu acik olan kullanici tweeti likeladi mi konterol et1
  // console.log(auth.currentUser.uid);
  // console.log(tweet.likes);

  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // like durumunu tersine cevirir
  const toggleLike = async () => {
    //guncellenecek dokumanin referansini al
    const tweetRef = doc(db, "tweets", tweet.id);

    //referansi alinan tweet dokumanini gunceller
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex justify-evenly">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#6396e380]">
        <LuMessageCircle />
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#5fda6964]">
        <FaRetweet />
      </div>
      <div
        onClick={toggleLike}
        className="p-3 rounded-full cursor-pointer transition hover:bg-[#aa4b5e4d] flex items-center gap-2"
      >
        {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}

        <span>{tweet.likes.length}</span>
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#6bc8ea48]">
        <BsThreeDots />
      </div>
    </div>
  );
};

export default Buttons;
