import React from "react";
import "./newchat.css";
import { db } from "../../config-firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import Getfriends from "../functions/function";
import { Link } from "react-router-dom";

const NewChat = ({
  group,
  index,
  getCurrentUseremail,
  getCurrentUserID,
  chat_url,
  changecurrentUser,
  changeCurrentchat,
  userstate,
}) => {
  // de groepen laten zien en de groep path aanmaken

  const path = `/chat/${index}`;
  const currentid = getCurrentUserID();
  const currentuser = getCurrentUseremail();
  const [friend, setfriend] = useState({});

  useEffect(() => {
    if (currentid.length > 0) {
      //   Getfriends(group.users, currentid).then((data) => {
      setfriend(group);
      //   });
    }
  }, []);

  const createChat = async (id) => {
    const chatsref = collection(db, "chats");
    const q = query(chatsref, where("users", "array-contains", currentid));
    const querysnapshot = await getDocs(q);
    const chatalreadyexists = (friend_id) =>
      !!querysnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === friend_id)?.length > 0
      );
    if (!chatalreadyexists(index)) {
      addDoc(chatsref, { users: [currentid, index] });
    } else {
    }
  };
  //   console.log(group)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <button
            onClick={() => {
              createChat(currentid);
              changecurrentUser(group);
              changeCurrentchat(group);
            }}
          >
            <Link to={path} defaultValue={group} state={userstate}>
              <p className="text-center name">{group}</p>
            </Link>
            {}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
