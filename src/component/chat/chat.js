import React from "react";
import "./chat.css";
import Group from "../group/group";
import Create_Chat from "../create_chat/create_chat";
import { useState, useEffect } from "react";
import Message from "../message/message";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config-firebase";
import { useLocation } from "react-router-dom";
import NewChat from "../newchat/newchat";

const Chat = () => {
  const { state } = useLocation();
  const currentuser = state.email;
  const userLoggedInData = state;
  const [getmessage, setmessage] = useState([]);
  const [showinput, setshowinput] = useState(false);
  const [getGroup, setGroup] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [getGroupNames, setGroupName] = useState([]);
  const [getfriendchat, setfriendchat] = useState("Geen chat open");
  const [getcurrentchat, setcurrentchat] = useState("");
  const [input, setinput] = useState("");
  const [chat, setchat] = useState(false);

  const createNewChat = () => {
    if (chat === false) {
      // nieuwe chats laten zien aan de zijkant van de chat
      setchat(true);
      console.log("true");
    } else if (chat === true) {
      setchat(false);
      console.log("false");
    }
  };

  useEffect(() => {
    if (getcurrentchat.length > 0) {
      // alle berichten ophalen
      const messageRef = collection(db, "chats", getcurrentchat, "messages");
      const q = query(messageRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (querysnapshot) => {
        setmessage(
          querysnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp?.toDate().getTime(),
          }))
        );
      });
      return unsubscribe;
    }
  }, [getcurrentchat]);

  const getCurrentUserID = () => {
    // ingelogde gebruiker zijn id ophalen
    return userLoggedInData.id;
  };
  const changeCurrentchat = (currentChat) => {
    // huidige chat aanpassen
    setcurrentchat(currentChat);
  };

  const changecurrentUser = (displayName) => {
    // gebruiker waarmee je aan het chatten bent aanpassen
    setfriendchat(displayName);
  };

  useEffect(() => {
    // alle chats ophalen waar de ingelogde gebruiker in zit
    const userid = getCurrentUserID();
    const chatsref = collection(db, "chats");
    const q = query(chatsref, where("users", "array-contains", userid));
    const unsubscribe = onSnapshot(q, (querysnapshot) => {
      setGroupName(
        querysnapshot.docs.map((doc) => ({ ...doc.data(), id: doc }))
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // alle gebruikers uit de database ophalen behalve de gebruiker zelf
    const fetchchats = async () => {
      const queryfriend = collection(db, "users");
      const q = query(queryfriend, where("email", "!=", currentuser));
      const querysnapshot = await getDocs(q);
      setGroup(
        querysnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchchats();
  }, []);

  const getCurrentUseremail = () => {
    // ingelogde gebruikers email ophalen
    return currentuser;
  };

  const getNewMessage = async (e) => {
    // nieuw bericht toevoegen
    e.preventDefault();

    const usersRef = doc(db, "users", userLoggedInData.id);
    setDoc(usersRef, { lastSeen: serverTimestamp() }, { merge: true });

    const messageRef = collection(db, "chats", getcurrentchat, "messages");
    await addDoc(messageRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: currentuser,
    });
    const chatref = doc(db, "chats", getcurrentchat);

    setDoc(
      chatref,
      {
        lastMessage: input,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    setinput("");
  };

  const edit_value = (index) => {
    // bewerk veld laten zien

    setDisabled(true);
    setshowinput(true);
  };
  const update = (index, value) => {
    // bericht aanpassen
    setshowinput(false);
    setDisabled(false);
    const messageRef = doc(db, "chats", getcurrentchat, "messages", index);
    setDoc(messageRef, { message: value }, { merge: true });
  };

  const delete_value = async (index) => {
    // waarde verwijderen
    const messageRef = doc(db, "chats", getcurrentchat, "messages", index);
    await deleteDoc(messageRef);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <p className="text-left">{currentuser}</p>
        </div>
        <div className="col-lg-10">
          <p id="currentFriend" className="text-center">
            {getfriendchat}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2 ">
          <div className="chatrooms">
            <Create_Chat createNewChat={createNewChat} />

            {chat ? (
              <>
                {getGroup.map((group, index) => {
                  return (
                    <NewChat
                      key={group.id}
                      index={group.id}
                      group={group.displayName}
                      getCurrentUserID={getCurrentUserID}
                      changeCurrentchat={changeCurrentchat}
                      changecurrentUser={changecurrentUser}
                      userstate={state}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {getGroupNames.map((group, index) => {
                  return (
                    <Group
                      key={group.id.id}
                      index={group.id}
                      group={group}
                      getCurrentUserID={getCurrentUserID}
                      changecurrentUser={changecurrentUser}
                      changeCurrentchat={changeCurrentchat}
                      userstate={state}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="col-lg-9 form-group whatsapp-chat-container">
          {getmessage.map((mess, index) => {
            return (
              <Message
                key={mess.id}
                index={mess.id}
                mess={mess.message}
                edit_value={edit_value}
                showinput={showinput}
                update={update}
                delete_value={delete_value}
                isDisabled={isDisabled}
                sender={mess.user}
                currentUser={userLoggedInData.email}
              />
            );
          })}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10">
          <form onSubmit={getNewMessage}>
            <input
              onChange={(e) => setinput(e.target.value)}
              type="text"
              className="form-control bottom-input"
              id="message"
              min={0}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
