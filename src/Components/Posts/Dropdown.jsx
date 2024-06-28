import { deleteDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import Modal from "../Modal/index";

const Dropdown = ({ tweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //inputun referansini al 
  const inputRef = useRef()
  // console.log(inputRef);

  //Dropdown'i kapat
  const closeDropdown = () =>{
    inputRef.current.checked = false
  }



  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    deleteDoc(tweetRef)
      .then(() => toast.info("Tweet deleted"))
      .catch(() => toast.error("Something went wrong"));

      closeDropdown()
  };

  const handleEdit = () => {
    setIsModalOpen(true);

    closeDropdown()
  };

  return (
    <>
      <label className="popup">
        <input ref={inputRef} type="checkbox" />
        <div className="burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Actions</legend>
          <ul>
            <li>
              <button onClick={handleEdit}>
                <MdModeEdit />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <BsTrash className="text-red-600" />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
      {isModalOpen && (
        <Modal tweet={tweet} close={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Dropdown;
