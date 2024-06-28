import moment from "moment";
import React from "react";
import { MdEdit } from "react-icons/md";

const UserInfo = ({ tweet }) => {
    
    //   console.log(tweet.createAt.toDate());
  
    let date;

    // Verinin var olup olmadığını kontrol edin
    if (tweet.createAt) {
      // toDate metodunu kontrol edin ve çağırın
      try {
        // tarih verisine erisme ve moment ile suana uzakligini belirleme
        date = tweet.createAt.toDate();
        date = moment(date).fromNow();
      } catch (error) {
        console.error("Date conversion error:", error);
        date = "Invalid date";
      }
    } else {
      date = "Unknown date"; // veya uygun bir varsayılan değer
    }


  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
     {tweet.user.name ? <p>{tweet.user.name}</p> : <p>Suzi</p>}
      <p className="text-gray-400 text-sm">
        @{tweet.user.name?.toLowerCase().split(" ").join("_")}
      </p>
      <p className= "text-gray-400 text-sm">{date}</p>

      {tweet.isEdited && (
        <p className="text-gray-400 text-xs flex items-center">
            <span className="max-md:hidden">Edited</span>
            <MdEdit className="md:hidden"/>
        </p>
      )}
    </div>
  );
};

export default UserInfo;
