import { doc, updateDoc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { db } from "../../firebase";
import upload from "../../utils/upload";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../Loader";

const Modal = ({ tweet, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //input verilerine eris
    console.dir(e.target);
    const text = e.target[0].value;
    const file = e.target[1].files[0];

    setIsLoading(true);

    //guncellenecek olan dokumanin referansini al
    const tweetRef = doc(db, "tweets", tweet.id);

    try {
      //eger foto secilmediyse yaziyi guncelle
      if (!file || !file?.type.startsWith("image")) {
        await updateDoc(tweetRef, {
          textContent: text,
          isEdited: true,
        });
        toast.success("Tweet Updated Successfully");
        return close();
      }

      //dosya secildiyse hem yazi hem fotoyu guncelle

      //secilen fotoyu storage'a ekle
      const newUrl = await upload(file);

      //belgenin hem yazi hem foto degerlerini guncelle
      await updateDoc(tweetRef, {
        textContent: text,
        imageContent: newUrl,
        isEdited: true,
      });

      toast.success("Tweet Updated Successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }

    setIsLoading(false);

    //modali kapat
    close();
  };
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center bg-gray-600 bg-opacity-40">
      <div className="bg-black rounded-md py-10 px-8 w-3/4  max-w-[600px] min-h-[60vh] max-h-[80vh] ">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Edit The Tweet</h1>
          <button onClick={close}>
            <IoMdClose className="text-3xl transition hover:text-gray-500" />{" "}
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-1 mt-10 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-3">
            <label className="mb-2">Change Content</label>
            <input
              name="title"
              defaultValue={tweet.textContent}
              type="text"
              className="border rounded-md p-1 text-black"
            />

            <label className="mt-10 mb-2">Add/Change Photo</label>
            <input name="file" type="file" />
          </div>

          <div className="flex justify-end gap-3 mt-10">
            <button
              onClick={close}
              className="bg-gray-500 py-2 px-4 rounded-full hover:bg-gray-600"
              type="button"
            >
              Cancel
            </button>
            <button
            disabled={isLoading}
              className="bg-blue-500 py-2 px-5 rounded-full hover:bg-blue-600 min-w-[75px] flex justify-center items-center"
              type="submit"
            >
                {isLoading ? <Loader/> : "Save"}
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
