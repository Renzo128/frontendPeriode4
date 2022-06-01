import React from "react";
import "./newchat.css";
import { db } from "../../config-firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const NewChat = ({
  group,
  index,
  getCurrentUserID,
  changecurrentUser,
  changeCurrentchat,
  userstate,
}) => {
  // de groepen laten zien en de groep path aanmaken

  const path = `/chat/${index}`; // path voor de chat
  const currentid = getCurrentUserID();

  const createChat = async (id) => {
    // chat maken als deze niet bestaat
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

  return (
    <div className="container-fluid">
      <div className="row spacing">
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
