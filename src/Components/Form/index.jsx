import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { MdOutlineGifBox } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import upload from "../../utils/upload";
import Loader from "../Loader";

import Picker from '@emoji-mart/react';
import { Data } from "emoji-mart";


console.log(auth.currentUser);

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const addEmoji = (emoji) => {
    setTweet(tweet + emoji.native);
    setShowPicker(false);
  };

  // Tweet gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();

    //1) Inputtaki veriye eriş
    console.dir(e.target);

    const text = e.target[0].value;
    const file = e.target[1].files[0];

    //2) Yazı ve resim içeriği yoksa fonksiyonu durdur, uyarı ver
    if (!text && !file) {
      return toast.warning("Please enter content");
    }

    setIsLoading(true);

    try {
      //3) Dosyayı Firebase Storage'a ekle
      const url = await upload(file);
      //4) Yeni tweet belgesini koleksiyona kaydet
      const tweetsCol = collection(db, "tweets");

      await addDoc(tweetsCol, {
        text: tweet,
        textContent: text,
        imageContent: url,
        likes: [],
        isEdited: false,
        createAt: serverTimestamp(),
        user: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
      });
      setTweet("");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }

    setIsLoading(false);
    //5) Formu sıfırla
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px]"
        src={user?.photoURL}
        alt={user?.displayName}
      />

      <div className="w-full">
        <input
          type="text"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="What's happening?"
          className="w-full mt-1 mb-2 bg-transparent outline-none md:text-lg"
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center text-2xl gap-4 cursor-pointer mt-2">
            <label
              htmlFor="image"
              className="cursor-pointer hover:bg-[#505050b7] rounded-full p-2"
            >
              <BsCardImage />
            </label>
            <span className="cursor-pointer hover:bg-[#505050b7] rounded-full p-2">
              <MdOutlineGifBox />
            </span>

            <span
              className="cursor-pointer hover:bg-[#505050b7] rounded-full p-2"
              onClick={() => setShowPicker(!showPicker)}
            >
              <FaRegSmile />
            </span>

            {showPicker && (
              <div className="absolute mt-96">
                <Picker data={Data} onEmojiSelect={addEmoji} />
              </div>
            )}

            <input id="image" type="file" className="hidden" />
          </div>
          <button
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-800 flex items-center justify-center px-4 py-1 min-w-[85px] min-h-[40px] rounded-full"
          >
            {isLoading ? <Loader /> : "Tweet"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
