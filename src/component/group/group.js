import React from "react";
import "./group.css";
import { db } from "../../config-firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import Getfriends from "../functions/function";
import { Link } from "react-router-dom";

const Group = ({
  group,
  index,
  getCurrentUserID,
  changecurrentUser,
  changeCurrentchat,
  userstate,
}) => {
  // de groepen laten zien en de groep path aanmaken
  const path = `/chat/${group.id}`;
  const currentid = getCurrentUserID();
  const [friend, setfriend] = useState({});
  useEffect(() => {
    if (currentid.length > 0) { // vriend als titel zetten
      Getfriends(group.users, currentid).then((data) => {
        setfriend(data);
      });
    }
  }, []);

  const createChat = async (id) => {  // chat aanmaken
    const chatsref = collection(db, "chats");
    const q = query(chatsref, where("users", "array-contains", currentid));
    const querysnapshot = await getDocs(q);
    const chatalreadyexists = (friend_id) =>
      !!querysnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === friend_id)?.length > 0
      );
    if (!chatalreadyexists(id)) {
      addDoc(chatsref, { users: [currentid, index.id] });
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
              changecurrentUser(friend.displayName);
              changeCurrentchat(group.id);
            }}
          >
            <Link to={path} defaultValue={friend.displayName} state={userstate}>
              <p className="text-center name">{friend.displayName}</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Group;
